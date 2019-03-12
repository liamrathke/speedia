let resolve = require('path').resolve

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('#', resolve(__dirname, 'server/'))
  }
}