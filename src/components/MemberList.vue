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
                <a class="card-footer-item">
                  <v-fa icon="user-times" />
                  <span>delete</span>
                </a>
              </footer>
            </b-collapse>
          </div>
        </div>
      </div>
    </section>
    <br>
    <section>
      <b-button class="button" @click="isComponentModalActive = true">
        <v-fa icon="user-plus" />
        <span>Regist</span>
      </b-button>
      <b-modal :active.sync="isComponentModalActive" has-modal-card>
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

export default {
  components: {
    RegistrationForm
  },
  name: "memberlist",
  data() {
    return {
      isComponentModalActive: false,
      newMember: {
        memberName: '',
        memberPhoneNumber: '',
        memberPosition: ''
      },
      displayMember: {}
    };
  },
  created: function() {
    var _this = this;
    firebase.database().ref('/member').on('value', function(snapshot) {
      _this.displayMember = snapshot.val(); // データに変化が起きたときに再取得する
    });
  },
  methods: {
    setNewMember : function(info) {
      this.newMember.memberName = info.memberName;
      this.newMember.memberPhoneNumber = info.memberPhoneNumber;
      this.newMember.memberPosition = info.memberPosition;
      this.isComponentModalActive = false;
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
  },
  watch: {
    newMember: {
      handler: function (val, oldVal) {
        // Call Functaion
        var callfunction = firebase.functions().httpsCallable('insertMember');
        var postdata = {
          name : this.newMember.memberName,
          phoneNumber : this.newMember.memberPhoneNumber,
          position : this.newMember.memberPosition
        };
        var self = this;
        callfunction(postdata).then(function(result) {
          // Read result of the Cloud Function.
          console.log(result);
          self.displayMember = result.data;
        }).catch(function(error) {
          // Getting the Error details.
          var code = error.code;
          var message = error.message;
          var details = error.details;
          console.error('There was an error when calling the Cloud Function', error);
          window.alert('There was an error when calling the Cloud Function:\n\nError Code: '
          + code + '\nError Message:' + message + '\nError Details:' + details);
        });
      },
      deep: true
    }
  }
};
</script>

