<template>
    <div class="aboutICCat">
      <div class="fixedtop">
        <div class="header">
          <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
          <span class="txt">关于IC猫</span>
          <a class="add"></a>
        </div>
      </div>
      <div class="about" v-html="content">
        关于IC猫猫咪
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {abloutICMdo} from 'api/interfacemethod'
export default {
  data () {
    return {
      content: ''
    }
  },
  created () {
    this._abloutICMdo()
  },
  methods: {
    goback () {
      this.$router.back()
    },
    _abloutICMdo () {
      abloutICMdo().then((res) => {
        if (res.code === 1) {
          this.content = res.data.instructions
        }
      }).catch((res) => {})
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .aboutICCat
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
          margin-left -20px
        .add
          font-size 30px
          color #ffffff
          margin-top 60px
    .about
      margin-top 150px
      padding:0 3%
      font-size 30px
</style>
