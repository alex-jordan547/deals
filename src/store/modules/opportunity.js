import {increment,addDoc, collection, doc, getDoc, getDocs, query, Timestamp,updateDoc,where} from "firebase/firestore";
import {db} from "@/Database";

const extractDataFromOpp = async (opportunity, id) => {

    if(opportunity.fromDeal){
        const fromDealDoc = await getDoc(opportunity.fromDeal);
        opportunity.fromDeal = { ...fromDealDoc.data(), id: fromDealDoc.id }
    }

    const toDealDoc = await getDoc(opportunity.toDeal)
    opportunity.toDeal = { ...toDealDoc.data(), id: toDealDoc.id }

    const fromUserDoc = await getDoc(opportunity.fromUser)
    opportunity.fromUser = { ...fromUserDoc.data(), id: fromUserDoc.id }

    opportunity.id = id

    return opportunity;
}

export default {
    namespaced: true,
    state(){
      return {
          opportunities: [],
          sentOpportunities: [],
      }
    },
    actions: {
        async createOpportunity({dispatch,commit}, {data, onSuccess}) {
            const opportunity = {
                title: data.title,
                createdAt: Timestamp.fromDate(new Date()),
                toUser: doc(db, "users", data.toUserId),
                fromUser: doc(db, "users", data.fromUserId),
                toDeal: doc(db, "deals", data.toDealId),
                status:"En attente"
            }
            if (data.fromDealId) {
                opportunity.fromDeal = doc(db, "deals", data.fromDealId)
            } else {
                opportunity.price = data.price
            }


            await addDoc(collection(db, "opportunities"), opportunity)

            if(opportunity.price){
                await updateDoc(opportunity.fromUser,{
                    credit: increment(- opportunity.price)
                })
                commit("user/updateCredit",-opportunity.price,{root:true})
            }

            dispatch("toast/success", "Opportunité envoyée", {root: true});

            onSuccess();
        },
        async getOpportunities({dispatch,rootState,commit}) {
           const { id } = rootState.user.data;
           if(!id){
               dispatch("toast/error", "Vous n'etes pas connecté ", {root: true});
           }

           const opportunityQuery = query(
               collection(db, "opportunities")
                   , where("toUser", "==", doc(db, "users", id))
           );

           const opportunitySnap = await getDocs(opportunityQuery);
           const opportunities = await Promise.all(
               opportunitySnap.docs.map(doc =>
                   extractDataFromOpp(doc.data(), doc.id)
               )
           ) ;
            commit("setOpportunities", opportunities);
            // console.table(opportunities)
        },
        async getSentOpportunities({dispatch,rootState,commit}) {
            const { id } = rootState.user.data;
            if(!id){
                dispatch("toast/error", "Vous n'etes pas connecté ", {root: true});
            }

            const opportunityQuery = query(
                collection(db, "opportunities")
                , where("fromUser", "==", doc(db, "users", id))
            );
            const opportunitySnap = await getDocs(opportunityQuery);
            const opportunities = await Promise.all(
                opportunitySnap.docs.map(doc =>
                    extractDataFromOpp(doc.data(), doc.id)
                )
            ) ;
            commit("setSentOpportunities", opportunities)
              // console.table(opportunities)
        },
        async acceptOpportunity({commit,dispatch},{opportunity,onSuccess}){

            const oppRef = doc(db, "opportunities", opportunity.id);
            await updateDoc(oppRef, {status: "accepté"});

            if(opportunity.price){
                const toUserRef = doc(db,"users",opportunity.toUser.id)
                await updateDoc(toUserRef,{
                    credit: increment(opportunity.price)
                })
                commit("user/updateCredit",opportunity.price,{root:true})
            }

            commit("changeOpportunityStatus", {id: opportunity.id, status: "accepté"})
            dispatch("toast/success","L'opportunité a été acceptée",{root:true})
            onSuccess();
        },
        async declineOpportunity({commit,dispatch}, {opportunity, onSuccess}) {

            const oppRef = doc(db, "opportunities", opportunity.id);
            await updateDoc(oppRef, {status: "refusé"});

            if(opportunity.price){
                const fromUserRef = doc(db,"users",opportunity.fromUser.id)
                await updateDoc(fromUserRef,{
                    credit: increment(opportunity.price)
                })
                // commit("user/updateCredit",opportunity.price,{root:true})
            }
            dispatch("toast/info","L'opportunité a été refusée",{root:true})
            commit("changeOpportunityStatus", {id: opportunity.id, status: "refusé"})
            onSuccess();
        }
    },
    mutations: {
        setOpportunities(state, opportunities){
            state.opportunities= opportunities
        },
        setSentOpportunities(state, opportunities) {
            state.sentOpportunities = opportunities
        },
        changeOpportunityStatus(state, {id, status}) {
            const index = state.opportunities.findIndex(opp => opp.id === id);
            state.opportunities[index].status = status;
        }
    },
}