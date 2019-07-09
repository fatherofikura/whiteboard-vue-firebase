<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirmation Required</p>
      </header>
      <section class="modal-card-body">
        Are you sure to this entry?
        <hr>
        <b-taglist attached>
          <b-tag type="is-dark">Name</b-tag>
          <b-tag type>{{ memberName }}</b-tag>
        </b-taglist>
        <b-taglist attached>
          <b-tag type="is-dark">Position</b-tag>
          <b-tag type>{{ memberPosition }}</b-tag>
        </b-taglist>
        <b-taglist attached>
          <b-tag type="is-dark">Phone Number</b-tag>
          <b-tag type>{{ memberPhoneNumber }}</b-tag>
        </b-taglist>
      </section>
      <footer class="modal-card-foot">
        <b-button class="button" @click="$parent.close()">
          <v-fa icon="times" />
          <span>Close</span>
        </b-button>
        <b-button class="button" type="is-info" @click="deleteMemberChild">
          <v-fa icon="check" />
          <span>Yes</span>
        </b-button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  props: ['memberUID', 'memberName', 'memberPhoneNumber', 'memberPosition'],
  data() {
    return {
      uid: this.memberUID,
      name: this.memberName,
      phoneNumber: this.memberPhoneNumber,
      position: this.memberPosition
    }
  },
  methods: {
    deleteMemberChild : function() {
      var memberInfo = {
        memberUID : this.uid,
        memberName : this.name,
        memberPhoneNumber : this.phoneNumber,
        memberPosition : this.position,
      };
      console.log(memberInfo);
      this.$emit('deleted', memberInfo );
    }
  }
};
</script>
