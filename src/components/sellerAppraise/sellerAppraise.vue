<template>
  <div class="collect">
    <div class="detail-head pl3 tc pr3 relative">
      <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
      <span class="fs36 cfff">评论</span>
      <a href="javascript:;"  class="fs30 cfff right" @click="saveAppraise">提交</a>
    </div>
    <div class="pb20 pl3 pr3 mb20 bgf pt20">
      <p class="pj f30">

        <span>
         订单履约能力
        </span> <rater v-model="buyersPerformStar" :font-size="25"></rater>
        <em class="ml50 pjfs">{{buyersPerformStar}}分</em>
      </p>
      <p class="pj f30">
        <span>
          付款及时程度
        </span>
         <rater v-model="paymentStar" :font-size="25"></rater>
        <em class="ml50 pjfs">{{paymentStar}}分</em>
      </p>
    </div>
    <p class="pl3 pt20">
      温馨提示：点击小星星就可以打分！
    </p>
    <toast position="middle" :value="msgshow" :text="text"  width="50%"></toast>
  </div>
</template>

<script>
  import {saveSellCommentdo} from 'api/interfacemethod'
  import {Popup, XSwitch, Group, Confirm,Toast,Rater } from 'vux'
export default {
    data(){
      return{
        buyersPerformStar:0,//订单履行能力
        paymentStar:0,//付款及时程度
        text:'',
        msgshow:false
      }
    },
  components: {Popup, XSwitch, Group, Confirm,Toast,Rater },
  created(){
  },
  methods: {
    goback () {
      this.$router.back()
    },
    saveAppraise(){
      this._saveSellCommentdo()
    },
    _saveSellCommentdo(){
      saveSellCommentdo({
        orderId:this.$route.query.orderId,
        buyersPerformStar:this.buyersPerformStar,
        paymentStar:this.paymentStar,
      }).then((res)=>{
        if(res.code==1){
          this.$vux.toast.text(res.msg, 'middle')
          this.$router.back()
        }

      }).catch((res)=>{})
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .collect
    .vux-rater a
      font-size 17px
    .pj
      display flex
      align-items center
      padding-top 20px
      padding-bottom 20px
      color #333
      font-size 30px
      span
        display inline-block
        width 30%
      .pjfs
        color:#ffba00

</style>
