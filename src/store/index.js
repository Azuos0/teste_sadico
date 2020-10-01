import Vue from 'vue';
import Vuex from 'vuex';
import { MOOD } from '@/utils/constants';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mood: MOOD.SAD
  },
  mutations: {
    SET_MOOD(state, newMood){
      state.mood = newMood;
    }
  },
  getters:{
    getMood(state) {
      return state.mood;
    },
  }
})
