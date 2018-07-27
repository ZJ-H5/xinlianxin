<template>
  <div class="credit">
    <scroll ref="scroll"
            class="nominate-content"
            :pullup="pullup"
            :data="(flagId===0 && sellerList) ||(flagId===1 && buyerList)"
            @scrollToEnd="loadmore"
    >
      <div>
        <div class="box" ref="box">
          <div class="item sales active" @click="selectId(0)">
            <i></i>
            <h2>卖家信用</h2>
          </div>

          <div class="item model" @click="selectId(1)">
            <i></i>
            <h2>买家信用</h2>
          </div>
        </div>
        <div class="box-list">
          <div v-show="flagId===0">
            <sell-credit-detail :sellerList="sellerList"></sell-credit-detail>
          </div>
          <ul class="buyer-box" v-show="flagId===1">
            <li v-for="(item,index) in buyerList" :key="index">
              <h1>{{index+1}}</h1>
              <span class="mobile">{{item.phone|phoneDoing}}</span>
                <star :starlist="item.buyGrand"></star>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container"
           v-show="(flagId===0 && !sellerList) ||(flagId===1 && !buyerList)">
        <loading :title="'正在载入...'" :loadimg="false"></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import {addClassList} from 'common/js/dom'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import SellCreditDetail from 'components/sell-credit-detail/sell-credit-detail'
import {sellercredit} from 'api/nominate'
import {OK_TRUE} from 'api/conflg'
import {selectBuyersreputationdo} from 'api/interfacemethod'
import Star from 'base/star/star'

export default {
  data () {
    return {
      sellerList: [],
      buyerList: [],
      flagId: 0,
      pullup: true
    }
  },
  filters: {
    phoneDoing: function (val) {
      if (!val) return
      return val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
  },
  created () {
    this._sellercredit()
  },
  methods: {
    selectId (index) {
      this.flagId = index
      addClassList(this.$refs.box.children, index)
      if (index === 0) {
        this._sellercredit()
      }
      if (index === 1) {
        this._selectBuyersreputationdo()
      }
    },
    loadmore () {
      console.log(222)
    },
    _sellercredit () {
      sellercredit()
        .then((res) => {
          res.code === OK_TRUE
            ? this.sellerList = res.data
            : this.$vux.toast.text(res.msg, 'middle')
        })
        .catch(err => {
          this.$vux.toast.text(err, 'middle')
        })
    },
    _selectBuyersreputationdo () {
      selectBuyersreputationdo()
        .then((res) => {
          res.code === OK_TRUE
            ? this.buyerList = res.data
            : this.$vux.toast.text(res.msg, 'middle')
        })
        .catch(err => {
          this.$vux.toast.text(err, 'middle')
        })
    }
  },
  components: {
    SellCreditDetail,
    Loading,
    Star,
    Scroll}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .credit
    .nominate-content
      position: absolute
      width: 100%
      height 100%
      overflow: hidden
    .box
      display flex
      justify-content: space-around
      padding 22px 50px 48px 50px
      font-size 24px
      color $color-text-6
      background-color $color-background-fff
      border-bottom 1px solid $color-border-e6
      .item
        h2
          font-size 24px
          margin-top 24px
        i
          display block
          width 64px
          height 64px
          background-size 64px 64px
          margin auto
        &.sales
          i
            bg-image('seller')
        &.model
          i
            bg-image('Buyers')
        &.active:nth-child(1)
          i
            bg-image('sellerOn')
          h2
            color $font-color-blueb
        &.active:nth-child(2)
          i
            bg-image('BuyersOn')
          h2
            color $color-theme-bulr
    .box-list
      padding-bottom: 240px
      ul
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
          .title
            font-size 28px
            color $color-text-3
            overflow-ellipsis(400px)
          .mobile
            font-size 28px
            color $color-text-3
            line-height 40px
          .type
            font-size 20px
            margin-right 20px
          .number
            color $color-text-reddc
            font-size 26px
          .img
            display block
            width 54px
            height 54px
            background-size 54px 54px
            margin-right 20px
            bg-image('crown')
</style>
