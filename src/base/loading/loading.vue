<template>
  <div class="loading" :class="{'loadingbg': loadflag}">
    <div :class="{'loadingbgchild': loadflag}">
      <img width="24" height="24" src="./loading.gif" v-if="loadimg">
       <p class="desc">{{title}}</p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    loadflag: {
      type: Boolean,
      default: false
    },
    loadimg: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      font-size: 20px
      color: #ccc
      margin-top 6px
    &.loadingbg
      height: 100%
      width: 100%
      position fixed
      top 0
      left 0
      z-index 8
      .loadingbgchild
        background: rgba(0,0,0,.5)
        width: 2.6rem
        height: auto
        padding-top: .4rem
        padding-bottom: .4rem
        border-radius: 6px
        margin: auto
        margin-top: 52%
</style>
