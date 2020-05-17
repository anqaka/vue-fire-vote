<template>
  <section class="form-section col-xs-12 col-md-8">
    <h2>
      Add your topic proposition
    </h2>
    <loader v-if="loading" class="loader--overlay" />
    <form @submit.prevent="addTopic">
      <div :class="['input', { 'input--error': $v.title.$error }]">
        <label for="title">
          Topic title
        </label>
        <input
          id="title"
          v-model.trim="$v.title.$model"
          class="input__field"
          type="text"
          placeholder="Topic title"
        >
        <div
          v-if="!$v.title.required"
          class="error"
        >
          Field is required
        </div>
      </div>
      <div :class="['input', { 'input--error': $v.description.$error }]">
        <label for="description" class="form__label">
          Topic description
        </label>
        <textarea
          id="description"
          v-model.trim="$v.description.$model"
          class="input__field input__field--textarea"
          type="text"
          placeholder="Topic description"
        />
        <div
          v-if="!$v.description.required"
          class="error"
        >
          Field is required
        </div>
      </div>
      <div class="form-section__action">
        <v-button
          :type="'submit'"
          :disabled="$v.$invalid"
        >
          Add Topic
        </v-button>
      </div>
    </form>
    <p class="typo__p" v-if="submitStatus === 'OK'">
      Thanks for your submission!
    </p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">
      Please fill the form correctly.
    </p>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

export default {
  components: {
    Loader: () => import('@/components/Loader.vue'),
    VButton: () => import('@/components/Button.vue')
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    })
  },
  data () {
    return {
      title: '',
      description: '',
      loading: false,
      submitStatus: null
    }
  },
  mixins: [validationMixin],
  validations: {
    title: {
      required
    },
    description: {
      required
    }
  },
  methods: {
    addTopic () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.loading = true
        this.submitStatus = 'PENDING'
        this.$store.dispatch('addTopic', {
          title: this.title,
          description: this.description
        }).then(() => {
          this.loading = false
          this.title = ''
          this.description = ''
          this.submitStatus = 'OK'
        })
      }
    }
  }
}
</script>
