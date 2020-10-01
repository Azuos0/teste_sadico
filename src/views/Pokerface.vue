<template>
  <div @click="nextPage" class="emoticon-container">
    <h1 class="title">Bem-vindo ao Teste Sádico!</h1>
    <Emoticon />
    <span class="subtitle">
      Essa acima é a SPA! E hoje é só mais um dia normal na vida dela...
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
    //seta o título da página
    return {
      title: 'Teste Sádico - Poker Face',
    };
  },
  mounted() {
    //verifica se o humor é diferente de poker_face (😐) 
    //e caso seja atribui o valor 😐 ao mood
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
