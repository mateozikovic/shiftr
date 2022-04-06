<template>
  <div>
    <navigation-bar></navigation-bar>
    <div class="container">
      <error-alert v-if="error" :msg="error"></error-alert>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NavigationBar from "./components/NavigationBar.vue";
import ErrorAlert from "./components/ErrorAlert.vue";

export default {
  components: {
    NavigationBar,
    ErrorAlert,
  },
  computed: {
    ...mapGetters(["error"])
  }
};
</script>
<style>
.card {
  border-radius: 0px;
}
.btn {
  border-radius: 0px;
}
</style>
