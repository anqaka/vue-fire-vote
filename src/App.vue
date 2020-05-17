<template>
  <div id="app" class="container">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddTopic from './components/AddTopic.vue'
import TopicList from './components/TopicList.vue'
import UserState from './components/UserState.vue'
import notification from './mixins/notification.js'

export default {
  name: 'App',
  components: {
    AddTopic,
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
