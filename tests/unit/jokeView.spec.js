import { mount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import Joke from '@/views/Joke.vue';
import VueRouter from 'vue-router';
import { MOOD } from '@/utils/constants';

const localVue = createLocalVue();
localVue.use(store);
localVue.use(VueRouter);

jest.mock('@/services/ApiService', () => ({
  getJoke: () => Promise.resolve({ data: 'joke' }),
}));

describe('Joke.vue', () => {
  it('always start with a sad mood', () => {
    store.commit('SET_MOOD', MOOD.HAPPY);
    mount(Joke, {
      localVue,
      store,
    });

    const mood = MOOD.SAD;

    expect(store.getters.getMood).toMatch(mood);
  });
});
