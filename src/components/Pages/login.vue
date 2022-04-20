<template>
  <div class="page-wrapper">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-grey">Connexion</h3>
        <p class="subtitle has-text-grey">Veuillez vous connecter pour continuer.</p>
        <div class="box">
          <form >
            <div class="field">
              <div class="control ">
                <label class="label">Email</label>
                <input
                    class="input is-large"
                    type="email"
                    placeholder="Email"
                    autofocus=""
                    autocomplete="email"
                v-model = "form.email">

                <FormErrors :errors="v$.form.email.$errors"   />
              </div>
            </div>
            <div class="field">
              <div class="control ">
                <label class="label">Mot de passe</label>
                <input
                    class="input is-large"
                    type="password"
                    placeholder="Votre mot de passe"
                    autocomplete="current-password"
                    v-model = "form.password">
                <FormErrors :errors="v$.form.password.$errors"   />
              </div>
            </div>
            <button
                type="button"
                class="button is-block is-info is-large is-fullwidth"
                @click.prevent="login"
            >
              Se connecter
            </button>
          </form>
        </div>
        <p class="has-text-grey">
          <a href="#">Se connecter avec Google</a>&nbsp;
          <a href="#">S'inscrire</a> &nbsp;·&nbsp;
          <a href="#">Besoin d'aide?</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>


import useAuth from "@/composition/useAuth";
import useVuelidate from '@vuelidate/core'
import { helpers, required, email} from '@vuelidate/validators'
import FormErrors from "@/components/FormErrors";
export default {
  name: "DealLogin",
  components: {
    FormErrors
  },
  data () {

    return {
      form: {
        email:'',
        password:''
      }
    }
  },
  setup(){
    return {
      ...useAuth(),
      v$: useVuelidate()
    }
  },
  methods:{
   async login  (){
      const isValid = await this.v$.$validate()
      if(isValid){
        this.$store.dispatch("user/login", this.form)
      }

    }
  },
  watch:{
    isAuthenticated(val){
      if(val){
        this.$router.push("/");
      }
    }
  },
  validations() {
    return {
      form: {
        email: {
          required: helpers.withMessage('L\'email est requis !', required),
          email: helpers.withMessage('L\'email est invalide *****@***.** !', email)
        },

        password: {
          required: helpers.withMessage('Le mot de passe est requis !', required),
        },
      }
    }
  },
}
</script>

<style scoped>
.hero.is-success {
  background: #F2F6FA;
}
.hero .nav, .hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 1rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}
</style>


