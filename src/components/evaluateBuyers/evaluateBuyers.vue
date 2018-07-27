<template>
    <div class="evaluateBuyers">
      <div class="fixedtop">
        <div class="header">
          <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
          <span class="txt">评论</span>
          <a class="add">提交</a>
        </div>
      </div>
      <div class="bgf starbig">
        <div class="flex starbx mb30">
          <span class="left starbxa">订单履约能力</span>
          <div class="left"><star-score :score="3"></star-score></div>
        </div>
        <div class="flex starbx ">
          <span class="left starbxa">付款及时程度</span>
          <div class="left"><star-score :score="5"></star-score></div>
        </div>
      </div>
      <div class="startxt">温馨提示：点击小星星就可以打分！</div>
    </div>
</template>

<script type="text/ecmascript-6">
import starScore from 'components/starScore/starScore'
export default {
  components: {
    starScore
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .evaluateBuyers
    .fixedtop
      position fixed
      left 0px
      top 0px
      width 100%
      .header
        height 128px
        background-color #1081d1
        color #ffffff
        padding 0 3%
        display flex
        justify-content space-between
        .icon-back1
          font-size 48px
          margin-top 60px
        .txt
          font-size 36px
          margin-top 60px
        .add
          font-size 30px
          color #ffffff
          margin-top 60px
    .starbig
      margin-top 128px
      padding 50px 0px
      .mb30
        margin-bottom 30px
      .starbx
        justify-content center
        align-items center
        .starbxa
          color #333333
          font-size 26px
          margin-right 25px
    .startxt
      padding 0 3%
      margin-top 25px
      font-size 24px
      color #666666
</style>
