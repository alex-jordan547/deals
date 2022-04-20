<template>
  <div>
    <template v-if="$slots.activatorBtn">
      <div @click="open">
        <slot name="activatorBtn"></slot>
      </div>
    </template>
    <button
        v-else
        @click="open"
        class="button is-block is-success is-light is-fullwidth">Mettre à jour vos infos
    </button>
    <div :class="['modal', {'is-active': isOpen}]">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ modalTitle}}</p>
          <button
              @click="isOpen = false"
              class="delete"
              aria-label="close"></button>
        </header>
        <section class="modal-card-body">
         <!--Corps du modal-->
          <slot/>

        </section>
        <footer class="modal-card-foot">
          <template v-if="$slots.footerButtons">
            <slot name="footerButtons"/>
          </template>
          <template v-else>
            <button class="button is-success" @click="submitModal" :disabled="!isAllowed">Sauvegarder</button>
            <button @click="close" class="button">Annuler</button>
          </template>

        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal-deal",
  data() {
    return {
      isOpen: false
    };
  },
  props: {
    onModalSubmit: {
      type: Function,
      required: false
    },
    modalTitle: {
      type: String,
      required: false
    },
    isAllowed : {
      type: Boolean,
      required: false
    }
  },
  methods: {
    submitModal() {
      this.onModalSubmit({
        onSuccess: this.close
      });

    },
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    }
  }
}

</script>

<style scoped>

</style>