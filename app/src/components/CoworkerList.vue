<template>
  <div>
    <h1>Search results</h1>
    <button v-on:click="getUserData">press</button>
    <ul>
      <li>{{}}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CoworkerList",
  data() {
    return {};
  },
  methods: {
    getUserData() {
      axios
        .get("userlistsearch/mateo", {withCredentials: true})
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
