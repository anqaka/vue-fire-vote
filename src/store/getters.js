export default {
  user: (state) => {
    try {
      return state.user
    } catch {
      return false
    }
  },
  isLoggedIn: (state) => {
    try {
      return state.user.id !== null
    } catch {
      return false
    }
  },
  isAdmin: (state) => {
    try {
      return state.admin === true
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
  },
  getApprovedTopics: (state) => {
    try {
      if (state.topics) {
        return state.topics.filter(topic => {
          return topic.approved
        })
      }
    } catch {
      return false
    }
  },
  getNotApprovedTopics: (state) => {
    try {
      if (state.topics) {
        return state.topics.filter(topic => {
          return !topic.approved
        })
      }
    } catch {
      return false
    }
  }
}
