
<template>
  <div class="rank-list">
     <scroll ref="scroll"
        class="nominate-content"
        :pullup="pullup"
        :data="(flagId===0 && salesList) ||(flagId===1 && modelList) || (flagId===2 && hotList)"
        @scrollToEnd="loadmore"
        >
      <div>
        <div class="box" ref="box">
          <div class="item sales active" @click="selectId(0)">
            <i></i>
            <h2>销量排行榜</h2>
          </div>

          <div class="item model" @click="selectId(1)">
            <i></i>
            <h2>型号排行榜</h2>
          </div>

          <div class="item hot" @click="selectId(2)">
            <i></i>
            <h2>热搜排行榜</h2>
          </div>
        </div>
        <div class="list">
          <ul v-show="flagId===0">
            <router-link tag="li"  class="sales-box" :to="{name:'introduce',params:{sellerId:item.id,buyerId:item.user_id}}" v-for="(item,index) in salesList" :key="index" >
              <h1 class="sales-box-item">{{index+1}}</h1>
              <div class="sales-box-item">
                <div class="sales-item-child">
                  <span class="title">{{item.company_name}}</span>
                  <span class="turnover type">成交笔数</span><span class="number">{{item.seller_order_deal_qty}}</span>
                </div>
                <div class="sales-item-child">
                  <span class="grade type">买家评分</span><span class="number">{{item.total||'0.0'}}</span>
                </div>
              </div>
            </router-link>
          </ul>
          <ul v-show="flagId===1">
            <router-link tag="li" :to="{path:'/productDetail',query:{cid:item.cid,tid:item.orderid}}" class="model-box" v-for="(item,index) in modelList" :key="index" >
              <h1 class="model-box-item">{{index+1}}</h1>
              <div class="model-box-item">
                <div class="model-item-child">
                  <span class="title">型号&nbsp;&nbsp;<span>{{item.modelcode}}</span></span>
                  <span class="turnover type">成交笔数</span><span class="number">{{item.selfdata}}</span>
                </div>
                <div class="model-item-child">
                  <span class="grade type">{{item.companyname}}</span>
                </div>
              </div>
            </router-link>
          </ul>
          <ul v-show="flagId===2">
            <li class="z-list" v-for="(item,index) in hotList" :key="index">
              <h1 class="">{{index+1}}</h1>
                <div class="list-content">
                  <span class="title">型号&nbsp;&nbsp;<span>{{item.model_code}}</span></span>

                  <span class="type ">搜索次数<em class="clred ml20">{{item.count}}</em></span>
                </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container"
            v-show="(flagId===0 && !salesList.length) ||(flagId===1 && !modelList.length) || (flagId===2 && !hotList.length)">
        <loading :title="'正在载入...'" :loadimg="false"></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import {addClassList} from 'common/js/dom'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import {selectSaleslist, selectsellerlist} from 'api/nominate'
