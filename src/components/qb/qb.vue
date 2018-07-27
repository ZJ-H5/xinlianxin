<template>
  <div class="qb">
    <scroll ref="scroll" class="nominate-content"
            :data="list"
            :listen-scroll="listenScroll"
            @scroll="scroll">
      <div class="box-list">
        <div v-show="loadflag" class="loadmore">
          <loading></loading>
        </div>
        <div class="bgf mb20" v-for="item in list">
          <router-link :to="{path:'/orderdetailDqr',query:{orderId:item.id}}">
            <p class="clr lh80 bdb pl3 pr3">
              <span class="c0 fs30">{{item.company_name}}</span>
              <i class="iconfont icon-right fs26 c6"></i>
              <span class="clblue right fs28">{{item.statusText}}</span>
            </p>
            <div v-for="d in item.data">
              <div class="pl3 pr3 bdb">
                <div class="flex flex-align-center fs28">
                  <p class="flex-1 lh80">

                    <span class="c6 mr20">型号</span>
                    <i class="z-cu mr10 vtm" v-if="item.saleType==1">促</i>
                    <i class="z-cu mr10 vtm" v-if="item.saleType==2">热</i>
                    <span class="c0">{{d.model_code}}</span>
                  </p>
                  <span class="clred">¥ {{d.unit_price/100}}</span>
                </div>
                <div class="flex flex-align-center fs28">
                  <p class="flex-1 lh80">
                    <span class="c6">品牌</span>
                    <span class="c0 ml20">{{d.brand_code}}</span>
                  </p>
                  <div>
                    <p class="c9">单价 ¥ {{d.unit_price/100}}</p>
                    <p class="c9">数量 {{d.quantity}}</p>
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
                    <span class="c0 ml20">{{d.encapsulation}}</span>
                  </p>
                  <div v-if="item.status!=0">
                    <p>
                    <span>
                      已发货
                      <em class="clred ml10">{{d.deliver_qty}}</em>
                    </span>
                      <span class="ml10">
                      未发货
                      <em class="clred ml10">{{d.quantity-d.deliver_qty}}</em>
                    </span>
                    </p>
                    <p>
                    <span>
                      已收货
                      <em class="clred ml10">{{d.receipt_qty}}</em>
                    </span>
                      <span class="ml10">
                      未收货
                      <em class="clred ml10">{{d.quantity-d.receipt_qty}}</em>
                    </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
          <div class=" pl3 pr3 lh60 clr bdb">
          <div class="flex flex-justify-space">
            <span v-if="item.pay_type==0">第三方担保</span>
            <span v-if="item.pay_type==1">账期付款</span>
            <span v-if="item.pay_type==2">线下支付</span>
            <span class="flex-1 tc">共{{item.quantity}}片
              <em class="clred">
                ￥{{item.total_amount/100}}
              </em>
            </span>
            <span class="fs22">含优惠￥{{item.discount_amount?item.discount_amount/100:0}}</span>
          </div>
          <div class="flex flex-justify-space" v-if="item.status!=0">
            <p class="flex-1">
                <span>
                  已付款
                  <em class="clred ml10">{{item.paid_amount/100}}</em>
                </span>
              <span class="ml10">
                  未付款
                  <em class="clred ml10">{{(item.total_amount/100-item.discount_amount/100-item.paid_amount/100).toFixed(2)}}</em>
                </span>
            </p>
            <!--<span class="fs22 flex-1">{{item.pay_status}}</span>-->
            <router-link :to="{path:'/checkEvidence',query:{orderId:item.id,type:0}}" class="fs22 clblue " v-if="item.pay_type!=0">查看汇款凭证</router-link>
          </div>
        </div>
          <div class="pt30 pb40 tr pr3" >
          <router-link :to="{path:'/uploadPayfile',query:{orderId:item.id,count:item.total_amount}}" v-if="(item.status==1||item.status==2)&&item.pay_type!=0" class="z-link c6 inlineblock z-ckfp">上传汇款凭证</router-link>
          <router-link  :to="{path:'/checkBill',query:{orderId:item.id}}" v-if="item.status!=0" class="z-link c6 inlineblock mb20">查看发票</router-link>
          <router-link :to="{path:'/checkUploadFile',query:{contract:item.contract}}" class="z-link c6 inlineblock  z-ckfp">查看合同附件</router-link>
              <commit-company :item="item" :type="type"></commit-company>
          <router-link :to="{path:'/checkLogistics',query:{orderId:item.id}}" v-if="item.status==3&&item.wlType==1" class="z-link c6 inlineblock ">查看物流</router-link>
          <a href="javascript:;" class="z-bluek inlineblock" v-if="(item.status==1||item.status==2)&&item.pay_type==0" @click="checkPay(item.id)">确认付款</a>
          <a href="javascript:;" class="z-bluek inlineblock" v-if="item.status==0" @click="cancelOrder(item.id)">取消</a>
          <router-link :to="{path:'/customerAppraise',query:{orderId:item.id}}" class="z-bluek inlineblock" v-if="item.status==6&&item.sfwc==0">评价</router-link>
            <a href="javascript:;" class="z-bluek inlineblock" @click="remindFh(item.id)" v-if="item.status===3&&item.wlType==0">提醒发货</a>
        </div>
        </div>
      </div>
    </scroll>
    <div class="loading-container" v-show="loading">
      <loading :loadflag="loading"></loading>
    </div>
  </div>
