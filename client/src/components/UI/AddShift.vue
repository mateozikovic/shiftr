<template>
  <div>
    <h2>{{ workweekName }}</h2>
    <div>{{ selectedWorkers }}</div>
    <form></form>
  </div>
</template>

<script>
export default {
  props: ["workweekName", "selectedWorkers"],
};
</script>
