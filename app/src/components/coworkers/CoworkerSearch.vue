<template>
  <form action="submit">
    <input v-model.trim.lazy="search" type="text" id="coworker-search-input" name="coworkers-search" placeholder="Search for coworkers...">
    <button type="submit">Search</button>
  </form>
</template>

<script>
export default {
  name: "CoworkerSearch",
  methods: {
    onSubmit() {
      this.$emit('coworker-searched', this.search)
    }
  },
  data() {
    return {
      search:""
    }
  }
}
</script>

<style>
    input[type=text] {
  width: 130px;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
}

/* When the input field gets focus, change its width to 100% */
input[type=text]:focus {
  width: 100%;
}
</style>