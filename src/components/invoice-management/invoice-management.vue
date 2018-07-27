<template>
  <transition name="slide">
  <div class="invoice-management">
    <div class="">
      <m-header :title="title" :rightText="rightText" @falevent="fago" :faflag="true" :headerflag="true"></m-header>
    </div>
    <div class="content">
      <scroll ref="scroll"
      class="nominate-content"
      :data="list"
      :listen-scroll="listenScroll"
      @scroll="scroll">
      <div class="">
        <div class="pb20 z-bdb mb20 bgf pt20" v-for="(item,index) in list" @click="backorder(item)" :key="index">
          <p class="lh50 pl3">
            <span class="clred" v-show="item.defaultStatus==1">[默认发票]</span>
          </p>
          <p class="flex lh50 pl3 pr3">
            <span class="fs26 c6 w-25">发票抬头</span>
            <span class="fs26 c0 flex-1">{{item.invoiceHend}}</span>
          </p>
          <p class="flex lh50 pl3 pr3">
            <span class="fs26 c6 w-25">发票类型</span>
            <span class="fs26 c0 flex-1">{{item.type==0?'普通发票':'增值税专票'}}</span>
          </p>
          <p class="flex lh50 pl3 pr3">
            <span class="fs26 c6 w-25">税务登记号</span>
            <span class="fs26 c0 flex-1">{{item.taxCode}}</span>
          </p>
          <p class="flex lh50 pl3 pr3">
            <span class="fs26 c6 w-25">收票人</span>
            <span class="fs26 c0 flex-1">{{item.contactName}}</span>
          </p>
          <p class="flex lh50 pl3 pr3">
            <span class="fs26 c6 w-25">联系方式</span>
            <span class="fs26 c0 flex-1">{{item.contactMobile}}</span>
          </p>
          <p class="flex lh50 pl3 pr3">
            <span class="fs26 c6 w-25">收票人地址</span>
            <span class="fs26 c0 flex-1">{{item.provinceName}}{{item.cityName}}{{item.regionName}}{{item.address}}</span>
          </p>
        </div>
        <div class="h126"></div>
      </div>
    </scroll>
    </div>
  </div>
    </transition>
</template>

<script>
import {buyersAppCenterInvoiceListdo, buyersAppCenterInvoiceCheckdo, buyersAppCenterInvoiceDeletedo} from 'api/interfacemethod'
import {Popup, XSwitch, Group, Confirm, Toast} from 'vux'
import MHeader from 'components/m-header/m-header'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import {OK_TRUE} from 'api/conflg'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      list: [],
      text: '',
      deleteshow: false,
      title: '选择发票信息',
      rightText: '管理',
      listenScroll: true
    }
  },
  components: {Popup, XSwitch, Group, Confirm, Toast, MHeader, Scroll, Loading},
  created () {
    this._buyersAppCenterInvoiceListdo()
  },
  methods: {
    fago () {
      this.$router.push('manageBill')
    },
    scroll (scoly) {
      console.log(scoly.y)
    },
    _buyersAppCenterInvoiceListdo () {
      buyersAppCenterInvoiceListdo().then((res) => {
        if (res.code === OK_TRUE) {
          if (!res.data.list || res.data.list.length <= 0) {
            this.$vux.toast.text('暂无数据', 'middle')
            return
          }
          this.list = res.data.list // 热卖产品
          this.userId = res.data.list[0].userId
        }
      }).catch((res) => {})
    },
    setdefault (id) {
      this._buyersAppCenterInvoiceCheckdo(id)
    },
    _buyersAppCenterInvoiceCheckdo (id) {
      buyersAppCenterInvoiceCheckdo({
        fpids: id
      }).then((res) => {
        if (res.code === OK_TRUE) {
          this.deleteshow = true// 设置成功提示
          this.text = res.msg
          this._buyersAppCenterInvoiceListdo()
        }
      }).catch((res) => {})
    },
    _buyersAppCenterInvoiceDeletedo (id) {
      buyersAppCenterInvoiceDeletedo({
        fpids: id
      }).then((res) => {
        if (res.code === OK_TRUE) {
          this.deleteshow = true// 设置成功提示
          this.text = res.msg
          this._buyersAppCenterInvoiceListdo()
        }
      }).catch((res) => {})
    },
    deletebill (id) {
      this._buyersAppCenterInvoiceDeletedo(id)
    },
    backorder (item) {
      this.setBill(item)
      this.$router.back()
    },
    ...mapMutations({setBill: 'SET_BILL'})
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)

.fade-enter-active, .slide-leave-active
    transition: all 0.5s

.fade-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)

.invoice-management
  .content
    margin-top: 126px
    .nominate-content
      position: absolute
      height: 100%
      width: 100%
      overflow: hidden
      .h126
        height 120px
        width 100%
</style>
