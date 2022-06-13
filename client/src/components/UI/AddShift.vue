<template>
  <div>
    <h2>{{ workweekName }}</h2>
    <div>enter shift hours:</div>
    <form @submit.prevent="createWorkweek">
    <div class="worker-name">Enter your hours</div>
      <ul v-for="(workers, index) in selectedWorkers" :key="index">
        <li>
          <div class="worker-name">{{ workers.name }}</div>
          <ul>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Monday</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="enter shift"
                v-model="monday[index].shift"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Tuesday</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="enter shift"
                v-model="tuesday[index].shift"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Wednesday</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="enter shift"
                v-model="wednesday[index].shift"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Thursday</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="enter shift"
                v-model="thursday[index].shift"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Friday</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="enter shift"
                v-model="friday[index].shift"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Saturday</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="enter shift"
                v-model="saturday[index].shift"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Sunday</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="enter shift"
                v-model="sunday[index].shift"
              />
            </div>
          </ul>
        </li>
      </ul>
      <div class="modal-footer">
        <button class="btn btn-primary">create workweek</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["workweekName", "selectedWorkers"],
  data() {
    return {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };
  },
  methods: {
    async createWorkweek() {
      try {
        await axios.post("http://localhost:5000/api/workweek/create", {
          weekName: this.workweekName,
          workers: this.selectedWorkers,
          monday: this.monday,
          tuesday: this.tuesday,
          wednesday: this.wednesday,
          thursday: this.thursday,
          friday: this.friday,
          saturday: this.saturday,
          sunday: this.sunday,
        });
      } catch (err) {
        console.log(err);
      }
    },
    initArray() {
      for (let i = 0; i < this.selectedWorkers.length; i++) {
        this.monday.push({
          workerName: this.selectedWorkers[i].name,
          shift: "",
        });
      }
      for (let i = 0; i < this.selectedWorkers.length; i++) {
        this.tuesday.push({
          workerName: this.selectedWorkers[i].name,
          shift: "",
        });
      }
      for (let i = 0; i < this.selectedWorkers.length; i++) {
        this.wednesday.push({
          workerName: this.selectedWorkers[i].name,
          shift: "",
        });
      }
      for (let i = 0; i < this.selectedWorkers.length; i++) {
        this.thursday.push({
          workerName: this.selectedWorkers[i].name,
          shift: "",
        });
      }
      for (let i = 0; i < this.selectedWorkers.length; i++) {
        this.friday.push({
          workerName: this.selectedWorkers[i].name,
          shift: "",
        });
      }
      for (let i = 0; i < this.selectedWorkers.length; i++) {
        this.saturday.push({
          workerName: this.selectedWorkers[i].name,
          shift: "",
        });
      }
      for (let i = 0; i < this.selectedWorkers.length; i++) {
        this.sunday.push({
          workerName: this.selectedWorkers[i].name,
          shift: "",
        });
      }
      console.log(this.monday);
      console.log(this.tuesday);
      console.log(this.wednesday);
      console.log(this.thursday);
      console.log(this.friday);
      console.log(this.saturday);
      console.log(this.sunday);
    },
  },
  created() {
    console.log(this.workweekName);
    console.log(this.selectedWorkers);

    this.initArray();
  },
};
</script>

<style scoped>
li {
  list-style: none;
}

.worker-name {
  text-decoration: underline;
  color: blueviolet;
  margin-top: 25px;
  margin-bottom: 15px;
}
</style>
