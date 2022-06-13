<template>
  <div>
    <search-bar v-on:coworker-name="searchCoworker"> search </search-bar>
    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="result in resultArray"
        :key="result.id"
      >
        <div>
          <h3>Name: {{ result.name }}</h3>
        </div>
        <div>Username: {{ result.username }}</div>
        <div>Email: {{ result.email }}</div>
        <div>Company: {{ result.company }}</div>
        <button
          @click.prevent="addCoworker(result._id)"
          type="button"
          class="btn btn-primary btn-lg"
        >
          Add coworker
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import SearchBar from "../components/UI/SearchBar.vue";
import axios from "axios";

import { mapActions } from "vuex";

export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      resultArray: [],
    };
  },
  methods: {
    ...mapActions["search"],

    async searchCoworker(searchInput) {
      try {
        let results = await axios.get(
          "http://localhost:5000/api/search/coworker",
          {
            params: {
              name: searchInput,
            },
          }
        );
        this.resultArray = results.data;
        // console.log(this.resultArray);
      } catch (err) {
        console.log(err);
      }
    },
    async addCoworker(idNumber) {
      /**
       * send id to server via the button.
       */
      try {
        await axios.post("http://localhost:5000get/api/search/add", {
          addedUserId: idNumber,
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.list-group {
  width: 70%;
}
</style>
