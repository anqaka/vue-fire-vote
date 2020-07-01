export default {
  isLoggedIn: (state) => {
    try {
      return state.user.id !== null
    } catch {
      return false
    }
  },
  user: (state) => {
    try {
      return state.user
    } catch {
      return false
    }
  },
  topicById: (state) => (id) => {
    try {
      return state.topics.find(item => item['.key'] === id)
    } catch {
      return false
    }
  }
}
