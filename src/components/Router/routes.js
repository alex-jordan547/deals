import { createWebHistory, createRouter} from "vue-router";
import faq from "@/components/Pages/faq";
import Home from "@/components/Pages/Home";
import About from "@/components/Pages/About";
import login from "@/components/Pages/login";
import register from "@/components/Pages/register";
import { getAuth} from "firebase/auth";
import store from "@/store";
import profile from "@/components/Pages/Profile";
import dealCreatePage from "@/components/Pages/DealCreate";
import DealDetail from "@/components/Pages/DealDetail";


const routes = [
    { path: '/', component: Home,name:'home' },
    { path: '/about', component: About ,name:'about'},
    { path: '/faq', component: faq ,name:'faq'},
    { path: '/profile', component: profile ,name:'profile',meta: { onlyAuthUser : true }},
    { path: '/login', component: login , meta: { requiresAuth: true },name:'login' },
    { path: '/register', component: register , meta: { requiresAuth: true } ,name:'register'},
    { path: '/deals/new', component: dealCreatePage, meta: { onlyAuthUser: true }, name:'dealCreate'},
    { path: '/deals/:slug', component: DealDetail, name:'DealDetail'},


]

const router = createRouter({
    routes,
    history:createWebHistory()
})

router.beforeEach((to,from,next) => {

    const isAuth = !!getAuth().currentUser;

    if (to.meta.onlyAuthUser) {
        if (isAuth) {
            next();
        } else {
            next({name: 'login'});
        }
    } else if (to.meta.requiresAuth) {
        if (isAuth) {
            next({name: 'home'});
            store.dispatch("toast/warning", "Vous êtes déjà connecté !", {root: true});
        } else {
            next();
        }
    }
    else {
        next();
    }
}
    )

export default router;