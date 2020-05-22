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
export default {
  components: {
    EmailAuth: () => import(/* webpackPrefetch: true */ '@/components/EmailAuth.vue'),
    SocialButtons: () => import('@/components/SocialButtons.vue'),
    VButton: () => import('@/components/Button.vue')
  },
  data () {
    return {
      emailPass: false
    }
  }
}
</script>
