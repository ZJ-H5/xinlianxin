<template>
  <div class="fiction">
      <m-header :title="title"></m-header>
    <div class="content">
      <fictionTab></fictionTab>
    </div>
    <router-view></router-view>
    <tab></tab>
  </div>
</template>

<script type="text/ecmascript-6">
import Tab from 'components/tab/tab'
import MHeader from 'components/m-header/m-header'
import FictionTab from 'components/fiction-tab/fiction-tab'
export default {
  components: {
    Tab,
    MHeader,
    FictionTab
  },
  data () {
    return {
      title: '消息'
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.fiction
  .content
    // padding-top: 126px
    // .nominate-content
    //   position: absolute
    //   width: 100%
    //   height 100%
    //   overflow: hidden
</style>
