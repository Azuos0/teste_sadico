import { mount, createLocalVue, shallowMount } from '@vue/test-utils';
import store from '@/store';
import Sad from '@/views/Sad.vue';
import VueRouter from 'vue-router';
import { routes } from '@/router/routes';
import { MOOD } from '@/utils/constants';

const localVue = createLocalVue();
localVue.use(store);
localVue.use(VueRouter);

describe('Sad.vue', () => {
  it('always set mood to sad', () => {
    store.commit("SET_MOOD", MOOD.HAPPY);
    
    mount(Sad, {
      localVue,
      store,
    });

    const mood = MOOD.SAD;

    expect(store.getters.getMood).toMatch(mood);
  });

  it('change to joke view when div is clicked', async () => {
    const router = new VueRouter({ routes, mode: 'abstract' });
    const wrapper = shallowMount(Sad, {
      localVue,
      store,
      router,
    });

    await wrapper.find('.emoticon-container').trigger('click');
    await wrapper.vm.$nextTick();

    expect(router.currentRoute.name).toMatch('joke');
  });
});