import {OK_TRUE} from 'api/conflg'
import {modelAppSearchDatado} from 'api/interfacemethod'
export default {
  data () {
    return {
      salesList: [],
      modelList: [],
      hotList: [],
      flagId: 0,
      pullup: true

    }
  },
  created () {
    this._selectSaleslist()
  },
  methods: {
    selectId (index) {
      this.flagId = index
      addClassList(this.$refs.box.children, index)
      if (index === 0) {
        this._selectSaleslist()
      }
      if (index === 1) {
        this._selectsellerlist()
      }
      if (index === 2) {
        this._modelAppSearchDatado()
      }
    },
    _selectSaleslist () {
      selectSaleslist()
        .then((res) => {
          res.code === OK_TRUE
            ? this.salesList = res.data
            : this.$vux.toast.text(res.msg, 'middle')
        })
        .catch(err => {
          this.$vux.toast.text(err, 'middle')
        })
    },
    _selectsellerlist () {
      selectsellerlist()
        .then((res) => {
          res.code === OK_TRUE
            ? this.modelList = res.data
            : this.$vux.toast.text(res.msg, 'middle')
        })
        .catch(err => {
          this.$vux.toast.text(err, 'middle')
        })
    },
    loadmore () {

    },
    _modelAppSearchDatado () {
      modelAppSearchDatado()
        .then((res) => {
          res.code === OK_TRUE
            ? this.hotList = res.list
            : this.$vux.toast.text(res.msg, 'middle')
        })
        .catch(err => {
          this.$vux.toast.text(err, 'middle')
        })
    }
  },
  components: {
    Loading,
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.rank-list
  .nominate-content
    position: absolute
    width: 100%
    height 100%
    overflow: hidden
  .box
    display flex
    justify-content: space-between
    padding 22px 50px 48px 50px
    font-size 24px
    color $color-text-6
    background-color $color-background-fff
    border-bottom 1px solid $color-border-e6
    .item
      h2
        font-size 24px
        margin-top 24px
      i
        display block
        width 64px
        height 64px
        background-size 64px 64px
        margin auto
      &.sales
        i
          bg-image('Salesvolume')
      &.model
        i
          bg-image('Model')
      &.hot
        i
          bg-image('Hot')
      &.active:nth-child(1)
        i
          bg-image('SalesvolumeOn')
        h2
          color $color-text-chen
          font-size 30px
      &.active:nth-child(2)
        i
          bg-image('ModelOn')
        h2
          color $color-theme-bulr
          font-size 30px
      &.active:nth-child(3)
        i
          bg-image('HotOn')
        h2
          color $color-text-reddc
          font-size 30px
  .list
    ul
      padding-bottom 240px
    .sales-box
      height 160px
      width 100%
      display flex
      justify-content: space-between
      align-items: center
      background-color $color-background-fff = #fff
      h1
        width 50px
        height 50px
        line-height 50px
        margin-left 22px
        text-align center
        color $color-text-f
        background-color $color-background-bulr
        border-radius 50%
      .sales-box-item
        .sales-item-child
          display flex
          align-item center
          margin-right 35px
          margin-top 40px
          .title
            display inline-block
            font-size 28px
            color $color-text-3
            margin-right 22px
            overflow-ellipsis(388px)
            align-self flex-end
            line-height 40px
          .type
            display inline-block
            font-size 20px
            margin-right 16px
          .number
            display inline-block
            color $color-text-reddc
            font-size 28px
      .sales-box-item:nth-child(2)
        border-bottom 1px solid $color-border-e6
        height 160px
        width 636px
        display flex
        flex-wrap: wrap
        align-content: center
        align-item baseline
        .sales-item-child:nth-child(2)
          margin-bottom 20px
    .model-box
      height 160px
      width 100%
      display flex
      justify-content: space-between
      align-items: center
      background-color $color-background-fff = #fff
      h1
        width 50px
        height 50px
        line-height 50px
        margin-left 22px
        text-align center
        color $color-text-f
        background-color $color-background-bulr
        border-radius 50%
      .model-box-item
        .model-item-child
          display flex
          align-item center
          display flex
          align-item center
          margin-right 35px
          margin-top 40px
          .title
            display inline-block
            font-size 28px
            color $color-text-3
            margin-right 22px
            overflow-ellipsis(350px)
            align-self flex-end
          .type
            display inline-block
            font-size 20px
            margin-right 16px
            &.grade
              overflow-ellipsis(392px)
          .number
            display inline-block
            color $color-text-reddc
            font-size 28px
      .model-box-item:nth-child(2)
        border-bottom 1px solid $color-border-e6
        /*height 160px*/
        width 636px
        display flex
        flex-wrap: wrap
        align-content: center
        align-item baseline
        .model-item-child:nth-child(2)
          margin-bottom 20px
    .z-list
      padding-left 3%
      padding-right 3%
      background #ffffff
      display flex
      align-items center
      justify-content space-between
      padding-top 40px
      padding-bottom 40px
      h1
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #fff;
        background-color: #1081d1;
        border-radius: 50%;
      .list-content
        margin-left 40px
        padding-bottom 30px
        flex:1
        border-bottom 1px solid $color-border-e6
        display flex
        .title
          font-size 28px
          color $color-text-3
          margin-right 22px
          flex:1

</style>
