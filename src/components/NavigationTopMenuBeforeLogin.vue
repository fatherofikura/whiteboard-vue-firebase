<template>
  <div class="navigationTopMenuBeforeLogin">
    <nav class="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <div class="logo-title">
            Whiteboard
          </div>
        </a>
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="isOpen = !isOpen" v-bind:class="{'is-active': isOpen}">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{'is-active': isOpen}">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-light">Login(Google Account)</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: "navigationTopMenuBeforeLogin",
  data() {
    return {
      isOpen: false
    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Damion&display=swap');

.logo-title{
  font-family: 'Damion', cursive;
  color: #ffffff;
  font-size: 24px;
}
.select select{
  background-color: transparent;
  border-color: transparent;
  color: white;
}
</style>
