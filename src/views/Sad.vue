<template>
  <div @click="nextPage" class="emoticon-container">
    <Emoticon />
  </div>
</template>

<script>
import Emoticon from '@/components/Emoticon.vue';
import { MOOD } from '@/utils/constants';

export default {
  components: {
    Emoticon,
  },
  metaInfo() {
    return {
      title: "Teste Sádico - Sad Face",
    };
  },
  mounted() {
    if (this.$store.getters.getMood !== MOOD.SAD)
      this.$store.commit('SET_MOOD', MOOD.SAD);
  },
  methods: {
    nextPage() {
      this.$router.push('joke');
    },
  },
};
</script>
