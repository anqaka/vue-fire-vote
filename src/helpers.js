import firebase from 'firebase/app'

export function checkSocialLogin (provider) {
  const social = ['facebook.com', 'github.com', 'twitter.com']
  const socialLogin = social.some((socialItem) => {
    return provider.indexOf(socialItem) !== -1
  })
  return socialLogin
}

export const supportedPopupSignInMethods = [
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  firebase.auth.GithubAuthProvider.PROVIDER_ID,
  firebase.auth.EmailAuthProvider.PROVIDER_ID,
  firebase.auth.FacebookAuthProvider.PROVIDER_ID
]

export function getProvider (providerId) {
  switch (providerId) {
    case 'google.com':
      return new firebase.auth.GoogleAuthProvider()
    case 'facebook.com':
      return new firebase.auth.FacebookAuthProvider()
    case 'github.com':
      return new firebase.auth.GithubAuthProvider()
    case 'twitter.com':
      return new firebase.auth.TwitterAuthProvider()
    case 'password':
      return new firebase.auth.EmailAuthProvider()
    default:
      throw new Error(`No provider implemented for ${providerId}`)
  }
}
