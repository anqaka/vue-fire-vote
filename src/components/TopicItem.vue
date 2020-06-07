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
            'topics-list-item__upvote--voted': isVoted,
            'topics-list-item__upvote--disabled': voteDisabled
          }
        ]"
        @btn-event="isVoted ? downvote(id, votes) : upvote(id, votes)"
        v-tooltip="tooltipText"
        :aria-label="tooltipText"
      >
        <span class="button__icon">
          <LikeIcon />
        </span>
      </v-button>
    </div>
  </li>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
import { VTooltip } from 'v-tooltip'
import VButton from '@/components/Button.vue'

Vue.directive('tooltip', VTooltip)

export default {
  components: {
    VButton,
    LikeIcon: () => import('@/assets/icons/like.svg')
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
    voteDisabled () {
      return !this.isLoggedIn || (
        this.isLoggedIn && (this.user ? this.author === this.user.id : false))
    },
    tooltipText () {
      let message = ''
      if (!this.isLoggedIn) {
        message = 'You have to be logged in to vote'
      } else if ((this.author === this.user.id)) {
        message = 'Naughty naughty!<br> It\'s not fair to vote for your own topic.'
      } else if (this.isVoted) {
        message = 'Voted!'
      }
      return message
    }
  },
  methods: {
    upvote (id, votes) {
      if (!this.voteDisabled) {
        this.$store.dispatch('upvote', { id, votes })
      }
    },
    downvote (id, votes) {
      if (!this.voteDisabled) {
        const userVote = this.userVotes.find(item => item[id] === true)
        const itemKey = userVote['.key']
        this.$store.dispatch('downvote', { id, itemKey, votes })
      }
    }
  }
}
</script>
<style lang="scss">
@import './src/assets/scss/tooltip';

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
    align-items: center;
    justify-content: flex-end;
  }

  &__vote-number {
    padding: $spacer--m;
  }

  &__vote-info {
    padding: 0 $spacer--s;
  }

  &__upvote {
    padding: 0 $spacer--xs;
    margin: $spacer--m;
    min-width: 56px;
    height: 56px;

    .button__icon {
      fill: $orange;
      width: 32px;
      height: 32px;
    }

    &--voted {
      background-color: $orange;
      border-color: $orange;

      .button__icon {
        fill: $black;
      }
    }

    &--disabled {
      @extend .button:disabled;
    }
  }
}
</style>
