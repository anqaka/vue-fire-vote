<template>
  <div>
    <v-button
      :class="fb.btnClass"
      @btn-event="signInFb()"
    >
      <span class="button__icon">
        <FbIcon />
      </span>
      {{ fb.label }}
    </v-button>
    <v-button
      :class="google.btnClass"
      @btn-event="signInGoogle()"
    >
      <span class="button__icon">
        <GoogleIcon />
      </span>
      {{ google.label }}
    </v-button>
    <v-button
      :class="github.btnClass"
      @btn-event="signInGithub()"
    >
      <span class="button__icon">
        <GithubIcon />
      </span>
      {{ github.label }}
    </v-button>
    <v-button
      :class="twitter.btnClass"
      @btn-event="signInTwitter()"
    >
      <span class="button__icon">
        <TwitterIcon />
      </span>
      {{ twitter.label }}
    </v-button>
  </div>
</template>
<script>
import fb from '@/mixins/facebook.js'
export default {
  mixins: [fb],
  components: {
    VButton: () => import('@/components/Button.vue'),
    FbIcon: () => import('@/assets/icons/fb-i.svg'),
    GithubIcon: () => import('@/assets/icons/github-i.svg'),
    GoogleIcon: () => import('@/assets/icons/google-i.svg'),
    TwitterIcon: () => import('@/assets/icons/twitter-i.svg')
  },
  data () {
    return {
      fb: {
        btnClass: 'button--login button--facebook',
        label: 'Sign in with Facebook'
      },
      google: {
        btnClass: 'button--login button--google',
        label: 'Sign in with Google'
      },
      github: {
        btnClass: 'button--login button--github',
        label: 'Sign in with Github'
      },
      twitter: {
        btnClass: 'button--login button--twitter',
        label: 'Sign in with Twitter'
      },
      emailPass: false
    }
  },
  methods: {
    signInFb (ev) {
      this.$store.dispatch('signInFb')
    },
    signInTwitter () {
      this.$store.dispatch('signInTwitter')
    },
    signInGithub () {
      this.$store.dispatch('signInGithub')
    },
    signInGoogle () {
      this.$store.dispatch('signInGoogle')
    }
  }
}
</script>
<style lang="scss" scoped>
.button {
  &--facebook {
    background-color: #4267b2;
    border-color: #4267b2;
  }

  &--google {
    background-color: white;
    border-color: rgba(0, 0, 0, 0.54);
    color: rgba(0, 0, 0, 0.54);
  }

  &--github {
    background-color: #181717;
    border-color: #181717;
  }

  &--twitter {
    background-color: #1da1f2;
    border-color: #1da1f2;
  }

  &__icon {
    display: block;
    width: 24px;
    height: 24px;
    margin-right: $spacer--xs;
  }
}
</style>
