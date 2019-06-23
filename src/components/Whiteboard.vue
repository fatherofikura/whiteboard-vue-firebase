<template>
  <div class="whiteboard">
    <h1>Whiteboard</h1>
    <section>
      <button class="button" @click="isComponentModalActive = true">Regist(Member)</button>
      <b-modal :active.sync="isComponentModalActive" has-modal-card>
        <registration-form v-bind="formProps"></registration-form>
      </b-modal>
      <button class="button" @click="logout">Logout</button>
      <button class="button" @click="testFunction">test</button>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
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
        Name: '',
        phoneNumber: '',
        posision: ''
      }
    };
  },
  methods: {
    logout : function() {
      firebase.auth().signOut();
    },
    testFunction : function() {
      // Initialize Cloud Functions through Firebase
      var functions = firebase.functions();

      // Call Functaion
      var messageText = "hogehoge";
      var addMessage = firebase.functions().httpsCallable('addMessage');
      addMessage({text: messageText}).then(function(result) {
        // Read result of the Cloud Function.
        var sanitizedMessage = result.data.text;
        console.log(sanitizedMessage);
      });
    }
  }
};
</script>
