<template>
  <div class="row center-xs">
    <ul class="col-xs-12">
      <topic-item :id="id" />
    </ul>
    <user-state class="col-xs-12" />
    <div class="col-xs-12">
      <router-link to="/" class="button button--secondary">
        See all propositions
      </router-link>
    </div>
  </div>
</template>

<script>
import UserState from '@/components/UserState.vue'
import TopicItem from '@/components/TopicItem.vue'

export default {
  components: {
    UserState,
    TopicItem
  },
  props: {
    id: {
      type: String,
      require: true
    }
  }
}
</script>
