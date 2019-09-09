import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/database';

const namespaced = true;

const state = {
  user: {}
};

const mutations = {
  'SELECT_USER'(state, info) {
    state.user = info.val();
  },
  'UPDATE_USER_WITH_GROUP'(state, info) {
    console.log(info);
  },
};

const actions = {
  selectUser({ commit }, info) {
    firebase.database().ref('/user/' + info.uid).once('value', function(snapshot) {
      commit('SELECT_USER', snapshot);
    });
  },
  updateUserWithGroup({ commit }, info) {
    var callfunction = firebase.functions().httpsCallable('updateUserWithGroup');
    var postdata = {
      uid : info.uid,
      group : info.group
    };
    callfunction(postdata).then(function(result) {
      // Read result of the Cloud Function.
      commit('UPDATE_USER_WITH_GROUP', postdata);
    }).catch(function(error) {
      // Getting the Error details.
      var code = error.code;
      var message = error.message;
      var details = error.details;
      console.error('There was an error when calling the Cloud Function', error);
      window.alert('There was an error when calling the Cloud Function:\n\nError Code: '
      + code + '\nError Message:' + message + '\nError Details:' + details);
    });
  },
  updateUserWithSortedList({ commit }, info) {
    var callfunction = firebase.functions().httpsCallable('updateUserWithSortedList');
    var postdata = {
      uid : info.uid,
      group : info.group,
      sortedList : info.sortedList
    };
    callfunction(postdata).then(function(result) {
      // Read result of the Cloud Function.
      commit('UPDATE_USER_WITH_SORTED_LIST', postdata);
    }).catch(function(error) {
      // Getting the Error details.
      var code = error.code;
      var message = error.message;
      var details = error.details;
      console.error('There was an error when calling the Cloud Function', error);
      window.alert('There was an error when calling the Cloud Function:\n\nError Code: '
      + code + '\nError Message:' + message + '\nError Details:' + details);
    });
  }
};

const getters = {
  currentUser: state => {
    return state.user;
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
