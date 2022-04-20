<template>
  <h1 class="has-text-centered py-5">Foire aux Questions</h1>
  <div  v-cloak class="faqs__container">
    <div class="faq__block" v-for="faq in this.faqs" @click="toggleBlock(faq)"
         v-bind:class="{'faq__block_opened' : faq.showAnswer}" :key="faq">
      <div class="faq__spoiler"
           v-bind:class="{'faq__spoiler_closed' : !faq.showAnswer, 'faq__spoiler_opened' : faq.showAnswer}">
        <div class="faq__question">{{ faq.q }}</div>
        <div class="faq__button faq__button_closed" v-bind:class="{faq__button_opened : faq.showAnswer }">
          <svg viewbox="0 0 30 30">
            <linearGradient id="linear-gradient">
              <stop offset="0%" stop-color="#EECDAA"/>
              <stop offset="100%" stop-color="#E4B37D"/>
            </linearGradient>
            <circle r="14" cx="15" cy="15" fill="url(#linear-gradient)" stroke="#E4B37D"></circle>
            <path stroke="rgba(255, 255, 255, 0.4)" stroke-width="3" stroke-linecap="round" fill="none"
                  stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div style="white-space:pre-line;" class="faq__answer" v-bind:class="{'faq__answer_show' : faq.showAnswer}" >{{ faq.a }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DealFaq",
  data() {
    return {
      faqs: [
        {
          q: "Comment modifier mon profil ?",
          a: "Direction votre espace client :\n" +
              "\n" +
              "- Connectez vous à votre compte en haut à droite de l’écran dans l’onglet “Mon Compte”\n" +
              "- Dans votre espace client, sélectionnez l'onglet “Mette à jour vos infos”\n" +
              "- Vous n’avez plus qu’à modifier vos informations.\n" +
              "- cliquez sur “Sauvegarder“ pour valider vos modifications.",
          showAnswer: false
        },
        {
          q: "Comment Ajouter un nouveau produit ou service?",
          a: "Il vous suffit d'aller sur l'onglet “Nouveau deal” \n"+
              "Ensuite vous pourrez ajouter les informations relative à votre produit ou service.\n" +
              "Vous pouvez aussi ajouter des photos à votre deal.\n" +
              "En fin cliquez sur “Envoyer pour soumettre votre deal aux administrateurs.”\n",

          showAnswer: false
        },
        {
          q: "Comment ajouter des credits ou encore en retirer?",
          a: "La fonctionnalité arrive bientôt. Une fois celle-ci prête,\n" +
              "Vous pouvez ajouter des credits à votre compte en cliquant sur “Ajouter des credits”\n" +
              "Vous pouvez aussi retirer des credits à votre compte en cliquant sur “Retirer des credits”\n",
          showAnswer: false
        },
      ]
    }
  },
  methods: {
    toggleBlock: function (faq) {
      if (faq.showAnswer === true) {
        this.faqs.forEach(f => f.showAnswer = false);
      } else {
        this.faqs.forEach(f => f.showAnswer = false);
        faq.showAnswer = true;
      }
    },
  }
}
</script>

<style scoped>


.faqs__container {
  text-align: left;
  width: 800px;
  font-size: 16px;
  font-family: 'Montserrat',Arial,sans-serif;
  line-height: 1.55;
  margin: 0 auto;
}

.faq__block {
  user-select: none;
  cursor: pointer;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  width: 100%;
  margin-bottom: 20px;

  transition: max-height 0.5s ease-out;
  max-height: 68px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.1);
}

.faq__block_opened {
  max-height: 500px;
  padding: 20px;
  /*   transition: max-height 0.5s ease-out; */
}

.faq__spoiler {
  display: flex;
  justify-items: center;
}

.faq__question {
  align-self: center;
  width: 100%;
  font-weight: bold;
  margin: auto;
}

.faq__button {
  width: 30px;
  height: 30px;
}

.faq__button_closed path {
  d: path("M 10,14  l 5,4  l 5,-4");
  transition: d 0.5s;
}

.faq__button_opened path {
  d: path("M 10,16  l 5,-4  l 5,4");
  transition: d 0.5s;
}

.faq__answer {
  margin-top: 10px;
  transition: opacity 0.5s;
  opacity: 0;
}

.faq__answer_show {
  opacity: 1;
}

.hidden {
  display: none;
}

[v-cloak] {
  display: none;
}

@media only screen and (max-width: 1000px) {
  .faqs__container {
    width: 95%;
    font-size: 13px;
  }
}
</style>