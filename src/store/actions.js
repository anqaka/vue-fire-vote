import { firebaseAction } from 'vuexfire'
// import { auth, fbProvider, topicRef, userRef } from '../db'
import { auth, fbProvider, githubProvider, googleProvider, topicRef, twitterProvider, userRef } from '../db'

export default {
  bindTopics: firebaseAction(({ bindFirebaseRef, commit }) => {
    return bindFirebaseRef('topics', topicRef)
      .catch((err) => {
        commit('notification/push', {
          message: err.message,
          title: 'Error',
          type: 'error'
        }, { root: true })
      })
  }),
  bindUser: firebaseAction(({ bindFirebaseRef, state, commit }) => {
    return bindFirebaseRef(
      'userVotes',
      userRef.child(state.user.id).child('votes')
    ).catch((err) => {
      commit('notification/push', {
        message: err.message,
        title: 'Error',
        type: 'error'
      }, { root: true })
    })
  }),
  addTopic: firebaseAction(({ state, commit }, topic) => {
    return topicRef.push({
      title: topic.title,
      description: topic.description,
      votes: 0,
      user: state.user.id
    }).then(() => {
      commit('notification/push', {
        message: 'Your proposition was added',
        title: 'Success',
        type: 'success'
      }, { root: true })
    }).catch((err) => {
      commit('notification/push', {
        message: err.message,
        title: 'Error',
        type: 'error'
      }, { root: true })
    })
  }),
  async onAuthStateChanged ({ commit, dispatch }) {
    try {
      await auth.onAuthStateChanged((user) => {
        if (!user) {
          commit('RESET_USER_DATA')
          commit('RESET_VOTES_DATA')
          return
        }
        commit('SET_AUTH_USER', { user })
        dispatch('bindUser')
        commit('notification/push', {
          message: 'You have logged in successfully',
          title: 'Success',
          type: 'success'
        }, { root: true })
      })
    } catch (err) {
      commit('notification/push', {
        message: err.message,
        title: 'Error',
        type: 'error'
      }, { root: true })
    }
  },
  signIn ({ commit }, user) {
    auth.signInWithEmailAndPassword(
      user.email,
      user.password
    ).catch((err) => {
      commit('notification/push', {
        message: err.message,
        title: 'Error',
        type: 'error'
      }, { root: true })
    })
  },
  signInFb ({ commit }) {
    auth.signInWithPopup(fbProvider).then((result) => {
      const token = result.credential.accessToken
      const user = result.user
      console.log('user', user, 'token', token)
    }).catch((err) => {
      commit('notification/push', {
        message: err.message,
        title: 'Error',
        type: 'error'
      }, { root: true })
    })
  },
  signInTwitter ({ commit }) {
    auth.signInWithPopup(twitterProvider).then((result) => {
      const token = result.credential.accessToken
      const user = result.user
      console.log('user', user, 'token', token)
    }).catch((err) => {
      commit('notification/push', {
        message: err.message,
        title: 'Error',
        type: 'error'
      }, { root: true })
    })
  },
  signInGithub ({ commit }) {
    auth.signInWithPopup(githubProvider).then((result) => {
      const token = result.credential.accessToken
      const user = result.user
      console.log('user', user, 'token', token)
    }).catch((err) => {
      commit('notification/push', {
        message: err.message,
        title: 'Error',
        type: 'error'
      }, { root: true })
    })
  },
  signInGoogle ({ commit }) {
    auth.signInWithPopup(googleProvider).then((result) => {
      const token = result.credential.accessToken
      const user = result.user
      console.log('user', user, 'token', token)
    }).catch((err) => {
      commit('notification/push', {
        message: err.message,
        title: 'Error',
        type: 'error'
      }, { root: true })
    })
  },
  createUser ({ commit }, user) {
    auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    ).catch((err) => {
      commit('notification/push', {
        message: err.message,
        title: 'Error',
        type: 'error'
      }, { root: true })
    })
  },
  signOut ({ commit }) {
    auth
      .signOut()
      .then(() => {
        commit('notification/push', {
          message: 'You logged out successfully',
          title: 'Success',
          type: 'success'
        }, { root: true })
      }).catch((err) => {
        commit('notification/push', {
          message: err.message,
          title: 'Error',
          type: 'error'
        }, { root: true })
      })
  },
  upvote: firebaseAction(({ state, dispatch, commit }, data) => {
    return userRef.child(state.user.id).child('votes').push({
      [data.id]: true
    }).then(() => {
      data.votes++
      dispatch('updateVotes', { id: data.id, votes: data.votes })
    }).catch((err) => {
      commit('notification/push', {
        message: err.message,
        title: 'Error',
        type: 'error'
      }, { root: true })
    })
  }),
  downvote: firebaseAction(({ state, dispatch, commit }, data) => {
    return userRef.child(state.user.id)
      .child('votes')
      .child(data.itemKey)
      .remove()
      .then(() => {
        data.votes--
        dispatch('updateVotes', { id: data.id, votes: data.votes })
      }).catch((err) => {
        commit('notification/push', {
          message: err.message,
          title: 'Error',
          type: 'error'
        }, { root: true })
      })
  }),
  updateVotes: firebaseAction(({ commit }, data) => {
    return topicRef.child(data.id).update({
      votes: data.votes
    }).catch((err) => {
      commit('notification/push', {
        message: err.message,
        title: 'Error',
        type: 'error'
      }, { root: true })
    })
  })
}
