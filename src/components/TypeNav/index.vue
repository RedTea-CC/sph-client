<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件的委派|事件委托 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item bo"
                v-for="(c1, index) in categoryList"
                v-if="index < 16"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <!-- 二三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="(c2, index) in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
  //引入方式：把lodash全部功能引入
  // import _ from "lodash";
  // 按需引入，引入节流函数
  import throttle from "lodash/throttle";
  import { mapState } from "vuex";
  export default {
    name: "TypeNav",
    data() {
      return {
        //存储用户鼠标移上哪一个一级分类
        currentIndex: -1,
        show: true,
      };
    },
    methods: {
      // changeIndex(index) {
      //   this.currentIndex = index;
      // },
      //节流写法：lodash插件
      changeIndex: throttle(function (index) {
        this.currentIndex = index;
      }, 50),
      leaveShow() {
        this.currentIndex = -1;
        if (this.$route.path != "/home") {
          this.show = false;
        }
      },
      // 进行路由跳转
      goSearch(event) {
        let element = event.target;
        // console.log(element.dataset);
        let { categoryname, category1id, category2id, category3id } =
          element.dataset;
        // 通过解构函数判断是否存在某个属性
        // 通过存在的属性判单是否为a标签，几个分类
        if (categoryname) {
          let location = { name: "search" };
          let query = { categoryName: categoryname };
          if (category1id) {
            query.category1Id = category1id;
          } else if (category2id) {
            query.category2Id = category2id;
          } else {
            query.category3Id = category3id;
          }
          if (this.$route.params) {
            location.params = this.$route.params;
            location.query = query;
            this.$router.push(location);
          }
        }
      },
      enterShow() {
        this.show = true;
      },
    },
    mounted() {
      //
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    computed: {
      //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      //注入一个参数state，这指的是大仓库中的数据
      ...mapState({
        categoryList: state => state.home.categoryList,
      }),
    },
  };
</script>
<style lang="less" scoped>
  .type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;

        .all-sort-list2 {
          .item {
            h3 {
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;
              }
            }

            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }

            // &:hover {
            //   .item-list {
            //     display: block;
            //   }
            // }
          }
          // .item:hover {
          //   background-color: skyblue;
          // }
          .cur {
            background-color: skyblue;
          }
        }
      }
      // 过渡动画
      .sort-enter,
      .sort-leave-to {
        opacity: 0;
      }
      .sort-enter-to,
      .sort-leave {
        opacity: 1;
      }
      .sort-enter-active {
        transition: all 0.5s linear;
      }
      .sort-leave-active {
        transition: all 0.5s ease;
      }
    }
  }
</style>
