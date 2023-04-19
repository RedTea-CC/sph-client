<template>
  <div id="app">
    <Header></Header>
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 在Home、Search中显示；在登录、注册时隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
  import Header from "./components/Header";
  import Footer from "./components/Footer";

  export default {
    name: "App",
    components: {
      Header,
      Footer,
    },
    mounted() {
      //通知vuex发请求，获取收据，存储与仓库中
      this.$store.dispatch("categoryList");
    },
  };
</script>

<style></style>
