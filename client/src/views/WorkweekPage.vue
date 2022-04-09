<template>
  <div class="container">
    <ul class="workweek-list">
      <li>
        <workweek-box></workweek-box>
      </li>
    </ul>
  </div>
</template>

<script>
import WorkweekBox from "../components/UI/WorkweekBox.vue";
export default {
  components: {
    WorkweekBox,
  },
};
</script>

<style scoped>
.workweek-list{
    list-style: none;
}
</style>