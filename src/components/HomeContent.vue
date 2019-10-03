<template>
  <div id="home-content">
    <div class="catchcopy">
      <div class="catchcopy_content">
        <h1>Welcome to Whiteboard.</h1>
        <h2>
          Whiteboardはオンラインで対象メンバーの在籍管理を行うサービスです。<br>
          サービスを利用するためにはGoogleアカウントが必要です。
        </h2>
        <div class="btn_login">
          <b-button @click="googleLogin">今すぐ利用する</b-button>
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
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: "homeContent",
  methods: {
    googleLogin: function() {
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
  }
}
</script>

<style>
.columns{
  margin: 0px 60px 0px 60px;
}
.card-header-title-base{
  padding:0px;
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
  margin-top: 60px;
  background-image : url("../assets/top.jpg");
  background-size: cover;
}
.catchcopy_content{
  color : white;
  opacity : 0.7;
  padding : 110px 0px 20px 0px;
  text-align : center;
  text-shadow: 0px 0px 10px #000000;
}
.catchcopy_content h1{
  font-size : 45px;
  font-weight : bold;
  text-shadow: 0px 0px 10px #000000;
}
.catchcopy_content h2{
  margin-bottom: 20px;
}
.columns{
  margin-top: 20px;
}
.catchcopy_content button{
  opacity : 1.0;
  background: #ffffff;/*背景色*/
}
</style>
