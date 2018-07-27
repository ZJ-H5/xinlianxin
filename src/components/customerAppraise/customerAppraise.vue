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
          响应速度
        </span> <rater v-model="answerStar" :font-size="25"></rater>
        <em class="ml50 pjfs">{{answerStar}}分</em>
      </p>
      <p class="pj f30">
        <span>
          信息真实性
        </span>
         <rater v-model="realStar" :font-size="25"></rater>
        <em class="ml50 pjfs">{{realStar}}分</em>
      </p>
      <p class="pj f30">
        <span>
          订单履约
        </span>
         <rater v-model="sellerPerformStar" :font-size="25"></rater>
        <em class="ml50 pjfs">{{sellerPerformStar}}分</em>
      </p>
      <p class="pj f30">
        <span>
          物流速度
        </span>
         <rater v-model="logisticsStar" :font-size="25"></rater>
        <em class="ml50 pjfs">{{logisticsStar}}分</em>
      </p>
      <p class="pj f30">
        <span>
          产品质量
        </span>
         <rater v-model="qualityStar" :font-size="25"></rater>
        <em class="ml50 pjfs">{{qualityStar}}分</em>
      </p>
    </div>
    <p class="pl3 pt20">
      温馨提示：点击小星星就可以打分！
    </p>
  </div>
</template>

<script>
  import {saveCommentdo} from 'api/interfacemethod'
  import {Popup, XSwitch, Group, Confirm,Toast,Rater } from 'vux'
export default {
    data(){
      return{
        answerStar:0,//响应速度
        realStar:0,//信息真实性
        sellerPerformStar:0,//订单履约能力
        logisticsStar:0,//物流速度
        qualityStar:0,//产品质量
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
      this._saveCommentdo()
    },
    _saveCommentdo(){
      saveCommentdo({
        orderId:this.$route.query.orderId,
        answerStar:this.answerStar,
        realStar:this.realStar,
        sellerPerformStar:this.sellerPerformStar,
        logisticsStar:this.logisticsStar,
        qualityStar:this.qualityStar
      }).then((res)=>{
        if(res.code==1){
          this.$vux.toast.text(res.msg, 'middle')
          setTimeout(()=>{
            this.$router.back()
          },1000)
        }else{
          this.$vux.toast.text(res.msg, 'middle')
          setTimeout(()=>{
            this.$router.back()
          },1000)
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
