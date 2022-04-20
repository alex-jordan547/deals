<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="form-container">
        <form>
          <div class="field">
            <label class="label">Type</label>
            <div class="control">
              <div class="select">
                <select v-model="form.type" >
                  <option value="service" >Service</option>
                  <option value="produit"  >Produit</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Titre</label>
            <div class="control">
              <input
                  class="input"
                  type="text"
                  placeholder="Un beau produit ou service"
                  v-model="form.title"
              />
              <FormErrors :errors="v$.form.title.$errors"   />

<!--              <div class="form-error a" >
              <div class="help is-success" ><font-awesome-icon :icon="['fas', 'check']" /> Valide !</div>
              </div>-->

            </div>
          </div>
          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <textarea
                  class="textarea"
                  placeholder="Desicription ..."
              v-model="form.description">
              </textarea>
              <FormErrors :errors="v$.form.description.$errors"   />
            </div>
          </div>
          <div class="field">
            <label class="label">Lien Image</label>
            <div class="control">
              <input
                  class="input"
                  type="text"
                  placeholder="https://unsplash...."

              v-model="form.image">
              <FormErrors :errors="v$.form.image.$errors"   />
            </div>
          </div>
          <div class="field">
            <label class="label">Prix</label>
            <div class="control">
              <input
                  class="input"
                  type="number"
                  placeholder="249"
              v-model="form.price">
              <FormErrors :errors="v$.form.price.$errors"   />
            </div>
          </div>
          <div class="field">
            <label class="label">Pays</label>
            <div class="control">
              <input
                  class="input"
                  type="text"
                  placeholder="Cameroun"
              v-model="form.country">
              <FormErrors :errors="v$.form.country.$errors"   />
            </div>
          </div>
          <div class="field">
            <label class="label">Ville</label>
            <div class="control">
              <input
                  class="input"
                  type="text"
                  placeholder="Yaoundé"
              v-model="form.city">
             <FormErrors :errors="v$.form.city.$errors"   />
            </div>
          </div>

          <!-- TODO: provide tags inputs -->
          <div class="field">
            <label class="label">Tags</label>
            <div class="control">
              <input
                  class="input"
                  type="text"
                  placeholder="programmation"
              @input="handleTags">

            </div>
            <div v-for="tag in form.tags" :key="tag" class="tag is-primary is-normal">
                {{ tag }}
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button
                  class="button is-link" @click.prevent="createDeal">Envoyer</button>
            </div>
            <div class="control">
              <button class="button is-text">Annuler</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import useVuelidate from '@vuelidate/core'
import { required , minLength,minValue, url,helpers} from '@vuelidate/validators'
import FormErrors from "@/components/FormErrors";
//import { supportedFileType } from "@/helpers/validators";

const setupInitialData =() => ({
  title: '',
  description: '',
  type:'produit',
  image: '',
  price: null,
  country: '',
  city: '',
  tags: [],
})

export default {
  name: 'DealCreate',
  components: {
    FormErrors
  },
  setup(){
    return {v$: useVuelidate()}
  },
  data(){
    return {
      form: setupInitialData(),
    }
  },
  validations: {
    form: {
      title: {
        required: helpers.withMessage('Le titre est requis !',required ),
        minLength: helpers.withMessage('Le titre doit contenir au moins 10 caractères !',minLength(10) ),
      },
      description: {
        required : helpers.withMessage('La description est requise !', required ),
      },
      image: {
        required :helpers.withMessage('L\'image est requise !', required ),
        url : helpers.withMessage('L\'url vers l\'image doit être une url valide ( http:// ) !',url ),
     //   supportedFileType : helpers.withMessage('Le type de fichier doit être une image !', supportedFileType ),
      },
      price: {
        required : helpers.withMessage('Le prix est requis !',required ),
        minValue: helpers.withMessage('Le prix doit être supérieur à 1 euro !',minValue(1) ),
      },
      country: {
        required : helpers.withMessage('Le pays est requis !', required ),
      },
      city: {
        required : helpers.withMessage('La ville est requise !', required ),
      },

    }
  },
  methods: {
   async createDeal(){
      const isValid = await this.v$.$validate();

      if (isValid) {
        this.v$.$reset();
       this.$store.dispatch("deal/newDeal", {
          data:this.form,

            onSuccess: () =>{ this.form = setupInitialData(); }
    })
      }

    },
    async handleTags(event){
        const { value } = event.target;

        if( value && value.trim().length > 1 && (value.substr(-1) === "," || value.substr(-1) === " ")){
              const _value = value.split(",")[0].trim();
              if(!this.form.tags.includes(_value)){
                this.form.tags.push(_value)
                }

              event.target.value = ""
        }

    }
  }
}
</script>

<style scoped>
.form-container {
  max-width: 960px;
  margin: 0 auto;
  margin-top: 40px;
}
.tag {
  margin: 3px;
}
</style>