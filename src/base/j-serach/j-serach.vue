<template>
    <div class="j-serach">
        <div class="logo"></div>
        <div class="serach">
          <input type="text" class="input" placeholder="请输入型号/卖家" v-model="value">
          <button class="serach-button type" @click="path(1)">型号搜索</button>
          <button class="serach-button credit" @click="path(2)">信用搜索</button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapMutations, mapGetters} from 'vuex'
export default {
  data () {
    return {
      value: ''
    }
  },
  computed: {
    val: function () {
      return this.searchIndex || ''
    },
    ...mapGetters(['searchIndex'])

  },
  created () {
    this.value = this.val
  },
  methods: {
    path (type) {
      this.searchIndexs(this.value)
      if (!this.value) {
        this.setflagId(type - 1)
        this.$router.push({path: '/searchpage'})
      } else if (type === 1) {
        this.$router.push({path: '/modelsearch'})
      } else if (type === 2) {
        this.$router.push({path: '/creditsearch'})
      }
    },
    ...mapMutations(
      {searchIndexs: 'SEARCH_INDEX', setflagId: 'FLAGID'}
    )
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"

    .j-serach
      width 100%
      height 100%
      background-color $color-background-fff
      padding-top 20px
      .logo
        width 454px
        height 250px
        margin auto
        margin-bottom 20px
        bg-image('logo')
        background-size: 454px 250px
      .serach
        display flex
        justify-content: space-between
        padding-bottom 70px
        background-color $color-background-fff
        .input
          border 1px solid $color-background-bulrb
          width 400px
          height 88px
          padding-left 20px
          font-size 30px
          color $color-background-bulrb
          margin-left 20px

        .serach-button
          width 150px
          height 88px
          line-height 88px
          background-color $color-background-bulrb
          text-align center
          color $color-text-f
          border none
          box-shadow 0px 1px 3px $color-text-hui
          margin-left 4px
        .credit
          margin 0 20px 0 10px

</style>
