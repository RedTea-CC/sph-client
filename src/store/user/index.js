import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogOut,
} from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";

export default {
  state: {
    code: "",
    token: getToken(),
    userInfo: "",
  },
  mutations: {
    GETCODE(state, code) {
      state.code = code;
    },
    USERLOGIN(state, token) {
      state.token = token;
    },
    USERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    CLEARUSERINFO(state) {
      //把仓库中相关用户信息清空
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
  actions: {
    // 获取验证码
    async getCode({ commit }, phone) {
      let result = await reqGetCode(phone);
      // console.log(result);
      if (result.code === 200) {
        commit("GETCODE", result.data);
        return "ok";
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    // 用户注册
    async userRegister({ commit }, data) {
      let result = await reqUserRegister(data);
      // console.log(result);
      if (result.code === 200) {
        return "ok";
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    // 用户登录
    async userLogin({ commit }, data) {
      let result = await reqUserLogin(data);
      //服务器下发token，用户唯一标识符（uuid）
      //将来经常通过带token找服务器要用户信息进行展示
      if (result.code == 200) {
        //用户已经登录成功并且获取到token
        commit("USERLOGIN", result.data.token);
        //持久化存储token
        setToken(result.data.token);
        return "ok";
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    // 获取用户信息
    async userInfo({ commit }) {
      let result = await reqUserInfo();
      if (result.code == 200) {
        commit("USERINFO", result.data);
        return "ok";
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    // 退出登录
    async userLogout({ commit }) {
      //只是向服务器发起一次请求，通知服务器清除token
      let result = await reqLogOut();
      //action里面不能操作state，提交mutation修改state
      if (result.code == 200) {
        commit("CLEARUSERINFO");
      } else {
        return Promise.reject(new Error("faile"));
      }
    },
  },
  getters: {},
};
