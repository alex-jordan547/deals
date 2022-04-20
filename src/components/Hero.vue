<template>
  <div class="hero-section">
    <section class="hero background-img is-large" :style="{ 'background-image': 'url(https://images.pexels.com/photos/7937717/pexels-photo-7937717.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)' }">
      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-size-1 has-text-white">
            Négocions !
          </h1>
          <h2 class="subtitle has-text-light">
            Produits et services que nous pouvons échanger
          </h2>
        </div>
      </div>
    </section>
    <div class="search-lookup-wrap">
      <div class="search-lookup centered">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <span>Recherche :</span>
            </div>
            <div class="level-item">
              <input
                  type="text"
                  class="input"
                  @input="search"
                  placeholder="Fifa 22">
            </div>
            <div class="level-item">
              <span v-if="searchValue">Recherche "{{searchValue}}"</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DealHero",
  data(){
    return {
      searchValue:""
    }
  },
  props:{
    onSearch:{
      type:Function,
      required:true
    }
  },
  methods:{
    search(e){
        const { value } = e.target;
       this.searchValue = value
      this.onSearch(value)
    }
  }
}
</script>

<style scoped lang="scss">
.hero-section {
  position: relative;
}


.search-lookup {
  width: 960px;
  margin: 0 auto;
  background-color: #262d32;
  padding: 20px;
  color: white;
  border-radius: 10px;
}
.search-lookup-wrap {
  width: 100%;
  z-index: 2;
  position: absolute;
  top: auto;
  bottom: -42px;
}

@media only screen and (max-width: 769px) {
  .search-lookup-wrap {
    position: inherit;
    bottom: unset;
  }
  .search-lookup {
    width: 100%;
    border-radius: 0px;
  }
}

.search-card-find {
  width: 100%;
  height: 180px;
  position: relative;
  display: block;
  border-radius: 3px;
  text-decoration: none;
  box-shadow: 0 0 1px rgba(0,0,0,.05);
  background-clip: content-box;
  background-size: cover;
  background-position: 50% 20%;
  border: 1px solid rgba(0,0,0,.12);
  -webkit-tap-highlight-color: transparent;
  &-interest {
    position: absolute;
    bottom: 12px;
    right: 12px;
    > p {
      font-weight: bold;
    }
  }
  .title {
    color: white;
  }
  .subtitle {
    color: white;
  }
  &-content {
    &-date {
      margin: 10px;
      width: 70px;
      text-align: center;
      border-radius: 50%;
      .day {
        display: block;
        font-size: 21px;
        color: white;
        font-weight: bold;
      }
      .month {
        display: block;
        color: #ff5050;
        font-weight: bold;
        font-size: 23px;
        margin-bottom: -5px;
      }
    }
    &-info {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 15px;
      width: 100%;
    }
  }
}
</style>