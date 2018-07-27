
<template>
  <div class="credit">
    <scroll ref="scroll" class="nominate-content"
            :data="newList"
            :listen-scroll="listenScroll"
            @scroll="scroll">
      <div class="newlist">
        <div v-show="loadflag" class="loadmore">
          <loading :title="'正在载入...'" :loadimg="false"></loading>
        </div>
        <ul>
          <router-link v-for="(item,index) in newList"
           :key="index"
            tag="li"
            :to="{name:'newpage',params:{html:item.content,title:item.consultation,imgurl:item.imgurl}}"
            >
            <div class="flex flex-align-center pl3 pr3">
              <span class="flex-1">{{item.consultation}}</span>
              <span class="date">{{item.ctime|formatDate}}</span>
            </div>
            <div class="active">
              <img :src="item.imgurl?item.imgurl:defaultImg" alt="">
              <span v-html="item.content"></span>
            </div>
          </router-link>
        </ul>
      </div>
    </scroll>
    <!-- <div class="loading-container" v-show="loading">
      <loading :loadflag="loading"></loading>
    </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
import {subjectconsultationdo} from 'api/interfacemethod'
import {OK_TRUE} from 'api/conflg'
import {formatDate} from 'api/time'
import {defaultImg} from '@/api/conflg'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
const scroy = -300
export default {
  data () {
    return {
      newList: [],
      defaultImg: defaultImg,
      loadflag: false,
      pageNow: 1,
      pageSize: 1,
      listenScroll: true
    }
  },
  computed: {
    loading () {
      return this.$store.state.zj.updatedloading
    }
  },
  created () {
    this._subjectconsultationdo()
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    scroll (pos) {
      this.scrollY = pos.y
      if (this.scrollY < scroy) {
        this.loadflag = true
        if (this.list.length >= this.totalCount) {
          this.loadflag = false
          return
        }
        this.pageNow++
        this._buyersOrderListdo()
      }
    },
    _subjectconsultationdo () {
      subjectconsultationdo({
        pageNow: this.pageNow,
        pageSize: 10
      })
        .then((res) => {
          res.code === OK_TRUE
            ? this.newList = res.data.map
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
.credit
  .nominate-content
    position: absolute
    height: 100%
    width 100%
    overflow: hidden
    .newlist
      padding-bottom 240px
      ul
        li
          background-color $color-background-fff
          padding 20px 0px
          border-bottom 1px solid $color-border-e6
          .title
            display flex
            justify-content space-between
            .head
              font-size 28px
              color $color-text-3
              margin-left 50px
              overflow-ellipsis(390px)
            .date
              margin-right 20px
              font-size 22px
          .active
            display flex
            align-items flex-end
            padding-left 50px
            img
              display inline-block
              width 80px
              height 80px
              margin-right 26px
              margin-top 30px
            span
              overflow-ellipsis(390px)
              color $color-text-6
              margin-top 20px
    .loadmore
      margin-top 6px

</style>
