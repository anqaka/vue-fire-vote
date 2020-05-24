const path = require('path')
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import '@/assets/scss/main.scss';
        `
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: true
    }
  },
  pwa: {
    name: 'Vue fire vote',
    themeColor: '#fe5f15',
    msTileColor: '#FFFFFF',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    manifestOptions: {
      background_color: '#FFFFFF'
    }
  }
};
