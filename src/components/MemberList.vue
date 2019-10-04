<template>
  <div class="memberlist">
    <section>
      <draggable ref="draggable" class="columns is-multiline" @start="draggableStart" @update="draggableUpdate">
        <div v-for="(Member, index) in displayMember" v-bind:key="index">
          <div class="column">
            <b-collapse class="card card-base" v-bind:class="selectedCardClass(Member)">
              <div class="card-header" role="button" @click="clickCard(Member)">
                <p class="card-header-title card-header-title-base" v-bind:style="setStatusIconStyle(Member)">
                  <v-fa class="icon-base" v-bind:icon="setStatusIcon(Member)" />
                  <span>{{ Member.name }}</span>
                </p>
              </div>
              <div class="card-content card-content-base" @click="clickCard(Member)">
                <div class="content">
                  <div class="tag_base">
                    <b-tooltip class="tag_hint" label="Position" type="is-dark" position="is-right">
                      <div class="tag_key">
                        <v-fa icon="id-badge" />
                      </div>
                    </b-tooltip>
                    <div class="tag_value">{{ Member.position }}</div>
                    <br>
                    <b-tooltip class="tag_hint" label="PhoneNumber" type="is-dark" position="is-right">
                      <div class="tag_key">
                        <v-fa icon="phone-square" />
                      </div>
                    </b-tooltip>
                    <div class="tag_value">{{ Member.phoneNumber }}</div>
                    <br>
                    <b-tooltip class="tag_hint" label="Note" type="is-dark" position="is-right">
                      <div class="tag_key">
                        <v-fa icon="bookmark" />
                      </div>
                    </b-tooltip>
                    <div class="tag_value">{{ Member.note }}</div>
                  </div>
                </div>
              </div>
              <div class="card_footer_btn_wrapper">
                <b-tooltip label="Edit" type="is-dark" position="is-bottom">
                  <div class="card_footer_btn" @click="clickEditButton(Member)">
                    <v-fa class="card_footer_btn_icon" icon="pen" />
                  </div>
                </b-tooltip>
                <b-tooltip label="delete" type="is-dark" position="is-bottom">
                  <div class="card_footer_btn" @click="clickDeleteButton(Member)">
                    <v-fa class="card_footer_btn_icon" icon="trash" />
                  </div>
                </b-tooltip>
              </div>
              <b-modal :active.sync="isComponentModalActiveForEdit" has-modal-card>
                <registration-form v-bind="editMember" v-on:edited="setEditMember"></registration-form>
              </b-modal>
              <b-modal :active.sync="isComponentModalActiveForConfirmation" has-modal-card>
                <confirmation-form v-bind="deleteMember" v-on:deleted="setDeleteMember"></confirmation-form>
              </b-modal>
            </b-collapse>
          </div>
        </div>
        <div class="regist_button" @click="clickRegistButton()">
          <v-fa icon="user-plus" />
        </div>
        <b-modal :active.sync="isComponentModalActiveForRegistration" has-modal-card>
          <registration-form v-bind="editMember" v-on:registed="setRegistMember"></registration-form>
        </b-modal>
      </draggable>
    </section>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import RegistrationForm from "./RegistrationForm.vue";
