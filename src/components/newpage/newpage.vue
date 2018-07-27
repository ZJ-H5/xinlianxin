<template>
    <div class="newpage ">
      <div class="fixedtop">
        <div class="header">
          <m-header :title="title" :headerflag="true"></m-header>
        </div>
      </div>
      <div class="pl3 pr3 deal">
        <img :src="imgurl" alt="" width="100%" height="100%">
        <p class="mt30 fs26" style="text-indent:2em;" v-html="html"></p>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
export default {
  data () {
    return {
      html: '',
      title: '',
      imgurl: ''
    }
  },
  methods: {

  },
  created () {
    this.html = this.$route.params.html
    this.title = this.$route.params.title
    this.imgurl = this.$route.params.imgurl
  },
  components: {
    MHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .newpage
    background:#fff
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
          // margin-top 60px
        .txt
          font-size 36px
          margin-top 60px
          margin-left -20px
        .add
          font-size 30px
          color #ffffff
          margin-top 60px
    .deal
      margin-top 138px
      line-height 50px
      font-size 28px
      padding-bottom 50px
      .dealh3
        font-size 34px
      .dealh4
        color #444
      p
        color #666666
        h1:nth-child(2)
          font-size 32px
          margin-bottom 30px
</style>
