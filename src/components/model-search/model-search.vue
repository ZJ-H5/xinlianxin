<template>
  <transition name="slide">
      <div class="credit-search">
          <search-title  @search = "search"></search-title>
          <div class="title" ref="title">
            <div class="active title-item" @click="select(0)">
              <span>默认</span>
              <i class="up" ref="choosei"></i>
            </div>
            <div class="title-item" @click="select(1)">
              <span>{{solrtitle}}</span>
              <!-- <i></i> -->
            </div>
            <div class="title-item" @click="select(2)">
              <span>筛选</span>
              <!-- <i></i> -->
            </div>
          </div>
          <!-- <scroll ref="scroll"
            class="nominate-content"
            :pullup="pullup"
            :data="sellerList"
            @scrollToEnd="loadmore"
            > -->
              <div class="list">
                <div v-show="flagId===0">
                  <transition name="fade">
                    <div class="nomina">
                      <nominate :getdiscList.sync="sellerList" :flag="true" @loadmore="loadmore"></nominate>
                    </div>

                  </transition>
                </div>

                <transition name="fade">
                  <div v-show="flagId===1" class="capacity">
                    <ul>
                      <li
                      :class="{'font-active':capacityIndex===index}"
                      v-for="(item,index) in capacityList"
                      :key="index"
                      @click="capacity(index)"
                      >{{item.name}} </li>
                    </ul>
                  </div>
                </transition>
                <transition name="fade">
                  <div v-show="flagId===2" class="screen">
                    <ul class="screen-ul">
                      <li v-for="(item,indexs) in screenList" :key="indexs" v-show="item.status">
                        <div v-if="!item.choose" class="screen-title">{{item.title}}</div>
                        <div v-if="item.choose" class="screen-title">
                          <span>{{item.title}}</span>
                          <i class="chooseimg"></i>
                          <div class="popup-picker">
                            <popup-picker @ievent = "ievent"></popup-picker>
                          </div>
                        </div>
                        <ul class="screen-list">
                            <li v-for="(i,index) in item.list" :key="index" :class="{'screen-active':i.status}" @click.stop.prevent="screen(item.list,index)">{{i.name}}</li>
                            <li v-if="item.choose && PopupPickerValue" class="screen-active" >{{PopupPickerValue}}</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </transition>
              </div>
            <!-- </scroll> -->
            <transition name="fade">
              <div class="submit" v-show="flagId===2">
                <button class="canse" @click="canse">重置</button>
                <button class="confrim" @click="confrim">确定</button>
              </div>
            </transition>
            <div class="loading-container" v-show="loading">
              <loading :loadflag="loading"></loading>
            </div>

      </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import nominate from 'components/nominate/nominate'
