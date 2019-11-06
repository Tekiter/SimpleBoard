<template>
      <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand :to="{path: '/'}">Simple Board</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <b-navbar-nav class="ml-auto">
        
        <b-nav-item-dropdown right v-if="isLoggedIn">
          <template v-slot:button-content>
            <em>{{ username }}</em>
          </template>
          <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-navbar-nav v-else>
            <b-nav-item @click="$router.push({path: '/login'})">Login</b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<style scoped>

</style>
<script>
export default {
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn
        },
        username() {
            return this.$store.state.session.username
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
        }
    }
}
</script>