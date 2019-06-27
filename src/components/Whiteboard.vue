<template>
  <div class="whiteboard">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="logo.png">
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-light" @click="logout">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <br>
    <br>
    <member-list></member-list>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import MemberList from "./MemberList.vue";

export default {
  components: {
    MemberList
  },
  name: "whiteboard",
  methods: {
    logout : function() {
      firebase.auth().signOut();
    }
  }
};
</script>
