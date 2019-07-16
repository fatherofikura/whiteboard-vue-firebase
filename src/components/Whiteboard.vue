<template>
  <div class="whiteboard">
    <navigation-top-menu></navigation-top-menu>
    <member-list></member-list>
    <navigation-bottom-menu></navigation-bottom-menu>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import MemberList from "./MemberList.vue";
import NavigationTopMenu from "./NavigationTopMenu.vue";
import NavigationBottomMenu from "./NavigationBottomMenu.vue";

export default {
  components: {
    MemberList,
    NavigationTopMenu,
    NavigationBottomMenu
  },
  name: "whiteboard"
};
</script>
