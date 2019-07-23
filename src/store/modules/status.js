import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/database';

const namespaced = true;

const state = {
  status: {}
};

const mutations = {
  'SELECT_STATUS'(state, info) {
    const rootList = info.val();
    let list = [];
    Object.keys(rootList).forEach((val, key) => {
      rootList[val].id = val;
      list.push(rootList[val]);
    })
    state.status = list;
  }
};

const actions = {
  selectStatus({ commit }) {
    firebase.database().ref('/status').on('value', function(snapshot) {
      commit('SELECT_STATUS', snapshot);
    });
  }
};

const getters = {
  currentStatus: state => {
    return state.status;
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
