<template>
    <div class="topic">
      <div class="detail-head pl3 tc pr3 relative">
        <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
        <span class="fs36 cfff">咨询主题</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "topic"
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .topic
    .detail-head
      background: #1081d1
      height: 128px
      line-height: 128px
      a
        line-height: 128px;

</style>
