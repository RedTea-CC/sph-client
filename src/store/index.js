import Vue from "vue";
import Vuex from "vuex";
//使用插件
Vue.use(Vuex);
//引入小仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";

//state:仓库存储数据的地方
const state = {};
//mutation:修改state的唯一手段
const mutations = {};
//actions:可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // 这里书写业务逻辑，但不能修改state
};
//getters:可以理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};

// 对外暴露Store类的一个实例
export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade,
  },
  state,
  mutations,
  actions,
  getters,
});
