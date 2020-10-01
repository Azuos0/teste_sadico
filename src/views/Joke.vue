<template>
  <div>
    <BaseModal ref="baseModal" :useFooter="false">
      <template v-slot:body>
        <h1 class="joke">{{ joke }}</h1>
        <Emoticon />
      </template>
    </BaseModal>
  </div>
</template>

<script>
import ApiService from '@/services/ApiService';

//Components
import BaseModal from '@/components/BaseModal.vue';
import Emoticon from '@/components/Emoticon.vue';

//constants
import { MOOD } from '@/utils/constants';

export default {
  components: {
    BaseModal,
    Emoticon,
  },
  metaInfo() {
    return {
      title: "Teste Sádico - Joke's Time",
    };
  },
  data() {
    return {
      joke: '',
    };
  },
  mounted() {
    //verifica se o humor é diferente de sad (☹️)
    //e caso seja atribui o valor ☹️ ao mood
    if (this.$store.getters.Mood !== MOOD.SAD)
      this.$store.commit('SET_MOOD', MOOD.SAD);

    //faz uma chamada à api para gerar uma piada, abre o modal 
    //e começa a animação de escutar a piada
    ApiService.getJoke()
      .then((response) => {
        this.joke = response.joke;
        this.openModal();
        this.listenJoke();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    listenJoke() {
      setTimeout(() => {
        //espera 2000 ms e muda o estado para sad
        this.changeMood(MOOD.LESS_SAD);
        setTimeout(() => {
          //espera 2000 ms e muda o estado para almost poker face
          this.changeMood(MOOD.ALMOST_POKER_FACE);
          setTimeout(() => {
            //espera 2000 ms e muda o estado para poker face
            this.changeMood(MOOD.POKER_FACE);
            setTimeout(() => {
              //espera 2000 ms e muda o estado para happy
              this.changeMood(MOOD.HAPPY);
              setTimeout(() => {
                //espera 2000 ms e reinicia o ciclo da aplicação
                this.closeModal();
              }, 2000);
            }, 2000);
          }, 2000);
        }, 2000);
      }, 2000);
    },
    changeMood(newMood) {
      this.$store.commit('SET_MOOD', newMood);
    },
    openModal() {
      this.$refs.baseModal.openModal();
    },
    closeModal() {
      this.$refs.baseModal.closeModal();
      this.$router.push({ name: 'pokerface' });
    },
  },
};
</script>
