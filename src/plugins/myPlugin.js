// 自定义插件
//Vue插件一定暴露一个对象
let myPlugins = {};

myPlugins.install = function (Vue, options) {
  //添加全局资源
  Vue.directive(options.name, (element, params) => {
    // element:元素，第二个参数params：对象
    element.innerHtml = params.value.toUpperCase();
  });
};
