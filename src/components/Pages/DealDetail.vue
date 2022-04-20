<template>

<div v-if="deal && deal.slug" >

   <section
  class="hero is-black">
  <div class="hero-body">
    <div class="hero-img"></div>
    <div class="container">
      <div class="columns">
        <div class="column is-9">
          <h1 class="title">
            {{ deal.title }}
          </h1>
          <h2 class="subtitle">
            {{ deal.type }}
          </h2>
          <!--  -->
          <div class="user-tile" v-if="!!dealUser">
            <div class="user-tile-image">
              <figure class="image is-64x64">
                <img class="is-rounded" :src="dealUser.avatar">
              </figure>
            </div>
            <div class="user-tile-author center">
              <h3 class="user-tile-author-name">Par {{ dealUser.username}}</h3>
            </div>
          </div>
          <!--  -->
        </div>
        <div class="column is-3">
          <div class="column-right">
            <div class="card ">
              <div class="card-image">
                <figure class="image is-4by2">
                  <!--  Image -->
                  <img
                      :src="deal.image"
                      alt="Placeholder image"
                  >
                </figure>
              </div>
              <div class="card-content">
                <div class="content m-b-sm">
                  <div class="media-content">
                        <span class="title is-2">{{ deal.price }} €
                        </span>
                  </div>
                </div>
                <button class="button is-fullwidth is-large is-primary is-outlined  " v-if="owner" disabled> Vous êtes le propriétaire </button>
                <ExchangeDealModal :deal="deal" :availableDeals = "userDeals" v-else-if="canCreateDeal"></ExchangeDealModal>
                <router-link to="/login" class="button is-fullwidth is-large is-success is-outlined" v-else>Deal ? Connectez vous</router-link>
                <div class="content">
                  <ul class="m-t-none">
                    <li>
                      Obtenez l'article aujourd'hui
                    </li>
                    <li>
                      En savoir plus
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>
  <!-- HEADER -->
  <div class="container">
    <div class="columns">
      <div class="column is-9">
        <div class="section">
          <div class="more-details">
            <div class="more-details-title">
              Details
            </div>
            <div class="more-details-item">Pays: {{ deal?.country}}</div>
            <div class="more-details-item">Ville: {{deal?.city}}</div>
          </div>
        </div>
        <div class="section product-description p-t-none">
          <div class="product-description-title">Information sur l'offre</div>
          <div class="product-description-details">
            <p>{{ deal?.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  </div>

</template>
<script>
import ExchangeDealModal from "@/components/ExchangeDealModal";
export default {
  created() {

    const { slug } = this.$route.params
    this.$store.dispatch('deal/getDealBySlug', slug)

  },
  components: {
    ExchangeDealModal
  },
  computed: {
    deal() {
      return this.$store.state.deal.item
    },
    dealUser() {
      return this.deal.user
    },
    user() {
      return this.$store.state.user.data
    },
    userDeals() {

      return this.user?.deals || []

    },
    owner() {
      return this.$store.getters['user/isDealOwner'](this.dealUser.id)
    },
    isAuthenticated() {
      return this.$store.getters['user/isAuthenticated']
    },
    canCreateDeal() {
      return !this.owner && this.isAuthenticated
    }
  }
}
</script>

<style scoped lang="scss">
// CARD
.card {
  z-index: 9999;
  min-width: 330px;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 0 1px 1px rgba(20,23,28,.1), 0 3px 1px 0 rgba(20,23,28,.1);
  .title {
    color: gray;
  }
  .subtitle {
    color: gray;
  }
  .product-features {
    font-size: 17px;
  }
  .main-price {
    font-size: 17px;
    color: #7d7d7d;
    text-decoration: line-through;
  }
}
// CARD
// WHOLE HEADER
.hero-body {
  position: relative;
}
.hero-img {
  opacity: 0.8;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  filter: sepia(.1) grayscale(.1) saturate(.8);
}
.column-right {
  position: absolute;
}
@media screen and (max-width: 770px) {
  .column-right {
    position: inherit;
  }
}
.user-avatar {
  display: inline-block;
}
.is-black {
  background-color: black;
  background: linear-gradient(#29303B,#29303B,#29303B);
}
.title {
  font-weight: bold;
  font-size: 45px;
}
.subtitle {
  /*font-weight: bold;*/
  font-size: 25px;
}
.author-name {
  font-size: 20px;
  font-weight: bold;
}
.rate {
  font-size: 29px;
  font-style: italic;
}
// WHOLE HEADER END
.more-details {
  background-color: #f9f9f9;
  border: 1px solid #dedfe0;
  padding: 10px 15px;
  &-title {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &-items {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  &-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 19px;
    width: 45%;
  }
}
.product-description {
  padding-top: 0;
  &-title {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &-details {
    font-size: 18px;
    ul {
      list-style: disc;
      margin-left: 20px;
    }
    ol {
      margin-left: 20px;
    }
    strong {
      font-size: 20px;
    }
    p {
      min-height: 30px;
    }
  }
}
// USERS
.user-tile {
  display: flex;
  &-author {
    align-self: center;
    margin-left: 10px;
    &-name {
      font-size: 17px;
    }
  }
  .date {
    font-size: 14px;
  }
}
</style>