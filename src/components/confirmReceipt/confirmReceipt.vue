<template>
    <div class="confirmReceipt">
      <div class="fixedtop">
        <div class="header">
          <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
          <span class="txt">确认收款</span>
          <a class="add"></a>
        </div>
      </div>
      <ul class="qrskul">
        <li class="qrskli bgf pl3 pr3">
          <p class="qrsklipa">付款金额：<span>¥233.32</span></p>
          <div class="clr qrskliimg"><img v-for="imgsrc in imgsrcs" :src="imgsrc.url"></div>
          <div class="mt20 pb20 tr">
            <a class="qrsklibtna radius8">已确认</a>
          </div>
        </li>
        <li class="qrskli bgf pl3 pr3">
          <p class="qrsklipa">付款金额：<span>¥233.32</span></p>
          <div class="clr qrskliimg"><img v-for="imgsrc in imgsrcs" :src="imgsrc.url"></div>
          <div class="mt20 pb20 tr">
            <a class="qrsklibtna radius20">确认收款</a>
          </div>
        </li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      imgsrcs: [
        {url: require('./uploada.png')},
        {url: require('./uploada.png')},
        {url: require('./uploada.png')}
      ]
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .confirmReceipt
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
    .qrskul
      margin-top 128px
      .qrskli
        margin-bottom 20px
        border-bottom 1px solid #e6e6e6
        border-top 1px solid #e6e6e6
        .qrsklipa
          height 80px
          line-height 80px
          color #333333
          font-size 30px
          span
            color #d70000
        .qrskliimg
          margin-left -85px
          img
            margin-left 83px
            margin-bottom 20px
            width 180px
            height 150px
        .qrsklibtna
          color #1081d1
          font-size 28px
          padding 10px 20px
          border 2px solid #1081d1
          display inline-block
        .radius8
          border-radius 8px
        .radius20
          border-radius 20px
</style>
