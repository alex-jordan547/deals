<template>

  <header class="header">
    <nav class="navbar" :class=" $route.path === '/' ? '': 'with-background' ">
      <div class="container">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item has-text-white is-size-2 has-text-weight-bold"> {{ title }}</router-link>
          <span role="button" tabindex="0" class="navbar-burger burger has-text-white" data-target="navbar-menu" @click="navState = !navState" :class="navState ? 'is-active':''">
              <span></span>
              <span></span>
              <span></span>
            </span>
        </div>
        <div id="navbar-menu" class="navbar-menu " :class="navState ? 'is-active':''">
          <div class="navbar-end">
            <template  v-if="isAuthenticated">

              <router-link to="/profile" class="navbar-item clickable">
                <font-awesome-icon :icon="['fas', 'user']" /> &nbsp; {{ user.username}}
              </router-link>

              <router-link to="/deals/new" class="navbar-item clickable">
                Nouveau deal
              </router-link>

            </template>


            <!-- Parcours des différents éléments de la navigation -->
            <router-link class="navbar-item" v-for="(elem,index) in menu" :key="index"  :to="elem.link" :class="elem.class">
             {{ elem.text}}
            </router-link>


            <template v-if="isAuthenticated">

              <div class="navbar-item clickable" @click="$store.dispatch('user/logout')" >
                Se deconnecter
<!--                <font-awesome-icon :icon="['fas', 'arrowRightFromBracket']" />-->
              </div>

            </template>

            <template v-else>

              <router-link class="navbar-item "  :to="'/login'" >
                Se connecter
              </router-link>

              <router-link class="navbar-item "  :to="'/register'" >
               S'inscrire
              </router-link>

            </template>


          </div>
        </div>
      </div>
    </nav>
  </header>

</template>

<script>
import useAuth from "@/composition/useAuth";

export default {
  name: "DealNavbar",

  props:{
    menu:{
      required:true,
      type:Array
    },
    title:{
      type:String,
      default:'Deals'
    }
  },
  data(){
    return{
      navState: false
    }
  },
setup(){
    return useAuth()
},
  created() {
    window.addEventListener('resize',this.handleWindowResizing)
  },
  unmounted(){
    window.addEventListener('resize',this.handleWindowResizing)
  },
  methods:{
    handleWindowResizing(e){
    if(this.navState && e.target.innerWidth > 1020){
      this.navState = false
    }
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 1000px) {
  .navbar-menu {
    display: block;
    opacity: 0;
    position: absolute; /* or float: left; width: 100%;*/
    left: 0;
    right: 0;
    transform: translateY(-100%);
    transition: all .5s ease-in-out;
    pointer-events: none;
  }

  .navbar-menu.is-active {
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }

}

.navbar-burger{
  height: auto;
}
</style>