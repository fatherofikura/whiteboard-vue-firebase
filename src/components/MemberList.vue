<template>
  <div class="memberlist">
    <b-button class="button" @click="isComponentModalActive = true">Regist(Member)</b-button>
    <b-modal :active.sync="isComponentModalActive" has-modal-card>
      <registration-form v-bind="newMember" v-on:registed="setNewMember"></registration-form>
    </b-modal>
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
        memberName: 'Test Taro',
        memberPhoneNumber: '222',
        memberPosition: 'Manager'
      }
    };
  },
  methods: {
    setNewMember : function(info) {
      this.newMember.memberName = info.memberName;
      this.newMember.memberPhoneNumber = info.memberPhoneNumber;
      this.newMember.memberPosition = info.memberPosition;
      this.isComponentModalActive = false;
    }
  },
  watch: {
    newMember: {
      handler: function (val, oldVal) {
        console.log('functions前');

        // Call Functaion
        var messageText = "hogehoge";
        var addMessage = firebase.functions().httpsCallable('addMessage');
        addMessage({text: messageText}).then(function(result) {
          // Read result of the Cloud Function.
          var sanitizedMessage = result.data.text;
          console.log(sanitizedMessage);
        }).then(() => {
          alert();
        }).then(() => {
          console.log('functions後');
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

