<template>
  <div id="app">
    <header>
      <nav id="nav" class="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
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

export default {
  created () {
    this.$store.dispatch('bindTopics')
  },
  mixins: [notification],
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
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
    padding: $spacer--xs $spacer--s;
  }
}
</style>
