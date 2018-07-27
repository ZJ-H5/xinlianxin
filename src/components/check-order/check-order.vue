<template>
  <div class="checkOrder">
    <div class="head">
      <div class="detail-head pl3 tc pr3 relative">
        <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
        <span class="fs36 cfff">确认订单</span>
      </div>
    </div>
    <div class="content">
      <router-link to="/selectAddress"  class=" bgf  lh60  fs30  pl3 pr3 mb20 c6" tag="div">
        <p class="flex">
        <span class="flex-1">
          收货人：{{address.contactName}}
        </span>
          <span>
          {{address.contactMobile}}
        </span>
        </p>
        <p class="flex flex-align-center">
          <span class="flex-1">收货地址：{{address.provinceName}}{{address.cityName}}{{address.regionName}}{{address.address}}</span>
          <i class="iconfont icon-right"></i>
        </p>
      </router-link>
      <div class="mb20">
        <div class="bgf mb20">
          <p class="clr lh80 bdb pl3 pr3">
            <span class="c0 fs30">{{tUserCompany.companyName}}</span>
            <i class="iconfont icon-right fs26 c6"></i>
          </p>
          <div>
            <div class="pl3 pr3 bdb">
              <div class="flex flex-align-center fs28">
                <p class="flex-1 lh80">
                  <span class="c6">型号</span>
                  <span class="c0 ml20">{{stockBackups.modelCode}}</span>
                </p>
                <div>
                  <span class="">搜索加入</span>
                  <input type="number" class="z-cartinput" placeholder="输入数量" v-model="quantity" >
                </div>

              </div>
              <div class="flex flex-align-center fs28">
                <p class="flex-1 lh80">
                  <span class="c6 ">品牌</span>
                  <span class="c0 ml20">{{stockBackups.brandCode}}</span>
                </p>
                <div class="z-inputbox">
                  <em class="c0 z-rmb"></em><input type="number" class="" placeholder="输入单价" v-model="unitPrice" >
                </div>
              </div>
              <div class="flex flex-align-center fs28">
                <p class="flex-1 lh80">
                  <span class="c6 ">批号</span>
                  <span class="c0 ml20">{{stockBackups.batchCode}}</span>
                </p>
              </div>
              <div class="flex flex-align-center fs28">
                <p class="flex-1 lh80">
                  <span class="c6 ">封装</span>
                  <span class="c0 ml20">{{stockBackups.encapsulation}}</span>
                </p>
                <span class="clred fs30">¥ {{(unitPrice*quantity-discountAmount)>0?(unitPrice*quantity-discountAmount):0}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb40">
        <ul class="setlu clr">
          <li class="pl3 pr3 flex" @click="dialogpay">
            <span class="flex-1">支付方式</span>
            <div>
              <span class="c6">{{payMethodText}}</span>
              <i class="iconfont icon-right"></i>
            </div>
          </li>
          <router-link class="pl3 pr3 flex" :to="{name:'selectInvoice',params:{obj:this.obj}}" tag="li">
            <span class="flex-1">发票信息</span>
            <div>
              <span class="c6">{{bill.invoiceHend?bill.invoiceHend+(bill.type==0?' 普通发票':' 增值税专票'):'未选择'}}</span>
              <i class="iconfont icon-right"></i>
            </div>
          </router-link>
          <router-link class="pl3 pr3 flex" :to="{name:'selectCompany',params:{obj:this.obj}}" tag="li">
            <span class="flex-1">第三方信息</span>
            <div>
              <span class="c6">{{company.customsDeclaration?company.customsDeclaration:'未选择'}}</span>
              <i class="iconfont icon-right"></i>
            </div>
          </router-link>
          <router-link to="/uploadFile" class="pl3 pr3 flex" tag="li">
            <span class="flex-1">上传合同附件</span>
            <div>
              <span class="c6">{{fileList&&fileList.length>0?'已选择':'未选择'}}</span>
              <i class="iconfont icon-right"></i>
            </div>
          </router-link>
          <!--<li class="flex-align-center flex">-->
            <div style="width: 100%;margin-top: -1px">
              <group>
                <x-switch title="单价是否含税" v-model="priceTaxStatus" :value-map='[0,1]' class="c0"></x-switch>
              </group>
            </div>
          <!--</li>-->
          <li class="pl3 pr3" >
            <span>优惠金额：</span>
            <div class="z-inputbox inlineblock ml20">
              <em class="c0 z-rmb"></em><input type="text" class="" placeholder="输入金额" v-model="discountAmount" @blur="getdata">
            </div>
          </li>
          <li class="pl3 pr3">
            <span>付款说明：</span>
            <input type="text" placeholder="请输入付款说明" class="ml20" v-model="paymentExplain">
          </li>
          <li class="pl3 pr3">
            <span>货期说明：</span>
            <input type="text" placeholder="请输入付款说明" class="ml20" v-model="deliveryExplain">
          </li>
          <li class="pl3 pr3">
            <span>运费说明：</span>
            <input type="text" placeholder="请输入付款说明" class="ml20" v-model="freightExplain">
          </li>
          <li class="pl3 pr3">
            <span>买家备注：</span>
            <input type="text" placeholder="请输入付款说明" class="ml20" v-model="remark">
          </li>
        </ul>
      </div>
    </div>

    <div class="bgf tr z-tjdd">
      <div class="pl3 lh80">
        <span  class="c3 fs30">合计：
          <em>{{quantity?quantity:0}}片</em>
          <em class="clred">{{(unitPrice*quantity-discountAmount)>0?(unitPrice*quantity-discountAmount):0}}</em>
        </span>
        <a class="z-blued ml20" href="javascript:;" @click="submitOrder">提交订单</a>
      </div>
    </div>
    <popup position="bottom" :value="paymethod" default="1231313131" @on-hide="cartDialog">
      <div class="bgf2">
        <div class="bgf mb20">
          <h1 class="fs36 clblue bdb lh120 pl3 pr3 tc fwb">
            支付方式
          </h1>
          <div class=" lh60 pl3 pr3 tr pt20 pb20">
            <label for="payradio_0" class="pay_label" >
              <span class="inlineblock w-25 fs28 c6 tl">第三方担保</span>
              <p class="paymethod">
                <input type="radio" value="0" id="payradio_0" class="payradio" name="paymethod" v-model="radiovalue" @change="checkradio">
                <span class="paycheck"></span>
              </p>
            </label>
          </div>
          <div class=" lh60 pl3 pr3 tr pt20 pb20 bdt relative">
            <label for="payradio_1" class="pay_label" >
              <span class="inlineblock fs28 c6  tl ">账期付款</span>
              <input type="text" placeholder="选择最后还款日期" class=" selectdate" readonly v-model="time">
              <p class="paymethod">
                <input type="radio" value="1" id="payradio_1" class="payradio" name="paymethod" v-model="radiovalue" @change="checkradio">
                <span class="paycheck"></span>
              </p>
              <div class="z-detetime">
                <group>
                  <datetime v-model="minuteListValue" format="YYYY-MM-DD HH:mm" @on-confirm="selecttime" ></datetime>
                </group>
              </div>
            </label>

          </div>
          <div class=" lh60 pl3 pr3 tl pt20 pb20 bdt">
              <span class="inlineblock fs28 c6 ">线下支付</span>
          </div>
          <div class=" lh60 pl3 pr3 tr pt20 pb20">
            <label for="payradio_2" class="pay_label" >
              <span class="inlineblock fs28 c6  tl pl30">银行</span>
              <p class="paymethod">
                <input type="radio" value="2" id="payradio_2" class="payradio" name="paymethod" v-model="radiovalue" @change="checkradio">
                <span class="paycheck"></span>
              </p>
            </label>
          </div>
          <div class=" lh60 pl3 pr3 tr pt20 pb20">
            <label for="payradio_3" class="pay_label" >
              <span class="inlineblock fs28 c6  tl pl30">微信</span>
              <p class="paymethod">
                <input type="radio" value="3" id="payradio_3" class="payradio" name="paymethod" v-model="radiovalue" @change="checkradio">
                <span class="paycheck"></span>
              </p>
            </label>
          </div>
          <div class=" lh60 pl3 pr3 tr pt20 pb20">
            <label for="payradio_4" class="pay_label" >
              <span class="inlineblock fs28 c6  tl pl30">支付宝</span>
              <p class="paymethod">
                <input type="radio" value="4" id="payradio_4" class="payradio" name="paymethod" v-model="radiovalue" @change="checkradio">
                <span class="paycheck"></span>
              </p>
            </label>
          </div>
          <div class=" lh60 pl3 pr3 tr pt20 pb20" >
            <label for="payradio_5" class="pay_label pl30">
              <input type="text" placeholder="其他方式" class="pl30 selectdate" v-model="othermethod" @focus="focusOther">
              <p class="paymethod">
                <input type="radio" value="5" id="payradio_5" class="payradio" name="paymethod" v-model="radiovalue" @change="checkradio">
                <span class="paycheck"></span>
              </p>
            </label>
          </div>
        </div>
        <div class="pt40 fs0 bgf">
          <a href="javascript:;" class="dialogbtn cancel vux-popup-show" @click="cartDialog">取消</a>
          <a href="javascript:;" class="dialogbtn confirm" @click="payMethodSave">保存</a>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import {Popup, XSwitch, Group, Confirm, Radio, Datetime,DatetimeView} from 'vux'
import {buyersAppUserCenterAddressListdo,saveOrderdo} from 'api/interfacemethod'
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      paymethod: false,
      ticketinfo: false,
      bginfo: false,
      radio01: ['谢谢，我不需要发票', '我要开发票'],
      radio02: ['谢谢，我不用报关', '我要报关'],
      /*item:this.$route.params.obj.item,//地址*/
      obj:this.$route.params.obj,
      stockBackups:this.$route.params.obj.stockBackups,
      tUserCompany:this.$route.params.obj.tUserCompany,
      minuteListValue:'2017-06-12 09:00',
      time:'',
      quantity:0,//采纳加入数量
      unitPrice:'',//单价
      priceTaxStatus:0,//是否交税
      deliveryExplain:'',//货期说明
      paymentExplain:'',//付款说明
      freightExplain:'',//运费说明
      remark:'',//买家备注,
      radiovalue:'',
      othermethod:'',
      payMethodText:'未选择',
      discountAmount:'',//优惠金额
      count:(this.quantity*this.unitPrice-this.discountAmount)>0?this.quantity*this.unitPrice-this.discountAmount:0,
      payType:-1,//支付方式
      linePayType:'',
      data:'',
      xjid:this.$route.params.obj.xjid,//询价id
      cid:this.$route.params.obj.tUserCompany.id,//公司ID
      tid:this.$route.params.obj.stockBackups.id,//商品ID
      arrMsg:['单价不能为空','数量不能为空','支付方式不能为空','地址不能为空','发票信息不能为空','第三方信息不能为空','优惠金额不能大于总额','合同附件不能为空'],
      test:{
        paytext:-1
      }
    }
  },
  computed: {
    ...mapGetters(['bill','company','address','fileList'])
  },
  created(){
    this._address()
  },
  activated(){
    if(this.$route.params.obj){
      this.stockBackups=this.$route.params.obj.stockBackups
      this.tUserCompany=this.$route.params.obj.tUserCompany
      this.quantity=this.$route.params.obj.stockBackups.quantity
      this.unitPrice=this.$route.params.obj.stockBackups.unitPrice
    }

  },
  components: {Popup, XSwitch, Group, Confirm, Radio,Datetime,DatetimeView},
  methods: {
    goback () {
      this.$router.back()
      this._address()
      this.deletedata()
    },
    deletedata(){
      //退出时，清空数据
      this.quantity='' //数量
      this.unitPrice=''//单价
      this.priceTaxStatus=0//是否交税
      this.deliveryExplain=''//货期说明
      this.paymentExplain=''//付款说明
      this.freightExplain=''//运费说明
      this.remark=''//买家备注,
      this.radiovalue=''
      this.othermethod=''
      this.payMethodText='未选择'
      this.discountAmount=''//优惠金额
      this.payType=-1//支付方式
      this.linePayType=''//线下支付
      this.setCompany({})
      this.setBill({})
      this.setFileList([])
      this.time=''//时间清空
    },
    ...mapMutations({setCompany: 'SET_COMPANY',setBill:'SET_BILL',setAddress:'SET_ADDRESS',setFileList:'SET_FILELIST'}),
    cartDialog () {
      this.paymethod = false
      this.ticketinfo = false
      this.bginfo = false
    },
    dialogpay () {
      this.paymethod = true
    },
    dialogticket () {
      this.ticketinfo = true
    },
    dialogbg () {
      this.bginfo = true
    },
    change(){},
    selecttime(){
      this.radiovalue=1
      this.$nextTick(()=>{
        this.time=this.minuteListValue
      })

    },
    focusOther(){
      this.radiovalue=5
    },
    checkradio(e){
        console.log(this.radiovalue)
        if(this.radiovalue!=1||this.radiovalue!=5){
          this.minuteListValue=''
          this.time=''
        }
        if(this.radiovalue!=5){
          this.othermethod=''
        }
    },
    payMethodSave(){
      switch (parseInt(this.radiovalue)){
        case 0:this.payMethodText='第三方担保';this.payType=0;break;
        case 1:this.payMethodText='账期付款'+' '+this.time;this.payType=1;break;
        case 2:this.payMethodText='线下支付 银行';this.payType=2;this.linePayType='银行';break;
        case 3:this.payMethodText='线下支付 微信';this.payType=2;this.linePayType='微信';break;
        case 4:this.payMethodText='线下支付 支付宝';this.payType=2;this.linePayType='支付宝';break;
        case 5:this.payMethodText='线下支付'+' '+this.othermethod;this.payType=2;break;
      }
      this.paymethod=false;
    },
    submitOrder(){//提交订单
      console.log(this.address)
      if(this.quantity===''){
        this.$vux.toast.text(this.arrMsg[1], 'middle')
        return false
      }
      if(this.unitPrice===''){
        this.$vux.toast.text(this.arrMsg[0], 'middle')
        return false
      }
      if(this.payType===-1){
        this.$vux.toast.text(this.arrMsg[2], 'middle')
        return false
      }
      if(!this.address.contactName){
        this.$vux.toast.text(this.arrMsg[3], 'middle')
        return false
      }
      if(parseInt(this.payType)!=0&&this.fileList===''){
        this.$vux.toast.text(this.arrMsg[7], 'middle')
        return false
      }
      if((parseFloat(this.unitPrice*this.quantity)-parseFloat(this.discountAmount?this.discountAmount:0))==0){
        this.$vux.toast.text('总额不能小于等于0', 'middle')
        return false
      }
      this._saveOrderdo()
    },
    _saveOrderdo(){

      saveOrderdo({
        stockId:this.stockBackups.id,//商品id
        wantInquiryId:this.xjid,
        remark:this.remark,//买家备注
        unitPrice:this.unitPrice,//单价
        quantity:this.quantity,//数量
        priceTaxStatus:this.priceTaxStatus,//单位是否含税
        deliveryExplain:this.deliveryExplain,//发货说明
        paymentExplain:this.paymentExplain,//付款说明
        freightExplain:this.freightExplain,////运费说明
        payType:this.payType,//支付方式
        termTime:this.payType==1?this.time:'',//最后还款日期
        linePayType:this.linePayType,//线下支付方式
        customsId:this.company.id,//报关id
        receivingAddressId:this.address.id,//收货地址id
        invoiceId:this.bill.id,//发票id
        discountAmount:this.discountAmount,//优惠金额
        contract:this.fileList.toString()//合同
      }).then((res)=>{
        if(res.code==1){
          this.data=res.data
          this.$router.push('purchaseOrder/qb')
          this.deletedata()
        }else{
          this.$vux.toast.text(res.msg, 'middle')
          this.deletedata()
        }
      }).catch((res)=>{})
    },
    getdata(){
      if(this.discountAmount>this.unitPrice*this.quantity){
        this.$vux.toast.text(this.arrMsg[6], 'middle')
        this.discountAmount=''
        return false
      }
    },
    _address(){
      buyersAppUserCenterAddressListdo({
      }).then((res)=>{
        if(res.code==1){
          this.list=res.data.list //收货地址列表
          for(let i=0;i<res.data.list.length;i++){
            if(res.data.list[i].defaultStatus==1){
              this.item=res.data.list[i]
              this.setAddress(this.item)
            }
          }
        }
      }).catch((res)=>{})
    },

  },
  watch:{
    quantity(){
      this.quantity=this.quantity.toString().replace(/[\W]/g,'');
      this.quantity=Math.abs(this.quantity)
      this.discountAmount=''
    },
    unitPrice(){
      this.unitPrice=this.unitPrice.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
      this.unitPrice=Math.abs(this.unitPrice).toString()
      this.discountAmount=''
    },
    discountAmount(){
      this.discountAmount=this.discountAmount.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');

    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .checkOrder
    .head
      position fixed
      top 0
      left 0
      width 100%
      z-index 999
    .content
      padding-top 128px
      color #333
      .z-cartinput
        width 170px
        height 50px
        border 1px solid #ccc
        padding-left 10px
      .z-inputbox
        width 170px
        height 50px
        border 1px solid #ccc
        padding-left 10px
        line-height 50px
        input
          width 80%
      .setlu
        background-color #ffffff
        li
          height 90px
          line-height 90px
          justify-content space-between
          border-bottom 1px solid #e6e6e6
          color #333333
          font-size 30px
          align-items center
          .icon-right
            vertical-align middle
            color #666666
            padding 25px 0px
    .z-tjdd
      .z-blued
        display inline-block
        text-align center
        line-height 80px
        width 170px
        font-size 30px
        padding 0
    .fpxx
      div
        line-height 60px
        color: #333
        font-size 30px
    .pay_label
      position relative
      display flex
      align-items center
      justify-content space-between
      .payradio
        opacity 0
      .payradio:checked + .paycheck:before
        display: inline-block;
        font: normal normal normal 0.186667rem/1 "weui";
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        content: '\EA08';
        color: #09BB07;
        font-size: 0.213333rem;
      .selectdate
        border 1px solid #cccccc
        padding 20px 20px
    .z-detetime
      opacity 0
      position absolute
      width 80%
      height 100%
      left 0
      top:0
      div
        height 100%
        .weui-cells
          height 100%
        .scroller-item
          font-size: 0.4rem!important;




</style>
