<template>
  <transition name="slide">

      <div class="credit-search">
        <div class="head">
          <search-title @search = "search"></search-title>
        </div>
        <scroll ref="scroll" class="nominate-content"
        :data="sellerList"
        :listen-scroll="listenScroll"
        @scroll="scroll">
          <div class="box-list">
            <sell-credit-detail :sellerList="sellerList"></sell-credit-detail>
            <div v-show="loadflag" class="loadmore">
              <loading></loading>
            </div>
            <div class="h100"></div>

          </div>

        </scroll>
        <div class="loading-container" v-show="loading">
              <loading :loadflag="loading"></loading>
            </div>
      </div>

  </transition>
</template>

<script type="text/ecmascript-6">
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import SearchTitle from 'base/search-title/search-title'
import SellCreditDetail from 'components/sell-credit-detail/sell-credit-detail'
import {searchcredit} from 'api/nominate'
import {OK_TRUE, PAGESIZE2} from 'api/conflg'
import {mapGetters, mapActions} from 'vuex'

const scroy = -320
export default {
  data () {
    return {
      sellerList: [],
      loadflag: false,
      totalCount: 0,
      scrollY: -1,
      params: {
        model: '',
        pageNow: 1, // 当前页
        pageSize: PAGESIZE2// 一页多少条数据
      }
    }
  },
  created () {
    this.params.model = this.inputValue
    this.listenScroll = true
    this._searchcredit()
  },
  computed: {
    inputValue () {
      return this.searchIndex || ''
    },
    loading () {
      return this.$store.state.zj.updatedloading
    },
    ...mapGetters(['searchIndex'])
  },
  methods: {
    search (val) {
      this.params.model = val
      this.params.pageNow = 1
      this.sellerList = []
      this._searchcredit()
    },
    scroll (pos) {
      this.scrollY = pos.y
      if (this.scrollY < scroy) {
        this.loadflag = true
        if (this.sellerList.length >= this.totalCount) {
          this.loadflag = false
          return
        }
        this.params.pageNow++
        this._searchcredit()
      }
    },
    _searchcredit () {
      searchcredit(this.params)
        .then((res) => {
          if (res.code === OK_TRUE) {
            if (res.data.map.length <= 0) {
              this.$vux.toast.text('暂无数据', 'middle')
              return
            }
            this.credithistoryAction(res.data.map[0].company_name)
            this.loadflag = false
            this.totalCount = res.data.page.totalCount
            this.sellerList.push(...(res.data.map))
            console.log(this.sellerList)
          } else {
            this.$vux.toast.text(res.msg, 'middle')
          }
        })
        .catch(err => {
          this.$vux.toast.text(err, 'middle')
        })
    },
    ...mapActions([
      'credithistoryAction'
    ])
  },
  components: {
    SearchTitle,
    SellCreditDetail,
    Loading,
    Scroll
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

.credit-search
  .nominate-content
    position: absolute
    height: 100%
    width 100%
    overflow: hidden
  .head
    position: fixed
    top: 0
    left: 0
    right: 0
    z-index 9
  .box-list
    margin-top 128px
    .loadmore
      margin-top 6px
  // .loading-container
  //   position: absolute
  //   width: 100%
  //   top: 50%
  //   transform: translateY(-50%)
</style>
