import { vuexfireMutations } from 'vuexfire'

export default {
  ...vuexfireMutations,
  RESET_USER_DATA: (state) => {
    state.user = null
  },

  SET_AUTH_USER: (state, { user }) => {
    state.user = {
      id: user.uid,
      email: user.email
    }
  }
}
