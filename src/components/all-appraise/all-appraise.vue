<template>
  <div class="qb">
    <div class="detail-head pl3 tc pr3 relative">
      <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
      <span class="fs36 cfff">全部评价</span>
    </div>
    <div class="content">
      <scroll ref="scroll" class="nominate-content"
              :data="comment"
              :listen-scroll="listenScroll"
              @scroll="scroll">
        <div class="box-list">
          <div class="bdb pt20 pb20  pl3 pr3  bgf" v-for="item in comment">
            <p class="clr pb20">
        <span class="left c0">
         {{item.phone|phoneDoing}}
        </span>
              <span class="right">{{item.create_time|formatDate}}</span>
            </p>
            <div class="flex flex-align-center c6 mb20">
              <p class="flex-1">
                <span class="c3">总金额：{{item.total_amount/100}}</span>
              </p>
              <p class="flex-1 c3">
                <span v-if="item.pay_type==0">支付方式：第三方支付</span>
                <span v-else-if="item.pay_type==1">支付方式：账款支付</span>
                <span v-else-if="item.pay_type==2">支付方式：线下支付</span>
              </p>
            </div>
            <div class="flex flex-align-center mb20">
              <p class="flex-1">
                <span class="c0">响应速度</span>
                <span class="z-starbg">
                <i class="z-star" :style="{width:(item.answer_star)/5*100+'%'}"></i>
              </span>
                <span>{{item.answer_star}}</span>
              </p>
              <p class="flex-1">
                <span class="c0">信息真实性</span>
                <span class="z-starbg">
                <i class="z-star" :style="{width:(item.real_star)/5*100+'%'}"></i>
            </span>
                <span>{{item.real_star}}</span>
              </p>
            </div>
            <div class="flex flex-align-center mb20">
              <p class="flex-1">
                <span class="c0">订单履约</span>
                <span class=" z-starbg">
                <i class="z-star" :style="{width:(item.seller_perform_star)/5*100+'%'}"></i>
            </span>
                <span>{{item.seller_perform_star}}</span>
              </p>
              <p class="flex-1">
                <span class="c0">物流速度</span>
                <span class="ml20 z-starbg">
                <i class="z-star" :style="{width:(item.logistics_star)/5*100+'%'}"></i>
            </span>
                <span>{{item.logistics_star}}</span>
              </p>
            </div>
            <div class="flex flex-align-center ">
              <p class="flex-1">
                <span class="c0">产品质量</span>
                <span class="z-starbg">
                <i class="z-star" :style="{width:(item.quality_star)/5*100+'%'}"></i>
            </span>
                <span>{{item.quality_star}}</span>
              </p>

            </div>
          </div>
        </div>
      </scroll>
      <div class="loading-container" v-show="loading">
        <loading :loadflag="loading"></loading>
      </div>
    </div>
    </div>
</template>
<script>
  import {orderAllEvaluatedo} from 'api/interfacemethod'
  import {formatDate} from 'api/time'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {OK_TRUE, PAGESIZE2} from 'api/conflg'
  const scroy = -100

  export default {
    data () {
      return {
        companyId:this.$route.query.sellerId,
        comment:[],
        loadflag: false,
        pageNum:1,
        pageSize:1,
        listenScroll:true,
        totalCount:''
      }
    },
    computed: {
      loading () {
        return this.$store.state.zj.updatedloading
      }
    },
    components: {
      Loading,
      Scroll,
    },
    filters:{
      phoneDoing: function (val) {
        if (!val) return
        return val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      },
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    created(){
      this._orderAllEvaluatedo();
    },
    methods:{
      goback () {
        this.$router.back()
      },
      scroll (pos) {
        this.scrollY = pos.y
        console.log(this.scrollY)
        if (this.scrollY < scroy) {
          this.loadflag = true
          if (this.comment.length >= this.totalCount) {
            this.loadflag = false
            return
          }
          this.pageNum++
          this._orderAllEvaluatedo()
        }
      },
      _orderAllEvaluatedo(){
        orderAllEvaluatedo({
          pageNum:this.pageNum,
          companyId:this.companyId,
          pageSize:5
        }).then((res)=>{
          if (res.data[0].map.length <= 0) {
            this.$vux.toast.text('无更多内容', 'middle')
            return
          }
          this.loadflag = false
          this.comment.push(...(res.data[0].map))//热卖产品
          this.totalCount=res.data[0].page.totalCount
          console.log(this.comment)
        }).catch((res)=>{})
      }
    },
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .qb
    .detail-head
      position fixed
      top:0
      left:0
      width 100%
      background: #1081d1;
      height: 128px;
      line-height: 128px;
      z-index 999
      a
        line-height: 128px
    .content
      padding-top 128px
      .nominate-content
        position: absolute
        height: 100%
        width 100%
        overflow: hidden
        .box-list
          padding-bottom 128px
          .z-starbg
            display:inline-block
            position relative
            width:140px;
            height:30px;
            bg-image('star')
            background-size:100% 100%
            .z-star
              display:inline-block
              position absolute
              left 0
              top 0
              width:0;
              height:30px;
              bg-image('stars')
              background-size:140px 30px
      .loadmore
        margin-top 6px

</style>
