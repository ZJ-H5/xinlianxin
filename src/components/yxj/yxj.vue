<template>
  <div>
    <scroll ref="scroll" class="nominate-content"
            :data="list"
            :listen-scroll="listenScroll"
            @scroll="scroll">
      <div class="box-list">
        <div v-show="loadflag" class="loadmore">
          <loading></loading>
        </div>
        <div class="bgf mb20" v-for="item in list">
        <router-link :to="{path:'/productDetail',query:{cid:item.cid,tid:item.stock_id,xjid:item.id}}">
        <div class="pl3 pr3 bdb">
            <div class="flex flex-align-center fs28">
              <p class="flex-1 lh80">
                <span class="c6">型号</span>
                <span class="c0 ml20">{{item.model_code}}</span>
              </p>
              <span class="clred">￥{{item.quoted_price/100}}</span>
            </div>
            <div class="flex flex-align-center fs28">
              <p class="flex-1 lh80">
                <span class="c6">批号</span>
                <span class="c0 ml20">{{item.batch_code}}</span>
              </p>
              <div class="flex-1 tl">
                <p class="pt20 pb20">
                  <span class="c6 ">询价数量</span>
                  <span class="c0 ml20">{{item.quantity}}</span>
                </p>
                <p>
                  <span class="c6 ">报价数量</span>
                  <span class="c0 ml20">{{item.quoted_quantity}}</span>
                </p>
              </div>
              <div >
                <p class="pt20 pb20">
                  <span class="c6 w-35">询价货期</span>
                  <span class="c0 ml20">{{item.delivery_time}}</span>
                </p>
                <p>
                  <span class="c6 w-35">报价货期</span>
                  <span class="c0 ml20">{{item.quoted_delivery_time}}</span>
                </p>
              </div>

            </div>
            <div class="flex flex-align-center fs28" v-if="item.remark&&item.remark!=''">
              <p class="flex-1 lh80">
                <span class="c6">买家备注</span>
                <span class="c0 ml20">{{item.remark}}</span>
              </p>
              <span>{{item.create_time|formatDate}}</span>
            </div>
            <div class="flex flex-align-center fs28" v-if="item.seller_remark&&item.seller_remark!=''">
              <p class="flex-1 lh80">
                <span class="c6">卖家备注</span>
                <span class="c0 ml20">{{item.seller_remark}}</span>
              </p>
              <span>{{item.create_time|formatDate}}</span>
            </div>
          </div>
        <p class="clr lh80 bdb pl3 pr3">
          <span class="c0 fs30">{{item.company_name}}</span>
          <i class="iconfont icon-right fs26 c6"></i>
        </p>
        </router-link>
      </div>
      </div>
    </scroll>
    <div class="loading-container" v-show="loading">
      <loading :loadflag="loading"></loading>
    </div>
  </div>
</template>

<script>
import {buyersUserInquiryListdo} from 'api/interfacemethod'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {OK_TRUE, PAGESIZE2} from 'api/conflg'
import {formatDate} from 'api/time'
const scroy = -320
export default {
  data () {
    return {
      list: [],
      loadflag: false,
      totalCount: 0,
      pageNum: 1,
      pageSize: 1,
      listenScroll: true

    }
  },
  created () {
    this.listenScroll = true
    this._buyersUserInquiryListdo()
  },
  computed: {
    loading () {
      return this.$store.state.zj.updatedloading
    }
  },

  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
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
        this._buyersUserInquiryListdo()
      }
    },
    _buyersUserInquiryListdo () {
      buyersUserInquiryListdo({
        pageNum: this.pageNum,
        status: 1,
        pageSize: 5
      }).then((res) => {
        if (res.code == 1) {
          if (res.data.list.length <= 0) {
            this.$vux.toast.text('暂无数据', 'middle')
            return
          }
          this.loadflag = false
          this.list.push(...(res.data.list)) // 未报价的列表
          this.userId = res.data.list[0].userId
          this.totalCount = res.data.total
        }
      }).catch((res) => {})
    }
  },
  components: {
    Loading,
    Scroll
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
    /*.loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)*/
</style>
