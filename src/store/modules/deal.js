import {db} from "@/Database";

import {
    addDoc,
    doc,
    getDocs,
    query,
    collection,
    where,
    getDoc,
    Timestamp,
    limit,
    startAfter,
    startAt
} from "firebase/firestore";
import slugify from "slugify";


const initPagination = () => ({
    itemCount: 6,
    lastItem: null,
    paginationHistory: [],
    isFetchingData: false,

})

export default {

    namespaced: true,
    state() {
        return {
            items: [],
            item: {},
            pagination: initPagination()
        }
    },
    getters:{
        currentPage(state){
            if(!state.pagination.paginationHistory) {return 1;}
            return state.pagination.paginationHistory.length;
        },
        filterDeals : state => searchedTitle => {
            const { items } = state;
            if (!searchedTitle) { return items;}

            const filteredDeals = items.filter(item => {
                return item.title && item.title.toLowerCase().includes(searchedTitle.toLowerCase())
            })

            return filteredDeals;
        }
    },
    actions: {
        async getDealBySlug({commit}, slug) {
            const docQuery = query(
                collection(db, 'deals'),
                where('slug', '==', slug)
            );
            const docSnapshot = await getDocs(docQuery);
            const deal = docSnapshot.docs[0].data();
            deal.id = docSnapshot.docs[0].id;
            const userSnap = await getDoc(deal.user);

            deal.user = userSnap.data();
            deal.user.id = userSnap.id;

            commit('setDeal', deal);
        },
        async getDeals({commit, state}) {
            commit("resetPagination")
            const dealQuery = query(
                collection(db, "deals"),
                limit(state.pagination.itemCount)
            );
            const snapshot = await getDocs(dealQuery)

            const deals = snapshot.docs.map(doc => {
                return doc.data();
            })
            commit("setDeals", deals)
            commit("setLastItem", snapshot.docs[snapshot.docs.length - 1])
            commit("setPaginationHistory", snapshot.docs[0])
        },
        async getAllDeals({commit}) {
            commit("resetPagination")
            const dealQuery = query(
                collection(db, "deals"),
            );
            const snapshot = await getDocs(dealQuery)

            const deals = snapshot.docs.map(doc => {
                return doc.data();
            })
            commit("setDeals", deals)
        },
        async newDeal({rootState, dispatch}, {data, onSuccess}) {
            data.user = doc(db, "users", rootState.user.data.id);
            data.slug = slugify(`${data.title} ${Date.now()}`, {
                strict: true,        // remove special characters
                lower: true          // result in lower case
            });
            data.createdAt = Timestamp.fromDate(new Date());
            await addDoc(collection(db, "deals"), data);

            dispatch("toast/success", "Votre deal a été crée !", {root: true})
            onSuccess();
        },
        async getMoreDeals({commit,state}, {page}){
            let queryData;

            if(state.pagination.isFetchingData){ return ;}
            commit("setIsFetchingData",true)

            if(page === 'next'){
                queryData = query(
                    collection(db, "deals"),
                    startAfter(state.pagination.lastItem),
                    limit(state.pagination.itemCount)

                )
            } else{
                const lastItemIndex = state.pagination.paginationHistory.length - 1 ;
                const previousItem  = state.pagination.paginationHistory[lastItemIndex - 1];

                if(!previousItem){
                    commit("setIsFetchingData",false)
                    return ;
                }
                state.pagination.paginationHistory.splice(lastItemIndex, 1);
                queryData = query(
                    collection(db, "deals"),
                    startAt(previousItem),
                    limit(state.pagination.itemCount)

                )
            }
            const snapshot = await getDocs(queryData);
            commit("setIsFetchingData",false)
            if(snapshot.docs.length === 0){ return ;}
            const deals = snapshot.docs.map(doc =>({id:doc.id,...doc.data()}))
            commit("setDeals",deals);
            commit("setLastItem",snapshot.docs[snapshot.docs.length - 1])

            if(page === 'next'){
            commit("setPaginationHistory",snapshot.docs[0])
            }
        }

    },
    mutations: {
        setDeals(state, deals) {
            state.items = deals
        },
        setDeal(state, deal) {
            state.item = deal
        },
        setLastItem(state, item) {
            state.pagination.lastItem = item;
        },
        setPaginationHistory(state, item) {
            state.pagination.paginationHistory.push(item)
        },
        setIsFetchingData(state,isFetching){
            state.pagination.isFetchingData = isFetching
        },
        resetPagination(state){
            state.pagination = initPagination()
        }
    }

}