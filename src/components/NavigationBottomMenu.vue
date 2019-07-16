<template>
  <div class="navigationTopMenu">
    <nav class="navbar is-fixed-bottom is-dark" role="navigation" aria-label="main navigation">
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="isOpen = !isOpen" v-bind:class="{'is-active': isOpen}">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
      <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{'is-active': isOpen}">
        <div class="navbar-item ">
          <a class="button is-light">
            <v-fa icon="door-closed" />
            <span>未出社</span>
          </a>
        </div>
        <div class="navbar-item">
          <a class="button is-light">
            <v-fa icon="chair" />
            <span>在席</span>
          </a>
        </div>
        <div class="navbar-item">
          <a class="button is-light">
            <v-fa icon="home" />
            <span>帰宅</span>
          </a>
        </div>
        <div class="navbar-item">
          <a class="button is-light">
            <v-fa icon="suitcase-rolling" />
            <span>出張</span>
          </a>
        </div>
        <div class="navbar-item">
          <a class="button is-light">
            <v-fa icon="door-open" />
            <span>外出</span>
          </a>
        </div>
        <div class="navbar-item">
          <a class="button is-light">
            <v-fa icon="clipboard" />
            <span>社内</span>
          </a>
        </div>
        <div class="navbar-item">
          <a class="button is-light">
            <v-fa icon="bed" />
            <span>休み</span>
          </a>
        </div>
        <div class="navbar-item">
          <a class="button is-light">
            <v-fa icon="ellipsis-h" />
            <span>その他</span>
          </a>
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
  }
};
</script>
