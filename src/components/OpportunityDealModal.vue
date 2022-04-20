<template>
  <Modal :modal-title="title" ref="modal" v-if="opportunity.status === 'En attente'">
    <div>
      <h2>{{ opportunity.fromUser.username}} a une offre incroyable pour vous !</h2>
      <template v-if="opportunity.fromDeal">
        <div
            class="card-image">
          <figure class="image is-4by3">

            <img :src="opportunity.fromDeal.image"/>
          </figure>
        </div>
        <div class="info-container">
          <div class="info-heading">
            <p class="app-title">{{opportunity.fromDeal.title}}</p>
            <p class="description">{{opportunity.fromDeal.description}}</p>
          </div>
          <div class="info-value">
            <div class="info-value-title">Price:</div>
            <div class="info-value-money">${{opportunity.fromDeal.price}}</div>
          </div>
        </div>
      </template>
      <template v-if="opportunity.price">
        <div class="info-container">
          <div class="info-heading">
            <p class="app-title">{{opportunity.fromUser.username}} veut échanger le prix de</p>
          </div>
          <div class="info-value">
            <div class="info-value-title">Prix:</div>
            <div class="info-value-money">{{opportunity.price}}&euro;</div>
          </div>
        </div>
      </template>
      <hr>
      <h1 class="has-text-centered is-success  ">	&#8693;</h1>
      <div class="card-image">
        <figure class="image is-4by3">
          <!-- TODO: Display Exchange Image -->
          <img :src="opportunity.toDeal.image"/>
        </figure>
      </div>
      <div class="info-container">
        <div class="info-heading">
          <p class="app-title">{{opportunity.toDeal.title}}</p>
          <p class="description">{{opportunity.toDeal.description}}</p>
        </div>
        <div class="info-value">
          <div class="info-value-title">Prix:</div>
          <div class="info-value-money">{{opportunity.toDeal.price}}&euro;</div>
        </div>
      </div>
    </div>
    <template #activatorBtn>
      <button class="button is-block is-success is-light ">Voir le deal</button>
    </template>

    <template #footerButtons>
      <button
          @click="acceptOpportunity"
          class="button is-success">
        Accepter
      </button>
      <button
          @click="declineOpportunity"
          class="button is-danger">
        Refuser
      </button>
    </template>
  </Modal>
  <OpportunityResultModal v-else :opportunity="opportunity"></OpportunityResultModal>
</template>

<script>
import Modal from "@/components/Modal";
import OpportunityResultModal from "@/components/OpportunityResultModal";
export default {
  computed:{
    modal() {
      return this.$refs.modal
    },
    title(){
      return this.opportunity.fromDeal ? `Offre de ${this.opportunity.fromDeal.type}` : `Offre de crédits `
    }
  },
  components: {
    Modal,
    OpportunityResultModal
  },
  props: {
    opportunity: {
      required: true,
      type: Object
    }
  },
  methods: {
    acceptOpportunity() {

      this.$store.dispatch("opportunity/acceptOpportunity", {
        opportunity: this.opportunity,
        onSuccess: () => {
          this.modal.close();
        }
      });

    },
    declineOpportunity() {

      this.$store.dispatch("opportunity/declineOpportunity", {
        opportunity: this.opportunity,
        onSuccess: () => {
          this.modal.close();
        }
      });
    },
  }
}
</script>
<style scoped lang="scss">
.info-container {
  display: flex;
  margin: 20px 0;
  .info-heading {
    flex: 1;
    font-size: 20px;
    padding-right: 30px;
    .app-title {
      font-weight: bold;
      font-size: 30px
    }
  }
  .info-value {
    &-title {
      font-size: 20px;
      text-align: center;
    }
    &-money {
      font-size: 45px;
      font-weight: bold;
    }
  }
}
</style>