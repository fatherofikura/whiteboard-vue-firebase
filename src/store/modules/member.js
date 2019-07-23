import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/database';

const namespaced = true;

const state = {
  member: {}
};

const mutations = {
  'SELECT_MEMBER'(state, info) {
    const rootList = info.val();
    let list = [];
    Object.keys(rootList).forEach((val, key) => {
      rootList[val].id = val;
      list.push(rootList[val]);
    })
    state.member = list;
  },
  'INSERT_MEMBER'(state, info) {
    console.log(info);
  },
  'UPDATE_MEMBER'(state, info) {
    console.log(info);
  },
  'DELETE_MEMBER'(state, info) {
    console.log(info);
  }
};

const actions = {
  selectMember({ commit }) {
    firebase.database().ref('/member').on('value', function(snapshot) {
      commit('SELECT_MEMBER', snapshot);
    });
  },
  insertMember({ commit }, info) {
    var callfunction = firebase.functions().httpsCallable('insertMember');
    var postdata = {
      name : info.memberName,
      phoneNumber : info.memberPhoneNumber,
      position : info.memberPosition
    };
    callfunction(postdata).then(function(result) {
      // Read result of the Cloud Function.
      commit('INSERT_MEMBER', postdata);
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
  updateMember({ commit }, info) {
    var callfunction = firebase.functions().httpsCallable('updateMember');
    var postdata = {
      uid : info.memberUID,
      name : info.memberName,
      phoneNumber : info.memberPhoneNumber,
      position : info.memberPosition
    };
    callfunction(postdata).then(function(result) {
      // Read result of the Cloud Function.
      commit('UPDATE_MEMBER', postdata);
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
  deleteMember({ commit }, info) {
    var callfunction = firebase.functions().httpsCallable('deleteMember');
    var postdata = {
      uid : info.memberUID
    };
    callfunction(postdata).then(function(result) {
      // Read result of the Cloud Function.
      commit('DELETE_MEMBER', postdata);
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
  currentMember: state => {
    return state.member;
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}