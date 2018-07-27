<template>
    <div class="salesOrder">
      <div class="head">
        <zHeader :msg="msg" :title="title"></zHeader>
        <!--<div class="detail-head pl3 tc pr3 relative">
          <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
          <span class="fs36 cfff">销售订单</span>
          <a href="javascript:;" class="iconfont icon-more fs36 cfff right" @click="show"></a>
          <i class="z-dot" @click="show">
            2
          </i>
          <top-msg v-bind:dialogShow="showOrNot" @show="dialog"></top-msg>
        </div>-->
      </div>
      <div class="content">
        <div class="bgf">
          <ul class="detail-tab flex flex-alin-center">
            <router-link to="/salesOrder/salesOrderAll" tag="li" replace>
              全部
            </router-link>
            <router-link to="/salesOrder/salesOrderDqr" tag="li" replace>
              待确认
            </router-link>
            <router-link to="/salesOrder/salesOrderDbk" tag="li" replace>
              待收/补款
            </router-link>
            <router-link to="/salesOrder/salesOrderDfh" tag="li" replace>
              待发货
            </router-link>
            <router-link to="/salesOrder/salesOrderDsh" tag="li" replace>
              待收货
            </router-link>
            <router-link to="/salesOrder/salesOrderDpj" tag="li" replace>
              待评价
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

<script type="text/ecmascript-6">
import TopMsg from 'components/top-msg/top-msg'
import zHeader from 'components/z-header/z-header'
export default {
  data () {
    return {
      showOrNot: false,
      title:'销售订单',
      msg: true,
    }
  },
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
  },
  components: {TopMsg,zHeader}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .salesOrder
    .head
      position fixed
      top 0
      left 0
      width 100%
      z-index 999
      .detail-head
        background: #1081d1
        height: 128px
        line-height: 128px
        a
          line-height: 128px;
    .detail-tab
      height:80px
      line-height: 80px
      li
        width:25%
        text-align: center
        border-bottom:1px solid #ccc
        font-size:26px;
        &.router-link-exact-active
          color:$font-color-blueb
          border-bottom:1px solid #1081d1
    .content
      padding-top 130px
</style>
