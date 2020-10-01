import { mount, createLocalVue, shallowMount } from '@vue/test-utils';
import store from '@/store';
import Joke from '@/views/Joke.vue';
import VueRouter from 'vue-router';
import { routes } from '@/router/routes';
import { MOOD } from '@/utils/constants';

const localVue = createLocalVue();
localVue.use(store);
localVue.use(VueRouter);

jest.mock('@/services/ApiService', () => ({
  getJoke: () => Promise.resolve({ data: 'joke' }),
}));
jest.setTimeout(20000);

describe('Joke.vue', () => {
  it('always start with sad mood', () => {
    store.commit('SET_MOOD', MOOD.HAPPY);
    mount(Joke, {
      localVue,
      store,
    });

    const mood = MOOD.SAD;

    expect(store.getters.getMood).toMatch(mood);
  });

  // it('generate a joke!', async (done) => {
  //   const wrapper = mount(Joke, {
  //     localVue,
  //     store,
  //   });

  //   await flushPromises();
  //   setTimeout(() => {
  //     expect(wrapper.find('.joke').text()).toBe('joke');
  //     done();
  //   }, 9000);
  // });

  it('temp', async (done) => {
    const router = new VueRouter({ routes, mode: 'abstract' });
    const wrapper = shallowMount(Joke, {
      localVue,
      store,
      router,
    });

    // router.push('/pokerface')
    wrapper.vm.$nextTick(() => {
      expect(store.getters.getHumor).toMatch(MOOD.HAPPY);
      done();
    });
  });

  it('change to pokerface view after the joke is told (9 sec) and mood improved', async (done) => {
    const router = new VueRouter({ routes, mode: 'abstract' });
    const wrapper = shallowMount(Joke, {
      localVue,
      store,
      router,
    });

    // router.push('/pokerface')
    wrapper.vm.$nextTick(() => {
      expect(router.currentRoute.name).toMatch('pokerface');
      done();
    });
  });
});
