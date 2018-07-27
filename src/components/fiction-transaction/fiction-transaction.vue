<template>
  <div class="mt20">
    <scroll ref="scroll"
      class="nominate-content"
      :data="tranList">
      <div class="wrap">
        <div class="tranbox bgf p20"
        v-for="(item,index) in tranList"
        :key="index"
        @click="_updatamessage(item.id)">
          <div class="tranPage">
            <span class="c3 fs30">{{item.title}}</span>
            <span class="c9 right">{{item.create_time|dateFormats}}</span>
          </div>
          <!--<div class="tranPage">
            <span class="c9 fs24">{{item.trantxt}}</span>
          </div>-->
          <div class="tranPage">
            <div class="fs28 c6"
              v-html="item.content"></div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="loading-container"
        v-show="!tranList.length">
        <loading :title="'暂无数据'"
          :loadflag="false" :loadimg="false"></loading>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { buyerAppMessageList, updatamessage } from 'api/fiction'
import { OK_TRUE, PAGESIZE } from 'api/conflg'
import { dateFormat } from 'api/time'
import { mapActions } from 'vuex'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
export default {
  data () {
    return {
      tranList: [],
      params: {
        typein: 2,
        pageNum: 1,
        pageSize: PAGESIZE
      }
    }
  },
  filters: {
    dateFormats (time) {
      return dateFormat(new Date(time), 'yyyy-MM-dd HH:mm:ss')
    }
  },
  created () {
    this._buyerAppMessageList()
  },
  methods: {
    _buyerAppMessageList () {
      buyerAppMessageList(this.params)
        .then(res => {
          if (res.code === OK_TRUE) {
            this.tranList = res.data.list
            console.log(this.tranList)
            // this.tranList = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
          }
        })
        .catch(err => {
          this.$vux.toast.text(err, 'middle')
        })
    },
    _updatamessage (id) {
      updatamessage({ id })
        .then(res => {
          if (res.code === OK_TRUE) {
            this.countAction(true)
            this._buyerAppMessageList()
            this.$vux.toast.text(res.msg, 'middle')
          }
        })
        .catch(err => {
          this.$vux.toast.text(err, 'middle')
        })
    },
    ...mapActions(['countAction'])
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
  height: 66%;
  width:100%;
  overflow: hidden;
  top 340px;
  .wrap
    position: relative;
    width: 100%;
    overflow: hidden;
    .tranbox
        border-bottom 1px solid #f2f2f2
      .tranPage
        line-height 50px
.loading-container
  position: absolute;
  width: 100%;
  top: 30%;
  transform: translateY(-50%)

</style>
