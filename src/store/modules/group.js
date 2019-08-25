import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/database';

const namespaced = true;

const state = {
  group: {},
  selectedGroupID: 0 // defaultで0のGroupを指定
};

const mutations = {
  'SELECT_GROUP'(state, info) {
    const rootList = info.val();
    let list = [];
    Object.keys(rootList).forEach((val, key) => {
      rootList[val].id = val;
      list.push(rootList[val]);
    })
    state.group = list;
  },
  'CHECK_SELECTED_GROUP'(state, info) {
    // state.selectedGroup = info.selectedGroupName;
    for( var i=0; i<state.group.length; i++ ) {
      if( state.group[i].id == info.selectedGroupID ){
        console.log('[CHECK_SELECTED_GROUP]GroupID : %s ,GroupName :  %s', state.group[i].id, state.group[i].name);
        state.selectedGroupID = i;
        break;
      }
    }
  },
  'UPDATE_SELECTED_GROUP'(state, info) {
    state.selectedGroupID = info.selectedGroupID;
  },
};

const actions = {
  selectGroup({ commit }) {
    firebase.database().ref('/group').on('value', function(snapshot) {
      commit('SELECT_GROUP', snapshot);
    });
  },
  checkSelectedGroup({ commit }, info) {
    commit('CHECK_SELECTED_GROUP', info);
  },
  updateSelectedGroup({ commit }, info) {
    commit('UPDATE_SELECTED_GROUP', info);
  }
};

const getters = {
  currentGroup: state => {
    return state.group;
  },
  currentSelectedGroup: state => {
    return state.selectedGroupID;
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
