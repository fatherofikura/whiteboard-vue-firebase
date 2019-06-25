<template>
  <div class="memberlist">
    <b-button class="button" @click="isComponentModalActive = true">Regist(Member)</b-button>
    <b-modal :active.sync="isComponentModalActive" has-modal-card>
      <registration-form v-bind="formProps" v-on:registed="setMember"></registration-form>
    </b-modal>
    <b-button class="button" @click="registMember">TestFunc</b-button>
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
      formProps: {
        memberName: 'Test Taro',
        memberPhoneNumber: '222',
        memberPosition: 'Manager'
      }
    };
  },
  methods: {
    setMember : function(info) {
      this.formProps.memberName = info.memberName;
      this.formProps.memberPhoneNumber = info.memberPhoneNumber;
      this.formProps.memberPosition = info.memberPosition;
      this.isComponentModalActive = false;
    },
    registMember : function() {
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
    }
  }
};
</script>

