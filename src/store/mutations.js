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
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      provider: user.providerData[0].providerId
    }
  },

  SET_ADMIN: (state) => {
    state.admin = true
  },

  INIT_EMAIL_SENT: (state) => {
    state.user.initEmailSent = true
  },

  LOAD_TOPICS: (state, payload) => {
    state.topicsLoaded = payload
  },

  SET_LINK_ACCOUNT: (state, payload) => {
    state.linkAccount = payload
  }
}
