<template>
  <div class="memberlist">
    <b-button class="button" @click="isComponentModalActive = true">Regist(Member)</b-button>
    <b-modal :active.sync="isComponentModalActive" has-modal-card>
      <registration-form v-bind="newMember" v-on:registed="setNewMember"></registration-form>
    </b-modal>
    <b-button class="button" @click="selectMember">TestFunc</b-button>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import RegistrationForm from "./RegistrationForm.vue";

export default {
  components: {
    RegistrationForm
  },
  name: "memberlist",
  data() {
    return {
      isComponentModalActive: false,
      newMember: {
        memberName: '',
        memberPhoneNumber: '',
        memberPosition: ''
      }
    };
  },
  methods: {
    setNewMember : function(info) {
      this.newMember.memberName = info.memberName;
      this.newMember.memberPhoneNumber = info.memberPhoneNumber;
      this.newMember.memberPosition = info.memberPosition;
      this.isComponentModalActive = false;
    },
    selectMember : function() {
      // Call Functaion
      var callfunction = firebase.functions().httpsCallable('selectMember');
      var postdata = {};
      callfunction(postdata).then(function(result) {
        // Read result of the Cloud Function.
        console.log(result);
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
  },
  watch: {
    newMember: {
      handler: function (val, oldVal) {
        // Call Functaion
        var callfunction = firebase.functions().httpsCallable('insertMember');
        var postdata = {
          name : this.newMember.memberName,
          phoneNumber : this.newMember.memberPhoneNumber,
          position : this.newMember.memberPhoneNumber
        };
        callfunction(postdata).then(function(result) {
          // Read result of the Cloud Function.
          console.log(result);
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
      deep: true
    }
  }
};
</script>

