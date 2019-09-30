<template>
  <div id="home">
    <navigation-top-menu-before-login></navigation-top-menu-before-login>
    <div class="catchcopy">
      <div class="catchcopy_content">
        <h1>Welcome to Whiteboard.</h1>
        <div>
          Whiteboardはオンラインで対象メンバーの在籍管理を行うサービスです。<br>
          サービスを利用するためにはGoogleアカウントが必要です。
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="card">
          <header class="card-header card-header-title-base">
            <p class="card-header-title">グループ単位のメンバー管理</p>
          </header>
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="../assets/Test001.gif" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              グループ単位でメンバーを管理できます。選択したグループはログインユーザ毎に保持されます。
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <header class="card-header card-header-title-base">
            <p class="card-header-title">メンバー登録＆修正＆削除</p>
          </header>
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              メンバーの情報(名前/役職/電話番号)を新規登録できます。UI上から修正や削除もできます。
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <header class="card-header card-header-title-base">
            <p class="card-header-title">行き先の変更</p>
          </header>
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              メンバーの行き先や補足情報を変更できます。メンバーを複数選択して変更することもできます。
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-button @click="googleLogin">Login(Google Account)</b-button>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import NavigationTopMenuBeforeLogin from "./NavigationTopMenuBeforeLogin.vue";

export default {
  name: "home",
  components: {
    NavigationTopMenuBeforeLogin
  },
  methods: {
    googleLogin: function() {
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
  }
}
</script>

<style>
.card-header-title-base{
  background: #cccccc;/*背景色*/
  background-size: 20px 20px;
	background-image:	linear-gradient(45deg, rgba(245, 245, 245, 0.5) 25%, transparent 25%,
	 transparent 50%, rgba(245, 245, 245, 0.5) 50%, rgba(245, 245, 245, 0.5) 75%,
	 transparent 75%, transparent),
	linear-gradient(-45deg, rgba(245, 245, 245, 0.5) 25%, transparent 25%,
	 transparent 50%, rgba(245, 245, 245, 0.5) 50%, rgba(245, 245, 245, 0.5) 75%,
	 transparent 75%, transparent);
}
.catchcopy{
  background-image : url("../assets/top.jpg");
  background-size: cover;
}
.catchcopy_content{
  color : white;
  opacity : 0.7;
  padding : 180px 0px 30px 0px;
  text-align : center;
  text-shadow: 0px 0px 10px #000000;
}
.catchcopy_content h1{
  font-size : 45px;
  font-weight : bold;
  text-shadow: 0px 0px 10px #000000;
}
.columns{
  margin-top: 20px;
}
</style>
