//对axios进行二次封装
import axios from "axios";
// 引入进度条、进度条条样式
import nprogress from "nprogress";
import "nprogress/nprogress.css";

//在当前模块中引入store
import store from "@/store";
//1.利用axios对象的方法create,去创建一个axios实例
//2.request就是axios，只不过稍微配置一下
const requests = axios.create({
  //配置对象
  //基础路径，发送请求的时候，路径当中会出现api
  baseURL: "/api",
  // 代表请求超时的时间5S
  timeout: 5000,
});

// 请求拦截器:在发请求之前可以处理一些业务
requests.interceptors.request.use(config => {
  // config：配置对象，对象里面有一个属性很重要，header请求头
  // start：进度条开始 done：进度条结束
  nprogress.start();
  if (store.state.detail.uuid_token) {
    //请求头中添加一个字段（userTempId），已经和后台老师商量好了
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  //需要携带token，将其带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  return config;
});

// 响应拦截器
requests.interceptors.response.use(
  res => {
    // 成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    nprogress.done();
    return res.data;
  },
  error => {
    console.log(error);
    return Promise.reject(new Error("faile"));
  }
);

export default requests;
