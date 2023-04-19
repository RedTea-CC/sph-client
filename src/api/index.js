//当前这个模块：API进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax";

//三级联动接口
// /api/product/getBaseCategoryList get 无参数
// export const reqCategoryList = () =>
//   requests.get(`/product/getBaseCategoryList`);
export const reqCategoryList = () => {
  //发请求,返回的结果是promise对象 当前函数执行需要把服务器返回结果进行返回
  return requests({
    url: "/product/getBaseCategoryList",
    method: "get",
  });
};
// 获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequests.get("/banner"); //简写形式
// 获取floor数据
export const reqGetFloorList = () => mockRequests.get("/floor");
// 获取search模块数据:/api/list POST 有参数
export const resGetSearchInfo = params =>
  requests({
    url: "/list",
    method: "post",
    data: params,
  });
// 获取detail模块数据:/api/item/{ skuId } GET 无参数
export const resGetDetailInfo = skuId =>
  requests({
    url: `/item/${skuId}`,
    method: "get",
  });
// 产品添加到购物车中（获取更新某一个产品的个数）：/api/cart/addToCart/{ skuId }/{ skuNum } POST 两个参数
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
// 获取购物车列表数据：/api/cart/cartList GET 无参数
export const reqGetCartList = () => {
  return requests({
    url: "/cart/cartList",
    method: "get",
  });
};
// 删除购物车中的某一个产品：/api/cart/deleteCart/{ skuId } DELETE 一个参数
export const reqDeleteCart = skuId =>
  requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete",
  });
// 切换购物车中某一个产品的选中状态：/api/cart/checkCart/{ skuId }/{ isChecked } GET 两个参数
export const reqCheckCart = (skuId, isChecked) =>
  requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
  });
// 获取验证码：/api/user/passport/sendCode/{ phone } GET 一个参数
export const reqGetCode = phone =>
  requests({
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
  });
// 用户注册 --->携带请求体参数
export const reqUserRegister = data =>
  requests({
    url: "/user/passport/register",
    method: "post",
    //简写（k,v一致，省略v）
    data,
  });
// 用户登录
export const reqUserLogin = data =>
  requests({
    url: "/user/passport/login",
    method: "post",
    data,
  });
//获取用户的信息【携带token】
export const reqUserInfo = () => {
  return requests({
    url: "/user/passport/auth/getUserInfo",
    method: "get",
  });
};
// 退出登录
export const reqLogOut = () =>
  requests({
    url: "/user/passport/logout",
    method: "get",
  });
//获取用户地址信息 URL:/api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = () =>
  requests({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });
//获取商品清单 URL:/api/order/auth/trade   method:get
export const reqOrderInfo = () =>
  requests({ url: "/order/auth/trade", method: "get" });
//提交订单的接口 URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  method:post
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data,
  });
//获取支付信息 URL:/api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo = orderId =>
  requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  });
//获取支付订单状态 URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = orderId =>
  requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });
//获取个人中心的数据  /api/order/auth/{page}/{limit}  get
export const reqMyOrderList = (page, limit) =>
  requests({
    url: `/order/auth/${page}/${limit}`,
    get: "get",
  });
