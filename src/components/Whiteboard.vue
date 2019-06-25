<template>
  <div class="whiteboard">
    <h1>Whiteboard</h1>
    <section>
      <button class="button" @click="isComponentModalActive = true">Regist(Member)</button>
      <b-modal :active.sync="isComponentModalActive" has-modal-card>
        <registration-form v-bind="formProps" v-on:registed="registMember"></registration-form>
      </b-modal>
      <button class="button" @click="logout">Logout</button>
      <button class="button" @click="registMember">Test</button>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import RegistrationForm from "./RegistrationForm.vue";

export default {
  components: {
    RegistrationForm
  },
  name: "whiteboard",
  data() {
    return {
      isComponentModalActive: false,
      formProps: {
        memberName: '',
        memberPhoneNumber: '',
        memberPosition: ''
      }
    };
  },
  methods: {
    logout : function() {
      firebase.auth().signOut();
    },
    registMember : function() {
      console.log('functions前');

      // Initialize Cloud Functions through Firebase
      var functions = firebase.functions();

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
        alert();
      });
    }
  }
};
</script>
