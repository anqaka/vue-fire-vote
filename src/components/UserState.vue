<template>
  <section class="col-xs-12 col-md-8 login-section">
      <transition name="fade">
        <div
          v-if="isLoggedIn"
          class="col-xs-12"
        >
          Hi
          <span class="login-section__user">
            {{ user.displayName || user.email }}
          </span>!
          <br>
          Now you can vote on proposed topic or add your own proposition.
          <br>
          <v-button
            :class="'button--link'"
            @btn-event="logout"
          >
            Logout
          </v-button>
        </div>
      </transition>
      <transition name="fade">
        <div
          v-if="user && !user.emailVerified"
          class="col-xs-12"
        >
          <p>
            Hi
            <span class="login-section__user">
              {{ user.displayName || user.email }}
            </span>!
            <br>
            Your email address is not verified.
            <br>
            You should receive an email verification request, check your email box.
          </p>
          <p>
            If you didn't receive an email:
            <v-button
              :class="'button--link'"
              @btn-event="resendEmailVerification"
            >
              Resend email verification request
            </v-button>
          </p>
        </div>
      </transition>
      <transition name="fade">
        <v-button
          v-if="!user && !showLogin"
          @btn-event="showLogin = true"
        >
          Log in or create an account
        </v-button>
      </transition>
      <transition name="fade">
        <auth-user
          v-if="!user && showLogin"
          @hide-auth="showLogin = false"
        />
      </transition>
    <loader
      v-if="loading"
      class="loader--overlay"
    />
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
      'isLoggedIn',
      'user'
    ])
  },
  data () {
    return {
      loading: true,
      showLogin: false
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
    },
    resendEmailVerification () {
      this.$store.dispatch('sendEmailVerification')
    }
  }
}
</script>
<style lang="scss" scoped>
.login-section {
  position: relative;

  &__user {
    font-weight: bold;
  }
}
</style>
