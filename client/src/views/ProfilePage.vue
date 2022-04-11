<template>
  <div>
    <h2>Profile</h2>
    <div class="card" v-if="user">
      <ul class="list-group">
        <li class="list-group-item">Email: {{ user.email }}</li>
        <li class="list-group-item">Username: {{ user.username }}</li>
        <li class="list-group-item">Name: {{ user.name }}</li>
        <li class="list-group-item">Company: {{ user.company }}</li>
      </ul>
    </div>
    <div>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="coworker in coworkersArray"
          :key="coworker.id"
        >
          <div>Name: {{ coworker.name }}</div>
          <div>Email: {{ coworker.email }}</div>
          <div>Company: {{ coworker.company }}</div>
          <button type="button" class="btn btn-danger" @click="deleteCoworker(coworker._id)">Delete coworker</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      coworkersArray: [],
    };
  },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile"]),
    async getCoworkerList() {
      await axios
        .get("/api/search/coworkerlist")
        .then((response) => {
          this.coworkersArray = response.data;
        });
    },
    deleteCoworker(cowId) {
      axios.post("/api/search/deletecoworker", {coworkerId: cowId})
      this.getCoworkerList();
    }
  },
  created() {
    this.getProfile();
    this.getCoworkerList();
  },
};
</script>

<style></style>
