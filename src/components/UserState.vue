<template>
  <section class="col-xs-12 col-md-8 login-section">
    <transition>
      <v-button
        v-if="isLoggedIn"
        @btn-event="logout"
      >
        Logout
      </v-button>
      <auth-user v-else />
    </transition>
    <loader v-if="loading" class="loader--overlay"/>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import AuthUser from '@/components/AuthUser.vue'
import Loader from '@/components/Loader.vue'
import VButton from '@/components/Button.vue'

export default {
  components: {
    AuthUser,
    Loader,
    VButton
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
