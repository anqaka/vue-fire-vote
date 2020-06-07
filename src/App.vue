<template>
  <main id="app" class="container">
    <div class="row center-xs">
      <h1 class="col-xs-12">
        List of proposed topics for MMPL2020
      </h1>
      <div class="col-xs-12">
        <p>Some text that explain what is the page for</p>
        <p>
          This page allows as to collect topic that congerence's participants are interested in. <br> It helps speakers to choose their subjects and us t choose thise which fit your need. <br>
          You have to be logged in to vote for a topic or add your own proposition.
        </p>
      </div>
      <topic-list class="col-xs-12" />
      <user-state class="col-xs-12" />
      <add-topic
        v-if="isLoggedIn"
        class="col-xs-12"
      />
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import TopicList from '@/components/TopicList.vue'
import UserState from '@/components/UserState.vue'
import notification from '@/mixins/notification.js'

export default {
  name: 'App',
  components: {
    AddTopic: () => import('@/components/AddTopic.vue'),
    TopicList,
    UserState
  },
  mixins: [notification],
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