import SearchTitle from 'base/search-title/search-title'
import {addClassList} from 'common/js/dom'
import PopupPicker from 'base/popup-picker/popup-picker'
import {mapGetters, mapActions} from 'vuex'
import {searchOrder} from 'api/nominate'
import {OK_TRUE, PAGESIZE} from 'api/conflg'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import store from '@/store'
const posys = -275
export default {
  data () {
    return {
      params: {
        model: '', // 型号卖家

        goods_type: '', // '货物类型(1:现货,2:期货，所有)',''
        att_type: '', // '0,不关注 1，关注'''
        seller_type: '', // 卖家类型('':代理商、1:原厂:贸易商)
        good_type: '', // '0,非优质 1,优质',''
        war_name: '', // 库存
        type: true, // 默认升降序 升是true 降是false
        allsort: '', // 智能
        pageNow: 1, // 当前页
        pageSize: PAGESIZE// 一页多少条数据
      },
      totalCount: 0,
      sellerList: [],
      pullup: true,
      flagId: 0,
      capacityIndex: 0,
      PopupPickerValue: '',
      solrtitle: '智能排序',
      cityname: '',
      loadingflag: false,
      title: '',

      capacityList: [
        {index: '', name: '智能排序'},
        {index: 1, name: '库存数'},
        {index: 2, name: '成交笔数'},
        {index: 3, name: '综合评分'},
        {index: 4, name: '买家评分'},
        {index: 5, name: '上传时间'}
      ],
      screenList: [
        {status: true, title: '现/期货', list: [{name: '所有', status: false, type: ''}, {name: '现货', status: false, type: 1}, {name: '期货', status: false, type: 2}]},
        {status: true, title: '我的优质/关注', list: [{name: '我关注的卖家', status: false, type: 1}, {name: '我的优质卖家', status: false, type: 1}]},
        {status: true, title: '卖家类型', list: [{name: '所有', status: false, type: ''}, {name: '原厂和代理商', status: false, type: 1}]},
        {status: true, title: '库位', list: [{name: '不限', status: false, type: ''}], choose: true}
      ]
    }
  },
  computed: {
    inputValue () {
      return this.searchIndex || ''
    },
    loading () {
      return this.$store.state.zj.updatedloading
    },
    status () {
      return !!this.$store.state.user.token
    },
    ...mapGetters(['searchIndex'])
  },
  created () {
    this.params.model = this.inputValue
    switch (this.flagId) {
      case 0:
        this._searchOrder()
        break
    }
    console.log(this.status)
    this.status ? (this.screenList[1].status = true) : (this.screenList[1].status = false)
  },
  methods: {
    loadmore (posy) {
      if (posy < posys) {
        if (this.sellerList.length >= this.totalCount) {
          return
        }
        this.params.pageNow++
        this._searchOrder()
      }
    },

    search (val) {
      this._paramsVal(val)
    },
    select (index) {
      this.flagId = index
      addClassList(this.$refs.title.children, index)
      if (index === 0) {
        this.params.allsort = ''
        this.params.goods_type = '' // '货物类型(1=现货,2=期货，所有)',''
        this.params.att_type = '' // '0,不关注 1，关注'''
        this.params.seller_type = '' // 卖家类型(''=代理商、1=原厂=贸易商)
        this.params.good_type = '' // '0,非优质 1,优质',''
        this.params.war_name = '' // 库存
        this.params.type = !this.params.type
        this.params.type ? this.$refs.choosei.className = 'up' : this.$refs.choosei.className = 'down'
        this._paramsVal()
      }
    },
    //
    capacity (index) {
      this.capacityIndex = index
      this.params.allsort = index === 0 ? '' : index
      this.solrtitle = this.capacityList[this.capacityIndex].name
      this.flagId = 0
      this._paramsVal()
    },
    // 某一个title去循环
    screen (itemList, index) {
      itemList.forEach((item, ind) => {
        if (ind === index) {
          return
        }
        item.status = false
      })
      itemList[index].status = !itemList[index].status
      this.screenList.forEach((item, ind) => {
        if (item.choose && item.list[0].status) {
          this.PopupPickerValue = ''
        }
      })
    },
    ievent (data) {
      this.PopupPickerValue = data[0]
      this.screenList.forEach((item, ind) => {
        if (item.choose) {
          item.list[0].status = false
        }
      })
    },
    // 确定
    confrim () {
      // 筛选
      if (this.flagId === 2) {
        let GOODS_TYPE = this.screenList[0].list.find((x) => x.status === true)
        this.params.goods_type = GOODS_TYPE ? GOODS_TYPE.type : ''

        let ATT_TYPE = this.screenList[1].list[0]
        this.params.att_type = ATT_TYPE.status ? ATT_TYPE.type : ''

        let GOOD_TYPE = this.screenList[1].list[1]
        this.params.good_type = GOOD_TYPE.status ? GOOD_TYPE.type : ''

        let SELLER_TYPER = this.screenList[2].list.find((x) => x.status === true)
        this.params.seller_type = SELLER_TYPER ? SELLER_TYPER.type : ''

        this.params.war_name = (this.PopupPickerValue || '')
        this.flagId = 0
        this._paramsVal()
      }
    },
    canse () {
      if (this.flagId === 1) {
        this.capacity(0)
      }
      if (this.flagId === 2) {
        this.screenList.forEach((item, ind) => {
          item.list.forEach((itemlist, indexlist) => {
            itemlist.status = ''
            this.PopupPickerValue = ''
          })
        })
      }
    },
    _paramsVal (val) {
      this.params.model = val || this.inputValue
      this.params.pageNow = 1
      this.sellerList = []
      this._searchOrder()
    },

    _searchOrder () {
      let hash = {}
      searchOrder(this.params).then(res => {
        if (res.code === OK_TRUE) {
          if (res.data.map.length <= 0 && this.sellerList.length <= 0) {
            this.$vux.toast.text('暂无数据', 'middle')
            return
          }
          this.historyAction(res.data.map[0].model_code)
          let array = res.data.map
          this.totalCount = res.data.page.totalCount
          // 循环累加
          this.sellerList.push(...array)
          // 去重
          // if (this.flagId === 0) {
          //   this.sellerList = this.sellerList.reduceRight((item, next) => {
          //     hash[next.id] ? '' : hash[next.id] = true && item.push(next)
          //     return item
          //   }, [])
          // }
        } else {
          this.$vux.toast.text(res.msg, 'middle')
        }
      })
        .catch(err => {
          this.$vux.toast.text(err.msg, 'middle')
        })
    },
    ...mapActions([
      'historyAction'
    ])
  },
  components: {
    nominate,
    PopupPicker,
    SearchTitle,
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

.fade-enter-active, .slide-leave-active
    transition: all 0.5s

.fade-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)

.credit-search
  position: fixed
  z-index: 100
  top: 0
  left: 0
  bottom: 0
  right: 0
  .loading-container
    position: absolute
    width: 100%
    // top: 50%
    transform: translateY(-50%)
  .box-list
    margin-top 128px
    ul
      li
        height 90px
        display flex
        justify-content space-between
        align-items center
        border-bottom 1px solid $color-border-e6
        background-color $color-background-fff = #fff
        h1
          width 50px
          height 50px
          line-height 50px
          margin-left 20px
          text-align center
          color $color-text-f
          background-color $color-background-bulr
          border-radius 50%
        .title
          font-size 28px
          color $color-text-3
          overflow-ellipsis(400px)
        .mobile
          font-size 28px
          color $color-text-3
        .type
          font-size 20px
          margin-right 20px
        .number
          color $color-text-reddc
          font-size 26px
  .title
    margin-top 126px
    display flex
    justify-content space-around
    align-items center
    font-size 30px
    height 80px
    border-bottom 1px solid $color-border-e6
    background-color $color-background-fff
    .title-item
      display flex
      align-items center
      color $color-text-6
      i
        display inline-block
        width 12px
        height 30px
        background-size 12px 30px
        margin-left 8px
      .up
        bg-image('up')
      .down
        bg-image('down')
    .active
      color $font-color-blueb
  .nominate-content
    position: absolute
    height: 100%
    width: 100%
    overflow: hidden
  .list
    .capacity
      background-color $color-background-fff
      ul>li
        height 80px
        margin-left 50px
        text-align left
        line-height 80px
        font-size 28px
        color $color-text-6
        border-bottom 1px solid $color-border-e6
      .font-active
        color $font-color-blueb
    .screen
      .screen-ul>li
        height 160px
        display flex
        flex-wrap wrap
        align-content space-around
        align-items center
        margin-bottom 16px
        background-color $color-background-fff
        .screen-title
          padding-left 70px
          width 100%
          font-size 28px
          color $color-text-3
          position relative
          .popup-picker
            position absolute
            opacity 0
            top -10px
            left 36px
          .chooseimg
            display inline-block
            width 18px
            height 16px
            background-size 18px 16px
            bg-image('choose')
        .screen-list
          width 100%
          display flex
          font-size 26px
          color $color-text-6
          justify-content space-around
          li
            border 1px solid $color-text-6
            padding 0 24px
            height 38px
            line-height 38px
            border-radius 6px
            &.screen-active
              color $font-color-blueb
              border 2px solid $font-color-blueb
  .submit
    display flex
    justify-content space-around
    position fixed
    bottom 0
    left 0
    width 100%
    button
      font-size 36px
      color $color-text-f
      border none
      width 100%
      height 98px
      &.canse
        background-color $color-background-93
      &.confrim
        background-color $color-background-bulrb
</style>
