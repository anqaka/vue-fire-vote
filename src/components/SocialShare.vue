<template>
  <ul class="share-list">
    <li
      v-for="network in networks"
      :key="network.network"
      class="share-list__item"
    >
      <ShareNetwork
        :network="network.network"
        :style="{backgroundColor: network.color}"
        :url="url"
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
</template>

<script>
export default {
  components: {
    FbIcon: () => import('@/assets/icons/fb-i.svg'),
    TwitterIcon: () => import('@/assets/icons/twitter-i.svg'),
    LinkedInIcon: () => import('@/assets/icons/linkedin-i.svg')
  },
  props: {
    url: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      sharing: {
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
  }
}
</script>

<style lang="scss">
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
    padding: 4px $spacer--xs;
    margin: 0 $spacer--s $spacer--s 0;
    border-radius: 3px;
    color: $white;
    background-color: $gray-darker;
    overflow: hidden;
    cursor: pointer;
  }

  &__item-icon {
    display: block;
    width: 20px;
    height: 20px;
    transition: $transition-base;
  }

  &__item-text {
    flex: 1 1 auto;
    padding: 0 10px;
    font-weight: 500;
  }
}
</style>
