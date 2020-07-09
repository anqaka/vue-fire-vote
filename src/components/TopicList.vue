<template>
  <section>
    <h2>
      {{ title }}
    </h2>
      <ul
        v-if="topics.length"
        class="topics-list"
      >
        <li
          v-for="(item) in topics"
          :key="item['.key']"
        >
          <topic-item
            :id="item['.key']"
            :listItem="true"
          />
        </li>
      </ul>
      <transition name="fade">
        <p v-if="topicsLoaded === 1 && topics.length === 0">
          There is no topic proposition yes. Be the first one!
        </p>
        <p v-if="topicsLoaded === 2 && topics.length === 0">
          En error occured. Refresh your page or try again later.
        </p>
      </transition>
      <transition name="fade">
        <loader v-if="!topicsLoaded" />
      </transition>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import Loader from '@/components/Loader.vue'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    topics: {
      type: Array,
      required: true
    }
  },
  components: {
    Loader,
    TopicItem: () => import('@/components/TopicItem.vue')
  },
  computed: {
    ...mapState({
      topicsLoaded: state => state.topicsLoaded
    })
  }
}
</script>
<style lang="scss" scoped>
.topics-list {
  list-style: none;
  padding: 0;
}
</style>
