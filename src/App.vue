<template>
  <div id="app">
    <header>
      <nav id="nav" class="nav">
        <router-link to="/" class="link">Home</router-link>
        <router-link
          v-if="isAdmin"
          to="/admin-dashboard"
          class="link"
        >Admin Dashboard</router-link>
      </nav>
    </header>
    <main class="container">
      <router-view/>
    </main>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import notification from '@/mixins/notification.js'
import fb from '@/mixins/facebook.js'

export default {
  created () {
    this.$store.dispatch('bindTopics')
    this.$store.dispatch('onAuthStateChanged')
  },
  mixins: [notification, fb],
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      isAdmin: 'isAdmin'
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $gray-darker;
}

.nav {
  padding: 30px;

  a {
    padding: $spacer--xs 0;
    margin: 0 $spacer--m;
  }
}
</style>
