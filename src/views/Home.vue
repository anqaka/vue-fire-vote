<template>
  <div class="row center-xs">
    <h1 class="col-xs-12">
      Magento 2020 subjects voter
    </h1>
    <div class="col-xs-12">
      <p>Some text that explain what is the page for</p>
      <p>
        This page allows as to collect topic that conference's participants are interested in. <br> It helps speakers to choose their subjects and us to choose those which fit your need.
      </p>
      <p v-if="!isLoggedIn">
        You have to be logged in to vote for a topic or add your own proposition.
      </p>
    </div>
    <user-state class="col-xs-12" />
    <topic-list class="col-xs-12" />
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
      isLoggedIn: 'isLoggedIn'
    })
  }
}
</script>
