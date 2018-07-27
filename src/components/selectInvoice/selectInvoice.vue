<template>
  <div class="collect">
    <div class="detail-head pl3 tc pr3 relative">
      <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
      <span class="fs36 cfff">选择发票信息</span>
      <router-link :to="{path:'/manageBill'}"  class="fs30 cfff right">管理</router-link>
    </div>
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
  </div>
</template>

<script>
import {buyersAppCenterInvoiceListdo, buyersAppCenterInvoiceCheckdo, buyersAppCenterInvoiceDeletedo} from 'api/interfacemethod'
import {Popup, XSwitch, Group, Confirm, Toast} from 'vux'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      list: '',
      text: '',
      deleteshow: false,
      obj: this.$route.params.obj,
      item: ''
    }
  },
  components: {Popup, XSwitch, Group, Confirm, Toast},
  created () {
    console.log(this.obj)
    this._buyersAppCenterInvoiceListdo()
  },
  methods: {
    goback () {
      this.$router.replace('/checkOrder')
    },
    _buyersAppCenterInvoiceListdo () {
      buyersAppCenterInvoiceListdo({
      }).then((res) => {
        if (res.code === 1) {
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
        if (res.code === 1) {
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
        if (res.code === 1) {
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
      /*this.item = item
      this.obj.invoice = item
      console.log(this.obj.invoice)
      this.$router.push({name: 'checkOrder', params: {obj: this.obj}})*/
      this.setBill(item)
      this.$router.back()
    },
    ...mapMutations({setBill: 'SET_BILL'})
  }
}
</script>

<style scoped>

</style>
