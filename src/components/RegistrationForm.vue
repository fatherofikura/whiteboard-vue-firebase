<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p v-if="uid == '' "  class="modal-card-title">Member Registration</p>
        <p v-else class="modal-card-title">Member Edit</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Name" :type="{'is-danger': errors.has('name')}" :message="errors.first('name')">
          <b-input placeholder="Your Name" type="text" name="name" v-model="name" v-validate="'required'" ata-vv-as="名前"></b-input>
        </b-field>

        <b-field label="Phone Number" :type="{'is-danger': errors.has('phoneNumber')}" :message="errors.first('phoneNumber')">
          <b-input placeholder="Your Phone Number" name="phoneNumber" v-model="phoneNumber" v-validate="'numeric'" ata-vv-as="電話番号"></b-input>
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
    async registMemberChild() {
      const isValid = await this.$validator.validate();
      if(!isValid) return;

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
