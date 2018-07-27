<template>
  <div class="star">
    <i v-for="(item,index) in list" :key="index" class="z-iconfont z-diamon" :class="{[item.classname]:true}" alt=""></i>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this._starlist(this.starlist)
  },
  watch: {
    starlist (newval) {
      this._starlist(newval)
    }
  },
  props: {
    starlist: {
      type: Number,
      default: 0
    }
  },
  methods: {
    _starlist (list) {
      switch (list) {
        case 1:
          this.list = [{classname: 'bard'}]
          break
        case 2:
          this.list = [{classname: 'zuan'}]
          break
        case 3:
          this.list = [{classname: 'zuan'}, {classname: 'zuan'}]
          break
        case 4:
          this.list = [{classname: 'zuan'}, {classname: 'zuan'}, {classname: 'zuan'}]
          break
        case 5:
          this.list = [{classname: 'guan'}]
          break
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .star
    margin-right 20px
    .z-iconfont
      display: inline-block;
      vertical-align: middle;
      // display block
    .z-diamon
      width: 36px;
      height: 26px;
      background-size 36px 26px
      margin-left 10px
    .bard
      bg-image('xin')
    .zuan
      bg-image('zuanshi')
    .guan
      bg-image('huanguan')
</style>
