<template>
  <div class="whiteboard">
    <h1>Whiteboard</h1>
    <section>
      <member-list></member-list>
    </section>
    <section>
      <b-button class="button" @click="logout">Logout</b-button>
    </section>
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
