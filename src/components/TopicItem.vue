<template>
  <li v-if="topic" :id="id" class="topics-list-item">
    <div class="topics-list-item__content">
      <h3 class="topics-list-item__title">{{ topic.title }}</h3>
      <h3>
        <router-link
          :to="{
            name: 'topic',
            params: {
              id: id
            }
          }"
        >{{ topic.title }}</router-link>
      </h3>
      <p>{{ topic.description }}</p>
      <ul class="share-list">
        <li
          v-for="network in networks"
          :key="network.network"
          class="share-list__item"
        >
          <ShareNetwork
            :network="network.network"
            :style="{backgroundColor: network.color}"
            :url="sharing.url"
            :title="sharing.title"
            :description="sharing.description"
            :quote="sharing.quote"
            :hashtags="sharing.hashtags"
            :twitterUser="sharing.twitterUser"
            class="share-list__item-link"
          >
            <span class="share-list__item-icon">
              <component :is="network.icon"></component>
            </span>
            <span class="share-list__item-text">
              Share on {{ network.name }}
            </span>
          </ShareNetwork>
        </li>
      </ul>
    </div>
    <div class="topics-list-item__vote">
      <div class="topics-list-item__vote-number">
        <h4>Votes:</h4>
        {{ topic.votes }}
      </div>
      <v-button
        :class="[
          'topics-list-item__upvote',
          {
            'topics-list-item__upvote--voted': isVoted,
            'topics-list-item__upvote--disabled': voteDisabled
          }
        ]"
        @btn-event="isVoted ? downvote(id, topic.votes) : upvote(id, topic.votes)"
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
    LikeIcon: () => import('@/assets/icons/like.svg'),
    FbIcon: () => import('@/assets/icons/fb-i.svg'),
    TwitterIcon: () => import('@/assets/icons/twitter-i.svg'),
    LinkedInIcon: () => import('@/assets/icons/linkedin-i.svg')
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      userVotes: state => state.userVotes,
      topic: state => state.topics[this.index]
    }),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    }),
    isVoted () {
      return this.userVotes.some(item => item[this.id])
    },
    topic () {
      return this.$store.getters.topicById(this.id)
    },
    voteDisabled () {
      return (
        !this.isLoggedIn ||
        (this.isLoggedIn && (this.user ? this.author === this.user.id : false))
      )
    },
    tooltipText () {
      let message = ''
      if (!this.isLoggedIn) {
        message = 'You have to be logged in to vote'
      } else if (this.author === this.user.id) {
        message =
          "Naughty naughty!<br> It's not fair to vote for your own topic."
      } else if (this.isVoted) {
        message = 'Voted!'
      }
      return message
    }
  },
  data () {
    return {
      sharing: {
        url: `${window.location.href}`,
        title: 'title',
        description: 'description',
        hashtags: '#mmpl20'
      },
      networks: [
        {
          network: 'facebook',
          name: 'Facebook',
          icon: 'FbIcon',
          color: '#1877f2'
        },
        {
          network: 'linkedin',
          name: 'LinkedIn',
          icon: 'LinkedInIcon',
          color: '#007bb5'
        },
        {
          network: 'twitter',
          name: 'Twitter',
          icon: 'TwitterIcon',
          color: '#1da1f2'
        }
      ]
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
    border: 2px solid $orange;
    background-color: $white;

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
      cursor: not-allowed;
      background-color: $gray-lighter;
    }
  }
}

.share-list {
  display: flex;
  padding: 0;
  margin: $spacer--m 0;

  &__item {
    list-style-type: none;
  }

  &__item-link {
    display: flex;
    align-content: center;
    align-items: center;
    flex-direction: row;
    flex: none;
    padding: $spacer--xs $spacer--s;
    margin: 0 $spacer--s $spacer--s 0;
    border-radius: 3px;
    color: $white;
    background-color: $gray-darker;
    overflow: hidden;
    cursor: pointer;
  }

  &__item-icon {
    display: block;
    width: 24px;
    height: 24px;
    transition: $transition-base;
  }

  &__item-text {
    flex: 1 1 0%;
    padding: 0 10px;
    font-weight: 500;
  }
}
</style>