import ConfirmationForm from "./ConfirmationForm.vue";
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  components: {
    RegistrationForm,
    ConfirmationForm,
    draggable,
  },
  name: "memberlist",
  data() {
    return {
      isComponentModalActiveForRegistration: false,
      isComponentModalActiveForConfirmation: false,
      isComponentModalActiveForEdit: false,
      isDragging: false,
      editMember: {
        memberUID: '',
        memberName: '',
        memberPhoneNumber: '',
        memberPosition: '',
        memberStatus: '',
        memberNote: ''
      },
      deleteMember: {
        memberUID: '',
        memberName: '',
        memberPhoneNumber: '',
        memberPosition: '',
        memberStatus: '',
        memberNote: '',
        memberStatusIcon: '',
        memberStatusIconStyle: '',
      },
      draggableStartList : [],
      draggableUpdateList : [],
    };
  },
  created: function() {
    var group = {
      groupID : this.$store.getters['group/currentSelectedGroup']
    }
    console.log('[created]GroupID : %s', group.groupID);
    this.$store.dispatch("member/selectMemberWithGroup", group);
  },
  mounted: function() {
    this.$store.watch(
      (state, getters) => getters['group/currentSelectedGroup'],
      (newValue, oldValue) => {
        console.log('[Mounted@MemberList]Group changed! %s => %s', oldValue, newValue);
        var group = {
          groupID : this.$store.getters['group/currentSelectedGroup']
        }
        this.$store.dispatch("member/selectMemberWithGroup", group);
      }
    );
  },
  updated: function(){
    var order = this.$store.getters['user/currentUser'].sortedList[this.$store.getters['group/currentSelectedGroup']].list.split(',');
    console.log("[DEBUG] UpdatedList : %s", order);
    console.log(order);
    this.$refs.draggable._sortable.sort(order);
  },
  methods: {
    setRegistMember : function(info) {
      var member = {
        memberName : info.memberName,
        memberPhoneNumber : info.memberPhoneNumber,
        memberPosition : info.memberPosition,
        memberStatus : info.memberStatus,
        memberNote : info.memberNote,
        memberGroup : this.$store.getters['group/currentSelectedGroup']
      };
      this.$store.dispatch("member/insertMember", member);
      this.isComponentModalActiveForRegistration = false;
    },
    setEditMember : function(info) {
      var member = {
        memberUID : info.memberUID,
        memberName : info.memberName,
        memberPhoneNumber : info.memberPhoneNumber,
        memberPosition : info.memberPosition,
        memberStatus : info.memberStatus,
        memberNote : info.memberNote,
        memberGroup : this.$store.getters['group/currentSelectedGroup']
      };
      this.$store.dispatch("member/updateMember", member);
      this.isComponentModalActiveForEdit = false;
    },
    setDeleteMember : function(info) {
      var member = {
        memberUID : info.memberUID
      }
      this.$store.dispatch("member/deleteMember", member);
      this.isComponentModalActiveForConfirmation = false;
    },
    clickCard : function(info, index) {
      this.$store.dispatch("member/checkSelectedMember", info.id);
    },
    clickRegistButton : function() {
      this.editMember.memberUID = "";
      this.editMember.memberName = "";
      this.editMember.memberPhoneNumber = "";
      this.editMember.memberPosition = "";
      this.editMember.memberStatus = 0; // 初期作成時は0
      this.editMember.memberNote = ""; // 初期作成時は空
      this.isComponentModalActiveForRegistration = true;
    },
    clickEditButton : function(info, index) {
      console.log(info);
      this.editMember.memberUID = info.id;
      this.editMember.memberName = info.name;
      this.editMember.memberPhoneNumber = info.phoneNumber;
      this.editMember.memberPosition = info.position;
      // statusが空の場合もあるので空の場合は0をセット
      if( !info.status ){
        this.editMember.memberStatus = 0;
      }else{
        this.editMember.memberStatus = Object.keys(info.status);
      }
      this.editMember.memberNote = info.note;
      this.isComponentModalActiveForEdit = true;
    },
    clickDeleteButton : function(info, index) {
      this.deleteMember.memberUID = info.id;
      this.deleteMember.memberName = info.name;
      this.deleteMember.memberPhoneNumber = info.phoneNumber;
      this.deleteMember.memberPosition = info.position;
      // statusが空の場合もあるので空の場合は0をセット
      if( !info.status ){
        this.deleteMember.memberStatus = 0;
      }else{
        this.deleteMember.memberStatus = Object.keys(info.status);
      }
      this.deleteMember.memberNote = info.note;
      this.deleteMember.memberStatusIcon = this.calculateStatusIcon(this.deleteMember.memberStatus);
      this.deleteMember.memberStatusIconStyle = this.calculateStatusIconStyle(this.deleteMember.memberStatus);
      this.isComponentModalActiveForConfirmation = true;
    },
    draggableStart(event) {
      this.draggableStartList = this.$refs.draggable._sortable.toArray().toString();
      console.log("[DEBUG] toArray@Start : %s", this.draggableStartList);
    },
    draggableUpdate(event) {
      this.draggableUpdateList = this.$refs.draggable._sortable.toArray().toString();
      console.log("[DEBUG] toArray@Update : %s", this.draggableUpdateList);

      var user = firebase.auth().currentUser;
      console.log("[DEBUG] group : %s", this.$store.getters['group/currentSelectedGroup']);
      if (user) {
        this.$store.dispatch("user/updateUserWithSortedList", {
          uid : user.uid,
          group : this.$store.getters['group/currentSelectedGroup'],
          sortedList : this.$refs.draggable._sortable.toArray().toString()
        });
      } else {
        // No user is signed in.
      }
    },
    calculateStatusIcon(info) {
      console.log(info);
      console.log("[DEBUG] memberStatus : %s", info);
      var statusList = this.$store.getters['status/currentStatus'];
      // データが読み込めない場合、読み込み中のアイコンを表示
      if( Object.keys(statusList).length === 0 ){
        return "spinner"
      }
      if( !info ){
        return statusList[0].icon;
      }
      // 配列の先頭のIndexを使用(配列だが複数の値を保持することはないと思うが念の為)
      return statusList[info[0]].icon;
    },
    calculateStatusIconStyle(info) {
      var statusList = this.$store.getters['status/currentStatus'];
      // データが読み込めない場合、読み込み中のアイコンを表示
      if( Object.keys(statusList).length === 0 ){
        return { 'background-color' : "#ffffff" }
      }
      if( !info ){
        return { 'background-color' : statusList[0].background_color }
      }
      // 配列の先頭のIndexを使用(配列だが複数の値を保持することはないと思うが念の為)
      return { 'background-color' : statusList[info[0]].background_color }
    }
  },
  computed: {
    displayMember() {
      return this.$store.getters['member/currentMember'];
    },
    selectedCardClass() {
      self = this;
        return function (key) {
          var arrayIndex = this.clickedCardList.indexOf(key.id);
          if(arrayIndex >= 0){
            return { selectedCard: true }
          }
          else{
            return { selectedCard: false }
          }
        };
    },
    clickedCardList() {
      return this.$store.getters['member/currentSelectedMember'];
    },
    setStatusIcon() {
      self = this;
      return function (key) {
        var statusList = this.$store.getters['status/currentStatus'];
        // データが読み込めない場合、読み込み中のアイコンを表示
        if( Object.keys(statusList).length === 0 ){
          return "spinner"
        }
        if( !key.status ){
          return statusList[0].icon;
        }
        return statusList[Object.keys(key.status)].icon;
      };
    },
    setStatusIconStyle() {
      self = this;
      return function (key) {
        var statusList = this.$store.getters['status/currentStatus'];
        // データが読み込めない場合、読み込み中のアイコンを表示
        if( Object.keys(statusList).length === 0 ){
          return { 'background-color' : "#ffffff" }
        }
        if( !key.status ){
          return { 'background-color' : statusList[0].background_color }
        }
        return { 'background-color' : statusList[Object.keys(key.status)].background_color }
      };
    }
  }
};
</script>

