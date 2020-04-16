import { firebaseAction } from 'vuexfire'
import { auth, topicRef, userRef } from '../db'

export default {
  bindTopics: firebaseAction(({ bindFirebaseRef }) => {
    return bindFirebaseRef('topics', topicRef)
      .then(() => {
        console.log('topics bound')
      }).catch((err) => {
        console.log(err)
      })
  }),
  bindUser: firebaseAction(({ bindFirebaseRef, state }) => {
    return bindFirebaseRef(
      'userVotes',
      userRef.child(state.user.id).child('votes')
    ).then(() => {
      console.log('user votes bound')
    }).catch((err) => {
      console.log(err)
    })
  }),
  addTopic: firebaseAction(({ state }, topic) => {
    return topicRef.push({
      title: topic.title,
      description: topic.description,
      votes: 0,
      user: state.user.id
    }).then(() => {
      console.log('topic was added')
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
      })
    } catch (e) {
      console.log(e.message)
    }
  },
  signIn (context, user) {
    auth.signInWithEmailAndPassword(
      user.email,
      user.password
    )
  },
  createUser (context, user) {
    auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    )
  },
  signOut () {
    auth.signOut()
  },
  upvote: firebaseAction(({ state, dispatch }, data) => {
    return userRef.child(state.user.id).child('votes').push({
      [data.id]: true
    }).then(() => {
      data.votes++
      dispatch('updateVotes', { id: data.id, votes: data.votes })
      console.log('topic upvoted')
    }).catch((err) => {
      console.log(err.message)
    })
  }),
  downvote: firebaseAction(({ state, dispatch }, data) => {
    return userRef.child(state.user.id)
      .child('votes')
      .child(data.itemKey)
      .remove()
      .then(() => {
        data.votes--
        dispatch('updateVotes', { id: data.id, votes: data.votes })
        console.log('topic downvoted', data.id)
      }).catch((err) => {
        console.log(err.message)
      })
  }),
  updateVotes: firebaseAction(({ state }, data) => {
    return topicRef.child(data.id).update({
      votes: data.votes
    }).catch((err) => {
      console.log(err.message)
    })
  })
}
