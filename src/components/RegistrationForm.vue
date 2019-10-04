<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p v-if="uid == '' "  class="modal-card-title">Member Registration</p>
        <p v-else class="modal-card-title">Member Edit</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Name">
          <b-input placeholder="Your Name" v-model="name" required></b-input>
        </b-field>
        <b-field label="Phone Number">
          <b-input placeholder="Your Phone Number" v-model="phoneNumber" type="number"></b-input>
        </b-field>
        <b-field label="Position">
          <b-input placeholder="Your Position" v-model="position"></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button class="button" @click="$parent.close()">
          <v-fa icon="times" />
          <span>Close</span>
        </b-button>
        <b-button class="button" type="is-info" @click="registMemberChild">
          <v-fa icon="check" />
          <span>Registration</span>
        </b-button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  props: ['memberUID', 'memberName', 'memberPhoneNumber', 'memberPosition', 'memberStatus', 'memberNote'],
  data() {
    return {
      uid: this.memberUID,
      name: this.memberName,
      phoneNumber: this.memberPhoneNumber,
      position: this.memberPosition,
      status: this.memberStatus,
      note : this.memberNote
    }
  },
  methods: {
    registMemberChild : function() {
      var memberInfo = {
        memberUID : this.uid,
        memberName : this.name,
        memberPhoneNumber : this.phoneNumber,
        memberPosition : this.position,
        memberStatus : this.status,
        memberNote : this.note
      };
      if (this.uid == '') {
        this.$emit('registed', memberInfo );
      } else {
        this.$emit('edited', memberInfo );
      }
    }
  }
};
</script>

<style>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
     -webkit-appearance: none;
     margin: 0;
}

input[type="number"] {
     -moz-appearance:textfield;
}
input::-ms-clear {
     visibility:hidden
}
</style>
