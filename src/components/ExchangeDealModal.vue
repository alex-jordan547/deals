<template>
  <Modal ref="modal" :onModalSubmit="createOpportunity" :modal-title="title" :isAllowed="estAuthorise && !hasNotEnoughCredit" >
    <div class="deal">
      <div class="deal-highlight ">Propulsé par {{ deal.user?.username}}</div>
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
            v-model.number="selectedPrice">
          </div>
        </div>
        <div class="field ">
          <label class="label">Deals</label>
          <div class="control">
            <div class="select">
              <select :disabled="isPriceSelected"  v-model="selectedDeal">
                <option v-for="d in availableDeals" :key="d.slug" :value="d">{{ d.title}}</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          Vous offrez : <span class="deal-highlight" v-if="selectedDeal"> {{ offeredPrice}} €</span>
          <span class="deal-highlight" v-else>{{ offeredPrice }} €</span>
        </div>

        <div v-if="percentageDifference !== null" :class="`mb-1 ${colorClass} message is-small`" >
          <div class="message-body"  >
            {{ priceDifferenceText }}
          </div>

        </div>
        <div v-if="hasNotEnoughCredit" class="message is-danger is-small">
          <div class="message-body">
            Vous n'avez pas assez de crédits pour effectuer cette offre. Il vous reste {{user.credit}} crédits.
          </div>

        </div>
        <i class="has-text-grey is-light ">La différence autorisée n'est pas inférieure à {{ ALLOWED_PRICE_DIFFERENCE }}%.</i>
      </div>
    </div>
    <template #activatorBtn>
      <button
          class="button is-outlined is-large is-danger is-fullwidth" >Faire une offre </button>
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
    },
    offeredPrice() {
      if (this.isPriceSelected) {
        return this.selectedPrice;
      } else if (this.selectedDeal) {
        return this.selectedDeal.price;
      } else {
        return 0;
      }
    },
    percentageDifference() {
      if (!this.offeredPrice || this.offeredPrice === '' ) {
        return null;
      }
      return (((this.offeredPrice - this.deal.price) / this.deal.price) * 100).toFixed(2);
    },

    priceDifferenceText() {
      if (this.percentageDifference === null) {
        return ""
      }
      if (this.percentageDifference == 0) {
        return "Vous offrez exactement le même montant.";
      }
        const pFiff = Math.round(this.percentageDifference * 100) / 100;

        const diffTex = pFiff > 0 ? "plus" : "moins";
        return `Votre prix est  ${Math.abs(pFiff)}%  ${diffTex} que le prix du deal.`;

    },
    estAuthorise() {
     if(!this.offeredPrice){ return false;}
      return this.percentageDifference <= this.ALLOWED_PRICE_DIFFERENCE && this.percentageDifference >= -this.ALLOWED_PRICE_DIFFERENCE;
    },
    priceClass (){
      return this.estAuthorise ? "allowed" : "declined";
    },
    colorClass (){
      return this.estAuthorise ? "is-success" : "is-danger";
    },
    user(){
      return this.$store.state.user.data;
    },
    hasNotEnoughCredit(){
      if(!this.selectedPrice){ return false;}
      return this.user.credit < this.selectedPrice;
    },
  },
  data () {
    return {
      title: "Deal",
      selectedPrice: 0,
      isPriceSelected: false,
      selectedDeal: null,
      ALLOWED_PRICE_DIFFERENCE: 20,
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
    },

  },
  methods: {
    createOpportunity({onSuccess}) {
      const data = {
        title: this.deal.title,
        fromUserId: this.user.id,
        toUserId: this.deal.user.id,
        fromDealId: this.selectedDeal?.id,
        toDealId: this.deal.id,
        price: this.selectedPrice
      };


      this.$store.dispatch("opportunity/createOpportunity", {
        data,
        onSuccess
      })
    }
  },
  watch: {
    isPriceSelected(newValue) {
      if (newValue) {
        this.selectedDeal = null;
      }else {
        this.selectedPrice = 0;
      }
    },
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