<template>
  <div id="app google-font">
   <nav class="main-nav">
     <div class="logo">
       shiftr 
     </div>
     <Burger></Burger>
   </nav>

   <Sidebar>
     <ul class="sidebar-panel-nav">
       <li><a href="#home">Workweek</a></li>
       <li><a href="#coworkers">Coworkers</a></li>
       <li><a href="#about">About</a></li>
     </ul>
   </Sidebar>
 </div>

</template>

// todo make a workweek box

<script>
import Burger from './components/menu/Burger.vue';
import Sidebar from './components/menu/Sidebar.vue';
// import Coworkers from './components/Coworkers.vue'

export default {
 name: 'App',
 components: {
   Burger,
   Sidebar,
//   Coworkers
 }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap');

html {
   height: 100%;
   overflow:hidden;
 }

 google-font{
   font-family: 'Montserrat', sans-serif;
 }

 body {
   border: 0; margin: 0; padding: 0;
   font-family: 'Lato';
   height: 100%;
   background: rgb(101,31,87);
   background: linear-gradient(45deg, rgba(101,31,87,1) 0%, rgba(225,113,87,1) 48%, rgba(249,248,113,1) 100%);
   font-family: 'Montserrat', sans-serif;
 }

 .logo {
   align-self: center;
   color: #fff;
   font-weight: bold;
   font-family: 'Lato'
 }

 .main-nav {
   display: flex;
   justify-content: space-between;
   padding: 0.5rem 0.8rem;
 }

 ul.sidebar-panel-nav {
   list-style-type: none;
 }

 ul.sidebar-panel-nav > li > a {
   color: #fff;
   text-decoration: none;
   font-size: 1.5rem;
   display: block;
   padding-bottom: 0.5em;
 }
</style>
