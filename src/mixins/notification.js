import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      queue: state => state.notification.queue
    })
  },
  methods: {
    success (title, message) {
      this.$toast.success(
        title,
        message
      )
    },
    error (title, message) {
      this.$toast.error(
        title,
        message
      )
    },
    warning (title, message) {
      this.$toast.warning(
        title,
        message
      )
    },
    info (title, message) {
      this.$toast.info(
        title,
        message
      )
    }
  },
  watch: {
    queue: {
      handler: function (queue) {
        if (queue.length) {
          const queueTop = queue[queue.length - 1]
          this[queueTop.type](queueTop.message, queueTop.title)
        }
      },
      immediate: true,
      deep: true
    }
  }
}
