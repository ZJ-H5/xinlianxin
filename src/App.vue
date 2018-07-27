<template>
  <div id="app">
    <!-- 将数据缓存到页面中 -->
    <!-- <transition :name="transitionName"  mode="in-out"> -->
      <keep-alive>
        <router-view v-if="$route.meta.noCache" class="child-view"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.noCache" class="child-view"></router-view>

      <!-- <router-view  class="child-view"></router-view> -->
    <!-- </transition> -->
    <!-- 四个按钮 -->
  </div>
</template>

<script type="text/ecmascript-6">
import Tab from 'components/tab/tab'

export default {
  data () {
    return {
      transitionName: 'slide-left' // 默认动态路由变化为slide-right
    }
  },
  components: {
    Tab
  }
  // watch: {
  //   '$route' (to, from) {
  //     const toDepth = to.path.split('/').length
  //     const fromDepth = from.path.split('/').length
  //     this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  //   }
  // }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .child-view {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    position:absolute;
    transition: all .5s;
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100px, 0);
    transform: translate(100px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100px, 0);
    transform: translate(-100px, 0);opacity: 0;
    -webkit-transform: translate(-100px, 0);
    transform: translate(-100px, 0);
  }
  /*.slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }*/
</style>
