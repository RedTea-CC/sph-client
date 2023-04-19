import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";
const state = {
  // state中数据默认初始值【根据接口的返回值去初始化】
  categoryList: [],
  bannerList: [],
  floorList: [],
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  FLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
const actions = {
  //通过APi里面的接口函数调用，向服务器发请求，获取服务器的数据
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code === 200) {
      commit("CATEGORYLIST", result.data);
    }
  },
  // 获取首页轮播图banner数据
  async getBannerList({ commit }) {
    let result = await reqGetBannerList();
    if (result.code === 200) {
      commit("BANNERLIST", result.data);
    }
  },
  // 获取首页轮播图floor数据
  async getFloorList({ commit }) {
    let result = await reqGetFloorList();
    // console.log(result);
    if (result.code === 200) {
      commit("FLOORLIST", result.data);
    }
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
