<template>
    <div class="m-header tc">
      <a class="iconfont icon-back1 back left" v-show="headerflag" @click="back"></a>
      <h1 class="flex-1 tc">{{title}}</h1>
      <a href="javascript:;" class="iconfont icon-shanchu delete" v-show="deleteflag" @click="Delete"></a>
      <a href="javascript:;" class=" fa" v-show="faflag" @click="fa">{{rightText}}</a>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '首页'
    },
    rightText: {
      type: String,
      default: ''
    },
    headerflag: {
      type: Boolean,
      default: false
    },
    deleteflag: {
      type: Boolean,
      default: false
    },
    faflag: {
      type: Boolean,
      default: false
    },
    backflag: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back () {
      if (this.backflag) {
        this.$emit('backgo', true)
        return
      }
      this.$router.back()
    },
    Delete () {
      this.$emit('event', true)
    },
    fa () {
      this.$emit('falevent', true)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    .m-header
        display flex
        position fixed
        top 0
        left 0
        z-index 10
        height 126px
        width 94%
        padding:0 3%;
        justify-content: center
        align-items: center
        background $color-background-bulr
        h1
          font-size $font-size-large-xl
          color $bg-writer
          /*padding-right 60px*/
          /*padding-bottom 20px*/
        .back
          color #fff
          font-size: 70px !important
        .delete
          color #fff
          /*position: absolute
          right: 20px*/
          font-size 40px
         /* bottom: 20px*/
        .fa
          color #fff
          position: absolute
          right: 20px
          font-size 32px
          bottom: 20px
        .icon-back1
          margin-top 0 !important
</style>
