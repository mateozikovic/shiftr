<template>
  <div class="input-group mb-3">
    <input
      id="coworkerName"
      v-model="coworkerName"
      type="text"
      class="form-control"
      placeholder="Search for coworkers"
      aria-label="Recipient's username"
      aria-describedby="button-addon2"
    />
    <button class="btn btn-outline-secondary" type="button" id="button-addon2"
    @click.prevent="sendCoworkerName">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  emits: ["coworker-name"],
  data() {
    return {
      coworkerName: "",
    };
  },
  methods: {
    sendCoworkerName() {
      this.$emit("coworker-name", this.coworkerName);
    },
  },
};
</script>

<style scoped>
.input-group {
  width: 60%;
  margin-top: 15px;
}
</style>
