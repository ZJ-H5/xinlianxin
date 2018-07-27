<template>
  <div class="dqr">
    <div class="head">
      <div class="detail-head pl3 tc pr3 relative">
        <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
        <span class="fs36 cfff">订单详情</span>
        <a href="" class="iconfont  icon-more fs36 cfff right"></a>
        <i class="z-dot">
          2
        </i>
      </div>
    </div>
   <div class="content">
     <div class=" bgf  lh60  fs30  pl3 pr3 mb20 c6">
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
       </p>
     </div>
     <div class="bgf mb20">
       <p class="clr lh80 bdb pl3 pr3">
         <span class="c0 fs30">{{order.company_name}}</span>
         <i class="iconfont icon-right fs24 c6"></i>
         <span class="clblue right fs28" v-if="order.status==0">待确认</span>
         <span class="clblue right fs28" v-if="order.status==1">待付款</span>
         <span class="clblue right fs28" v-if="order.status==2">待补款</span>
         <span class="clblue right fs28" v-if="order.status==3">已完款</span>
         <span class="clblue right fs28" v-if="order.status==4">待评价</span>
         <span class="clblue right fs28" v-if="order.status==5">已完成</span>
         <span class="clblue right fs28" v-if="order.status==6">已取消</span>
       </p>
       <div>
         <div class="pl3 pr3 bdb" v-for="item in orderDetis">
           <div class="flex flex-align-center fs28">
             <p class="flex-1 lh80">
               <span class="c6">型号</span>
               <span class="c0 ml20">{{item.model_code}}</span>
             </p>
             <span class="clred">¥ {{item.unit_price/100}}</span>
           </div>
           <div class="flex flex-align-center fs28">
             <p class="flex-1 lh80">
               <span class="c6">品牌</span>
               <span class="c0 ml20">{{item.brand_code}}</span>
             </p>
             <div>
               <p class="c9">单价 ¥ {{item.unit_price/100}}</p>
               <p class="c9">数量 {{item.quantity}}</p>
             </div>
           </div>
           <div class="flex flex-align-center fs28">
             <p class="flex-1 lh80">
               <span class="c6">批号</span>
               <span class="c0 ml20">{{item.batch_code}}</span>
             </p>
           </div>
           <div class="flex flex-align-center fs28">
             <p class="flex-1 lh80">
               <span class="c6">封装</span>
               <span class="c0 ml20">{{item.encapsulation}}</span>
             </p>
           </div>
         </div>
         <div class=" pl3 pr3 lh60 clr bdb">
           <div class="flex flex-justify-space">
            <span class="flex-1 tc">共{{order.quantity}}片
            <em class="clred">
              {{order.total_amount/100}}
            </em>
          </span>
             <span class="fs22">含优惠{{order.discount_amount?order.discount_amount/100:0}}</span>
           </div>
         </div>
         <div class="pt20 pb30 pl3 pr3">
           <p class="flex flex-align-center">
             <span class="c0 fs30 w-25">支付方式</span>
             <span class="ml20 c6 flex-1 fs24">{{order.line_pay_type}}</span>
           </p>
         </div>
         <div class="pl3 pr3 pb20">
           <p class=" fs30 c0 ">
             发票信息
           </p>
           <div class="pt30 pb20">
             <p class="flex flex-align-center fs24">
               <span class="c6 w-25">发票抬头</span>
               <span class="ml20 c0 flex-1">{{invoice.invoiceHend}}</span>
             </p>
           </div>
           <div class="pt20 pb20">
             <p class="flex flex-align-center fs24">
               <span class="c6 w-25">发票类型</span>
               <span class="ml20 c0 flex-1">{{invoice.type==0?'普通发票':'增值税发票'}}</span>
             </p>
           </div>
           <div class="pt20 pb20">
             <p class="flex flex-align-center fs24">
               <span class="c6 w-25">税务登记号</span>
               <span class="ml20 c0 flex-1">{{invoice.taxCode}}</span>
             </p>
           </div>
           <div class="pt20 pb20">
             <p class="flex flex-align-center fs24">
               <span class="c6 w-25">收票人</span>
               <span class="ml20 c0 flex-1">{{invoice.contactName}}</span>
             </p>
           </div>
           <div class="pt20 pb20">
             <p class="flex flex-align-center fs24">
               <span class="c6  w-25">联系方式</span>
               <span class="ml20 c0 flex-1">{{invoice.contactMobile}}</span>
             </p>
           </div>
           <div class="pt20 pb20">
             <p class="flex flex-align-center fs24">
               <span class="c6  w-25">收票人地址</span>
               <span class="ml20 c0 flex-1">{{invoice.provinceName}}{{invoice.cityName}}{{invoice.regionName}}{{invoice.address}}</span>
             </p>
           </div>
         </div>
         <div class="pl3 pr3 pb20">
           <p class=" fs30 c0 ">
             第三方报关服务
           </p>
           <div class="pt30 pb20">
             <p class="flex flex-align-center fs24">
               <span class="c6 w-25">报关公司</span>
               <span class="ml20 c0 flex-1">{{customs.customsDeclaration}}</span>
             </p>
           </div>
           <div class="pt20 pb20">
             <p class="flex flex-align-center fs24">
               <span class="c6 w-25">备注</span>
               <span class="ml20 c0 flex-1">{{customs.remark}}</span>
             </p>
           </div>
         </div>
         <div class="pl3 pr3 pb20">
           <p class=" fs30 c0 ">
             合同附件
           </p>
           <div class="pt30 pb20">
             <ul class="htfj clr">
               <li v-for="item in contract">
                 <img :src="item" alt="" class="z-logo">
               </li>
             </ul>
           </div>
           <div class="pt30 pb20">
             <p class="flex flex-align-center fs24">
               <span class="c0 w-30 fs30">单价是否含税</span>
               <span class="ml20 c6 flex-1">{{order.price_tax_status==0?'是':'否'}}</span>
             </p>
           </div>
           <div class="pt30 pb20">
             <p class="flex flex-align-center fs24">
               <span class="c0 w-30 fs30">付款说明</span>
               <span class="ml20 c6 flex-1">{{order.payment_explain?order.payment_explain:'空'}}</span>
             </p>
           </div>
           <div class="pt30 pb20">
             <p class="flex flex-align-center fs24">
               <span class="c0 w-30 fs30">货期说明</span>
               <span class="ml20 c6 flex-1">{{order.delivery_explain?order.delivery_explain:'空'}}</span>
             </p>
           </div>
           <div class="pt30 pb20">
             <p class="flex flex-align-center fs24">
               <span class="c0 w-30 fs30">运费说明</span>
               <span class="ml20 c6 flex-1">{{order.remark?order.remark:'空'}}</span>
             </p>
           </div>
           <div class="pt30 pb20">
             <p class="flex flex-align-center fs24">
               <span class="c0 w-30 fs30">备注</span>
               <span class="ml20 c6 flex-1">{{order.delivery_explain?order.delivery_explain:'空'}}</span>
             </p>
           </div>
         </div>
       </div>
     </div>
     <div class="bgf pl3 pr3">
       <div class="pt30 pb20">
         <p class="flex flex-align-center fs24">
           <span class="c6">订单号：{{order.order_code}}</span>
           <span class="ml20 c6 flex-1 tr">创建时间：{{order.create_time |formatDate}}</span>
         </p>
       </div>
     </div>
   </div>

  </div>
</template>

<script>
  import {orderDetilsdo} from 'api/interfacemethod'
  import {formatDate} from 'api/time'
export default {
  data () {
    return {
      imgurl: require('./uploada.png'),
      order:'',
      address:'',
      status:'',
      orderDetis:'',
      customs:'',
      orderId:this.$route.query.orderId,
      invoice:'',
      contract:''
    }
  },
  created(){
      this._orderDetilsdo(this.orderId)
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  },
  methods:{
    goback(){
      this.$router.back()
    },
    _orderDetilsdo(id){
      orderDetilsdo({
        orderId:id,
      }).then((res)=>{
        if(res.code==1){
          this.order=res.data.order
          this.address=res.data.address
          this.status=res.data.status
          this.orderDetis=res.data.orderDetis //商品列表
          this.customs=res.data.customs
          this.invoice=res.data.invoice
          this.contract=JSON.parse(res.data.order.contract)
        }
      }).catch((res)=>{})
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .dqr
    .head
      position fixed
      top 0
      left 0
      width 100%
      z-index 999
    .content
      padding-top 128px
      .htfj
        margin-left:-30px;
        li
          float:left;
          margin-left 30px;
        .z-logo
          width:150px
          height 150px
          bg-img('uploada')

</style>
