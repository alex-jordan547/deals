<template>
  <div id="deals">
    <!-- NAVBAR -->
    <DealNavbar :menu="menu"  :title="title"></DealNavbar>
    <!-- NAVBAR Fin -->


    <div :class=" $route.path === '/' ? '': 'page-wrapper' ">


        <router-view></router-view>



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
  }

}
</script>

<style lang="scss">

@import 'assets/styles/variables.scss';
@import '~bulma/bulma.sass';
@import 'assets/styles/main.scss';

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

</style>