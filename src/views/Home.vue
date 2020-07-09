<template>
  <div class="row center-xs">
    <h1 class="col-xs-12">
      {{ $t('home.home-title') }}
    </h1>
    <h2 class="col-xs-12">
      {{ $t('home.home-subtitle') }}
    </h2>
    <div class="col-xs-12">
      <p>
        {{ $t('home.home-top-description')}}
      </p>
      <p v-if="!isLoggedIn">
        {{ $t('home.login-info') }}
      </p>
    </div>
    <user-state class="col-xs-12" />
    <topic-list
      :topics="topics"
      :title="$t('home.list-items-title')"
      class="col-xs-12"
     />
    <add-topic
      v-if="isLoggedIn"
      class="col-xs-12"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TopicList from '@/components/TopicList.vue'
import UserState from '@/components/UserState.vue'

export default {
  name: 'Home',
  components: {
    AddTopic: () => import('@/components/AddTopic.vue'),
    TopicList,
    UserState
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      topics: 'getApprovedTopics'
    })
  }
}
</script>
