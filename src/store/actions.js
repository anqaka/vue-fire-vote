import { firebaseAction } from 'vuexfire'
import { auth, topicRef, userRef } from '../db'

export default {
  bindTopics: firebaseAction(({ bindFirebaseRef, commit }) => {
    return bindFirebaseRef('topics', topicRef)
      .then(() => {
        commit('LOAD_TOPICS', 1)
      })
      .catch((err) => {
        commit('LOAD_TOPICS', 2)
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
  updateVotes: firebaseAction(({ commit, dispatch }, data) => {
    return topicRef.child(data.id).update({
      votes: data.votes
    }).then(() => {
      dispatch('bindUser')
    }).catch((err) => {
      commit('notification/push', {
        message: err.message,
        title: 'Error',
        type: 'error'
      }, { root: true })
    })
  })
}
