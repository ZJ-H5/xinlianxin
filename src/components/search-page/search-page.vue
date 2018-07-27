<template>
<transition name="slide">
    <div class="search-page">
        <search-title :value="inputValue" @search = "search"></search-title>
        <div class="tab" ref="tab">
          <span class="active" @click="tab(0)">型号</span>
          <span class="" @click="tab(1)">信用</span>
        </div>
        <transition name="fade">
          <div class="session" v-show="flagId===0">
            <div class="item">
              <h2 v-show="sellerList.length">热门搜索</h2>
              <ul>
                <li v-for="(item,index) in sellerList" :key="index" @click="location(item.model_code)">{{item.model_code}}</li>
              </ul>
            </div>
            <div class="item">
              <h2 v-show="sellerHistory.length">历史搜索</h2>
              <h1 class="clears" v-show="sellerHistory.length" @click="clear(0)">清除</h1>
              <ul>
                <li v-for="(item,index) in sellerHistory" :key="index" @click="location(item)">{{item}}</li>
              </ul>
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div class="session" v-show="flagId===1">
            <div class="item">
              <h2 v-show="searchList.length">热门搜索</h2>
              <ul>
                <li v-for="(item,index) in searchList" :key="index"  @click="location(item.company_name)">{{item.company_name}}</li>
              </ul>
            </div>
            <div class="item">
              <h2 v-show="searchcredithistory.length">历史搜索</h2>
              <h1 class="clears" v-show="searchcredithistory.length" @click="clear(1)">清除</h1>
              <ul>
                <li v-for="(item,index) in searchcredithistory" :key="index" @click="location(item)">{{item}}</li>
              </ul>
            </div>
          </div>
        </transition>
        <div class="loading-container" v-show="loading">
          <loading :loadflag="loading"></loading>
        </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import {addClassList} from 'common/js/dom'
