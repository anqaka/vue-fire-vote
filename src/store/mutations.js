import { vuexfireMutations } from 'vuexfire'

export default {
  ...vuexfireMutations,

  RESET_USER_DATA: (state) => {
    state.user = null
    state.admin = false
  },

  RESET_VOTES_DATA: (state) => {
    state.userVotes = []
  },

  SET_AUTH_USER: (state, { user }) => {
    state.user = {
      id: user.uid,
      email: user.email,
      displayName: user.displayName
    }
  },

  SET_ADMIN: (state) => {
    state.admin = true
  },

  LOAD_TOPICS: (state, payload) => {
    state.topicsLoaded = payload
  }
}
