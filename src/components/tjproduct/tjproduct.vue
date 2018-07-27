<template>
  <div class="qb">
    <scroll ref="scroll" class="nominate-content"
            :data="orderDao"
            :listen-scroll="listenScroll"
            @scroll="scroll">
      <div class="box-list">
        <!--<div v-show="loadflag" class="loadmore">
          <loading></loading>
        </div>-->
        <div class="pb40 z-bdb pl3 pr3 bgf" v-for="item in orderDao">
          <p class="flex flex-align-center pt40">
            <span class="c0 flex-1 fs28"><i class="z-cu mr20">促</i>{{item.model_code}}</span>
            <span class="clred fs36"> {{item.unit_price}}</span>
          </p>
          <p class="flex flex-align-center pt40">
            <span class="mr40 ml60">库存 <em class="ml20">{{item.quantity}}</em></span>
            <span>笔数 <em class="ml20">{{item.self_data}}</em></span>
          </p>
        </div>
      </div>
    </scroll>
    <div class="loading-container" v-show="loading">
      <loading :loadflag="loading"></loading>
    </div>
  </div>
</template>

<script>
  import {sellerCxOrderdo} from 'api/interfacemethod'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {OK_TRUE, PAGESIZE2} from 'api/conflg'
  const scroy = -100
export default {
  data () {
    return {
      companyId:this.$route.params.companyId,
      orderDao:[],
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
  created(){
    this._sellerCxOrderdo();
  },
  methods:{
    scroll (pos) {
      this.scrollY = pos.y
      console.log(this.scrollY)
      if (this.scrollY < scroy) {
        this.loadflag = true
        if (this.orderDao.length >= this.totalCount) {
          this.loadflag = false
          return
        }
        this.pageNum++
        this._sellerCxOrderdo()
      }
    },
    _sellerCxOrderdo(){
      sellerCxOrderdo({
        pageNum:this.pageNum,
        companyId:this.companyId,
        pageSize:5
      }).then((res)=>{
        if (res.data[0].map.length <= 0) {
          this.$vux.toast.text('无更多内容', 'middle')
          return
        }
        this.loadflag = false
        this.orderDao.push(...(res.data[0].map))
        this.totalCount=res.data[0].page.totalCount //热卖产品
      }).catch((res)=>{})
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .qb
    height: 10rem
    .nominate-content
      position: absolute
      height: 100%
      width 100%
      overflow: hidden
      .box-list
        padding-bottom 680px
      .loadmore
        margin-top 6px

</style>
