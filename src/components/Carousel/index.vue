<template>
  <!-- 轮播图 -->
  <div class="swiper-container" ref="floor1Swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
  import Swiper from "swiper";

  export default {
    name: "",
    props: ["list"],
    watch: {
      list: {
        handler() {
          this.$nextTick(() => {
            var mySwiper = new Swiper(this.$refs.floor1Swiper, {
              //document.querySelector可以不要
              loop: true,
              //如果需要分页器
              pagination: {
                el: ".swiper-pagination",
                clickable: true, //轮播图中的小球，点击是否发生图片的转换，
              },
              //如果需要前进后退按钮
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            });
          });
        },
        //立即监听:不管数据变不变化，立即监听一次
        immediate: true,
      },
    },
  };
</script>

<style lang="less" scoped></style>
