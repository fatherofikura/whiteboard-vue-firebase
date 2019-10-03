<template>
  <div id="app">
    <!--
    <pulse-loader v-if="!loading"></pulse-loader>
    !-->
    <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
    <Home v-if="!isLogin && !isLoading"></Home>
    <Whiteboard v-if="isLogin && !isLoading" :user="userData"></Whiteboard>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import Whiteboard from "./components/Whiteboard.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import firebase from 'firebase/app'
import 'firebase/auth'
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.config.devtools = true

export default {
  name: 'app',
  data () {
    return {
      isLogin: false,
      userData: null,
      isLoading: true
    };
  },
  components: {
    Home: Home,
    Whiteboard: Whiteboard,
    PulseLoader: PulseLoader
  },
  beforeCreate: function() {
    firebase.auth().onAuthStateChanged( user=> {
      if (user) {
        this.$store.dispatch("user/selectUser", { uid : user.uid });
        this.isLogin = true;
        this.userData = user;
      }
      else {
        this.isLogin = false;
        this.userData = null;
      };
      this.isLoading=false;
    });
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-attachment: fixed;
  background-image: url("assets/back.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height:100vh;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #363636;
}
</style>
