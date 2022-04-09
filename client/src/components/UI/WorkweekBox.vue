<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Create a new workweek
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- Modal dialog body  -->
            <form @submit.prevent="nextWindow()">
              <label for="workweekName">Name your workweek</label>
              <input
                type="text"
                name="workweekName"
                id="workweekName "
                placeholder="enter a name.."
                v-model="workweekName"
              />
              <h3>select workers for this week</h3>
              <ul class="list-group">
                <li
                  class="list-group-item"
                  v-for="coworker in coworkersArray"
                  :key="coworker.id"
                >
                  <div>
                    {{ coworker.name }}
                    <input
                      class="cb"
                      type="checkbox"
                      id="coworker._id"
                      name="selected"
                      :value="coworker"
                      v-bind="coworker"
                      v-model="selectedWorkers"
                    />
                  </div>
                </li>
              </ul>
              <div class="modal-footer">
                <button class="btn btn-primary">next</button>
              </div>
            </form>

            <add-shift
              :workweek-name="workweekName"
              :selected-workers="selectedWorkers"
            ></add-shift>
            <!-- end of modal body -->
          </div>
        </div>
      </div>
    </div>
    <div class="card" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">Hi there!</h5>
        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          create a workweek
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AddShift from "./AddShift.vue";

export default {
  components: {
    AddShift,
  },
  data() {
    return {
      workweekName: "",
      coworkersArray: [],
      selectedWorkers: [],
    };
  },
  methods: {
    async getCoworkerList() {
      await axios
        .get("http://localhost:5000/api/search/coworkerlist")
        .then((response) => {
          this.coworkersArray = response.data;
        });
    },
    nextWindow() {
      console.log(this.workweekName);
      console.log(this.selectedWorkers);
    },
  },
  created() {
    this.getCoworkerList();
  },
};
</script>

<style scoped>
.card {
  margin: 25px;
}

label {
  margin: 2%;
}

list-group {
  margin: 2%;
}

input.cb {
  width: 25px;
  height: 25px;
  margin-left: 50px;
}

h3 {
  margin: 5px;
}
</style>
