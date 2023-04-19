<template lang="">
  <div>
    <!-- 三级联动，全局组件 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor
      v-for="(floor, index) in floorList"
      :key="floor.id"
      :list="floor"
    ></Floor>
    <!-- <Floor></Floor> -->
    <Brand></Brand>
  </div>
</template>
<script>
  import ListContainer from "@/pages/Home/ListContainer";
  import Recommend from "@/pages/Home/Recommend";
  import Rank from "@/pages/Home/Rank";
  import Like from "@/pages/Home/Like";
  import Floor from "@/pages/Home/Floor";
  import Brand from "@/pages/Home/Brand";

  import { mapState } from "vuex";

  export default {
    name: "Home",
    components: {
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand,
    },
    computed: {
      ...mapState({
        floorList: state => state.home.floorList,
      }),
    },
    mounted() {
      this.$store.dispatch("getFloorList");
      // 获取用户信息
      this.$store.dispatch("userInfo");
    },
  };
</script>
<style lang="less" scoped></style>
