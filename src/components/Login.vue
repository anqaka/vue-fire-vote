<template>
  <section class="form-section">
    <h2>Login</h2>
    <form>
      <h3>You have to be logged in if you want to vote or add your proposition</h3>
      <div class="input">
        <label for="email">
          Email
        </label>
        <input
          id="email"
          v-model="formData.email"
          class="input__field"
          type="email"
          placeholder="email"
          ref="loginemail"
        >
      </div>
      <div class="input">
        <label for="password">
          Password
        </label>
        <input
          id="password"
          v-model="formData.password"
          class="input__field"
          type="password"
          placeholder="password"
        >
      </div>
      <div class="form-section__action">
        <button
          class="button"
          type="button"
          @click="signIn"
        >
          Log In
        </button>
        <button
          class="button button--facebook"
          type="button"
          @click="signInFb"
        >
          <img class="button__icon" src="../assets/images/fb-icon.svg" />
          Log In with Facebook
        </button>
        <button
          class="button button--twitter"
          type="button"
          @click="signInTwitter"
        >
          <img class="button__icon" src="../assets/images/twitter-icon.svg" />
          Log In with Twitter
        </button>
        <button
          class="button"
          type="button"
          @click="createUser"
        >
          Create
        </button>
        <p class="form-section__message">
          {{ message }}
        </p>
      </div>
    </form>
  </section>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import fb from '@/mixins/facebook.js'
export default {
  directives: { focus: focus },
  mixins: [fb],
  data: () => ({
    formData: {
      email: '',
      password: ''
    },
    message: ''
  }),
  computed: {
    ...mapState({
      user: state => state.user
    }),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    })
  },
  methods: {
    signIn () {
      this.$store.dispatch('signIn', {
        email: this.formData.email,
        password: this.formData.password
      })
    },
    createUser () {
      this.$store.dispatch('createUser', {
        email: this.formData.email,
        password: this.formData.password
      })
    },
    signInFb () {
      this.$store.dispatch('signInFb')
    },
    signInTwitter () {
      this.$store.dispatch('signInTwitter')
    }
  }
}
</script>
<style lang="scss" scoped>
.button {
  padding: 0 15px;
  &--facebook {
    background-color: #4267b2;
    border-color: #4267b2;
  }
  &--twitter {
    background-color: #1da1f2;
    border-color: #1da1f2;

    .button__icon {
      padding: 4px;
    }
  }

  &__icon {
    width: 40px;
    height: 40px;
    margin-right: $spacer--xs;
  }
}
</style>
