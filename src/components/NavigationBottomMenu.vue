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
        <div class="notes navbar-item">
          <b-field horizonta>
            <div class="control">
              <b-input placeholder="補足情報を記入してください。" v-model="note"></b-input>
            </div>
            <div class="control">
              <b-dropdown position="is-top-left">
                <button class="button button-dropdown is-dark" slot="trigger">
                  <v-fa icon="chevron-down" />
                </button>
                <b-dropdown-item v-for="Destination in displayDestination" :value="Destination.id" :key="Destination.id" @click="changeNote(Destination.name)">
                  {{ Destination.name }}
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </b-field>
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
      isOpen: false,
      note : ""
    }
  },
  created: function() {
    this.$store.dispatch("status/selectStatus");
    var group = {
      groupID : this.$store.getters['group/currentSelectedGroup']
    }
    console.log('[created]GroupID : %s', group.groupID);
    this.$store.dispatch("destination/selectDestinationWithGroup", group);
  },
  mounted: function() {
    this.$store.watch(
      (state, getters) => getters['group/currentSelectedGroup'],
      (newValue, oldValue) => {
        console.log('[Mounted@NavigationBottomMenu]Group changed! %s => %s', oldValue, newValue);
        var group = {
          groupID : this.$store.getters['group/currentSelectedGroup']
        }
        this.$store.dispatch("destination/selectDestinationWithGroup", group);
      }
    );
  },
  computed: {
    displayStatus() {
      return this.$store.getters['status/currentStatus'];
    },
    displayDestination() {
      return this.$store.getters['destination/currentDestination'];
    },
  },
  methods: {
    clickStatusButton : function(info, index) {
      this.$store.dispatch("member/changeStatus", {
        statusID : info.id,
        selectedMember : this.$store.getters['member/currentSelectedMember'] ,
        note : this.note
      });
    },
    changeNote(info) {
      this.note = info;
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
.button-dropdown{
  color: black;
}
</style>
