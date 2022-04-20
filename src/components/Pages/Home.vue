<template>

  <!-- HERO START -->
  <DealHero :onSearch="filterDeals"></DealHero>
  <!-- HERO END -->
    <!-- POST LIST START -->
    <DealList :deals="deals" ></DealList>
    <!-- POST LIST END -->

    <!-- PAGINATION START -->
    <DealPagination :onNextPage="getMoreDeals" :isFetching="isFetchingMore" :page="currentPage"></DealPagination>
    <!-- PAGINATION END -->

</template>

<script>
import DealHero from  "@/components/Hero";
import DealList from "@/components/DealList";
import DealPagination from "@/components/Pagination";

export default {
  name:'DealHome',
  components :{
    DealList,
    DealPagination,
    DealHero
  },
  data(){
    return{
    searchDealTitle:""
    }
  },
  computed: {
    deals () {
      //return this.$store.state.deal.items;
      return  this.$store.getters["deal/filterDeals"](this.searchDealTitle)
    },
    isFetchingMore(){
      return this.$store.state.deal.pagination.isFetchingData
    },
    currentPage(){
      return this.$store.getters["deal/currentPage"];
    }
  },
  mounted() {

  },
  created() {

    this.$store.dispatch("deal/getDeals");
  },
  methods:{
   getMoreDeals({ page }){
     this.$store.dispatch("deal/getMoreDeals",{page})
   },
    filterDeals(searchValue){
      this.searchDealTitle = searchValue;
    }
  }


}
</script>

<style lang="scss">

</style>