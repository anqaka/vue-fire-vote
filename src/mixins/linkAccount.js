
import firebase from 'firebase/app'
import { auth } from '@/db.js'
import { supportedPopupSignInMethods } from '@/helpers.js'

export default {
  methods: {
    linkAccountCreds (user, creds) {
      user.linkWithCredential(creds).then((result) => {
        this.$store.commit('notification/push', {
          message: `Your ${result.additionalUserInfo.providerId} account is now connected to your profile. You can use it to log in in the future.`,
          title: 'Success',
          type: 'success'
        })
        this.$store.dispatch('setLinkingAccount', null)
      }).catch((err) => {
        this.$store.commit('notification/push', {
          message: err.message,
          title: 'Error',
          type: 'error'
        }, { root: true })
      })
    },
    // setting linking data for email & pass
    createEmailPassWithCreds (user, pass) {
      const credential = firebase.auth.EmailAuthProvider.credential(user.email, pass)
      this.linkAccountCreds(user, credential)
    },
    // checking provider already used for email
    async checkProvider (email) {
      const providersArr = await auth.fetchSignInMethodsForEmail(email)
      return providersArr.find(p => supportedPopupSignInMethods.includes(p))
    },
    // if any provider for the email exist
    // save data that should be linked with the email
    async setLinkingAccountData (err, creds = null) {
      const email = err.email ? err.email : creds.email
      // check provider
      const firstProvider = await this.checkProvider(email)
      // check if linking request come from emailPass & if this provided was already used
      if ((firstProvider === 'password' && creds) || !firstProvider) {
        return false
      } else if (firstProvider) {
        const linkAccount = {
          provider: firstProvider,
          creds: err.credential,
          email: email,
          password: creds ? creds.pass : null
        }
        this.$store.dispatch('setLinkingAccount', linkAccount)
      }
    }
  }
}
