<template>
    <div class="topnav flex-containter">
        <a class="active" href="/home">Home</a>
        <a href="/coworkers">Coworkers</a>
        <a href="/about">About</a>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
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