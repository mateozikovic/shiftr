<template>

  <div class="topnav flex-containter">
    <router-link to="/" class="active">Home</router-link>
    <router-link to="/coworkers">Coworkers</router-link>
    <router-link to="/about">About</router-link>
  </div>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.topnav {
  background-color: #1abc9c;
  overflow: hidden;
  width: 100vw;
}

.topnav a {
   float: left;
  color: #ffffff;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #2c3e50;
  color: #ffffff;
}

.flex-containter {
  display: flex;
  flex-direction: row;
}
</style>
