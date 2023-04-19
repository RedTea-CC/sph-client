//配置路由
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";
//使用插件
Vue.use(VueRouter);

//把人家原型对象的push方法进行保存
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//VueRouter.prototype原型对象添加一个方法
//location:路由跳转相关的信息
// 重写push方法
VueRouter.prototype.push = function (location, resolve, reject) {
  //当前函数this：即为VueRouter类的实例
  //相当于push方法里面this，是windows【完犊子了】
  //利用人家push方法实现路由跳转，保证push里面this,应该vueRouter类的实例

  //面试:函数apply与call区别?
  //相同的地方:都可以篡改函数里面this
  //不同的地方:apply传递参数 数组  call传递参数 逗号分割

  if (resolve && reject) {
    //代表真:代表着两个形参接受参数【箭头函数】
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
// 重写replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    //代表真:代表着两个形参接受参数【箭头函数】
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//配置路由
let router = new VueRouter({
  routes,
  // 跳转后滚动条位置
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
});
// 全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
  //to:可以获取到你要跳转的那个路由信息
  //from:可以获取到你从哪个路由而来的信息
  //next：放行函数,有时候要加入一些条件才可以放行，
  //next(path):放行到指定的路由
  //next(false):中断

  //用户登陆了，才会有token，未登录一定不会有token
  let token = store.state.user.token;
  //用户的信息
  //空对象的布尔值永远是1，因此不能直接用空对象进行判断，要用值去判断
  let name = store.state.user.userInfo.name;

  if (token) {
    //用户已经登录了，还想去login---不可以，让其停留在首页
    if (to.ptah == "/login" || to.path == "/register") {
      next("/");
    } else {
      //用户已经登录了，但是去的不是login页面
      //如果用户名已经有了
      if (name) {
        next();
      } else {
        //没有用户信息，派发action让仓库存储用户信息再跳转
        try {
          await store.dispatch("userInfo");
          next();
        } catch (error) {
          //如果获取用户信息失败，token失效了（如身份过期等原因）
          //清除token
          await store.dispatch("userLogout");
          next("/login");
          alert(error.message);
        }
      }
    }
  } else {
    //未登录，不能去交易相关的、支付相关的、个人中心
    //未登录状态去上面这些路由----应先登录
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/center") != -1 ||
      toPath.indexOf("/pay") != -1
    ) {
      //把未登录的时候想去但是没有去成的信息，存储在地址栏中【路由】
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});

export default router;
