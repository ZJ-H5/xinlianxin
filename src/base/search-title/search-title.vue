<template>
  <div class="search-title">
    <div class="back-page">
      <a class="iconfont icon-back1" @click="goback"></a>
      <div class="search">
        <input type="text" v-model="data" class="input" placeholder="请输入型号/卖家搜索">
        <i class="iconfont icon-error mr15 fs30" v-if="data" @click="dele"></i>
        <i class="iconfont icon-sousuo fs36 mr15" @click="search"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapMutations} from 'vuex'
export default {
  data () {
    return {
      data: ''
    }
  },
  created () {
    this.data = this.inputValue
  },
  computed: {
    inputValue () {
      return this.searchIndex
    },
    ...mapGetters(['searchIndex'])

  },
  // watch: {
  //   value (newval, oldval) {
  //     this.data = newval// ②监听外部对props属性result的变更，并同步到组件内的data属性
  //   },
  //   data (val) {
  //     // this.$emit("on-result-change",val);//③组件内对myResult变更后向外部发送事件通知
  //   }
  // },
  methods: {
    dele () {
      this.data = ''
      this.searchIndexs(this.data)
    },
    goback () {
      // this.data = ''
      this.$router.back()
    },
    search () {
      this.searchIndexs(this.data)
      this.$emit('search', this.data)
    },
    ...mapMutations({searchIndexs: 'SEARCH_INDEX'})
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.search-title
  .back-page
    position fixed
    top 0
    left 0
    z-index 10
    height 126px
    width 100%
    display flex
    justify-content: space-between
    align-items: stretch
    background $color-background-bulr
    .icon-back1
     margin-left 10px
    .icon-back1
      font-size $font-size-large-xl
      color $bg-writer
      font-size 52px
      margin-top 56px
    .search
      width 658px
      height 58px
      margin-right 30px
      margin-top 52px
      background-color $color-background-fff
      // border 1px solid $color-background-c
      display flex
      align-items center
      justify-content flex-end
      .input
        width 100%
        height 90%
        margin 0 25px
        font-size 28px
</style>
