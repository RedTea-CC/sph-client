import { reqGetCartList, reqDeleteCart, reqCheckCart } from "@/api";

export default {
  state: {
    cartList: [],
  },
  mutations: {
    GETCARTLIST(state, data) {
      state.cartList = data;
    },
  },
  actions: {
    // 获取购物车列表
    async getCartList({ commit }) {
      let result = await reqGetCartList();
      // console.log(result);
      if (result.code === 200) {
        commit("GETCARTLIST", result.data);
      }
    },
    // 删除购物车中的某一个产品
    async deleteCartListById({ commit }, skuId) {
      let result = await reqDeleteCart(skuId);
      if (result.code == 200) {
        return "ok";
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    // 修改购物车中某个商品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
      let result = await reqCheckCart(skuId, isChecked);
      if (result.code == 200) {
        return "ok";
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    // 删除购物车中所有选中的商品
    deleteAllCheckedCart({ dispatch, getters }) {
      //context：小仓库 commit【提交mutations修改state】 getters【计算属性】dispatch【派发action】state【当前仓库数据】
      let promises = [];
      getters.cartList.cartInfoList.forEach(item => {
        if (item.isChecked === 1) {
          let promise = reqDeleteCart(item.skuId);
          //将每一次返回的Promise对象添加到数组当中
          promises.push(promise);
        }
      });
      //只要全部的结果都成功，结果就是成功的，如果有一个失败，返回即为失败的结果
      return Promise.all(promises);
    },
    // 修改购物车中所有商品的选中状态
    updateAllCartChecked({ dispatch, state }, isChecked) {
      let promises = [];
      state.cartList[0].cartInfoList.forEach(item => {
        if (item.isChecked != isChecked) {
          let promise = dispatch("updateCheckedById", {
            skuId: item.skuId,
            isChecked,
          });
          promises.push(promise);
        }
      });
      return Promise.all(promises);
    },
  },
  getters: {
    cartList(state) {
      //购物车列表
      return state.cartList[0] || {};
    },
  },
};
