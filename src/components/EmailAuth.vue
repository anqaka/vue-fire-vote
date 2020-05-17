<template>
  <div>
    <form v-on:submit.prevent>
      <div
        v-if="!login"
        class="input"
      >
        <label for="firstname">
          First name
        </label>
        <input
          id="firstname"
          v-model="formData.firstname"
          class="input__field"
          type="text"
          placeholder="First name"
          autocomplete="username"
        >
      </div>
      <div
        v-if="!login"
        class="input"
      >
        <label for="lastname">
          Last name
        </label>
        <input
          id="lastname"
          v-model="formData.lastname"
          class="input__field"
          type="text"
          placeholder="Last name"
          autocomplete="family-name"
        >
      </div>
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
          autocomplete=""
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
      <v-button
        v-if="login"
        :type="'submit'"
        @btn-event="signIn"
      >
        Log In
      </v-button>
      <v-button
        v-else
        :type="'submit'"
        @btn-event="createUser"
      >
        Create User
      </v-button>
    </form>
    <p v-if="login">
      You don't have account?
      <v-button
        :class="'button--link'"
        @btn-event="login = !login"
      >
        Create new one here
      </v-button>
    </p>
    <p v-else>
      You alread have an account?
      <v-button
        :class="'button--link'"
        @btn-event="login = !login"
      >
        Log in
      </v-button>
    </p>
    <v-button
      :class="'button--link'"
      @btn-event="backToSocial"
    >
      Log in with social media
    </v-button>
  </div>
</template>
<script>
import VButton from '@/components/Button.vue'
export default {
  components: {
    VButton
  },
  data () {
    return {
      formData: {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      },
      login: true
    }
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
    backToSocial () {
      this.$emit('update:emailPass', false)
    }
  }
}
</script>
