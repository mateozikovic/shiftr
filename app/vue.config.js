// Make vue target node api.

module.exports = {
    devServer: {
      proxy: {
        '^/app': {
          target: 'http://localhost:3080',
          changeOrigin: true
        },
      }
    }
  }

