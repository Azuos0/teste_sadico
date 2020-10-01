<template>
  <div @click="nextPage" class="emoticon-container">
    <h1 class="title">Bem-vindo ao Teste Sádico!</h1>
    <Emoticon />
    <span class="subtitle">
      Este carinha acima é o Zezinho! E hoje, aparentemente, ele não está em um
      dia legal...
    </span>
  </div>
</template>

<script>
import Emoticon from '../components/Emoticon.vue';
import { MOOD } from '@/utils/constants';

export default {
  components: {
    Emoticon,
  },
  metaInfo() {
    return {
      title: 'Teste Sádico - Poker Face',
    };
  },
  mounted() {
    if (this.$store.getters.getMood !== MOOD.POKER_FACE)
      this.$store.commit('SET_MOOD', MOOD.POKER_FACE);
  },
  methods: {
    nextPage() {
      this.$router.push('sad');
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 50px;
}

.subtitle {
  font-size: 24px;
}
</style>
