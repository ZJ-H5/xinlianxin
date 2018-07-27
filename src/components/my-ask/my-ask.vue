<template>
    <div class="my-ask">
      <div class="head">
        <zHeader :msg="msg" :title="title"></zHeader>
        <!--<div class="detail-head pl3 tc pr3 relative">
          <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
          <span class="fs36 cfff">我的询价</span>
          <a href="javascript:;" class="iconfont icon-more fs36 cfff right" @click="show"></a>
          <i class="z-dot" @click="show" v-if="statusCount>0">
            {{statusCount}}
          </i>
          <top-msg v-bind:dialogShow="showOrNot" @show="dialog" :statusCount="statusCount"></top-msg>
        </div>-->
      </div>
        <div class="content ">
        <div class="bgf pb20">
          <ul class="detail-tab flex flex-alin-center">
            <router-link to="/myAsk/yxj" tag="li" replace>
              已报价
            </router-link>
            <router-link to="/myAsk/wxj" tag="li" replace>
              未报价
            </router-link>
          </ul>
        </div>

        <keep-alive>
          <router-view>
          </router-view>
        </keep-alive>
      </div>

    </div>
</template>

<script>
import TopMsg from 'components/top-msg/top-msg'
// import {fictionMixin} from '@/api/minx'
import zHeader from 'components/z-header/z-header'
export default {
  // mixins: [fictionMixin],
  data () {
    return {
      msg: true,
      showOrNot: false,
      title: '我的询价'
    }
  },

  components: {TopMsg, zHeader},
  methods: {
    show () {
      this.showOrNot = true
    },
    dialog () {
      this.showOrNot = false
    },
    goback () {
      this.$router.back()
    }
  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .my-ask
    .head
      position fixed
      top 0
      left 0
      width 100%
      z-index 999
    .content
      padding-top 130px
      .detail-tab
        height:80px
        line-height: 80px
      li
        width:50%
        text-align: center
        border-bottom:1px solid #ccc
        font-size:30px;
        &.router-link-exact-active
          color:$font-color-blueb
          border-bottom:1px solid #1081d1
</style>
