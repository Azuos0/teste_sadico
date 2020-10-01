import Vue from 'vue';
import Vuex from 'vuex';
import { MOOD } from '@/utils/constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mood: MOOD.SAD, //humor da spa
  },
  mutations: {
    //Seta um novo humor a spa
    SET_MOOD(state, newMood) {
      state.mood = newMood;
    },
  },
  getters: {
    //retorna o humor da spa
    getMood(state) {
      return state.mood;
    },
  },
});
