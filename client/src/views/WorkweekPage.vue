<template>
  <div class="container">
    <ul class="workweek-list">
      <li>
        <workweek-box></workweek-box>
        <workweek-modal></workweek-modal>
      </li>
    </ul>
  </div>
</template>

<script>
import WorkweekBox from "../components/UI/WorkweekBox.vue";
import WorkweekModal from "../components/UI/WorkweekModal.vue"
export default {
  components: {
    WorkweekBox,
    WorkweekModal
  },
};
</script>

<style scoped>
.workweek-list {
  list-style: none;
}
</style>
