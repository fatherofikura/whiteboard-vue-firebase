import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/database';

const namespaced = true;

const state = {
  destination: {},
};

const mutations = {
  'SELECT_DESTINATION'(state, info) {
    const rootList = info.val();
    let list = [];
    Object.keys(rootList).forEach((val, key) => {
      rootList[val].id = val;
      list.push(rootList[val]);
    })
    state.destination = list;
  }
};

const actions = {
  selectDestination({ commit }) {
    firebase.database().ref('/destination').on('value', function(snapshot) {
      commit('SELECT_DESTINATION', snapshot);
    });
  },
  selectDestinationWithGroup({ commit }, info) {
    firebase.database().ref('/destination/' + info.groupID).on('value', function(snapshot) {
      commit('SELECT_DESTINATION', snapshot);
    });
  }
};

const getters = {
  currentDestination: state => {
    return state.destination;
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
