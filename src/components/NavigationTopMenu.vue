<template>
  <div class="navigationTopMenu">
    <nav class="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <!--
          <img src="logo.png">
          !-->
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
        <div class="navbar-item">
          <div class="control has-icons-left">
            <div class="select">
              <select v-model="selectedGroupID">
                <option v-for="Group in displayGroup" :value="Group.id" :key="Group.id">
                  {{ Group.name }}
                </option>
              </select>
            </div>
            <div class="icon is-small is-left">
              <v-fa icon="users" />
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-light" @click="logout">Logout</a>
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
  name: "navigationTopMenu",
  data() {
    return {
      isOpen: false,
      selectedGroupID: 0
    }
  },
  created: function() {
    this.$store.dispatch("group/selectGroup");
  },
  watch: {
    selectedGroupID: function (newSelectedGroup, oldSelectedGroup) {
      this.$store.dispatch("group/checkSelectedGroup", { selectedGroupID : newSelectedGroup } );
    }
  },
  computed: {
    displayGroup() {
      return this.$store.getters['group/currentGroup'];
    },
  },
  methods: {
    logout : function() {
      firebase.auth().signOut();
    },
    clickGroupButton : function(info, index) {
      // this.$store.dispatch("member/changeStatus", { statusID : info.id, selectedMember : this.$store.getters['member/currentSelectedMember'] });
      // console.log(info.name);
    }
  }
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
