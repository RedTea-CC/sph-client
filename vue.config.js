const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  //关闭Eslint校验工具
  lintOnSave: false,
  //配置代理跨域
  devServer: {
    proxy: {
      api: {
        target: "http://gmall-h5-api.atguigu.cn",
        // parhRewrite: { "^/api": "" },
      },
    },
  },
});
