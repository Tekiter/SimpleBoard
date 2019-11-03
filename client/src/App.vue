<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<style>


</style>
<script>
import session from "@/utils/session.js"
export default {
  created() {
    this.$http.defaults.baseURL = session.apiURL
  }
}
</script>