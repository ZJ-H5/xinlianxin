<template>
  <div class="detail-head pl3 tc pr3 relative">
    <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
    <span class="fs36 cfff">{{title}}</span>
    <a href="javascript:;" class="iconfont icon-more fs36 cfff right" @click="show" v-if="msg"></a>
    <router-link to="/cart" class="iconfont icon-cart1 fs48 cfff right mr20" v-if="cart"></router-link>
    <router-link :to="{path:'/pjinstructions',query:{companyId:companyId}}" class="iconfont icon-weibiaoti- fs48 cfff right mr20" tag="a" v-if="info"></router-link>
    <i class="z-dot" @click="show" v-if="statusCount>0">
      {{statusCount}}
    </i>
    <a href="javascript:;" class="right fs30 cfff mr20" @click="checkManage" v-if="manage">管理</a>
    <top-msg v-bind:dialogShow="showOrNot" @show="dialog" :statusCount="statusCount"></top-msg>
  </div>
</template>

<script type="text/ecmascript-6">
import {fictionMixin} from '@/api/minx'
import TopMsg from 'components/top-msg/top-msg'
export default {
  mixins: [fictionMixin],
  data () {
    return {
      showOrNot: false
    }
  },
  created () {
    this._getindexDBs()
  },
  mounted () {
    this.$bus.on('immediatemessage', () => {
      console.log('bottom-tab')
      this._getindexDBs()
    })
  },
  beforeDestroy () {
    this.$bus.off('immediatemessage', this.statusCount = 0)
  },
  props: {
    title: {
      type: String,
      default: '首页'
    },
    cart: {
      type: Boolean,
      default: false
    },
    msg: {
      type: Boolean,
      default: false
    },
    companyId: {
      type: Number,
      default: 0
    },
    info: {
      type: Boolean,
      default: false
    },
    manage: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goback () {
      if (this.backflag) {
        this.$emit('backgo', true)
        return
      }
      this.$router.back()
    },
    Delete () {
      this.$emit('event', true)
    },
    fa () {
      this.$emit('falevent', true)
    },
    show () {
      this.showOrNot = true
    },
    dialog () {
      this.showOrNot = false
    },
    checkManage () {
      this.$emit('checkManage')
    }
  },
  components: {TopMsg}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    .m-header
        display flex
        position fixed
        top 0
        left 0
        z-index 10
        height 126px
        width 94%
        padding:0 3%;
        justify-content: center
        align-items: center
        background $color-background-bulr
        h1
          font-size $font-size-large-xl
          color $bg-writer
          /*padding-right 60px*/
          /*padding-bottom 20px*/
        .back
          color #fff
          font-size: 70px !important
        .delete
          color #fff
          position: absolute
          right: 20px
          font-size 40px
          bottom: 20px
        .fa
          color #fff
          position: absolute
          right: 20px
          font-size 32px
          bottom: 20px
</style>
