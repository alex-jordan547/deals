<template>
  <div id="deals">
    <!-- NAVBAR -->
    <DealNavbar :menu="menu"  :title="title"></DealNavbar>
    <!-- NAVBAR Fin -->


    <div :class=" $route.path === '/' ? '': 'page-wrapper' ">
        <router-view v-slot="{ Component, route}" >
          <transition :name="route.meta.transition ? route.meta.transition : 'fade'" mode="out-in">
            <div :key="route.name">
            <component :is="Component" ></component>
            </div>
          </transition>
        </router-view>

    </div>

  </div>
</template>

<script>
import DealNavbar  from "@/components/Navbar";

export default {
  name: 'App',
  components:{
    DealNavbar,

  },
  data (){
    return{
      title : 'Deals',
      menu: [
        
        {text: "A propos",link:"/about",class:"nav-style-guide"},
        {text: "FAQ",link:"/faq",class: "nav-features"},
      ],
    }
  },

}
</script>

<style lang="scss">

@import 'assets/styles/variables.scss';
@import '~bulma/bulma.sass';
@import 'assets/styles/main.scss';

.fade-enter-active,
.fade-leave-active {
  transition: all .5s cubic-bezier(0.5, 0, 0.5, 1);
}


.fade-enter-from, {
  opacity: 0;
  transform: translateY(100px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.normal-enter-active,
.normal-leave-active {
  transition: all .5s cubic-bezier(0.5, 0, 0.5, 1);
}

.normal-enter-from,.normal-leave-to {
  opacity: 0;
}

</style>