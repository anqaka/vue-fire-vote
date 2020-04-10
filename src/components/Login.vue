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
          type="button"
          @click="signIn"
        >
          Log In
        </button>
        <button
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
export default {
  directives: { focus: focus },
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
    }
  }
}
</script>
