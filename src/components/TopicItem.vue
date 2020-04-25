<template>
  <li class="topics-list__item">
    <div class="topics-list__item-content">
      <h3 class="topics-list__item-title">
        {{ title }}
      </h3>
      <p>
        {{ description }}
      </p>
    </div>
    <div class="topics-list__item-vote">
      <div
        class="topics-list__item-vote-number"
      >
        <h4>Votes:</h4>
        {{ votes }}
      </div>
      <button
        :class="[
          'button',
          'topics-list__item-upvote',
          {
            'topics-list__item-upvote--voted': isVoted
          }
        ]"
        :disabled="voteEnable"
        @click="isVoted ? downvote(id, votes) : upvote(id, votes)"
      >
        {{ actionText }}
      </button>
    </div>
  </li>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  props: {
    description: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    votes: {
      type: Number,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      userVotes: state => state.userVotes
    }),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    }),
    isVoted () {
      return this.userVotes.some(item => item[this.id])
    },
    actionText () {
      return this.isVoted ? 'Downvote' : 'Upvote'
    },
    voteEnable () {
      return !this.isLoggedIn || (this.author === this.user.id)
    }
  },
  methods: {
    upvote (id, votes) {
      this.$store.dispatch('upvote', { id, votes })
    },
    downvote (id, votes) {
      const userVote = this.userVotes.find(item => item[id] === true)
      const itemKey = userVote['.key']
      this.$store.dispatch('downvote', { id, itemKey, votes })
    }
  }
}
</script>
