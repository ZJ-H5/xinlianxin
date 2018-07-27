<template>
  <transition name="slide">
  <div>
    <div class="pb120">
      <div class="head">
        <zHeader :title="title" :cart="cart" :msg="msg" :showOrNot="showOrNot"></zHeader>
      </div>
      <div class="content">
        <div class="bgf lh50 pl3 pr3">
          <p class="pt20">
            <span class="c6">型号</span><span class="fs28 c0">
            <i class="z-cu ml20 vtm" v-if="stockBackups.saleType==1">促</i>
                <!--<i class="z-cu ml20 vtm" v-if="stockBackups.saleType==0">常</i>-->
                <i class="z-cu ml20 vtm" v-if="stockBackups.saleType==2">热</i>
            {{stockBackups.modelCode}}</span>
          </p>
          <div class="flex">
            <div class="flex-1">
              <p class="">
                <span class="c6">品牌</span><span class="c0 ml20 fs28 ">{{stockBackups.brandCode}}</span>
              </p>
            </div>
            <div class="flex-1 pl30">
              <p class="">
                <span class="c6">库存</span><span class="clred fs28 ml20">{{stockBackups.quantity}}</span>
              </p>
            </div>
          </div>
          <div class="flex">
            <div class="flex-1">
              <p class="">
                <span class="c6">批号</span><span class="c0 fs28 ml20">{{stockBackups.batchCode}}</span>
              </p>
            </div>
            <div class="flex-1 pl30">
              <p class="">
                <span class="c6">封装</span><span class="c0 fs28 ml20">{{stockBackups.encapsulation}}</span>
              </p>
            </div>
          </div>
          <div class="flex">
            <div class="flex-1">
              <p class="">
                <span class="c6">日期</span><span class="c0 fs28 ml20">{{stockBackups.createTime||''}}</span>
              </p>
            </div>
            <div class="flex-1 pl30">
              <p class="">
                <span class="c6">仓位</span><span class="c0 fs28 ml20">{{stockBackups.warName}}</span>
              </p>
            </div>
          </div>
          <div class="flex">
            <div class="flex-1">
              <p class="">
                <span class="c6">说明</span><span class="fs28 c0 ml20">{{stockBackups.remark}}</span>
              </p>
            </div>
            <div class="flex-1 pl30">
              <p class="">
                <span class="c6">单价</span><span class="clred fs28 ml20">¥ {{stockBackups.unitPrice}}</span>
              </p>
            </div>
          </div>

        </div>
        <div class="flex bdt bdb lh80 bgf">
          <div class="flex-1 pl3">
            <p class="fs30">
              <span class="clblue">市场参考价 </span><span class="clred ml20">¥ {{Mfprice?Mfprice:'0.00'}}</span>
            </p>
          </div>
          <div class="flex-1 pr3 pl30">
            <p class="fs30">
              <span class="clblue">成交笔数</span><span class="clred ml20">{{stockBackups.self_data}}</span>
            </p>
          </div>
        </div>
        <div class="flex pl3 pr3 flex-align-center pt20 pb20 bgf">
          <img :src="companyImg" alt="" class="z-logo mr20">
          <div class="flex-1">
            <p class="pb20">
          <span class="fs28 c0">
          {{tUserCompany.companyName}}
          </span>
              <span class="z-pf bdr5">{{tUserCompany.operatingAge+'+'}}</span>
            </p>

            <span class="z-blued fs24" v-if="tUserCompany.sellerType==0">
            代理商
          </span>
            <span class="z-blued fs24" v-else-if="tUserCompany.sellerType==1">
            原厂
          </span>
            <span class="z-blued fs24" v-else-if="tUserCompany.sellerType==2">
            贸易商
          </span>
          </div>
          <div class="">
            <p class="pb20">
              <i class="z-gz" v-if="!guanzhuma">关注</i>
              <i class="z-gz" v-if="guanzhuma">已关注</i>
            </p>
            <p class="">
              <span>{{guanzhu}}关注</span>
            </p>
          </div>

        </div>
        <div class="bgf pl3 pr3 fs24 pb20  mb20">
          <p class="pb20 pt20 c0 f28">
            <span>网站综合评分  <em class="clred ml20">{{total}}</em></span>
          </p>
          <div class="flex ">
            <p class="flex-1 flex pt20 flex-align-center">
              <span class="c6 mr20">服务</span>
              <star :starlist="service.level"></star>
              <!--<span class="z-starbg">
                <i class="z-star" :style="{width:(service.level)/5*100+'%'}"></i>
            </span>-->
            </p>
            <p class="flex-1 flex pt20 flex-align-center ml80">
              <span class="c6 mr20">销量</span>
              <star :starlist="volume.level"></star>
              <!--<span class="z-starbg">
                <i class="z-star" :style="{width:(volume.level)/5*100+'%'}"></i>
            </span>-->
            </p>
          </div>
          <div class="flex">
            <p class="flex-1 flex flex-align-center pt20">
              <span class="c6 mr20">买家评分</span>
              <span>
                {{commentTotalS}}
              </span>
            </p>
            <p class="flex-1  flex flex-align-center pt20 ml80">
              <span class="c6 mr20">信誉</span>
              <!--<span class="z-starbg">
                <i class="z-star" :style="{width:tUserCompany.sellerOrderDealQty/5*100+'%'}"></i>
            </span>-->
            </p>
          </div>
          <p class="tc pt40 pb20">
            <router-link :to="{name:'introduce',params:{sellerId:cid,buyerId:tid}}" class="z-pf bdr5">
              进店逛逛
            </router-link>
          </p>

        </div>
        <div class="bgf pb20 pl3 pr3 pt20 mb20 f26">
          <div class="relative">
            <i class="z-longline"></i>
            <span class="mr10 ml10 z-pjtitle f24">收到来自买家的评价</span>
          </div>
          <div class="pt20">
            <p class="clr pb20 f26" v-if="comment.phone">
              <span class="left c0">
               {{comment.phone|phoneDoing}}
              </span>
              <span class="right">{{(comment.create_time|formatDate)||''}}</span>
            </p>
            <div class="flex flex-align-center c6 mb20 f26">
              <!--<p class="flex-1">
                总金额：<span class="">{{comment.total_amount?comment.total_amount/100:0}}</span>
              </p>-->
              <p class="flex-1 ">
                支付方式：
                <span v-if="comment.pay_type==0">第三方支付</span>
                <span v-else-if="comment.pay_type==1">账款支付</span>
                <span v-else-if="comment.pay_type==2">线下支付</span>
              </p>
            </div>
            <div class="flex flex-align-center mb20 ">
              <p class="flex-1 flex flex-align-center">
                <span class="c0 mr20">响应速度</span>
                <span class="z-starbg">
                <i class="z-star" :style="{width:(comment.answer_star)/5*100+'%'}"></i>
              </span>
                <span>{{comment.answer_star}}</span>
              </p>
              <p class="flex-1 flex flex-align-center">
                <span class="c0 mr20">信息真实性</span>
                <span class="z-starbg">
                <i class="z-star" :style="{width:(comment.real_star)/5*100+'%'}"></i>
            </span>
                <span>{{comment.real_star}}</span>
              </p>
            </div>
            <div class="flex flex-align-center mb20">
              <p class="flex-1 flex flex-align-center">
                <span class="c0 mr20">订单履约</span>
                <span class=" z-starbg">
                <i class="z-star" :style="{width:(comment.seller_perform_star)/5*100+'%'}"></i>
            </span>
                <span>{{comment.seller_perform_star}}</span>
              </p>
              <p class="flex-1 flex flex-align-center">
                <span class="c0 mr20">物流速度</span>
                <span class="ml20 z-starbg">
                <i class="z-star" :style="{width:(comment.logistics_star)/5*100+'%'}"></i>
            </span>
                <span>{{comment.logistics_star}}</span>
              </p>
            </div>
            <div class="flex flex-align-center mb20">
              <p class="flex-1 flex flex-align-center">
                <span class="c0 mr20">产品质量</span>

                <span class="z-starbg">
                <i class="z-star" :style="{width:(comment.quality_star)/5*100+'%'}"></i>
            </span>
                <span>{{comment.quality_star}}</span>
              </p>

            </div>
          </div>
          <p class="tc pt40 pb20">
            <router-link :to="{path:'/allAppraise',query:{sellerId:cid}}" class="z-pf bdr5 f24">
              全部评价
            </router-link>

          </p>
        </div>
        <div class="bgf pt20 pb20 ">
          <h1 class="z-bdb pb20 fs30 c0 pl3 pr3">相似推荐</h1>
          <div class="pb40 z-bdb pl3 pr3" @click="goToProductDetail(item.id)" v-for="(item,index) in orderDaos" :key="index">
            <p class="flex flex-align-center pt40">
              <span class="c0 flex-1  fs28">
                <i class="z-cu mr20 vtm" v-if="item.sale_type==1">促</i>
               <!-- <i class="z-cu mr20 vtm" v-if="item.sale_type==0">常</i>-->
                <i class="z-cu mr20 vtm" v-if="item.sale_type==2">热</i>
                {{item.model_code}}</span>
              <span class="mr40">库存：<em class="">{{item.quantity}}</em></span>
              <span>笔数：{{item.self_data}}<em class=""></em></span>
            </p>
            <p class="flex flex-align-center pt40">
              <span class="flex-1 c6">{{item.company_name}}</span>
              <span class="clred fs36"> {{item.unit_price}}</span>
            </p>
          </div>
        </div>
      </div>
      <x-dialog :show="xjshow"  @on-hide="cartDialog">
        <xj @cancelxj="xjshowOrNot" :tid="tid" :currentuser="currentuser" :tUserCompany="tUserCompany"></xj>
      </x-dialog>
    </div>
    <detail-footer @cart="cartShow" @xj="xjShow" @addcollect="addscproduct" :selectShow="selectShow"
                   :collection="collection" :sellerId="cid" :buyerId="tid" :stockBackups="stockBackups"
                   :tUserCompany="tUserCompany" :xjid="xjid" :currentuser="currentuser" :tid="tid" :tel="tel" :companyImg="companyImg"></detail-footer>
  </div>
  </transition>
