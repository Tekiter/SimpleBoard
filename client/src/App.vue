<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<style>


</style>
<script>

export default {
  created() {
    
    this.$store.dispatch('restoreLogin')
    
  }
}
</script>