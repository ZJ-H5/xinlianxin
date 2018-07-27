
<template>
  <div class="index-tab">
    <router-link tag="div" class="tab-item" to="/recommend/nominate" >
      <span class="tab-link" exact>推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/recommend/ranklist">
      <span class="tab-link">排行榜</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/recommend/credit">
      <span class="tab-link">信用
      </span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/recommend/news">
      <span class="tab-link">资讯</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.index-tab
  display: flex
  height: 44px
  margin-top 16px
  padding 32px 0
  line-height: 44px
  font-size: $font-size-medium
  background-color $color-background-fff
  .tab-item
    flex: 1
    text-align: center
    border-bottom: 1px solid $color-border-e6
    margin-bottom -8px
    .tab-link
      display inline-block
      width 112px
      padding-bottom: 8px
      color: $color-text-6
      font-size 28px
    &.router-link-active
      .tab-link
        color: $font-color-blueb
        border-bottom: 4px solid $font-color-blueb

</style>
