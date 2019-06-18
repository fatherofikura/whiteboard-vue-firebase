<template>
  <div class="whiteboard">
    <h1>Whiteboard画面</h1>
    <span>{{ user.displayName }}</span>
    <button @click="logout">ログアウト</button>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: "whiteboard",
  props: ["user"],
  data() {
    return {};
  },
  methods: {
    logout : function() {
      firebase.auth().signOut();
    }
  }
};
</script>
