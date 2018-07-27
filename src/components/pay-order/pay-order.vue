<template>
    <div class="payOrder">
      <div class="detail-head pl3 tc pr3 relative">
        <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
        <span class="fs36 cfff">支付订单</span>
      </div>
      <p class="tc fs30 c6 mt30">
        支付剩余时间
      </p>
      <p class="tc mt30 ">
        <clocker time="2018-08-01">
          <span style="background:#333;color:#fff;padding:5px;" class="fs30">%H</span>
          <span>:</span>
          <span style="background:#333;color:#fff;padding:5px;" class="fs30">%M</span>
          <span>:</span>
          <span style="background:#333;color:#fff;padding:5px;" class="fs30">%S</span>
        </clocker>
      </p>
      <ul class="bdt bgf lh80 mt30 fs30">
        <li class="flex bdb pl3 pr3 c0 tr">
           <span>订单号：{{data.ordercode}}</span>
           <span class="flex-1 tr">金额：{{data.pay/100}}</span>
        </li>
      </ul>
      <div class="lgbtn pl3 pr3">
        <a href="javascript:;" class="lgbtna tc" @click="checkPay(data.id)">确认支付</a>
      </div>

     <x-dialog v-model="showToast" class="dialog-pay">
       <a class="payContent" :href="payUrl">
         立即支付
       </a>
      </x-dialog>
    </div>
</template>

<script>
import {Clocker, XDialog} from 'vux'
import {alipayPaydo} from 'api/interfacemethod'
export default {
  data () {
    return {
      time1: '2018-07-13 21:54',
      data: this.$route.params.data,
      res: '',
      showToast: false,
      payUrl: ''
    }
  },
  components: {
    Clocker,
    XDialog
  },
  created () {
    setTimeout(() => {
      this.time1 = '2018-08-13 22:54'
    }, 5000)
    console.log(this.data)
    this.initPasswordGroup()
  },
  methods: {
    goback () {
      this.$router.back()
    },
    initPasswordGroup () {
      this.passwordGroup = []
      for (var i = 0; i < 6; i++) {
        this.passwordGroup.push({
          value: null
        })
      }
    },
    checkPay (id) {
      this._alipayPaydo(id)
    },
    _alipayPaydo (id) {
      alipayPaydo({
        orderId: id
      }).then((res) => {
        console.log(res)
        window.location.href = res
      }).catch((res) => {})
    }
  },
  watch: {
    currentInputIndex (val) {
      if (val === 5) {
        console.log(this.pasgroup)
      } else if (val <= -1) {
        this.currentInputIndex = -1
      }
    }
  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .payOrder
    .lgbtn
      margin-top: 1.2rem;
      .lgbtna
        width: 100%;
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: 0.48rem;
        display: inline-block;
        background-color: #1081d1;
        border-radius: 0.133333rem;
        color: #fff;
    .dialog-pay
      .payContent
        display block
        width 80%
        height 100px
        background #ffffff
        font-size 30px
        color #666666
        text-align center
        line-height 100px
        border-radius 20px

</style>
