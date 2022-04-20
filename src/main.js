import { createApp } from 'vue'
import App from './App.vue'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faUserSecret ,faStar , faCheck, faEnvelope,faUser,faUpload} from '@fortawesome/free-solid-svg-icons'



/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import router from "@/components/Router/routes";
import store from '@/store'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'

const VueTelInputOptions = {
    mode: "international",
    language: "fr_FR",


        formatOnKeyPress: true,

        formatOnChange: true,
    defaultCountry: "fr",
    onlyCountries: ['NG', 'GH', "GB", "US", "CA","FR","CM"],

}
/* add icons to the library */
library.add(faUserSecret)
library.add(faStar)
library.add(faCheck)
library.add(faEnvelope)
library.add(faUser)
library.add(faUpload)


let app;


store.dispatch("user/onAuthChange", () => {
   if(!app){
       app = createApp(App);

       /* add font awesome icon component */
       app.component("font-awesome-icon", FontAwesomeIcon)
       app.use(VueTelInput, VueTelInputOptions)
       app.use(store)
       app.use(router)
       app.use(Toast)


       app.mount('#app')
   }

});



