<template>
  <Modal
      :modal-title="'Résultats du deal'">
    <div v-if="opportunity">
      <div class="label">Offre à partir de :
        <span>
          <router-link v-if="opportunity.fromDeal" class="link"  :to="{ name: 'DealDetail' , params: { slug : opportunity.fromDeal.slug } } ">
                              {{opportunity.fromDeal.title}}
          </router-link>

          <span v-else>
            {{opportunity.price}} &euro;
          </span>
        </span>
      </div>
      <div class="label">Contre :
        <router-link v-if="opportunity.fromDeal" class="link"  :to="{ name: 'DealDetail' , params: { slug : opportunity.toDeal.slug } } ">
          {{opportunity.toDeal.title}}
        </router-link>
      </div>
    </div>
    <hr>
    <div>
      <h1 v-if="opportunity.status === 'accepté'">Vous avez accepté de traiter avec {{opportunity.fromUser.username}}</h1>
      <h1  v-if="opportunity.status === 'refusé'">Vous avez refusé de traiter avec {{opportunity.fromUser.username}}</h1>
      <div class="catcher">Appelez {{opportunity.fromUser.username}} au téléphone: <span class="phone-number">+ 33 {{opportunity.fromUser.phone}}</span></div>
    </div>
    <template #activatorBtn>
      <button class="button is-block is-primary is-light is-fullwidth">Détails</button>
    </template>
    <template #footerButtons>
      <button
          class="button is-success">Appeler "{{opportunity.fromUser.username}}" &phone;
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'
export default {
  components: {
    Modal
  },
  props: {
    opportunity: {
      type: Object
    }
  }
}
</script>
<style scoped lang="scss">
.link {
  font-weight: 500;
  color: rgb(79, 79, 172);
  font-size: 18px;
  text-decoration: underline;
}
.label {
  font-size: 22px;
  margin:0;
  span {
    font-weight: 400;
    font-size: 18px;
  }
}
.catcher {
  font-size: 23px;
}
.phone-number {
  font-size: 27px;
  font-weight: bold;
}
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