<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Member Registration</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Name">
          <b-input placeholder="Your Name" v-model="name" required></b-input>
        </b-field>
        <b-field label="Phone Number">
          <b-input placeholder="Your Phone Number" v-model="phoneNumber"></b-input>
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
  props: ['memberName', 'memberPhoneNumber', 'memberPosition'],
  data() {
    return {
      name: this.memberName,
      phoneNumber: this.memberPhoneNumber,
      position: this.memberPosition
    }
  },
  methods: {
    registMemberChild : function() {
      var memberInfo = {
        memberName : this.name,
        memberPhoneNumber : this.phoneNumber,
        memberPosition : this.position,
      };
      console.log(memberInfo);
      this.$emit('registed', memberInfo );
    }
  }
};
</script>
