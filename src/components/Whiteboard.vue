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

      // Call Functaion
      var messageText = "hogehoge";
      var addMessage = firebase.functions().httpsCallable('addMessage');
      addMessage({text: messageText}).then(function(result) {
        // Read result of the Cloud Function.
        var sanitizedMessage = result.data.text;
        console.log(sanitizedMessage);
      }).then(() => {
        console.log('functions後');
      });
    }
  }
};
</script>
