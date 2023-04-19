// search模块的仓库
import { resGetSearchInfo } from "@/api";
const state = {
  searchList: {},
};
const mutations = {
  SEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  //获取search模块的数据
  async getSearchList({ commit }, params = {}) {
    //当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
    //params形参，是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    let result = await resGetSearchInfo(params);
    // console.log(result);
    if (result.code === 200) {
      commit("SEARCHLIST", result.data);
    }
  },
};
// getters简化仓库中的数据
const getters = {
  // 当前形参state时当前仓库中的state，并非大仓库中的
  goodsList(state) {
    //如果网络不给力，searchList根据上面默认是个空{},state.searchList.goodsList则返回的是undefined，这样不能遍历
    //计算新的属性的属性值至少是一个数组
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
