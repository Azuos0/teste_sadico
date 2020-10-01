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
    if (this.$store.getters.Mood !== MOOD.SAD)
      this.$store.commit('SET_MOOD', MOOD.SAD);

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
        //await 2000 ms and change state to less sad
        this.changeMood(MOOD.LESS_SAD);
        setTimeout(() => {
          //await 2000 ms and change state to almost poker face
          this.changeMood(MOOD.ALMOST_POKER_FACE);
          setTimeout(() => {
            //await 2000 ms and change state to poker face
            this.changeMood(MOOD.POKER_FACE);
            setTimeout(() => {
              //await 2000 ms and change state to happy
              this.changeMood(MOOD.HAPPY);
              setTimeout(() => {
                //await 2000 ms and restart to first page
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
