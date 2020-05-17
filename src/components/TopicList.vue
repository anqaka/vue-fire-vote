<template>
  <section>
    <h2>
      Proposition list
    </h2>
      <ul
        v-if="topics.length"
        class="topics-list"
      >
        <transition-group name="fade">
          <topic-item
            v-for="(item) in topics"
            :key="item['.key']"
            :id="item['.key']"
            :description="item.description"
            :title="item.title"
            :votes="item.votes"
            :author="item.user"
          />
        </transition-group>
      </ul>
      <transition name="fade">
        <p v-if="!loading && topics.length === 0">
          There is no topic proposition yes. Be the first one!
        </p>
      </transition>
      <transition name="fade">
        <loader v-if="loading" />
      </transition>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import Loader from './Loader.vue'
import TopicItem from './TopicItem.vue'

export default {
  components: {
    Loader,
    TopicItem
  },
  mounted () {
    this.$store.dispatch('bindTopics').then(() => {
      this.loading = false
    })
  },
  computed: {
    ...mapState({
      topics: state => state.topics
    })
  },
  data () {
    return {
      loading: true
    }
  }
}
</script>
<style lang="scss" scoped>
.topics-list {
  list-style: none;
  padding: 0;
}
</style>
