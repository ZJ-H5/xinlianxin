<template>
    <div>
      <div class="detail-head pl3 tc pr3 relative">
        <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
        <span class="fs36 cfff">查看合同附件</span>
      </div>
      <div class="pl3 pr3 bgf pt20 pb20">
          <div class="flex flex-align-center flex-justify-space">
            <img src="" alt="" class="z-logo">
            <img src="" alt="" class="z-logo">
            <img src="" alt="" class="z-logo">
          </div>
      </div>
      <div class="pl3 pr3 bgf pt20 pb20">
        <div class="flex flex-align-center flex-justify-space">
          <img src="" alt="" class="z-logo">
          <img src="" alt="" class="z-logo">
          <img src="" alt="" class="z-logo">
        </div>
      </div>
    </div>
</template>

<script>
export default {
  methods: {
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .z-logo {
    width: 200px;
    height: 150px;
    background: #ccc;
  }
</style>
