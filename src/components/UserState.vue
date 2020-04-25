<template>
  <section class="col-xs-12 col-md-8 login-section">
    <transition>
      <button
        v-if="isLoggedIn"
        class="button"
        @click="logout"
      >
        Logout
      </button>
      <login v-else />
    </transition>
    <loader v-if="loading" class="loader--overlay"/>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import Login from './Login.vue'
import Loader from './Loader.vue'

export default {
  components: {
    Login,
    Loader
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  },
  data () {
    return {
      loading: true
    }
  },
  mounted () {
    this.$store.dispatch('onAuthStateChanged').then(() => {
      this.loading = false
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('signOut')
    }
  }
}
</script>
<style lang="scss" scoped>
.login-section {
  position: relative;
}
</style>
