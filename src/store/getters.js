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
  }
}
