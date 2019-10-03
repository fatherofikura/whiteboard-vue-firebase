<template>
  <div id="home">
    <navigation-top-menu-before-login></navigation-top-menu-before-login>
    <home-content></home-content>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import NavigationTopMenuBeforeLogin from "./NavigationTopMenuBeforeLogin.vue";
import HomeContent from "./HomeContent.vue";

export default {
  name: "home",
  components: {
    NavigationTopMenuBeforeLogin,
    HomeContent
  }
}
</script>
