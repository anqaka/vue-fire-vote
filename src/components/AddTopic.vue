<template>
  <section class="form-section col-xs-12 col-md-8">
    <h2>
      Add your topic proposition
    </h2>
    <p>
      You have to be logged in to add your proposition
    </p>
    <form @submit.prevent="addTopic">
      <div class="input">
        <label for="title">
          Topic title
        </label>
        <input
          id="title"
          v-model="formFields.title"
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
          v-model="formFields.description"
          class="input__field input__field--textarea"
          type="text"
          placeholder="Topic description"
        />
      </div>
      <div class="form-section__action">
        <button type="submit">
          Add Topic
        </button>
      </div>
    </form>
    <p>{{ message }}</p>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    })
  },
  data () {
    return {
      formFields: {
        title: '',
        description: ''
      },
      message: ''
    }
  },
  methods: {
    addTopic () {
      this.$store.dispatch('addTopic', {
        title: this.formFields.title,
        description: this.formFields.description
      })
    }
  }
}
</script>
