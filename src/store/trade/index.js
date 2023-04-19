import { reqAddressInfo, reqOrderInfo } from "@/api";

export default {
  state: {
    address: [],
    orderInfo: {},
  },
  mutations: {
    GETUSERADDRESS(state, address) {
      state.address = address;
    },
    GETORDERINFO(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
  },
  actions: {
    // 获取用户信息
    async getUserAddress({ commit }) {
      let result = await reqAddressInfo();
      //   console.log(result);
      if (result.code == 200) {
        commit("GETUSERADDRESS", result.data);
      }
    },
    // 获取商品清单数据
    async getOrderInfo({ commit }) {
      let result = await reqOrderInfo();
      //   console.log(result);
      if (result.code == 200) {
        commit("GETORDERINFO", result.data);
      }
    },
  },
  getters: {},
};
