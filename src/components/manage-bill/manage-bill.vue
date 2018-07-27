<template>
  <div class="collect">
    <div class="head">
      <div class="detail-head pl3 tc pr3 relative">
        <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
        <span class="fs36 cfff">管理发票信息</span>
        <router-link :to="{name:'generalInvoice'}"  class="fs30 cfff right">新增</router-link>
      </div>
    </div>
    <div class="content">
      <div class="pb20 z-bdb mb20 bgf pt20" v-for="item in list">
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
        <p class="flex flex-align-center pt20  pl3 pr3 bdt">
            <span class="flex-1 fs26" @click="setdefault(item.id)"><input type="radio" class="vtm" :checked="item.defaultStatus==1"/>
              <span class="vtm ml10">
                默认地址
              </span>
            </span>
          <a href="javascript:;" class="iconfont icon-shanchu fs36 mr10" @click="deletebill(item.id)"></a>
          <router-link :to="{name:'editgeneralInvoice',params:{item:item}}" class="iconfont icon-bianji3 fs36" v-if="item.type==0"></router-link>
          <router-link :to="{name:'editvatInvoice',params:{item:item}}" class="iconfont icon-bianji3 fs36" v-if="item.type==1"></router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import {buyersAppCenterInvoiceListdo,buyersAppCenterInvoiceCheckdo,buyersAppCenterInvoiceDeletedo} from 'api/interfacemethod'
  import {Popup, XSwitch, Group, Confirm,Toast} from 'vux'
export default {
    data(){
      return{
        list:'',
        /*userId:'',*/
        text:'',
      }
    },
  components: {Popup, XSwitch, Group, Confirm,Toast},
  created(){
      this._buyersAppCenterInvoiceListdo();
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    _buyersAppCenterInvoiceListdo(){
      buyersAppCenterInvoiceListdo({
      }).then((res)=>{
        if(res.code==1){
          this.list=res.data.list //热卖产品
          this.userId=res.data.list[0].userId
        }

      }).catch((res)=>{})
    },
    setdefault(id){
      this._buyersAppCenterInvoiceCheckdo(id)
    },
    _buyersAppCenterInvoiceCheckdo(id){
      buyersAppCenterInvoiceCheckdo({
        fpids:id
      }).then((res)=>{
        if(res.code==1){
          this.$vux.toast.text(res.msg, 'middle')
          this._buyersAppCenterInvoiceListdo()

        }

      }).catch((res)=>{})
    },
    _buyersAppCenterInvoiceDeletedo(id){
      buyersAppCenterInvoiceDeletedo({
        fpids:id
      }).then((res)=>{
        if(res.code==1){
          this.$vux.toast.text(res.msg, 'middle')
          this._buyersAppCenterInvoiceListdo()

        }

      }).catch((res)=>{})
    },
    deletebill(id){
      this._buyersAppCenterInvoiceDeletedo(id)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .weui-btn:after
    content: " ";
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid rgba(0, 0, 0, 0.2);
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    box-sizing: border-box;
    border-radius: 10px;
  .collect
    .head
      position fixed
      top 0
      left 0
      width 100%
      z-index 999
    .content
      padding-top 128px

</style>
