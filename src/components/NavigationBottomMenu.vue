<template>
  <div class="navigationTopMenu">
    <nav class="navbar is-fixed-bottom is-dark" role="navigation" aria-label="main navigation">
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="isOpen = !isOpen" v-bind:class="{'is-active': isOpen}">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
      <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{'is-active': isOpen}">
        <div v-for="(Status, index) in displayStatus" v-bind:key="index">
          <div class="navbar-item ">
            <a class="button is-light">
              <v-fa v-bind:icon="Status.icon" />
              <span>{{ Status.name }}</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "navigationBottomMenu",
  data() {
    return {
      isOpen: false
    }
  },
  created: function() {
    this.$store.dispatch("status/selectStatus");
  },
  computed: {
    displayStatus() {
      return this.$store.getters['status/currentStatus'];
    },
  },
};
</script>
