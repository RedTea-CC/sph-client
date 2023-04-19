//引用路由组件
/* import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
//引入二级路由组件
import myOrder from "@/pages/Center/myOrder";
import groupOrder from "@/pages/Center/groupOrder"; */

// 路由懒加载
// const Foo = () => {
//   return import("./Foo.vue");
// };

export default [
  //重定向，在项目跑起来的时候，访问/ 立马让他定向到首页
  {
    path: "*",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/Home"),
    meta: { show: true },
  },
  {
    path: "/search/:keyword?",
    name: "search",
    component: () => import("@/pages/Search"),
    meta: { show: true },
    props: $route => {
      return {
        keyword: $route.params.keyword,
        k: $route.query.k,
      };
    },
  },
  {
    path: "/register",
    component: () => import("@/pages/Register"),
    meta: { show: false },
  },
  {
    path: "/login",
    component: () => import("@/pages/Login"),
    meta: { show: false },
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: () => import("@/pages/Detail"),
    meta: { show: true },
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: () => import("@/pages/AddCartSuccess"),
    meta: { show: true },
  },
  // 支付页面
  {
    path: "/shopcart",
    name: "shopcart",
    component: () => import("@/pages/ShopCart"),
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next();
      } else {
        next(false);
      }
    },
  },
  // 交易页面
  {
    path: "/trade",
    name: "trade",
    component: () => import("@/pages/Trade"),
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      /* 去交易页面：必须从购物车而来 */
      if (from.path == "/shopcart") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/pay",
    name: "pay",
    component: () => import("@/pages/Pay"),
    meta: { show: true },
  },
  {
    path: "/paysuccess",
    name: "paysuccess",
    component: () => import("@/pages/PaySuccess"),
    meta: { show: true },
  },
  {
    path: "/center",
    name: "center",
    component: () => import("@/pages/Center"),
    meta: { show: true },
    // 二级路由组件
    children: [
      {
        path: "myorder",
        name: "myorder",
        component: () => import("@/pages/Center/myOrder"),
      },
      {
        path: "grouporder",
        component: () => import("@/pages/Center/groupOrder"),
      },
      {
        //重定向
        path: "/center",
        redirect: "myorder",
      },
    ],
  },
];
