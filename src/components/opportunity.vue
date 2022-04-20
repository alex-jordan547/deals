<template>
 <div class="columns is-mobile is-multiline">
    <template v-if="opportunities && opportunities.length > 0">
      <div
          class="column is-3-tablet is-6-mobile" v-for="opportunity in opportunities" :key="opportunity.id">
        <div class="card" >
          <template v-if="selectedO === 'received'">
            <div class="card-image" v-if="opportunity.fromDeal">
              <figure class="image is-4by3">
                <img :src="opportunity.fromDeal.image"/>
              </figure>
            </div>
            <div class="card-image" v-else>
              <figure class="image is-4by3">
                <img src="https://images.unsplash.com/photo-1583574928108-53be39420a8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=50"/>
              </figure>
            </div>
          </template>

          <template v-if="selectedO === 'sent'">
            <div class="card-image" v-if="opportunity.toDeal">
              <figure class="image is-4by3">
                <img :src="opportunity.toDeal.image"/>
              </figure>
            </div>
          </template>

          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-6" v-if="opportunity.fromDeal"><b>Offre:</b> {{ opportunity.fromDeal.title }}</p>

                <p class="title is-6" v-else><b>Requête: </b> {{ opportunity.price }} €</p>
                <p class="subtitle is-6">
                        <span
                            :class="[{'is-success':opportunity.status === 'accepté'},
                            {'is-warning':opportunity.status === 'En attente'},
                            {'is-danger':opportunity.status === 'refusé'}]"
                            class="tag  subtitle">{{ opportunity.status }}</span>
                </p>
              </div>
            </div>
            <div class="content">
              <p v-if="opportunity.fromDeal">
                {{ opportunity.fromDeal.description }}
              </p>
              <p v-else>
                L'utilisateur souhaite échanger votre article par le biais d'un échange d'argent.
              </p>
            </div>
          </div>
          <footer class="card-footer  is-justify-content-center py-3 ">
            <OpportunityDealModal :opportunity="opportunity" ></OpportunityDealModal>
          </footer>
        </div>
        <br/>
      </div>
    </template>
  </div>

</template>

<script>
import OpportunityDealModal from "@/components/OpportunityDealModal";
export default {
  name: "deal-opportunity",
  components: {
    OpportunityDealModal
  },
  props: {
    opportunities: {
      type: Array,
      required: true
    },
    selectedO: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>