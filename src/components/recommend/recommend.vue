<template>
  <div class="recommend"
    ref="recommend">
    <!--<Banner></Banner>-->
    <m-header :title="title"></m-header>
    <scroll ref="scroll" class="nominate-content">
      <div class="content">
        <j-serach></j-serach>
        <index-tab></index-tab>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </scroll>
    <tab></tab>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import JSerach from 'base/j-serach/j-serach'
import IndexTab from 'components/index-tab/index-tab'
import Tab from 'components/tab/tab'

import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Banner from 'components/banner/banner'
export default {
  // 注册轮播组件
  data () {
    return {
      title: '首页'
    }
  },
  created(){
  },
  components: {
    MHeader,
    JSerach,
    IndexTab,
    Loading,
    Scroll,
    Tab,
    Banner
  },
  methods:{
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';
.recommend
  .header
    position relative
  .nominate-content
   /* padding-top 128px*/
</style>
