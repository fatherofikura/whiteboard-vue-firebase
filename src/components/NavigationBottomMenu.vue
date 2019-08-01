<template>
  <div class="navigationBottomMenu">
    <nav class="navbar is-fixed-bottom is-dark" role="navigation" aria-label="main navigation">
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="isOpen = !isOpen" v-bind:class="{'is-active': isOpen}">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
      <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{'is-active': isOpen}">
        <div v-for="(Status, index) in displayStatus" v-bind:key="index">
          <div class="navbar-item"  @click="clickStatusButton(Status)">
            <a class="button button-base5" v-bind:style="{ 'background-color': Status.background_color }">
              <v-fa class="icon-base" v-bind:icon="Status.icon" />
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
  methods: {
    clickStatusButton : function(info, index) {
      this.$store.dispatch("member/changeStatus", { statusID : info.id, selectedMember : this.$store.getters['member/currentSelectedMember'] });
    }
  }
};
</script>

<style>
/* ヨコシマ */
.button-base{
	background-image: repeating-linear-gradient(0deg, #f5f5f5, #f5f5f5 5px, transparent 0, transparent 10px);
}

/* タテシマ */
.button-base2{
	background-image: repeating-linear-gradient(-90deg, #f5f5f5, #f5f5f5 5px, transparent 0, transparent 10px);
}

/* 右上がりシマ */
.button-base3{
	background-image: repeating-linear-gradient(-45deg, #f5f5f5, #f5f5f5 5px, transparent 0, transparent 10px);
}

/* 左上がりシマ */
.button-base4{
	background-image: repeating-linear-gradient(45deg, #f5f5f5, #f5f5f5 5px, transparent 0, transparent 10px);
}

/* 斜めギンガムチェック */
.button-base5{
  background-size: 20px 20px;
	background-image:	linear-gradient(45deg, rgba(245, 245, 245, 0.5) 25%, transparent 25%,
	 transparent 50%, rgba(245, 245, 245, 0.5) 50%, rgba(245, 245, 245, 0.5) 75%,
	 transparent 75%, transparent),
	linear-gradient(-45deg, rgba(245, 245, 245, 0.5) 25%, transparent 25%,
	 transparent 50%, rgba(245, 245, 245, 0.5) 50%, rgba(245, 245, 245, 0.5) 75%,
	 transparent 75%, transparent);
}

.icon-base{
  margin: 0px 5px 0px 0px;
}
</style>
