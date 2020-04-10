<template>
  <section class="col-xs-12 col-md-8">
    <button
      v-if="isLoggedIn"
      @click="logout"
    >
      Logout
    </button>
    <login v-else />
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import Login from './Login.vue'

export default {
  components: {
    Login
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  },
  methods: {
    logout () {
      this.$store.dispatch('signOut')
    }
  }
}
</script>
