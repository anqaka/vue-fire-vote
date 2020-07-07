export function checkSocialLogin (provider) {
  const social = ['facebook.com', 'github.com', 'twitter.com']
  const socialLogin = social.some((socialItem) => {
    return provider.indexOf(socialItem) !== -1
  })
  return socialLogin
}
