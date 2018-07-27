<template>
  <!-- <transition name="slide"> -->
    <div class="cart">
      <m-header :title="title" @event="Delete" :deleteflag="true"></m-header>
      <scroll ref="scroll"
          class="nominate-content"
          :listen-scroll="pullup"
          @scroll="scroll"
          :data="sellerList"
          >
        <div class="cart-detail">
          <keep-alive exclude="cart-detail">
              <cart-detail :data="sellerList" ref="cardetail" @count="count" @listArr="listArr"></cart-detail>
            </keep-alive>
          <div v-show="loadflag" class="loadmore">
              <loading></loading>
            </div>
          <div class="bottomval"></div>
        </div>

      </scroll>
      <div class="z-xd bgf">
        <div class="flex pl3 ">
          <span class="fs24 flex-1 flex flex-align-center ">
            <input type="checkbox" class="newInput" @change="checkall" v-model="check"><span class="ml20">全选</span>
          </span>
          <span class="c3  inlineblock fs28">
          合计：<em class="clred">￥{{countval.toFixed(2)}}</em>
            <a class="z-blued ml20" @click="order">下单</a>
        </span>
        </div>
      </div>
      <tab></tab>
      <confirm v-model="confirmShow"
      @on-confirm="onConfirm"
      :confirm-text="confirmText"
      :cancel-text="cancelText">
      <p style="text-align:center;">{{('是否删除选中产品?') }}</p>
    </confirm>
    </div>
  <!-- </transition> -->
</template>

<script>
import Tab from 'components/tab/tab'
import MHeader from 'components/m-header/m-header'
import cartDetail from 'components/cart-detail/cart-detail'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import {shopCarList, deleteShopCar} from 'api/cart'
import {OK_TRUE, PAGESIZE} from 'api/conflg'
import { Confirm } from 'vux'
let bottomY = -280
export default {
  data () {
    return {
      title: '购物车',
      pullup: true,
      loadflag: false,
      scrollY: -1,
      sellerList: [],
      totalCount: 2,
      countval: 0,
      params: {
        pageNum: 1,
        pageSize: PAGESIZE
      },
      ids: '',
      check: false,
      confirmShow: false,
      confirmText: '确定',
      cancelText: '取消',
      listArrVal: []

    }
  },
  components: {
    Tab,
    MHeader,
    cartDetail,
    Loading,
    Scroll,
    Confirm
  },
  created () {
    this._shopCarList()
  },
  methods: {
    onConfirm () {
      this._deleteShopCar()
    },
    Delete () {
      if (!this.listArrVal || this.listArrVal.length <= 0) {
        this.$vux.toast.text('请选择要删除的产品', 'middle')
        return
      }
      let idval = []
      this.listArrVal.forEach((item, indexs) => {
        item.data.forEach((list, ind) => {
          if (list.isChecked) {
            idval.push(list.id.toString())
          }
        })
      })
      if (idval.length <= 0) {
        this.$vux.toast.text('请选择要删除的产品', 'middle')
        return
      }
      this.ids = JSON.stringify(idval)
      this.confirmShow = true
    },
    order () {
      this.$refs.cardetail.$emit('bridge', true)
    },
    checkall () {
      this.$refs.cardetail.$emit('checkalls', this.check)
    },
    scroll (pos) {
      this.scrollY = pos.y
      if (this.scrollY < bottomY) {
        this.loadflag = true
        if (this.sellerList.length >= this.totalCount) {
          this.loadflag = false
          return
        }
        this.params.pageSize++
        this._shopCarList()
      }
    },
    count (val) {
      this.countval = val
    },
    listArr (val) {
      this.listArrVal = val
    },
    _shopCarList () {
      shopCarList(this.params).then(res => {
        if (res.code === OK_TRUE) {
          this.sellerList = res.data.list
          if (this.sellerList.length <= 0) {
            this.$vux.toast.text('暂无数据', 'middle')
            return
          }
          this.totalCount = res.data.total
        } else {
          this.$vux.toast.text(res.msg, 'middle')
        }
      })
        .catch(err => {
          this.$vux.toast.text(err, 'middle')
        })
    },
    _deleteShopCar () {
      deleteShopCar({ids: this.ids})
        .then((res) => {
          res.code === OK_TRUE
            ? this._shopCarList()
            : this.$vux.toast.text(res.msg, 'middle')
        })
        .catch(err => {
          this.$vux.toast.text(err, 'middle')
        })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

   .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

  .fade-enter-active, .slide-leave-active
      transition: all 0.5s

  .fade-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

  .cart
    .nominate-content
      position: absolute
      height: 100%
      width: 100%
      overflow: hidden
      .cart-detail
        margin-top 126px
        .bottomval
          height 270px
          width 100%
    .z-xd
      position fixed
      left 0
      bottom 110px
      height 80px
      line-height 80px
      width 100%
      .z-blued
        display inline-block
        text-align center
        line-height 80px
        width 170px
        font-size 30px
        padding 0

</style>
