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
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  {{ week.weekName }}
                </h5>
              </div>
              <div class="modal-body">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">name</th>
                      <th scope="col">Monday</th>
                      <th scope="col">Tuesday</th>
                      <th scope="col">Wednesday</th>
                      <th scope="col">Thursday</th>
                      <th scope="col">Friday</th>
                      <th scope="col">Saturday</th>
                      <th scope="col">Sunday</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(mon, index) in week.monday" :key="index">
                      <td>
                        {{ mon.workerName }}
                      </td>
                      <td>{{ mon.shift }}</td> 
                      <td>{{ week.tuesday[index].shift }}</td>
                      <td>{{ week.wednesday[index].shift }}</td>
                      <td>{{ week.thursday[index].shift }}</td>
                      <td>{{ week.friday[index].shift }}</td>
                      <td>{{ week.saturday[index].shift }}</td>
                      <td>{{ week.sunday[index].shift }}</td>
                    </tr>
                  </tbody>
                </table>
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
