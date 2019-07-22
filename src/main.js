import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase/app'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import store from './store/store';

// アイコンを読み込み
library.add(fas, far, fab);

// Vueコンポーネントを作成
Vue.component('v-fa', FontAwesomeIcon);

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAFCN_MAcjSsTFDC6XYVou4DF30kmiV6pc",
  authDomain: "whiteboard-69a4a.firebaseapp.com",
  databaseURL: "https://whiteboard-69a4a.firebaseio.com",
  projectId: "whiteboard-69a4a",
  storageBucket: "whiteboard-69a4a.appspot.com",
  messagingSenderId: "388329290835",
  appId: "1:388329290835:web:3cd4dabc35fb6ad4"
}
firebase.initializeApp(config)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
