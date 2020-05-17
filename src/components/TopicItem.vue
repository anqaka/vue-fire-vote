<template>
  <li class="topics-list-item">
    <div class="topics-list-item__content">
      <h3 class="topics-list-item__title">
        {{ title }}
      </h3>
      <p>
        {{ description }}
      </p>
    </div>
    <div class="topics-list-item__vote">
      <div
        class="topics-list-item__vote-number"
      >
        <h4>Votes:</h4>
        {{ votes }}
      </div>
      <v-button
        :class="[
          'topics-list-item__upvote',
          {
            'topics-list-item__upvote--voted': isVoted
          }
        ]"
        :disabled="voteEnable"
        @btn-event="isVoted ? downvote(id, votes) : upvote(id, votes)"
      >
        {{ actionText }}
      </v-button>
    </div>
  </li>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import VButton from '@/components/Button.vue'
export default {
  components: {
    VButton
  },
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
<style lang="scss" scoped>
.topics-list-item {
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: $spacer--xl;

  @include mq($screen-sm-min) {
    flex-direction: row;
    justify-content: space-between;
  }

  &__content {
    flex-grow: 1;
    text-align: left;
    padding-top: $spacer--s;

    @include mq($screen-sm-min) {
      max-width: 70%;
    }
  }

  &__title {
    margin-bottom: $spacer--s;
  }

  &__vote {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-end;
  }

  &__vote-number {
    padding: $spacer--m;
  }

  &__upvote {
    margin: $spacer--m;
    min-width: 100px;

    &--voted {
      background-color: $orange;
    }
  }
}
</style>
