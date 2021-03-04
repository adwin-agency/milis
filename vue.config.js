const path = require('path')

module.exports = {
  // publicPath: '/milis/',
  assetsDir: 'assets',
  filenameHashing: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/styles/imports.scss')
      ]
    },
    svgSprite: {
      dir: 'src/assets/icons',
      test: /\.(svg)(\?.*)?$/,
      loaderOptions: {
        extract: true,
        spriteFilename: 'assets/img/sprite.svg'
      },
      pluginOptions: {
        plainSprite: true
      }
    }
  }
}
