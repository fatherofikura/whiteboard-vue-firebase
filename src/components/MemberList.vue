<template>
  <div class="memberlist">
    <section>
      <div class="columns is-multiline">
        <div v-for="(Member, index) in displayMember" v-bind:key="index">
          <div class="column">
            <b-collapse class="card">
              <div slot="trigger" slot-scope="props" class="card-header" role="button">
                <p class="card-header-title">
                  {{ Member.name }}
                </p>
                <a class="card-header-icon">
                  <v-fa :icon="props.open ? 'angle-down' : 'angle-up'">
                  </v-fa>
                </a>
              </div>
              <div class="card-content">
                <div class="content">
                  <b-taglist attached>
                    <b-tag type="is-dark">Position</b-tag>
                    <b-tag type>{{ Member.position }}</b-tag>
                  </b-taglist>
                  <b-taglist attached>
                    <b-tag type="is-dark">Phone Number</b-tag>
                    <b-tag type>{{ Member.phoneNumber }}</b-tag>
                  </b-taglist>
                </div>
              </div>
              <footer class="card-footer">
                <a class="card-footer-item">
                  <v-fa icon="user-edit" />
                  <span>Edit</span>
                </a>
                <a slot="trigger" class="card-footer-item" role="button" @click="clickDeleteButton(Member)">
                  <v-fa icon="user-times" />
                  <span>delete</span>
                </a>
                <b-modal :active.sync="isComponentModalActiveForConfirmation" has-modal-card>
                  <confirmation-form v-bind="deleteMember" v-on:deleted="setDeleteMember"></confirmation-form>
                </b-modal>
              </footer>
            </b-collapse>
          </div>
        </div>
      </div>
    </section>
    <br>
    <section>
      <b-button class="button" @click="isComponentModalActiveForRegistration = true">
        <v-fa icon="user-plus" />
        <span>Regist</span>
      </b-button>
      <b-modal :active.sync="isComponentModalActiveForRegistration" has-modal-card>
        <registration-form v-bind="newMember" v-on:registed="setNewMember"></registration-form>
      </b-modal>
      <b-button class="button" @click="selectMember">
        <v-fa icon="redo-alt" />
        <span>Update</span>
      </b-button>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/database';
import RegistrationForm from "./RegistrationForm.vue";
import ConfirmationForm from "./ConfirmationForm.vue";

export default {
  components: {
    RegistrationForm,
    ConfirmationForm
  },
  name: "memberlist",
  data() {
    return {
      isComponentModalActiveForRegistration: false,
      isComponentModalActiveForConfirmation: false,
      newMember: {
        memberName: '',
        memberPhoneNumber: '',
        memberPosition: ''
      },
      deleteMember: {
        memberUID: '',
        memberName: '',
        memberPhoneNumber: '',
        memberPosition: ''
      },
      displayMember: []
    };
  },
  created: function() {
    var _this = this;
    firebase.database().ref('/member').on('value', function(snapshot) {
      const rootList = snapshot.val()
      let list = []
      Object.keys(rootList).forEach((val, key) => {
        rootList[val].id = val
        list.push(rootList[val])
      })
      _this.displayMember = list
    });
  },
  methods: {
    setNewMember : function(info) {
      // Call Functaion
      var callfunction = firebase.functions().httpsCallable('insertMember');
      var postdata = {
        name : info.memberName,
        phoneNumber : info.memberPhoneNumber,
        position : info.memberPosition
      };
      var self = this;
      callfunction(postdata).then(function(result) {
        // Read result of the Cloud Function.
        console.log(result);
      }).catch(function(error) {
        // Getting the Error details.
        var code = error.code;
        var message = error.message;
        var details = error.details;
        console.error('There was an error when calling the Cloud Function', error);
        window.alert('There was an error when calling the Cloud Function:\n\nError Code: '
        + code + '\nError Message:' + message + '\nError Details:' + details);
      });
      this.isComponentModalActiveForRegistration = false;
    },
    setDeleteMember : function(info) {
      /*
      this.deleteMember.memberUID = info.memberUID;
      this.deleteMember.memberName = info.memberName;
      this.deleteMember.memberPhoneNumber = info.memberPhoneNumber;
      this.deleteMember.memberPosition = info.memberPosition;
      */
      // Call Functaion
      var callfunction = firebase.functions().httpsCallable('deleteMember');
      var postdata = {
        uid : info.memberUID
      };
      var self = this;
      callfunction(postdata).then(function(result) {
        // Read result of the Cloud Function.
        console.log(result);
      }).catch(function(error) {
        // Getting the Error details.
        var code = error.code;
        var message = error.message;
        var details = error.details;
        console.error('There was an error when calling the Cloud Function', error);
        window.alert('There was an error when calling the Cloud Function:\n\nError Code: '
        + code + '\nError Message:' + message + '\nError Details:' + details);
      });
      this.isComponentModalActiveForConfirmation = false;
    },
    clickDeleteButton : function(info, index) {
      console.log(info);
      this.deleteMember.memberUID = info.id;
      this.deleteMember.memberName = info.name;
      this.deleteMember.memberPhoneNumber = info.phoneNumber;
      this.deleteMember.memberPosition = info.position;
      this.isComponentModalActiveForConfirmation = true;
    },
    selectMember : function() {
      // Call Functaion
      var callfunction = firebase.functions().httpsCallable('selectMember');
      var postdata = {};
      var self = this;
      callfunction(postdata).then(function(result) {
        // Read result of the Cloud Function.
        self.displayMember = result.data;
        console.log(self.displayMember);
      }).catch(function(error) {
        // Getting the Error details.
        var code = error.code;
        var message = error.message;
        var details = error.details;
        console.error('There was an error when calling the Cloud Function', error);
        window.alert('There was an error when calling the Cloud Function:\n\nError Code: '
        + code + '\nError Message:' + message + '\nError Details:' + details);
      });
    }
  }
};
</script>

