
<template>
<transition name="slide">
  <div class="sell-credit-detail" >
    <!-- <scroll ref="scroll" class="nominate-content" :data="sellerList"> -->
      <ul class="seller-box">
        <router-link v-for="(item,index) in sellerList" :key="index" tag="li" :to="{name:'introduce',params:{sellerId:item.cid||item.id,buyerId:item.user_id}}">
          <h1>{{index+1}}</h1>
          <span class="title">{{item.company_name}}</span>
          <span class="type">网站综合评分 &nbsp;&nbsp;<span class="number">{{item.total||0}}</span></span>
        </router-link>
      </ul>
      <!-- <div class="loading-container" v-show="!sellerList.length">
        <loading></loading>
      </div> -->
    <!-- </scroll> -->
  </div>
</transition>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    sellerList: {
      type: Array,
      required: []
    }
  },
  created () {
    console.log(this.sellerList)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.slide-enter-active, .slide-leave-active
    transition: all 0.5s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.sell-credit-detail
  background-color $color-background-fff
  ul
    /*padding-bottom 240px*/
    li
      height 90px
      display flex
      justify-content space-between
      align-items center
      border-bottom 1px solid $color-border-e6
      background-color $color-background-fff = #fff
      h1
        width 50px
        height 50px
        line-height 50px
        margin-left 20px
        text-align center
        color $color-text-f
        background-color $color-background-bulr
        border-radius 50%
        font-size 28px
      .title
        font-size 28px
        color $color-text-3
        overflow-ellipsis(56%)
        margin-left 20px
        line-height 40px
      .mobile
        font-size 28px
        color $color-text-3
      .type
        width 29%
        font-size 20px
        margin-right 20px
        text-align right
      .number
        color $color-text-reddc
        font-size 26px

</style>