<style>
.memberlist{
  margin: 60px 60px 0px 60px;
}
.card-base{
  width: 220px;
  box-shadow: 3px 3px 6px -2px,
  3px 3px 8px rgba(255,255,255,0.8) inset;
}
.card-content-base{
  padding: 16px;
}
.card-header-title-base{
  padding: 8px;
  background-size: 20px 20px;
	background-image:	linear-gradient(45deg, rgba(245, 245, 245, 0.5) 25%, transparent 25%,
	 transparent 50%, rgba(245, 245, 245, 0.5) 50%, rgba(245, 245, 245, 0.5) 75%,
	 transparent 75%, transparent),
	linear-gradient(-45deg, rgba(245, 245, 245, 0.5) 25%, transparent 25%,
	 transparent 50%, rgba(245, 245, 245, 0.5) 50%, rgba(245, 245, 245, 0.5) 75%,
	 transparent 75%, transparent);
}
.tag{
  margin: 0px 0px 0px 0px;
}
.selectedCard {
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  color: #4a4a4a;
}
.icon-base{
  margin: 0px 5px 0px 0px;
}
.tag_base{
  letter-spacing: -.4em; /* 文字間を詰めて隙間をなくす */
}
.tag_hint{
  letter-spacing: normal; /* 文字間を元に戻す */
}
.tag_key{
  letter-spacing: normal; /* 文字間を元に戻す */
  display: inline-block;
  font-size: 14px;
  background-color: #363636;
  color: #f5f5f5;
  padding: 1px 4px;
  margin: 0px 0px 8px 0px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  width: 24px;
  text-align: center;
}
.tag_value{
  letter-spacing: normal; /* 文字間を元に戻す */
  display: inline-block;
  font-size: 14px;
  background-color: #f5f5f5;
  padding: 1px 9px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.content{
  text-align: left;
}
.card_footer_btn_wrapper{
  text-align: right;
  margin: 0px 4px 0px 0px;
}
.card_footer_btn {
  display: inline-block;
  width: 24px;
  height: 24px;
  text-align: center;/*中央寄せ*/
  border-radius: 50%;/*角丸く*/
  font-size: 12px;
  line-height: 24px;/*＝幅と高さ*/
  border: solid 1px #363636;
  margin: 0px 4px 8px 0px;
  padding: 1px;
}
.regist_button{
  position: fixed;
  bottom: 70px;
  right: 24px;
  display: block;
  width: 56px;/*幅*/
  height: 56px;/*高さ*/
  background: #42b983;/*背景色*/
  text-align: center;/*中央寄せ*/
  border-radius: 50%;/*角丸く*/
  transition: .3s;/*滑らかな動きに*/
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.12), 0 2px 2px 0 rgba(0,0,0,.24);/*影*/
  color: white;
  font-size: 24px;
  line-height: 56px;/*＝幅と高さ*/
}
.regist_button:hover{
    box-shadow: 0 3px 3px 0 rgba(0,0,0,0.14), 0 1px 7px 0 rgba(0,0,0,0.12), 0 3px 1px -1px rgba(0,0,0,0.2);/*浮き上がるように*/
}
</style>
