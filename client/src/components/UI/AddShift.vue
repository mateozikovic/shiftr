<template>
  <div>
    <h2>{{ workweekName }}</h2>
    <div>enter shift hours:</div>
    <form>
      <ul v-for="workers in selectedWorkers" :key="workers.id">
        <li>
          {{ workers.name }}
          <ul>
            <li>
              <label for="monday">Monday</label>
              <input type="text" name="monday" id="monday" />
            </li>
            <li>
              <label for="monday">Tuesday</label>
              <input type="text" name="tuesday" id="tuesday" />
            </li>
            <li>
              <label for="monday">Wednesday</label>
              <input type="text" name="wednesday" id="wednesday" />
            </li>
            <li>
              <label for="monday">Thursday</label>
              <input type="text" name="thursday" id="thursday" />
            </li>
            <li>
              <label for="monday">Friday</label>
              <input type="text" name="friday" id="friday" />
            </li>
            <li>
              <label for="monday">Saturday</label>
              <input type="text" name="saturday" id="saturday" />
            </li>
            <li>
              <label for="monday">Sunday</label>
              <input type="text" name="sunday" id="sunday" />
            </li>
          </ul>
        </li>
      </ul>
      <button>create</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["workweekName", "selectedWorkers"],
};
</script>

<style scoped>
li {
  list-style: none;
}
</style>
