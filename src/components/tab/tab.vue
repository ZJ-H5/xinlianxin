
<template>
  <div class="tab">
    <router-link tag="div"
      class="tab-item"
      to="/recommend">
      <div class="tab-link">
        <i class="iconfont icon-home"></i>
        <p>首页</p>
      </div>
    </router-link>
    <router-link tag="div"
      class="tab-item"
      to="/fiction">
      <div class="tab-link message">
        <span class="tip" v-if="tabStausMessage>0"></span>
        <i class="iconfont icon-message"></i>
        <p>消息</p>
      </div>
    </router-link>
    <router-link tag="div"
      class="tab-item"
      to="/cart">
      <div class="tab-link">
        <i class="iconfont icon-cart1"></i>
        <p>购物车</p>
      </div>
    </router-link>
    <router-link tag="div"
      class="tab-item"
      to="/userCenter">
      <div class="tab-link">
        <i class="iconfont icon-user"></i>
        <p>我的</p>
      </div>
    </router-link>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['tabStausMessage'])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.tab
  display: flex
  position: fixed
  bottom: 0
  left: 0
  width: 100%
  border-top: $color-border-e6 1px solid
  background-color: $color-background-fff
  padding: 16px 0
  font-size: $font-size-medium
  .tab-item
    flex: 1
    text-align: center
    .message
      position relative
      .tip
        position absolute
        width 16px
        height 16px
        background red
        border-radius 50%
        left 110px
        top 0
    .tab-link
      color: $color-text-6
      p
        font-size: 20px
        margin-top: 12px
      i
        font-size: 48px
    &.router-link-active
      .tab-link
        color: $color-theme-bulr
</style>
