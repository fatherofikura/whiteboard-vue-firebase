<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirmation Required</p>
      </header>
      <section class="modal-card-body">
        Are you sure to delete this entry?
        <hr>
        <b-collapse class="card card-base">
          <div class="card-header">
            <p class="card-header-title card-header-title-base">
              <span>{{ name }}</span>
            </p>
          </div>
          <div class="card-content card-content-base">
            <div class="content">
              <div class="tag_base">
                <b-tooltip class="tag_hint" label="Position" type="is-dark" position="is-right">
                  <div class="tag_key">
                    <v-fa icon="id-badge" />
                  </div>
                </b-tooltip>
                <div class="tag_value">{{ position }}</div>
                <br>
                <b-tooltip class="tag_hint" label="PhoneNumber" type="is-dark" position="is-right">
                  <div class="tag_key">
                    <v-fa icon="phone-square" />
                  </div>
                </b-tooltip>
                <div class="tag_value">{{ phoneNumber }}</div>
              </div>
            </div>
          </div>
        </b-collapse>
      </section>
      <footer class="modal-card-foot">
        <b-button class="button" @click="$parent.close()">
          <v-fa icon="times" />
          <span>Cancel</span>
        </b-button>
        <b-button class="button" type="is-info" @click="deleteMemberChild">
          <v-fa icon="check" />
          <span>Delete</span>
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
