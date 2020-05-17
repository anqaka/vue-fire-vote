<template>
  <section class="form-section col-xs-12 col-md-8">
    <h2>
      Add your topic proposition
    </h2>
    <loader v-if="loading" class="loader--overlay" />
    <form @submit.prevent="addTopic">
      <div class="input">
        <label for="title">
          Topic title
        </label>
        <input
          id="title"
          v-model="title"
          class="input__field"
          type="text"
          placeholder="Topic title"
        >
      </div>
      <div class="input">
        <label for="description">
          Topic description
        </label>
        <textarea
          id="description"
          v-model="description"
          class="input__field input__field--textarea"
          type="text"
          placeholder="Topic description"
        />
      </div>
      <div class="form-section__action">
        <v-button
          :type="'submit'">
          Add Topic
        </v-button>
      </div>
    </form>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader.vue'
import VButton from '@/components/Button.vue'

export default {
  components: {
    Loader,
    VButton
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
      loading: false
    }
  },
  methods: {
    addTopic () {
      this.loading = true
      this.$store.dispatch('addTopic', {
        title: this.title,
        description: this.description
      }).then(() => {
        this.loading = false
        this.title = ''
        this.description = ''
      })
    }
  }
}
</script>
