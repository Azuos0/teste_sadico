import { MOOD } from '@/utils/constants';

const mutations = {
  SET_MOOD: (state, newMood) => {
    state.mood = newMood;
  },
};

const getters = {
  getMood: (state) => {
    return state.mood;
  },
};

describe('Vuex store', () => {
  it('adds a new mood to the current state', () => {
    const state = { mood: MOOD.SAD};
    
    const mood = MOOD.HAPPY;
    mutations.SET_MOOD(state, mood);

    expect(state.mood).toEqual(mood);
  });

  it('gets the current mood from the state', () => {
    const state = { mood: MOOD.LESS_SAD};
    
    const mood = getters.getMood(state);

    expect(mood).toEqual(MOOD.LESS_SAD);
  });
});
