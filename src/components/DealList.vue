<template>

  <section class="posts">
    <div class="container">
      <div class="posts-type">Derniers Posts</div>

      <div class="columns is-multiline">
        <div class="column is-12-mobile is-6-tablet is-4-widescreen is-6-desktop " v-for="(deal,index) in deals" :key="index">
          <div class="item post-card bottom-border">
            <router-link class="item-link" v-bind:to="{ name: 'DealDetail' , params: { slug : deal.slug } } ">
              <figure class="image is-2by1 item-figure background-img" :style="{ 'background-image': 'url('+ deal.image +')' }" alt="">
              </figure>
              <div class="item-featured">
                <div class="deal-icon">
                  <font-awesome-icon :icon="['fas', 'star']" />
                </div>
              </div>
            </router-link>
            <div class="item-tags">
              <div class="button is-rounded" :title="tag" v-for="(tag,index) in deal.tags" :key="index">#{{ tag }}</div>
            </div>
            <h2 class="title item-title is-size-4 has-text-weight-extra-bold"><router-link  v-bind:to="{ name: 'DealDetail' , params: { slug : deal.slug } }" class="item-link" >{{deal.title}}</router-link></h2>
            <div class="level">
              <div class="level-left">
                <div class="item-author">{{deal.type}}</div>
              </div>
              <div class="level-right" v-if="deal.createdAt">
                {{ deal.createdAt?.toDate().toLocaleDateString("fr-FR",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>

</template>

<script>
export default {
  name: "DealList",
  props:{
    deals:{
      type:Array,
      required:true
    }
  },
}
</script>

<style scoped lang="scss">

.posts {
  padding-top: 70px;
}
.posts-type {
  font-size: 34px;
  margin-bottom: 10px;
  font-weight: bold;
}

.deal-icon{
  color: #FFD700;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image{

  transition: box-shadow .4s;
}
.image:hover{
  box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.5);
}


</style>