import SearchTitle from 'base/search-title/search-title'
import {mapGetters, mapMutations} from 'vuex'
import {searchOrder, searchcredit} from 'api/nominate'
import {OK_TRUE, PAGESIZE} from 'api/conflg'
import {searchpage} from 'api/searchpage'
import Loading from 'base/loading/loading'
import {modelAppSearchDatado} from 'api/interfacemethod'
export default{
  data () {
    return {
      flagId: 0,
      params: {
        model: '', // 型号卖家
        goods_type: '', // '货物类型(1:现货,2:期货，所有)',''
        att_type: '', // '0,不关注 1，关注'''
        seller_type: '', // 卖家类型('':代理商、1:原厂:贸易商)
        good_type: '', // '0,非优质 1,优质',''
        war_name: '', // 库存
        allsort: '', // 智能
        pageNow: 1, // 当前页
        pageSize: PAGESIZE// 一页多少条数据
      },
      sellerList: [],
      searchList: [],
      searchlistflag: true
    }
  },
  mounted () {
    console.log(this.searchcredithistory)
    this.params.model = this.inputValue
    this.flagId = this.setflagId
    addClassList(this.$refs.tab.children, this.flagId)
    this._searchOrder()
    this._searchcredit()
  },
  computed: {
    inputValue () {
      return this.searchIndex || ''
    },
    sellerHistory () {
      return searchpage(this.history)
    },
    searchcredithistory () {
      return searchpage(this.credithistory)
    },
    loading () {
      return this.$store.state.zj.updatedloading
    },
    setflagId () {
      return this.setflagId
    },
    ...mapGetters(['searchIndex', 'history', 'credithistory', 'setflagId'])
  },
  methods: {
    location (val) {
      this.setsearchIndex(val)
      switch (this.flagId) {
        case 0:
          this.$router.push('modelsearch')
          break
        case 1:
          this.$router.push('creditsearch')
          break
      }
    },
    clear (index) {
      switch (this.flagId) {
        case 0:
          this.sethistory([])
          break
        case 1:
          this.setcredithistory([])
          break
      }
    },
    search (val) {
      this.params.model = val
      switch (this.flagId) {
        case 0:
          this.$router.push('modelsearch')
          break
        case 1:
          this.$router.push('creditsearch')
          break
      }
    },
    tab (index) {
      this.flagId = index
      addClassList(this.$refs.tab.children, index)
      this.setFlagid(this.flagId)
      // if (this.flagId === 1 && this.searchlistflag) {
      //   this._searchcredit()
      // }
    },

    _searchOrder () {
      let hash = {}
      modelAppSearchDatado()
        .then((res) => {
          if (res.code === OK_TRUE) {
            this.sellerList = res.list
            if (this.sellerList.length <= 0) {
              this.$vux.toast.text('暂无数据', 'middle')
              return
            }
            // 去重
            // this.sellerList = this.sellerList.reduceRight((item, next) => {
            //   hash[next.id] ? '' : hash[next.id] = true && item.push(next)
            //   return item
            // }, [])
            this.sellerList = this.sellerList.slice(0, 6)
          } else {
            this.$vux.toast.text(res.msg, 'middle')
          }
        })
        .catch(err => {
          this.$vux.toast.text(err.msg, 'middle')
        })
      // searchOrder(this.params).then(res => {
      //   if (res.code === OK_TRUE) {
      //     this.sellerList = res.data.map
      //     if (this.sellerList.length <= 0) {
      //       this.$vux.toast.text('暂无数据', 'middle')
      //       return
      //     }
      //     // 去重
      //     this.sellerList = this.sellerList.reduceRight((item, next) => {
      //       hash[next.id] ? '' : hash[next.id] = true && item.push(next)
      //       return item
      //     }, [])
      //     this.sellerList = this.sellerList.slice(0, 6)
      //   } else {
      //     this.$vux.toast.text(res.msg, 'middle')
      //   }
      // })
      //   .catch(err => {
      //     this.$vux.toast.text(err, 'middle')
      //   })
    },
    _searchcredit () {
      searchcredit({model: '', pageNow: 1, pageSize: PAGESIZE})
        .then((res) => {
          if (res.code === OK_TRUE) {
            // this.searchlistflag = false
            this.searchList = res.data.map
            if (this.searchList.length <= 0) {
              this.$vux.toast.text('暂无数据', 'middle')
              return
            }
            this.searchList = this.searchList.slice(0, 6)
          } else {
            this.$vux.toast.text(res.msg, 'middle')
          }
        })
        .catch(err => {
          this.$vux.toast.text(err, 'middle')
        })
    },
    ...mapMutations(
      {setFlagid: 'FLAGID', sethistory: 'SET_HISTORY', setcredithistory: 'SET_CREDITHISTORY', setsearchIndex: 'SEARCH_INDEX'}
    )
  },
  components: {
    Loading,
    SearchTitle
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
.fade-enter-active, .slide-leave-active
    transition: all 0.5s

.fade-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)

.search-page
  position: fixed
  z-index: 100
  top: 0
  left: 0
  bottom: 0
  right: 0
  background-color $color-background-fff
  // .loading-container
  //   position: absolute
  //   width: 100%
  //   top: 50%
  //   transform: translateY(-50%)
  .tab
    height 78px
    wdith 100%
    background-color $color-background-fff
    margin-top 128px
    font-size 32px
    display flex
    justify-content space-around
    align-items center
    border-bottom 1px solid #ccc
    span
      display inline-block
      width 100%
      height 100%
      text-align center
      line-height 78px
    .active
      display inline-block
      color $font-color-blueb
      border-bottom 4px solid $color-background-bulr
  .session
    .item
      position relative
      background-color $color-background-fff
      h2
        font-size 24px
        padding-top 14px
        margin-left 20px
      ul
        font-size 30px
        color $color-text-0
        display flex
        align-items center
        flex-wrap wrap
        border-bottom 1px solid $color-background-c
        li
          height 120px
          width 50%
          line-height 120px
          text-align center
          overflow-ellipsis(49%)
      .clears
        position absolute
        top 30px
        right 20px
        font-size 24px
        width 70px
        height 40px
        border 1px solid $color-background-bulr
        border-radius 6px
        text-align center
        line-height 40px
        color $font-color-blueb
</style>
