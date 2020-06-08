<template>
  <section class="form-section">
    <h2>
      <template v-if="!emailPass">
        Choose your log in method
      </template>
      <template v-else>
        Log in with email & password
      </template>
    </h2>
    <social-buttons
      v-if="!emailPass"
    />
    <v-button
      class="button--login"
      v-if="!emailPass"
      @btn-event="emailPass = !emailPass"
    >
      Sign with email & password
    </v-button>
    <email-auth
      v-if="emailPass"
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

export default {
  components: {
    EmailAuth,
    SocialButtons,
    VButton
  },
  data () {
    return {
      emailPass: false
    }
  }
}
</script>
