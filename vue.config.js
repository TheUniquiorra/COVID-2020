// vue.config.js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
module.exports = {
  publicPath: '',
  lintOnSave: false,
  configureWebpack: (config) => {
    config.entry.app = ['babel-polyfill', './src/main.js']
    //删除console插件
    let plugins = [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log']
          },
          output: {
            // 去掉注释内容
            comments: false,
          }
        },
        sourceMap: false,
        parallel: true,
      }),
      new FileManagerPlugin({
        onEnd: {
          archive: [{
            source: './dist',
            destination: `./dist/chinesecovid-19map.tar.gz`,
            format: 'tar',
            options: {
              gzip: true,
              gzipOptions: {
                level: 1
              },
              globOptions: {
                nomount: true
              }
            }
          }]
        }
      })
    ]
    //只有打包生产环境才需要将console删除
    if (process.env.NODE_ENV == 'production') {
      config.plugins = [...config.plugins, ...plugins]
    }
  },

}