</template>

<script>
  import {buyersOrderListdo,buyersOrderDetailsdo,alipayPaydo,deleteOrderdo,appremainSendGoodsdo} from 'api/interfacemethod'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {OK_TRUE, PAGESIZE2} from 'api/conflg'
  import {Clocker, XDialog} from 'vux'
  import commitCompany from 'components/commitCompany/commitCompany'
  const scroy = -100
export default {
    data(){
      return{
        list:[],
        data:'',
        loadflag: false,
        pageNum:1,
        pageSize:1,
        listenScroll:true,
        totalCount: 0,
        type:0,//0为采购订单，1位销售订单
        wlType:0//0为待发货，1为待收货
      }
    },
  created(){
    this._buyersOrderListdo()
   /* console.log(this.list)*/
  },
  computed: {
    loading () {
      return this.$store.state.zj.updatedloading
    }
  },
  methods:{
    scroll (pos) {
      this.scrollY = pos.y
      console.log(this.scrollY)
      if (this.scrollY < scroy) {
        this.loadflag = true
        if (this.list.length >= this.totalCount) {
          this.loadflag = false
          return
        }
        this.pageNum++
        this._buyersOrderListdo()
      }
      if(this.scrollY >Math.abs(scroy)){
        this.pageNum=1
        this.list=[]
        this._buyersOrderListdo()
      }
    },
    _buyersOrderListdo(){
      buyersOrderListdo({
        pageNum:this.pageNum,
        type:0,
        currentType:0,
        pageSize:2
      }).then((res)=>{
        if(res.code==1){
          if (res.data.list.length <= 0) {
            this.$vux.toast.text('暂无数据', 'middle')
            return
          }
          this.loadflag = false
          this.list.push(...(res.data.list))//采购订单列表
          this.totalCount = res.data.total
          this.$nextTick(()=>{
            for(var i=0;i<this.list.length;i++){
              switch (parseInt(this.list[i].status)){
                case 0:this.$set(this.list[i],'statusText','待确认');break;
                case 1:this.$set(this.list[i],'statusText','待付款');break;
                case 2:this.$set(this.list[i],'statusText','待补款');break;
                /*case 3:
                  let item=this.list[i];
                  let money=item.total_amount/100-item.discount_amount/100-item.paid_amount/100;
                  if(item.pay_type==1&&money==0)
                  {
                    this.$set(this.list[i],'statusText','待发货');
                  }
                  else if(item.pay_type==1&&money==0){

                  }break;*/
               /* case 4:this.$set(this.list[i],'statusText','待收货');break;*/
                case 5:this.$set(this.list[i],'statusText','已完成');break;
                case 6:this.$set(this.list[i],'statusText','待评价');break;
              }
              this._buyersOrderDetailsdo(this.list[i].id,i)
            }
          })

        }
      }).catch((res)=>{})
    },
    _buyersOrderDetailsdo(id,i){
      buyersOrderDetailsdo({
        orderId:id
      }).then((res)=>{
        if(res.code==1){
          this.data=res.data
          this.$nextTick(()=> {
            this.$set(this.list[i],'data',this.data)
            console.log(this.list[i])
            console.log(this.list[i].data[0].quantity)
            let number=this.list[i].data[0].quantity-this.list[i].data[0].deliver_qty
            /*console.log(number)*/
            if(this.list[i].status==3&&this.list[i].pay_type==2&&number==0)//线下支付 判断在已完款的基础上，是否发货完，如果发货完就是待收货
            {
              this.$set(this.list[i],'statusText','待收货');
              this.$set(this.list[i],'wlType',1)//物流待收货
            }
            else if(this.list[i].status==3&&this.list[i].pay_type==2&&number>0){//发货未完成就是待发货
              this.$set(this.list[i],'statusText','待发货');
              this.$set(this.list[i],'wlType',0)//物流待发货
            }
          })
        }

      }).catch((res)=>{})
    },
    checkPay (id) {
      this._alipayPaydo(id)
    },
    _alipayPaydo (id) {
      alipayPaydo({
        orderId: id
      }).then((res) => {
        this.$router.replace({path:'/pay',query:{href:res}})
       /* window.location.href = res*/
      }).catch((res) => {})
    },
    cancelOrder(id){
      this._deleteOrderdo(id)
    },
    _deleteOrderdo(id){
      deleteOrderdo({
        orderId: id
      }).then((res) => {
        if (res.code == 1) {
          this.text = res.msg
          this.msgshow=true
          this._buyersOrderListdo()
        }

      }).catch((res) => {
      })
    },
    remindFh(id){
      this._appremainSendGoodsdo(id)
    },
    _appremainSendGoodsdo(id){
      appremainSendGoodsdo({
        orderId:id
      }).then((res)=>{
        if(res.code==1){
          this.$vux.toast.text('已提醒卖家发货', 'middle')
        }

      }).catch((res)=>{})
    }
  },
  components: {
    Loading,
    Scroll,
    XDialog,
    commitCompany
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .nominate-content
    position: absolute
    height: 100%
    width 100%
    overflow: hidden
    .box-list
      padding-bottom 240px
    .loadmore
      margin-top 6px

</style>
