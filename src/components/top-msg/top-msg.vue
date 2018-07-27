<template>
    <div class="top-msg">
      <popup position="top" :value="dialogShow" default="1231313131" @on-hide="cartDialog">
          <div class="bgf topmsg">
            <router-link tag="p" class="lh80 tl bdb c0 fs30 pt10" to="/recommend/nominate">
              <i class="iconfont icon-home fs36"></i>
              <span class="ml40">首页</span>
            </router-link>
            <router-link tag="p" class="lh80 tl c0 fs30 vtm" to="/fiction/fictionImmediate">
              <i class="iconfont icon-message fs36"></i>
              <span class="ml40">消息</span>
              <i class="z-msg ml20" v-if="statusCount>0">{{statusCount}}</i>
            </router-link>
          </div>
      </popup>
    </div>
</template>
<script>
import {Popup, XSwitch, Group} from 'vux'
export default {
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    },
    statusCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      addbg: false,
      value: true
    }
  },
  components: {Popup, XSwitch, Group},
  methods: {
    cartDialog () {
      this.$emit('show')
    },
    add () {
      this.dialogShow = true
    }
  },
  watch: {
    statusCount (newval) {
      this.statusCount = newval
    }
  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .top-msg
    .topmsg
      height 180px
      padding-left:20px
      padding-right:20px
      .z-msg
        display: inline-block
        width: 30px
        height: 30px
        /*margin-top:-0.5rem;*/
        background: #1081d1
        color: #fff
        font-size: 20px
        border-radius: 50%
        line-height: 30px
        text-align: center
        margin-bottom 5px
    .vux-popup-dialog.vux-popup-top
      width 250px;
      top 140px
      right 3%
      left auto
      border-radius 10px
</style>
