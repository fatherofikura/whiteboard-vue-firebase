<template>
  <div class="memberlist">
    <section>
      <draggable class="columns is-multiline">
        <div v-for="(Member, index) in displayMember" v-bind:key="index">
          <div class="column">
            <b-collapse class="card">
              <div class="card-header" role="button" @click="clickCard(Member)">
                <p class="card-header-title">
                  {{ Member.name }}
                </p>
              </div>
              <div class="card-content" @click="clickCard(Member)">
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
                <a slot="trigger" class="card-footer-item" role="button" @click="clickEditButton(Member)">
                  <v-fa icon="user-edit" />
                  <span>Edit</span>
                </a>
                <b-modal :active.sync="isComponentModalActiveForEdit" has-modal-card>
                  <registration-form v-bind="editMember" v-on:edited="setEditMember"></registration-form>
                </b-modal>
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
      </draggable>
    </section>
    <br>
    <section>
      <b-button class="button" @click="clickRegistButton()">
        <v-fa icon="user-plus" />
        <span>Regist</span>
      </b-button>
      <b-modal :active.sync="isComponentModalActiveForRegistration" has-modal-card>
        <registration-form v-bind="editMember" v-on:registed="setRegistMember"></registration-form>
      </b-modal>
    </section>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import RegistrationForm from "./RegistrationForm.vue";
import ConfirmationForm from "./ConfirmationForm.vue";

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
      editMember: {
        memberUID: '',
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
    };
  },
  created: function() {
    this.$store.dispatch("member/selectMember");
  },
  methods: {
    setRegistMember : function(info) {
      // Call Functaion
      var member = {
        memberName : info.memberName,
        memberPhoneNumber : info.memberPhoneNumber,
        memberPosition : info.memberPosition
      };
      this.$store.dispatch("member/insertMember", member);
      this.isComponentModalActiveForRegistration = false;
    },
    setEditMember : function(info) {
      // Call Functaion
      var member = {
        memberUID : info.memberUID,
        memberName : info.memberName,
        memberPhoneNumber : info.memberPhoneNumber,
        memberPosition : info.memberPosition
      };
      this.$store.dispatch("member/updateMember", member);
      this.isComponentModalActiveForEdit = false;
    },
    setDeleteMember : function(info) {
      // Call Functaion
      var member = {
        memberUID : info.memberUID
      }
      this.$store.dispatch("member/deleteMember", member);
      this.isComponentModalActiveForConfirmation = false;
    },
    clickCard : function(info, index) {
      // console.log(info);
    },
    clickRegistButton : function() {
      this.editMember.memberUID = "";
      this.editMember.memberName = "";
      this.editMember.memberPhoneNumber = "";
      this.editMember.memberPosition = "";
      this.isComponentModalActiveForRegistration = true;
    },
    clickEditButton : function(info, index) {
      this.editMember.memberUID = info.id;
      this.editMember.memberName = info.name;
      this.editMember.memberPhoneNumber = info.phoneNumber;
      this.editMember.memberPosition = info.position;
      this.isComponentModalActiveForEdit = true;
    },
    clickDeleteButton : function(info, index) {
      this.deleteMember.memberUID = info.id;
      this.deleteMember.memberName = info.name;
      this.deleteMember.memberPhoneNumber = info.phoneNumber;
      this.deleteMember.memberPosition = info.position;
      this.isComponentModalActiveForConfirmation = true;
    }
  },
  computed: {
    displayMember() {
      return this.$store.getters['member/currentMember'];
    },
  },
};
</script>

