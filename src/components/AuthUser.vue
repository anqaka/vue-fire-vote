<template>
  <section class="form-section">
    <h2>
      You have to be logged in to vote <br />& add your topic's proposition
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
  </section>
</template>
<script>
import SocialButtons from '@/components/SocialButtons.vue'
import EmailAuth from '@/components/EmailAuth.vue'
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
