/**
 * Created by lijinfeng on 2019/1/17.
 */

module.exports = {
  // publicPath: './',
  // outputDir: 'dist',
  // lintOnSave: true,
  // runtimeCompiler: true,
  // chainWebpack: () => {},
  // configureWebpack: () => {},
  devServer: {
    port: 9502,
    open: true,
    proxy: {
      '/api': {
        /*target:'http://180.76.116.7:12248', // 设置你调用的接口域名和端口号*/
        target:'http://localhost:12248',
        ws:false,
        changeOrigin: true // 跨域
      }
    },
  },
  productionSourceMap: false
}
