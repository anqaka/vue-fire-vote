export default {
  namespaced: true,
  state: {
    queue: [],
    max: 5
  },
  mutations: {
    push (state, notification) {
      state.queue.push(notification)

      if (state.queue.length > state.max) {
        state.queue.shift()
      }
    }
  }
}