</template>
<script>
import DetailFooter from 'components/detail-footer/detail-footer'
import {Toast, Popup} from 'vux'
import TopMsg from 'components/top-msg/top-msg'
import xj from 'components/xj/xj'
import {orderListdo, shoucangXhdo, addShopCardo} from 'api/interfacemethod'
import store from '@/store'
import {defaultImg} from '@/api/conflg'
import {formatDate} from 'api/time'
import Star from 'base/star/star'
import XDialog from "vux/src/components/x-dialog/index"
import zHeader from 'components/z-header/z-header'
export default {
  data () {
    return {
      /* dialogShow: false, */
      title:'商品详情页',
      cart:true,
      msg:true,
      xjshow: false,
      showOrNot: false,
      cid: this.$route.query.cid,
      tid: this.$route.query.tid,
      /* getParentId:this.$route.query.getParentId, */
      stockBackups: '',
      orderDaos: '',
      comment: '',
      tUserCompany: '',
      total: '',
      guanzhu: 0,
      selectShow: false,
      /* xjdialogShow: false, */
      collection: '',
      id: '',
      commentlist: '',
      xjid: this.$route.query.xjid, // 询价id
      guanzhuma: '',
      volume: '', // 销量
      service: '', // 服务
      commentTotalS: '', // 买家评分
      arrMsg: ['添加购物车成功', '添加询价单成功', '添加收藏成功'],
      currentuser: '', // 现在userid,
      userId: '',
      tel: '',
      companyImg: '',
      Mfprice:''//市场参考价
    }
  },
  components: {XDialog, Toast, DetailFooter, Popup, xj, TopMsg,Star,zHeader},
  filters: {

    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    },
    phoneDoing: function (val) {
      if (!val) return
      return val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
  },
  methods: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    },
    cartShow () {
      if (this.tUserCompany.userId === this.currentuser) {
        this.$vux.toast.text('本商品无法加入购物车', 'middle')// 添加购物车成功信息弹窗
        return false
      } else if(this.stockBackups.quantity===0){
        this.$vux.toast.text('库存为0  无法添加', 'middle')// 添加购物车成功信息弹窗
        return false
      }else{
        this._addShopCardo()
      }
    },
    goToProductDetail(tid){
      this.$router.push({path:'productDetail',query:{cid:this.cid,tid:tid}})
    },
    _addShopCardo () {
      addShopCardo({
        stockId: this.tid
      }).then((res) => {
        if (res.code === 1) {
          this.$vux.toast.text(res.msg, 'middle')// 添加购物车成功信息弹窗
        } else {
          this.$vux.toast.text(res.msg, 'middle')// 添加购物车成功信息弹窗
        }
      }).catch((res) => {
      })
    },
    cartDialog () {
      this.xjshow = false
      this.selectShow = false
    },
    addscproduct (msg) {
      if (this.tUserCompany.userId === this.currentuser) {
        this.$vux.toast.text('本商品无法加入收藏', 'middle')// 添加购物车成功信息弹窗
        return false
      }else{
        msg = (msg == 1 ? 0 : 1)
        shoucangXhdo({
          stockId: this.tid,
          companyId: this.cid,
          type: msg,
          id: this.id
        }).then((res) => {
          if (res.code == 1) {
            this._orderListdo()
            this.xjshow = false
          }
        }).catch((res) => {
        })
      }

    },
    xjShow () {
      this.xjshow = true
    },
    xjshowOrNot () {
      this.xjshow = false
    },
    goback () {
      this.$router.back()
    },
    show () {
      this.showOrNot = true
    },
    dialog () {
      this.showOrNot = false
    },
    _orderListdo () {
      orderListdo({
        cid: this.cid,
        tid: this.tid
        /*userId: this.userId*/
        /* getParentId:this.getParentId, */
      }).then((res) => {
        if (res.code == 1) {
          this.stockBackups = res.data.stockBackups // 商品详情
          if(!this.stockBackups.createTime){
            this.stockBackups.createTime=''
          }else{
            let date=this.formatDate(this.stockBackups.createTime)
            this.stockBackups.createTime=date
          }
          this.orderDaos = res.data.orderDaos
          if (res.data.comment.length != 0) {
            this.comment = res.data.comment[0]
          }
          this.volume = res.data.volume// 销量
          this.service = res.data.service// 服务
          console.log(typeof (this.service.level),this.service.level)
          this.commentTotalS = res.data.commentTotalS// 买家评分
          this.commentlist = res.data.comment
          this.tUserCompany = res.data.tUserCompany
          this.total = res.data.total
          this.guanzhu = parseInt(res.data.guanzhu)
          this.guanzhuma = res.data.guanzhuma//自己是否关注该公司
          this.currentuser = res.data.currentuser// 当前userid
          this.tel = res.data.phone// 公司电话
          this.Mfprice=res.data.Mfprice//市场参考价
          this.companyImg = res.data.company_logo ? res.data.company_logo : defaultImg
          this.collection = res.data.shoucang.collection// 收藏
          this.id = res.data.shoucang.id

        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getStatus (urlStr) {
      var urlStrArr = urlStr.split('/')
      return urlStrArr[urlStrArr.length - 1]
    }
  },
  created () {

    this.userId = store.state.user.userId
    if (this.cid === '') { // 如果不存在cid就回退
      this.$route.back()
    }
    this._orderListdo()

  },
  watch: {
    '$route' (to, from) {
      if (to.query.tid !== from.query.tid) {
        this.tid = to.query.tid
        this._orderListdo()
      }
    }
  },
  activated () {
    if (this.cid) {
      this._orderListdo()
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

  .head
    position fixed
    top 0
    left 0
    width 100%
    z-index 999
    .detail-head
      background: #1081d1
      height: 128px
      line-height: 128px
      .detail-head a
        line-height128px

  .content
    padding-top 128px

  .z-logo
    width: 100px;
    height: 100px;
  .z-longline
    display: inline-block;
    width: 100%;
    height: 1px;
    background: #efefef

  .z-pjtitle
    position: absolute;
    width: 250px;
    background: #fff;
    left: 50%;
    top: 5px;
    margin-left: -100px;
    text-align: center;

  .z-starbg
    display: inline-block
    position relative
    width: 140px;
    height: 30px;
    bg-image('star')
    background-size: 100% 100%
    .z-star
      display: inline-block
      position absolute
      left 0
      top 0
      width: 0;
      height: 30px;
      bg-image('stars')
      background-size: 140px 30px
</style>
