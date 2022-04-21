<template>

<modal :onModalSubmit="updateUserProfile" ref="modal" :modal-title="title" :isAllowed="true">
          <form>
            <div class="field">
              <label class="title">Nom d'utilisateur : </label>
              <input
                  class="input" v-model="userProfile.username">
            </div>

            <div class="field">
              <label class="title">Avatar</label>
              <div class="file has-name">
                <label class="file-label">
                  <input class="file-input" type="file" name="resume" @change="handleUpload">
                  <span class="file-cta">
              <span class="file-icon">
                <font-awesome-icon

                    :icon="['fas', 'upload']"
                />
              </span>
              <span class="file-label">
                Choisir un fichier
              </span>
            </span>
                  <span class="file-name">
              {{filename}}
            </span>
                </label>
              </div>
              <progress
              class="progress mt-3 is-success is-small"
              :value="progress"
              max="100"
              v-if=" progress < 100 && progress> 0"
              >
              {{progress}}%
              </progress>
              <img :src="userProfile.avatar" class="image-preview mt-3" alt="{{userProfile.username}}" v-if="userProfile.avatar">
            </div>
            <div class="field">
              <label class="title">A propos de vous :</label>
              <input
                  class="input" v-model="userProfile.info">
            </div>
            <div class="field">
              <label class="title">Téléphone :</label>
              <input
                  class="input" v-model="userProfile.phone">
            </div>
            <div class="field">
              <label class="title">Adresse :</label>
              <input
                  class="input" v-model="userProfile.adress">
            </div>
            <div class="field">
              <label class="title">Pays :</label>
              <input
                  class="input" v-model="userProfile.country">
            </div>
          </form>
  <template #activatorBtn>
    <button class="button is-block is-primary is-light is-fullwidth">Mettre à jour vos infos</button>
  </template>

</modal>


</template>

<script>
import modal from "@/components/Modal";
export default {
  components: {
    modal
  },
  data () {
    return {
      isOpen: false,
      userProfile:{...this.user},
      title: "Informations utilisateur",
      filename:"",
      progress:0
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateUserProfile () {
      this.$store.dispatch('user/updateUserProfile', {
        data: this.userProfile,
        onSuccess : () => this.modal.close()
      })
    },
    handleUpload(e){
      const self = this;
      const file = e.target.files[0]
      const reader = new FileReader()
      this.filename = file.name;
      reader.readAsArrayBuffer(file)

      reader.onload = function (){
        self.$store.dispatch("user/uploadImage",{
          bytes:reader.result,
          name:file.name,
          onSuccess: (url) => {
            self.userProfile.avatar = url;
          },
          onProgress: (progress) => {
            self.progress = progress
        }
        })
      }
    }
  },
  computed:{
    modal() {
      return this.$refs.modal
    }
  }
}
</script>

<style lang="scss" scoped>
.image-preview{
  height: 100px;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>