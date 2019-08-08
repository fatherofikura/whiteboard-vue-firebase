import Vue from 'vue';
import Vuex from 'vuex';

import member from './modules/member';
import status from './modules/status';
import group from './modules/group';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    member : member,
    status : status,
    group : group
  }
});
