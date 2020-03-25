const HttpProxyAgent = require('http-proxy-agent')
module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/user-mgmt-be': {
        target: 'http://user-mgmt-be',
        agent: new HttpProxyAgent('http://127.0.0.1:8082'),
        changeOrigin: true,
        pathRewrite: {
          '^/user-mgmt-be': ''
        }
      },
      '/mec-developer': {
        target: 'http://mec-developer',
        agent: new HttpProxyAgent('http://127.0.0.1:8082'),
        changeOrigin: true,
        pathRewrite: {
          '^/mec-developer': ''
        }
      },
      '/mec-developer-tool': {
        target: 'http://mec-developer-tool',
        agent: new HttpProxyAgent('http://127.0.0.1:8082'),
        changeOrigin: true,
        pathRewrite: {
          '^/mec-developer-tool': ''
        }
      }

    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
