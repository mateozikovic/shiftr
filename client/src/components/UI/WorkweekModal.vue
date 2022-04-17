<template>
  <div>
    <ul>
      <li v-for="(week, index) in workWeeks" :key="index">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ week.weekName }}</h5>
            <!-- Button trigger modal -->
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Look at shifts
            </button>
          </div>
        </div>

        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  {{ week.weekName }}
                </h5>
              </div>
              <div class="modal-body">
                <ul>
                  <h4>Monday</h4>
                  <li v-for="(mon, index) in week.monday" :key="index">
                    {{ mon.workerName }} - Shift: {{ mon.shift }}
                  </li>
                  <h4>Tuesday</h4>
                  <li v-for="(tue, index) in week.tuesday" :key="index">
                    {{ tue.workerName }} - Shift: {{ tue.shift }}
                  </li>
                  <h4>Wednesday</h4>
                  <li v-for="(wed, index) in week.wednesday" :key="index">
                    {{ wed.workerName }} - Shift: {{ wed.shift }}
                  </li>
                  <h4>Thursday</h4>
                  <li v-for="(thu, index) in week.thursday" :key="index">
                    {{ thu.workerName }} - Shift: {{ thu.shift }}
                  </li>
                  <h4>Friday</h4>
                  <li v-for="(fri, index) in week.friday" :key="index">
                    {{ fri.workerName }} - Shift: {{ fri.shift }}
                  </li>
                  <h4>Saturday</h4>
                  <li v-for="(sat, index) in week.saturday" :key="index">
                    {{ sat.workerName }} - Shift: {{ sat.shift }}
                  </li>
                  <h4>Sunday</h4>
                  <li v-for="(sun, index) in week.sunday" :key="index">
                    {{ sun.workerName }} - Shift: {{ sun.shift }}
                  </li>
                </ul>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-danger">
                  Delete this week
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    {{ displayWeeks.weekName }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      workWeeks: [],
      displayWeeks: [],
    };
  },
  methods: {
    async getWorkWeeks() {
      await axios
        .get("http://localhost:5000/api/workweek/returnall")
        .then((results) => {
          try {
            results.data.forEach((element) => this.workWeeks.push(element));
            console.log(this.workWeeks);
          } catch (err) {
            console.log(err);
          }
        });
    },
  },
  created() {
    this.getWorkWeeks();
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
</style>
