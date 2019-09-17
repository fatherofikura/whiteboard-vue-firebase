import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/database';
import { notEqual } from 'assert';

const namespaced = true;

const state = {
  member: {},
  selectedMember: []
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
  },
  'CHECK_SELECTED_MEMBER'(state, info) {
    var arrayIndex = state.selectedMember.indexOf(info);
    if(arrayIndex >= 0){
      state.selectedMember.splice(arrayIndex,1);
    }
    else{
      state.selectedMember.push(info);
    }
  },
  'CHANGE_STATUS'(state, info) {
    console.log(info);
    state.selectedMember.length = 0;
  },
};

const actions = {
  selectMember({ commit }) {
    firebase.database().ref('/member').on('value', function(snapshot) {
      commit('SELECT_MEMBER', snapshot);
    });
  },
  selectMemberWithGroup({ commit }, info) {
    firebase.database().ref('/member').orderByChild('group/' + info.groupID).equalTo(true).on('value', function(snapshot) {
      commit('SELECT_MEMBER', snapshot);
    });
  },
  insertMember({ commit }, info) {
    var callfunction = firebase.functions().httpsCallable('insertMember');
    var postdata = {
      name : info.memberName,
      phoneNumber : info.memberPhoneNumber,
      position : info.memberPosition,
      status : info.memberStatus,
      group : info.memberGroup
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
      position : info.memberPosition,
      status : info.memberStatus,
      note : info.memberNote,
      group : info.memberGroup
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
  },
  checkSelectedMember({ commit }, info) {
    commit('CHECK_SELECTED_MEMBER', info);
  },
  changeStatus({ commit }, info) {
    var callfunction = firebase.functions().httpsCallable('updateStatus');
    var postdata = {
      statusID : info.statusID,
      selectedMember : info.selectedMember,
      note : info.note
    };
    callfunction(postdata).then(function(result) {
      // Read result of the Cloud Function.
      commit('CHANGE_STATUS', postdata);
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
  },
  currentSelectedMember: state => {
    return state.selectedMember;
  },
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
