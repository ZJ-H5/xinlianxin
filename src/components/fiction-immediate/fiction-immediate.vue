<template>
  <div class="mt20 bgf">
    <scroll ref="scroll"
      class="nominate-content"
      :data="immeList">
      <div class="wrap">

        <div class="" v-for="(item,index) in immeList" :key="index" v-if="immeList">
          <router-link tag="a" class="immelist clearfix "
          :to="{path:'/communication',query:{
            cid:item.information.id,
            companyId:item.information.cid,
            companyImg:item.information.pic,
            companyName:item.information.company_name||item.information.phone,
            tel:item.information.phone}}"
            >
            <div class='userimg left relative'>
              <img class="headimg"  @error="imgError(item)" :src="item.information.pic">
              <span v-if="item.statusMessage>0" class="fiction-user">{{item.statusMessage}}</span>
            </div>
            <div class="left immecen">
              <div class="c3 immename">
                <span>{{item.information.company_name||item.information.phone}}</span>
                <span class='times right c9'>{{item.list[item.list.length-1].time | formatDates}}</span>
              </div>
              <p class="c9 immetishi">{{(item.list[item.list.length-1].contentType === 'txt' && item.list[item.list.length-1].msg)||'[图片]'}}</p>
            </div>
          </router-link>
        </div>
      </div>
  </scroll>
    <div class="loading-container"
        v-show="!immeList.length">
        <loading :title="'暂无数据'"
          :loadflag="false" :loadimg="false"></loading>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {fictionMixin} from '@/api/minx'
import {dateFormat} from 'api/time'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
export default {
  mixins: [fictionMixin],
  // doNotInit: true,
  created () {
    this._getindexDBs()
  },
  data () {
    return {
      immeList: [],
      count: 0
    }
  },
  filters: {
    formatDates (time) {
      let newtime = new Date()
      let timecha = ((newtime.getTime() - new Date(time).getTime()) / 1000 / 3600)
      if (timecha >= 24) {
        return dateFormat(new Date(time), 'yyyy-MM-dd')
      } else if (timecha > 0.1 && timecha < 24) {
        return dateFormat(new Date(time), 'HH:mm:ss')
      } else {
        return '刚刚'
      }
    }
  },
  mounted () {
    this.$bus.on('immediatemessage', () => {
      console.log('count', this.count++)
      this._getindexDBs()
    })
  },
  beforeDestroy () {
    this.$bus.off('immediatemessage', this.count = 0)
  },
  components: {
    Loading,
    Scroll
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .nominate-content
    position: absolute;
    height: 65%;
    width:100%;
    overflow: hidden;
    top 340px;
    .wrap
      position: relative;
      width: 100%;
      overflow: hidden;
      .immelist
        background #fff
        border-bottom 1px solid #f2f2f2
        padding 20px
        .userimg
          width 100px
          height 100px
          img
            width 100%
            height 100%
        .times
          font-size 22px
        .immecen
          width 570px
          margin-left 30px
        .immename
          font-size 30px
          height 50px
          padding-top 5px
        .immetishi
          font-size 20px
          height 45px
          line-height 45px
          font-size 24px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        .fiction-user
          position absolute
          width 40px
          height 40px
          line-height 42px
          border-radius 50%
          background-color #e70000
          color #fff
          top -20px
          right -20px
          border 1px solid #e70000
          font-size 22px
          text-align center

  .loading-container
    position: absolute;
    width: 100%;
    top: 30%;
    transform: translateY(-50%)

</style>
