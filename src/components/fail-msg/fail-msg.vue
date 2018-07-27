<template>
    <div class="payOrder">
      <div class="head">
        <div class="detail-head pl3 tc pr3 relative">
          <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
          <span class="fs36 cfff">付款失败</span>
        </div>
      </div>

      <div class="content">
        <div class="msg-content">
          <img :src="icon" alt="" class="msg-icon">
          <p class=" pb30 f34 c0">
            付款失败
          </p>
          <p class=" pb30 f28 c6 pl3 pr3 lh50">
            您可以继续挑选物品下单付款，或者可以前往待付款页面重新下单付款
          </p>
        </div>
        <p class="z-title">
          推荐产品
        </p>
        <div>
          <nominate></nominate>
        </div>

      </div>

    </div>
</template>

<script>
import { Clocker,XDialog,Msg } from 'vux'
import {alipayPaydo} from 'api/interfacemethod'
import nominate from 'components/nominate/nominate'
export default {
  data(){
    return{
      time1: '2018-07-13 21:54',
      data:this.$route.query.data,
      res:'',
      showToast:false,
      payUrl:'',
      icon:require('./fail@2x.png')
    }
  },
  components: {
    Clocker,
    XDialog,
    Msg,
    nominate
  },
  created () {
    setTimeout(() => {
      this.time1 = '2018-08-13 22:54'
    }, 5000)
    console.log(this.data)
    this.initPasswordGroup()

  },
  methods:{
    goback () {
      this.$router.replace('/purchaseOrder/qb')
    }
  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .payOrder
    .head
      position fixed
      top 0
      left 0
      width 100%
      z-index 999
    .content
      padding-top 240px
      .msg-content
        text-align center
        .msg-icon
          width 120px
          height 120px
          margin-bottom 60px
      .z-title
        background #ffffff
        line-height 60px
        font-size 30px
        padding-left 40px
        border-bottom 1px solid #e6e6e6
        color #333

</style>
