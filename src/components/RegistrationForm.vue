<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Member Registration</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Name">
          <b-input :value="Name" placeholder="Your Name" required></b-input>
        </b-field>
        <b-field label="Phone Number">
          <b-input :value="phoneNumber" placeholder="Your Phone Number" required></b-input>
        </b-field>
        <b-field label="Position">
          <b-input :value="posision" placeholder="Your Position"></b-input>
        </b-field>
      </section>

      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="button" @click="registMember">Registration</button>
      </footer>
    </div>
  </form>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'

export default {
  props: ['Name', 'phoneNumber', 'posision'],
  methods: {
    registMember : function() {
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
