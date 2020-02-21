module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://159.138.38.104:38181',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/mecm': {
        target: 'http://159.138.38.104:8806',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/mecm': ''
        }
      },
      '/upload': {
        target: 'http://159.138.38.104:32806',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/upload': ''
        }
      },
      '/meo': {
        target: 'http://159.138.38.104:32080',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/meo': ''
        }
      },
      '/info': {
        target: 'http://159.138.38.104:8083',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/info': ''
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
