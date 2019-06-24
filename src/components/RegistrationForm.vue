<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Member Registration</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Name">
          <b-input :value="memberName" placeholder="Your Name" required></b-input>
        </b-field>
        <b-field label="Phone Number">
          <b-input :value="memberPhoneNumber" placeholder="Your Phone Number" required></b-input>
        </b-field>
        <b-field label="Position">
          <b-input :value="memberPosition" placeholder="Your Position"></b-input>
        </b-field>
      </section>

      <footer class="modal-card-foot">
        <button class="button" @click="$parent.close()">Close</button>
        <button class="button" @click="registMemberChild">Registration</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  props: ['memberName', 'memberPhoneNumber', 'memberPosition'],
  methods: {
    registMemberChild : function() {
      this.$emit('registed');
    }
  }
};
</script>
