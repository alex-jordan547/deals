import {db} from "@/Database";

import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword
} from "firebase/auth";
import {doc, setDoc, getDoc, updateDoc, query, collection, getDocs, where} from "firebase/firestore";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import store from "@/store";



export default {

    namespaced: true,
    state() {
        return {
            data: null,
            auth: {
                isProcessing: false,
                error: ""
            }
        }
    },
    getters: {
        isAuthenticated(state) {
            return !!state.data;
        },
        isDealOwner(state) {
            return function (dealUserId) {
                return (
                    state.data &&
                    dealUserId &&
                    state.data.id === dealUserId
                )
            }
        },
    },

    actions: {
        async register({commit, dispatch}, {email, password, username}) {
            commit("setAuthIsProcessing", true)
            commit("setAuthError", "")

            try {
                const {user} = await createUserWithEmailAndPassword(getAuth(), email, password)

                await dispatch("createUserProfile", {
                    id: user.uid,
                    username,
                    avatar: "https://www.pinclipart.com/picdir/middle/133-1331433_free-user-avatar-icons-happy-flat-design-png.png",
                    credit: 0,
                    deals: []
                })
            } catch (e) {
                commit("setAuthError", e.message)
                dispatch("toast/error", e.message, {root: true})
            } finally {
                commit("setAuthIsProcessing", false)
            }
        },
        async login({commit, dispatch}, {email, password}) {
            commit("setAuthIsProcessing", true)
            commit("setAuthError", "")
            try {
                await signInWithEmailAndPassword(getAuth(), email, password)

                setTimeout(function () {
                    dispatch("toast/success", "Connexion réussie !", {root: true})
                }, 1000)

            } catch (e) {
                commit("setAuthError", e.message)
             //   dispatch("toast/error", e.message, {root: true})

            } finally {
                commit("setAuthIsProcessing", false);

            }
        },
        async logout({dispatch, commit}) {
            try {
                await signOut(getAuth())
                dispatch("toast/warning", "Vous êtes maintenant déconnectés", {root: true})
                commit("setUser", null);
            } catch (e) {
                store.dispatch("toast/error", "Vous êtes déjà déconnecté !", {root: true});

            }
        },
        async createUserProfile(_, {id, ...profile}) {
            await setDoc(doc(db, "users", id), {...profile, id})
        },
        async getUserProfile({commit}, user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            const userProfile = docSnap.data();
            const docQuery = query(collection(db, "deals"), where("user", "==", docRef));

            const querySnap = await getDocs(docQuery);
            const deals = querySnap.docs.map(doc =>
                ({
                    ...doc.data(),
                    id: doc.id
                })
            );

            const userWithProfile = {
                id: user.uid,
                email: user.email,
                ...userProfile,
                deals
            }
            commit("setUser", userWithProfile);
        },
        onAuthChange({dispatch, commit}, callback) {
            commit("setAuthIsProcessing", true)
            onAuthStateChanged(getAuth(), async (user) => {
                if (user) {
                    await dispatch('getUserProfile', user)
                    commit("setAuthIsProcessing", true)
                    callback(user)

                } else {

                    commit("setAuthIsProcessing", false)
                    callback(null)
                }
            });
        },
        async updateUserProfile({commit, dispatch}, {data, onSuccess}) {
            const userRef = doc(db, "users", data.id);
            if(data.deals){
                delete data.deals
            }
            await updateDoc(userRef, data);
            commit("updateUserProfile", data)
            dispatch("toast/success", "Votre profil a été mis à jour", {root: true})
            onSuccess();
        },
        /*   async uploadImage(_, {bytes, name, onSuccess}) {

               const storage = getStorage();
               const storageRef = ref(storage, name);
               const uploadResult = await uploadBytes(storageRef, bytes)
               const downloadUrl = await getDownloadURL(uploadResult.ref)
               onSuccess(downloadUrl)
           } Upload sans progress bar*/
        async uploadImage(_, {bytes, name, onSuccess, onProgress}) {

            const storage = getStorage();
            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, bytes);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    onProgress(progress);
                },
                (error) => {
                    console.error(error.message)
                },
                async () => {
                    const dowloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
                    onSuccess(dowloadUrl)
                }
            )
        }

    },
    mutations: {
        setAuthIsProcessing(state, isProcessing) {
            state.auth.isProcessing = isProcessing;
        },
        setAuthError(state, error) {
            state.auth.error = error;
        },
        setUser(state, user) {

            state.data = user;
        },
        updateUserProfile(state, profile) {
            state.data = {
                ...state.data,
                ...profile
            }

        },
        updateCredit(state, credit) {
            state.data.credit += credit;
        }
    }

}