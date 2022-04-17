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
            <div v-if="showForm">
              <form @submit.prevent="nextButton">
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
                    v-for="(coworker, index) in coworkersArray"
                    :key="index"
                  >
                    <div>
                      {{ coworker.name }}
                      <input
                        class="cb"
                        type="checkbox"
                        id="coworker._id"
                        name="selected"
                        :value="coworker"
                        v-model="selectedWorkers"
                      />
                    </div>
                  </li>
                </ul>
                <button class="btn btn-primary">next</button>
              </form>
            </div>
            <add-shift
              v-if="showList"
              :workweek-name="workweekName"
              :selected-workers="selectedWorkers"
            ></add-shift>
            <!-- end of modal body -->
          </div>
        </div>
      </div>
    </div>

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
</template>

<script>
import axios from "axios";
import AddShift from "./AddShift.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AddShift,
  },
  computed: mapGetters(["user"]),
  data() {
    return {
      showList: false,
      showForm: true,
      workweekName: "",
      coworkersArray: [],
      selectedWorkers: [],
    };
  },
  methods: {
    ...mapActions(["getProfile"]),
    async getCoworkerList() {
      console.log(this.user)
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
    nextButton() {
      this.showList = true;
      this.showForm = false;
    },
    pushUserToWorkerList() {
      this.selectedWorkers.push(this.user);
    },
  },
  created() {
    this.getCoworkerList();
    this.getProfile();
    this.pushUserToWorkerList();
  },
};
</script>

<style scoped>
button.btn {
  margin: 5px;
}

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

h5 {
  margin-top: 25px;
}
</style>
