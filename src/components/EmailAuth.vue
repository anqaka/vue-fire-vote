<template>
  <div>
    <form v-on:submit.prevent>
      <div
        v-if="!login"
        :class="['input', { 'input--error': $v.formData.firstname.$error }]"
      >
        <label for="firstname">
          First name
        </label>
        <input
          id="firstname"
          v-model="$v.formData.firstname.$model"
          class="input__field"
          type="text"
          placeholder="First name"
          autocomplete="username"
        >
        <div
          v-if="!$v.formData.firstname.required"
          class="error"
        >
          Field is required
        </div>
      </div>
      <div
        v-if="!login"
        :class="['input', { 'input--error': $v.formData.lastname.$error }]"
      >
        <label for="lastname">
          Last name
        </label>
        <input
          id="lastname"
          v-model="$v.formData.lastname.$model"
          class="input__field"
          type="text"
          placeholder="Last name"
          autocomplete="family-name"
        >
        <div
          v-if="!$v.formData.lastname.required"
          class="error"
        >
          Field is required
        </div>
      </div>
      <div
        v-if="!isLinkingProviderPassword"
        :class="['input', { 'input--error': $v.formData.email.$error }]"
      >
        <label for="email">
          Email
        </label>
        <input
          id="email"
          v-model.trim="$v.formData.email.$model"
          class="input__field"
          type="email"
          placeholder="email"
          :autocomplete="isLinkingProviderPassword ? 'off' : 'email'"
        >
        <div
          v-if="!$v.formData.email.required"
          class="error"
        >
          Field is required
        </div>
        <div
          v-if="!$v.formData.email.email"
          class="error"
        >
          It's not valid email address
        </div>
      </div>
      <div :class="['input', { 'input--error': $v.formData.password.$error }]">
        <label for="password">
          Password
        </label>
        <input
          id="password"
          v-model="$v.formData.password.$model"
          class="input__field"
          type="password"
          placeholder="password"
          :autocomplete="login ? 'current-password' : 'new-password'"
        >
        <div
          v-if="!$v.formData.password.required"
          class="error"
        >
          Field is required
        </div>
      </div>
      <v-button
        v-if="login"
        :type="'submit'"
        :disabled="$v.$invalid"
        @btn-event="signIn"
      >
        Log In
      </v-button>
      <v-button
        v-else-if="!isLinkingProviderPassword"
        :type="'submit'"
        :disabled="$v.$invalid"
        @btn-event="createUser"
      >
        Create User
      </v-button>
    </form>
    <template v-if="!isLinkingProviderPassword">
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
    </template>
  </div>
</template>
<script>
import { auth } from './../db'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import linkAccount from '@/mixins/linkAccount.js'
import VButton from '@/components/Button.vue'

export default {
  components: {
    VButton
  },
  computed: {
    ...mapGetters({
      linkProvider: 'linkProvider',
      linkCreds: 'linkCreds',
      linkEmail: 'linkEmail'
    }),
    isLinkingProviderPassword () {
      return this.linkProvider === 'password'
    }
  },
  mixins: [validationMixin, linkAccount],
  data () {
    return {
      formData: {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      },
      login: true,
      submitStatus: null
    }
  },
  validations () {
    if (this.isLinkingProviderPassword) {
      return {
        formData: {
          password: {
            required
          }
        }
      }
    } else if (this.login && !this.isLinkingProviderPassword) {
      return {
        formData: {
          email: {
            required,
            email
          },
          password: {
            required
          }
        }
      }
    } else {
      return {
        formData: {
          firstname: {
            required
          },
          lastname: {
            required
          },
          email: {
            required,
            email
          },
          password: {
            required
          }
        }
      }
    }
  },
  methods: {
    signIn () {
      // if sing in is connected with linking account set email value
      if (this.isLinkingProviderPassword) {
        this.formData.email = this.linkEmail
      }
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        auth.signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        ).then((result) => {
          const user = result.user
          if (this.isLinkingProviderPassword) {
            this.linkAccountCreds(user, this.linkCreds)
          }
        }).catch((err) => {
          if (err.code === 'auth/account-exists-with-different-credential') {
            this.setLinkingAccountData(err)
          } else if (err.code === 'auth/wrong-password') {
            const creds = {
              email: this.formData.email,
              pass: this.formData.password
            }
            this.setLinkingAccountData(err, creds).then((result) => {
              if (this.linkProvider && this.linkProvider !== 'password') {
                this.$parent.emailPass = false
              } else if (!result) {
                this.$store.commit('notification/push', {
                  message: err.message,
                  title: 'Error',
                  type: 'error'
                }, { root: true })
              }
            })
          } else {
            this.$store.commit('notification/push', {
              message: err.message,
              title: 'Error',
              type: 'error'
            }, { root: true })
          }
        })
      }
    },
    createUser () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        const self = this
        auth.createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        ).then((result) => {
          result.user.updateProfile({
            displayName: `${this.formData.firstname} ${this.formData.lastname}`
          }).then(() => {
            const user = auth.currentUser
            self.$store.commit('SET_AUTH_USER', { user })
          })
        }).catch((err) => {
          this.$store.commit('notification/push', {
            message: err.message,
            title: 'Error',
            type: 'error'
          }, { root: true })
        })
      }
    },
    backToSocial () {
      this.$emit('update:emailPass', false)
    }
  }
}
</script>
