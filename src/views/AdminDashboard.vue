<template>
  <div class="row center-xs">
    <h1>Admin Dashboard</h1>
    <topic-list
      :topics="topicsNotApproved"
      :title="notApprListTitle"
      class="col-xs-12"
    />
    <topic-list
      :topics="topicsApproved"
      :title="apprListTitle"
      class="col-xs-12"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TopicList from '@/components/TopicList.vue'
export default {
  components: {
    TopicList
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      topicsNotApproved: 'getNotApprovedTopics',
      topicsApproved: 'getApprovedTopics'
    })
  },
  data () {
    return {
      notApprListTitle: 'Waiting for approval',
      apprListTitle: 'Approved'
    }
  }
}
</script>
