module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/iwtweb': {
        target: 'http://q-flow-tt/',
        // ws: true,
        changeOrigin: true
      }
    }
  }
}
