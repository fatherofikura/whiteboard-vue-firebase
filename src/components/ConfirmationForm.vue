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
            <p class="card-header-title card-header-title-base" v-bind:style="statusIconStyle">
              <v-fa class="icon-base" v-bind:icon="statusIcon" />
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
                <br>
                <b-tooltip class="tag_hint" label="Note" type="is-dark" position="is-right">
                  <div class="tag_key">
                    <v-fa icon="bookmark" />
                  </div>
                </b-tooltip>
                <div class="tag_value">{{ note }}</div>
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
  props: ['memberUID', 'memberName', 'memberPhoneNumber', 'memberPosition', 'memberNote', 'memberStatusIcon', 'memberStatusIconStyle'],
  data() {
    return {
      uid: this.memberUID,
      name: this.memberName,
      phoneNumber: this.memberPhoneNumber,
      position: this.memberPosition,
      note: this.memberNote,
      statusIcon: this.memberStatusIcon,
      statusIconStyle: this.memberStatusIconStyle
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

<style>
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
</style>
