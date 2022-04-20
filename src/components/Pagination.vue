<template>
  <nav class="pagination is-rounded  is-centered" role="navigation" aria-label="pagination">
    <ul class="pagination-list">
      <li>
        <button
            @click="() => onNextPage({page: 'previous'})"
            :disabled="isFetching"
            type="button"
            class="pagination-previous has-text-weight-bold">Précedent</button>
      </li>
      <li>
        <button
            type="button"
            class="pagination-link button has-text-weight-bold is-primary" >Page {{ page }}</button>
      </li>
      <li>
        <button
            @click="() => onNextPage({page: 'next'})"
            :disabled="isFetching"
            type="button"
            class="pagination-next has-text-weight-bold" >Suivant</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "DealPagination",
  props:{
  onNextPage:{
      required:true,
      type:Function
    },
    isFetching:{
    default:false,
      type:Boolean
    },
    page:{
     type:Number,
      default: 1
    }
}
}
</script>

<style scoped>

</style>