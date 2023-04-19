import Vue from "vue";
import App from "./App.vue";
import router from "@/router"; //引入路由、仓库
import store from "@/store";

//全局组件参数：第一个为全局组件名字，第二个为哪个组件
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
// Vue.component(TypeNa.name, TypeNav); //两种写法
Vue.component("TypeNav", TypeNav); //三级联动组件---全局组件
Vue.component("Carousel", Carousel); //全局：轮播图
Vue.component("Pagination", Pagination); //全局：分页器

// element-ui
import { Button, MessageBox } from "element-ui";
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 第三方
//引入mockServe文件,让咱们模拟接口跑起来、引入swiper样式、图片懒加载:使用Vue-Lazyload插件
import "@/mock/mockServe";
import "swiper/css/swiper.css";
import VueLazyload from "vue-lazyload";
import loading from "@/assets/loading.webp";
Vue.use(VueLazyload, {
  //懒加载时的默认图
  loading: loading,
});
//引入表单校验插件
import "@/plugins/validate";

//统一接口api文件夹里的全部请求函数
import * as API from "@/api";
// 测试请求
// import { reqCategoryList } from "@/api";
// reqCategoryList();

// vue生产提示
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  //注册路由：底下的写法KV一致省略V router:'router'
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  //注册仓库：组件实例的身上会多一个$store属性
  store,

  beforeCreate() {
    Vue.prototype.$bus = this; //安装全局事件总线
    Vue.prototype.$API = API; //统一接口api
  },
}).$mount("#app");
