<template>
  <Modal ref="modal" :onModalSubmit="createOpportunity" :modal-title="title">
    <div class="deal">
      <div class="deal-highlight ">Propulsé par {{ deal.user.username}}</div>
      <div class="deal-wrapper">
        <div>Offre de {{ deal.type}}</div>
        <div class=" has-text-success" >{{ deal.title }}</div>
      </div>
      <div class="deal-highlight ">Votre Offre</div>
      <div class="counter-offer">
        <div class="field">
          Préférez-vous échanger des crédits ?
          <label class="checkbox is-large">
            <input
                type="checkbox"
            v-model="isPriceSelected">
            Oui
          </label>
        </div>
        <div class="field ">
          <label class="label">Combien de Credit ?</label>
          <div class="control">
            <input
                :disabled="!isPriceSelected"
                class="input"
                type="number"
            v-model="selectedPrice">
            <i>
              Vous n'avez pas assez de crédit !
            </i>
          </div>
        </div>
        <div class="field ">
          <label class="label">Deals</label>
          <div class="control">
            <div class="select">
              <select :disabled="isPriceSelected" >
                <option v-for="d in availableDeals" :key="d.slug" :value="d">{{ d.title}}</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          Your price is: <span class="deal-highlight">1000$</span>
        </div>
        <div
            class="price price">
          Vous offrez exactement le même montant
        </div>
        <i>La différence autorisée n'est pas inférieure à 20%.</i>
      </div>
    </div>
    <template #activatorBtn>
      <button
          class="button is-outlined is-large is-danger is-fullwidth">Faire une offre</button>
    </template>
  </Modal>


</template>

<script>
import Modal from "@/components/Modal";
export default {
  name: "ExchangeDealModal",
      components: {
    Modal
  },
  computed: {
    modal() {
      return this.$refs.modal;
    }
  },
  data () {
    return {
      title: "Deal",
      selectedPrice: 40,
      isPriceSelected: false,
    };
  },
  props: {
    deal: {
      type: Object,
      required: true
    },
    availableDeals: {
      type: Array,
      required: true
    }
  },
  methods: {
    createOpportunity() {
      this.$emit("createOpportunity");
    }
  }
}
</script>

<style scoped lang="scss">
.price {
  padding: 7px;
  &-allowed {
    background-color: #cdeacd;
  }
  &-declined {
    background-color: #ffc2c2;
  }
}
.deal-wrapper {
  margin-bottom: 10px
}
.counter-offer, .deal-wrapper {
  border: 2px solid grey;
  padding: 10px;
  margin-top: 10px;
  &-title {
    font-size: 21px;
    margin: 5px 0;
    font-weight: bold;
  }
}
.deal {
  font-size: 19px;
  &-highlight {
    font-size: 19px;
    font-weight: bold;
  }
}
.disabled {
  &.field {
    input, textarea, select {
      pointer-events: none;
      color: grey;
    }
    label {
      color: grey;
    }
  }
}
</style>