<template>
  <section class="form-section">
    <h2>
      <template v-if="!emailPass && !linkProvider">
        Choose your log in method
      </template>
      <template v-else-if="emailPass && !linkProvider">
        Log in with email & password
      </template>
    </h2>
    <p v-if="linkProvider">
      You already have an account linked to <span class="bold">{{ this.linkEmail }}</span>. Login with <span class="bold">{{ this.linkProvider }}</span> to link new login method to your profile:
    </p>
    <social-buttons
      v-if="!emailPass"
    />
    <v-button
      class="button--login"
      v-if="!emailPass && !linkProvider"
      @btn-event="emailPass = !emailPass"
    >
      Sign with email & password
    </v-button>
    <email-auth
      v-if="emailPass || linkProvider === 'password'"
      :emailPass.sync="emailPass"
    />
    <v-button
      class="button--login button--link"
      @btn-event="$emit('hide-auth')"
    >
      Hide login section
    </v-button>
  </section>
</template>
<script>
import EmailAuth from '@/components/EmailAuth.vue'
import SocialButtons from '@/components/SocialButtons.vue'
import VButton from '@/components/Button.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    EmailAuth,
    SocialButtons,
    VButton
  },
  computed: {
    ...mapGetters({
      linkProvider: 'linkProvider',
      linkCreds: 'linkCreds',
      linkEmail: 'linkEmail'
    })
  },
  data () {
    return {
      emailPass: false
    }
  }
}
</script>
