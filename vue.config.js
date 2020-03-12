module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/rest/user-mgmt-be': {
        target: 'http://user-mgmt-be',
        agent: new HttpProxyAgent('http://127.0.0.1:8082'),
        changeOrigin: true,
        pathRewrite: {
          '^/rest/user-mgmt-be': ''
        }
      },
      '/rest/mec-developer': {
        target: 'http://mec-developer',
        agent: new HttpProxyAgent('http://127.0.0.1:8082'),
        changeOrigin: true,
        pathRewrite: {
          '^/rest/mec-developer': ''
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
