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
import { auth } from './../db'
import { mapGetters } from 'vuex'
import VButton from '@/components/Button.vue'
import Loader from '@/components/Loader.vue'
import AuthUser from '@/components/AuthUser.vue'

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
      auth
        .signOut()
        .then(() => {
          this.$store.commit('notification/push', {
            message: 'You logged out successfully',
            title: 'Success',
            type: 'success'
          }, { root: true })
        }).catch((err) => {
          this.$store.commit('notification/push', {
            message: err.message,
            title: 'Error',
            type: 'error'
          }, { root: true })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-section {
  position: relative;
}
</style>
