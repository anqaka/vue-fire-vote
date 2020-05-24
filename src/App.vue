<template>
  <main id="app" class="container">
    <div class="row center-xs">
      <h1>
        Topic propositions for MMPL2020
      </h1>
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

export default {
  name: 'App',
  components: {
    AddTopic: () => import('@/components/AddTopic.vue'),
    TopicList,
    UserState
  },
  mixins: [{ notification: () => import('@/mixins/notification.js') }],
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
