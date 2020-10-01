import { mount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import Emoticon from '@/components/Emoticon.vue';

const localVue = createLocalVue();
localVue.use(store);

describe('Emoticon.vue', () => {
  it('renders an emoticon from the vuex store', () => {
    const wrapper = mount(Emoticon, {
      localVue,
      store
    });
    
    const mood = store.getters.getMood;
    expect(wrapper.text()).toMatch(mood);
  });
});
