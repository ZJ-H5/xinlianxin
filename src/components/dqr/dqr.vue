<template>
  <div class="dqr">
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
              <span class="clblue right fs28">待确认</span>
            </p>
            <div v-for="d in item.data">
              <div class="pl3 pr3 bdb">
                <div class="flex flex-align-center fs28">
                  <p class="flex-1 lh80">
                    <span class="c6 mr20">型号</span>
                    <i class="z-cu mr10 vtm" v-if="d.saleType==1">促</i>
                    <i class="z-cu mr10 vtm" v-if="d.saleType==2">热</i>
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
        </div>
        <div class="pt30 pb30 pr3 tr">

          <router-link :to="{path:'/checkUploadFile',query:{contract:item.contract}}" class="z-link c6 inlineblock z-ckfp">查看合同附件</router-link>
          <commit-company :item="item" :type="type"></commit-company>
         <!-- <a href="javascript:;" class="z-link c6 inlineblock"  @click="goToCommuction(item)">联系卖家</a>-->
          <a href="javascript:;" class="z-link c6 inlineblock  " @click="cancelOrder(item.id)">取消</a>
        </div>
      <toast position="middle" :value="msgshow" :text="text"  width="50%"></toast>
    </div>
      </div>
    </scroll>
    <div class="loading-container" v-show="loading">
      <loading :loadflag="loading"></loading>
    </div>
  </div>
</template>

<script>
  import {buyersOrderListdo,buyersOrderDetailsdo,deleteOrderdo} from 'api/interfacemethod'
  import {Popup, XSwitch, Group, Confirm,Toast,Rater } from 'vux'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {OK_TRUE, PAGESIZE2} from 'api/conflg'
  import commitCompany from 'components/commitCompany/commitCompany'
  const scroy = -140
    export default {
      data() {
        return {
          list: [],
          data: '',
          msgshow:false,
          text:'',
          loadflag: false,
          pageNum:1,
          pageSize:1,
          listenScroll:true,
          totalCount: 0,
          type:0//判断是采购订单
        }
      },
      computed: {
        loading () {
          return this.$store.state.zj.updatedloading
        }
      },
      components: {Popup, XSwitch, Group, Confirm,Toast,Rater,Loading,
        Scroll,commitCompany },
      created() {
        this._buyersOrderListdo()
        /* console.log(this.list)*/
      },
      methods: {
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
        },
        _buyersOrderListdo() {
          buyersOrderListdo({
            pageNum:this.pageNum,
            type: 0,
            currentType: 1,
            pageSize:3
          }).then((res) => {
            if (res.code == 1) {
              if (res.data.list.length <= 0) {
                this.$vux.toast.text('暂无数据', 'middle')
                return
              }
              this.loadflag = false
              this.list.push(...(res.data.list))//采购订单待确认列表
              this.totalCount = res.data.total
              this.$nextTick(() => {
                for (var i = 0; i < this.list.length; i++) {
                  this._buyersOrderDetailsdo(this.list[i].id, i)
                }
              })
            }
          }).catch((res) => {
          })
        },
        _buyersOrderDetailsdo(id, i) {
          buyersOrderDetailsdo({
            orderId: id
          }).then((res) => {
            if (res.code == 1) {
              this.data = res.data
              this.$nextTick(() => {
                this.$set(this.list[i], 'data', this.data)
              })
            }

          }).catch((res) => {
          })
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
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
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
