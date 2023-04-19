import { resGetDetailInfo, reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from "@/utils/uuid_token";
export default {
  // store的配置
  state: {
    // 存储数据
    detailInfo: {},
    // 游客的临时身份
    uuid_token: getUUID(),
  },
  mutations: {
    // 修改state的唯一手段
    GETDETAILINFO(state, detailInfo) {
      state.detailInfo = detailInfo;
    },
  },
  actions: {
    // 可以书写自己的业务逻辑，也可以处理异步
    getDetailInfo({ commit }, skuId) {
      resGetDetailInfo(skuId).then(res => {
        // console.log(res);
        commit("GETDETAILINFO", res.data);
      });
    },
    // 将产品添加到购物车中 || 修改某一个产品的个数
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
      let result = await reqAddOrUpdateShopCart(skuId, skuNum);
      if (result.code === 200) {
        // 添加成功
        return "ok";
      } else {
        // 添加失败
        return Promise.reject(new Error("failed"));
      }
    },
  },
  getters: {
    // 可以理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
    categoryView(state) {
      // 比如：state、goodInfo初始状态空对象，空对象的categoryView属性值undefined
      return state.detailInfo.categoryView || {};
    },
    skuInfo(state) {
      return state.detailInfo.skuInfo || {};
    },
    spuSaleAttrList(state) {
      return state.detailInfo.spuSaleAttrList || [];
    },
  },
};
