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
    this.$http.interceptors.response.use(undefined, (err) => {
      
      return new Promise((resolve, reject) => {
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
          this.$router.push({ path: `/login` })
        }
      })
    })
  }
}
</script>