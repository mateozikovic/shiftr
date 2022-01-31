<template>
  <div>
    <topbar/>
    <router-view/>
  </div>
</template>

// todo make a workweek box

<script>
import Topbar from './components/menu/Topbar.vue'

export default {
 name: 'App',
 components: {
   'topbar': Topbar
 }
}
</script>
<style>

</style>
