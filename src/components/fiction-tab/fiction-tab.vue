<template>
    <div class="fiction-box">
      <router-link class="fiction-item" to="/fiction/fictionImmediate">
        <div class="icons relative">
          <img src="./message.png" alt="">
          <span class="fiction-tip" v-if="statusCount>0">{{statusCount < 999 ? statusCount : '999+'}}</span>
        </div>
        <p class="fiction-txt">即时消息</p>
      </router-link>
      <router-link class="fiction-item" to="/fiction/transaction">
        <div class="icons relative">
          <img src="./car.png" alt="">
          <span class="fiction-tip" v-if="TradeLogistics>0">{{TradeLogistics < 999 ? TradeLogistics : '999+'}}</span>
        </div>
        <p class="fiction-txt">交易物流</p>
      </router-link>
      <router-link class="fiction-item" to="/fiction/notice">
        <div class="icons relative">
          <img src="./voice.png" alt="">
          <span class="fiction-tip" v-if="systemInforms>0">{{systemInforms < 999 ? systemInforms : '999+'}}</span>
        </div>
        <p class="fiction-txt">系统通知</p>
      </router-link>
    </div>
</template>
<script type="text/ecmascript-6">
import {buyerAppcount} from 'api/fiction'
import {OK_TRUE, PAGESIZE} from 'api/conflg'
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  data () {
    return {
      params: {
        typein: (0, 1, 3),
        pageNum: 1,
        pageSize: PAGESIZE
      },
      InstantMessaging: 101,
      TradeLogistics: 0,
      systemInforms: 0,
      statusCount: 0
    }
  },
  created () {
    this._buyerAppcount()
  },
  watch: {
    count: function (newval) {
      newval && this._buyerAppcount()
    }
  },
  computed: {
    ...mapGetters(['count'])
  },
  mounted () {
    this.$bus.on('tabmessage', (value) => {
      console.log('fiction-tab', value)
      this.statusCount = value || 0
      this.setTabStatusMessage(this._filters(this.statusCount + this.TradeLogistics + this.systemInforms))
    })
  },
  beforeDestroy () {
    this.$bus.off('tabmessage', this.statusCount = 0)
  },
  methods: {
    _buyerAppcount () {
      buyerAppcount()
        .then((res) => {
          if (res.code === OK_TRUE) {
            this.TradeLogistics = res.data.count1
            this.systemInforms = res.data.count2
            this.setTabStatusMessage(this._filters(this.statusCount + this.TradeLogistics + this.systemInforms))
            this.countAction(false)
          }
        })
        .catch((err) => {
          this.$vux.toast.text(err.msg, 'middle')
        })
    },
    _filters (val) {
      return isNaN(parseInt(val)) === true ? 0 : Number(val)
    },
    ...mapActions(['countAction']),
    ...mapMutations({setTabStatusMessage: 'SET_TABSTATUSMESSAGE'})
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .fiction-box
    display flex
    background-color #fff
    position fixed
    width 100%
    height auto
    top 126px
    z-index 9
  .fiction-item
    flex 1
    text-align center
    padding 30px 0
  .fiction-txt
    margin-top 20px
  .fiction-tip
    position absolute
    width 40px
    height 40px
    line-height 40px
    border-radius 50%
    background-color #e70000
    color #fff
    top -10px
    right -5px
    border 1px solid #e70000
    font-size 24px
  .icons
    width 90px
    margin 0 auto
    img
      width: 100%
  .fiction-box a:first-child.router-link-active
    color #1283d2
  .fiction-box a:nth-child(2).router-link-active
    color #ff9307
  .fiction-box a:last-child.router-link-active
    color #53c50b
</style>
