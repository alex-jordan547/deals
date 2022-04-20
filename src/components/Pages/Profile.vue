<template>
  <div class="page-wrapper">
    <div class="columns">
      <div class="container profile">
        <div class="section profile-heading">
          <div class="columns is-mobile is-multiline">
            <div class="column is-2">
              <figure class="image   header-icon user-profile-image">
                <img
                    class="is-rounded"
                    :src="user?.avatar"/>
              </figure>
            </div>
            <div class="column is-4-tablet is-10-mobile name">
              <div class="user-info">
                <p>
                  <span class="title is-bold">{{ user?.username }}</span>
                  <br/>
                </p>
                <p class="tagline">
                  {{ user?.info }}
                </p>
              </div>
             <profile-modal :user="user"></profile-modal>
            </div>
            <div
                @click="selectedOpportunity = 'received'"
                class="stats-tab stats-tab-interactive column is-2-tablet is-4-mobile has-text-centered" :class="{'is-active': selectedOpportunity === 'received'}">
              <p class="stat-val">Recu(s)</p>
              <p class="stat-key">{{ opportunities.length }} Opportunités</p>
            </div>
            <div
                @click="selectedOpportunity = 'sent'"
                class="stats-tab stats-tab-interactive column is-2-tablet is-4-mobile has-text-centered" :class="{'is-active': selectedOpportunity === 'sent'}">
              <p class="stat-val"> Envoyé(s)</p>
              <p class="stat-key">{{ SentOpportunities.length }} Opportunités </p>
            </div>
            <div class="stats-tab column is-2-tablet is-4-mobile has-text-centered">
              <p class="stat-val">{{ user?.credit}}</p>
              <p class="stat-key">Credits</p>
            </div>
          </div>
        </div>
          <opportunity :opportunities="opportunities"  v-if=" selectedOpportunity === 'received' " :selectedO="selectedOpportunity"  ></opportunity>
          <opportunity :opportunities="SentOpportunities" v-if="selectedOpportunity === 'sent'"  :selectedO="selectedOpportunity"></opportunity>
      </div>
    </div>
  </div>
</template>

<script>
import useAuth from "@/composition/useAuth";
import profileModal from "@/components/Pages/ProfileModal";
import opportunity from "@/components/opportunity";


export default {
  name: 'Deal-Profile',
  components: {
    profileModal,
    opportunity,

  },
  data() {
    return {
     selectedOpportunity: "received",
    }
  },
  setup() {
    return useAuth();
 }
,
created() {
      this.$store.dispatch("opportunity/getOpportunities"),
      this.$store.dispatch("opportunity/getSentOpportunities")
},
computed: {
  opportunities() {
    return  this.$store.state.opportunity.opportunities;
  },
  SentOpportunities() {

    return  this.$store.state.opportunity.sentOpportunities;
  },
},
  watch:{
    isAuthenticated(val){
      if(!val){
       // this.$store. dispatch("toast/error","Veuillez vous authentifier pour accéder à votre profil!",{root:true})
        this.$router.push("/login");

      }
    }
  }
}
</script>

<style scoped>
.link {
  font-weight: 500;
  color: rgb(79, 79, 172);
  text-decoration: underline;
}
.user-info {
  margin-bottom: 10px;
}
.stats-error {
  font-size: 40px;
  font-weight: bold;
  margin-top: 30px;
}
.delete-item {
  color: red;
}
.stats-tab {
  border-bottom: 2px solid transparent;
  transition: 0.5s;
}
.stats-tab:hover {
  cursor: pointer;
  border-bottom: 2px solid black;
}
.stats-tab.is-active {
  border-bottom: 2px solid black;
}
.stat-val {
  font-size: 2em;
  padding-top: 20px;
  font-weight: bold;
}
.stat-key {
  font-size: 1.4em;
  font-weight: 200
}
.section.profile-heading .column.is-2-tablet.has-text-centered + .has-text-centered {
  border-left: 1px dotted rgba(0, 0, 0, .2);
}
.container.profile {
  margin-top: 1%;
}
.control.is-pulled-left span.select {
  margin-right: 5px;
  border-radius: 2px;
}
.modal-card .content h1 {
  padding: 40px 10px 10px;
  border-bottom: 1px solid #dadada
}
.container.profile .profile-options .tabs ul li.link a {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #F1F1F1;
}
.card-footer {
  justify-content: center;
  padding: 5px;
}

.trans{
  transition: all .5s ease-in-out;
}
</style>