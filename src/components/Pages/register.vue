<template>
  <div class="page-wrapper">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-grey">Inscription</h3>
        <div class="box">
          <form >
            <div class="field">
              <div class="control">
                <input
                    class="input is-large"
                    type="email"
                    placeholder="Email"
                    autocomplete="email"
                    v-model="form.email">
                <FormErrors :errors="v$.form.email.$errors"   />

              </div>
            </div>
            <div class="field">
              <div class="control">
                <input
                    class="input is-large"
                    type="text"
                    placeholder="Username"
                    v-model="form.username"
                >
                <FormErrors :errors="v$.form.username.$errors"   />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input
                    class="input is-large"
                    type="password"
                    placeholder="Mot de passe"
                    autocomplete="current-password"
                    v-model="form.password">
                <FormErrors :errors="v$.form.password.$errors"   />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input
                    class="input is-large"
                    type="password"
                    placeholder="Repeat Mot de passe"
                    v-model="form.passwordRepeat"
                >
                <FormErrors :errors="v$.form.passwordRepeat.$errors"   />
              </div>
            </div>
            <button
                type="button"
                class="button is-block is-info is-large is-fullwidth"
            @click.prevent="register" :disabled="isProcessing">
             S'inscrire

            </button>
          </form>
        </div>
        <p class="has-text-grey">
          <a>S'inscrire avec Google</a>&nbsp;
          <a>Se connecter</a>&nbsp;·&nbsp;
          <a href="../">Besoin d'aide?</a>
        </p>
      </div>

    </div>
  </div>
</template>

<script>

import  useAuth  from "@/composition/useAuth"
import useVuelidate from '@vuelidate/core'
import { helpers, required, email ,sameAs} from '@vuelidate/validators'
import FormErrors from "@/components/FormErrors";


export default {
  name: "DealRegister",
  components: {
    FormErrors
  },
  data () {
    return {
      form: {
        email:'',
        username:'',
        password:'',
        passwordRepeat:''
      }
    }
  },
  setup(){
    return {
      ...useAuth(),
      v$: useVuelidate()
    }

  },
  validations() {
    return {
      form: {
        email: {
          required: helpers.withMessage('L\'email est requis !', required),
          email: helpers.withMessage('L\'email est invalide *****@***.** !', email)
        },
        username: {
          required: helpers.withMessage('L\'username est requis !', required),
        },
        password: {
          required: helpers.withMessage('Le mot de passe est requis !', required),
        },
        passwordRepeat: {
          required: helpers.withMessage('Le mot de passe est requis !', required),
          sameAs: helpers.withMessage('Les mots de passe ne sont pas identiques !', sameAs(this.form.password))
        },

      }
    }
  },
  methods:{
   async register(){
      const isValid =  await this.v$.$validate();
      if(isValid){
        this.$store.dispatch('user/register', this.form)
      }
    }
  },
  watch:{
    isAuthenticated(val){
      if(val){
        this.$router.push("/");
      }
    }
  }


}
</script>
<style scoped>
/* Left formatting  */
/* .form-error {
  text-align: initial;
} */
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