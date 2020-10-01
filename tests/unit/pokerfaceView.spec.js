import { mount, createLocalVue, shallowMount } from '@vue/test-utils';
import store from '@/store';
import Pokerface from '@/views/Pokerface.vue';
import VueRouter from 'vue-router';
import { routes } from '@/router/routes';
import { MOOD } from '@/utils/constants';

const localVue = createLocalVue();
localVue.use(store);
localVue.use(VueRouter);

describe('Pokerface.vue', () => {
  it('always set mood to pokerface', () => {
    mount(Pokerface, {
      localVue,
      store,
    });

    const mood = MOOD.POKER_FACE;

    expect(store.getters.getMood).toMatch(mood);
  });

  it('change to sad view when div is clicked', async () => {
    const router = new VueRouter({ routes, mode: 'abstract' });
    const wrapper = shallowMount(Pokerface, {
      localVue,
      store,
      router,
    });

    await wrapper.find('.emoticon-container').trigger('click');
    await wrapper.vm.$nextTick();

    expect(router.currentRoute.name).toMatch('sad');
  });
});
