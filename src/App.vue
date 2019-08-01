<template>
  <div id="app">
    <div class="container">
      <pulse-loader v-if="!loading"></pulse-loader>
      <Home v-if="!isLogin && loading"></Home>
      <Whiteboard v-if="isLogin && loading" :user="userData"></Whiteboard>
    </div>
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
      loading: false
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
        this.isLogin = true;
        this.userData = user;
      }
      else {
        this.isLogin = false;
        this.userData = null;
      };
      this.loading=true;
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
  margin-top: 60px;
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
