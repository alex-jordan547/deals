import {db} from "@/Database";

import { query, collectionGroup,  getDocs } from "firebase/firestore";


export default  {

    namespaced:true,
    state() {
        return {
            items: []
        }
    },
    actions:{
       async  getDeals ({commit}) {
           const dealQuery = query(collectionGroup(db,"deals"));
           const snapshot = await getDocs(dealQuery)

           const deals = snapshot.docs.map(doc => {
               return doc.data();
           })

           console.log(db)
           commit("setDeals",deals)
        },

    },
    mutations:{
        setDeals (state, deals) {
            state.items = deals
        }
    }

}