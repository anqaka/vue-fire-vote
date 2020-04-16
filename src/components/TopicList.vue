<template>
  <section>
    <h2>
      Pres propositions for MMPL2020
    </h2>
    <ul
      v-if="topics.length"
      class="topics-list"
    >
      <topic-item
        v-for="(item) in topics"
        :key="item['.key']"
        :id="item['.key']"
        :description="item.description"
        :title="item.title"
        :votes="item.votes"
        :author="item.user"
      />
    </ul>
    <p v-else>
      There is no presentaton topic proposed yet
    </p>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import TopicItem from './TopicItem.vue'

export default {
  components: {
    TopicItem
  },
  mounted () {
    this.$store.dispatch('bindTopics')
    // if (!this.topics.length) {
    //   console.log('check')
    // }
  },
  computed: {
    ...mapState({
      topics: state => state.topics
    })
  }

}
</script>
