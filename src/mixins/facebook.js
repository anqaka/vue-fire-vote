export default {
  created () {
    console.log('dupa')
    window.fbAsyncInit = function () {
      // eslint-disable-next-line no-undef
      FB.init({
        appId: process.env.VUE_APP_FB_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v6.0'
      })
      // eslint-disable-next-line no-undef
      FB.AppEvents.logPageView()
    };
    (function (d, s, id) {
      // eslint-disable-next-line one-var
      var js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) { return }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  }
}
