<template>
  <div class="salesOrderDbk">
    <div class="head">
      <div class="detail-head pl3 tc pr3 relative">
        <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
        <span class="fs36 cfff">支付订单</span>
      </div>
    </div>
      <iframe :src="payaddress" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>

<script>
  import {OK_TRUE, PAGESIZE2} from 'api/conflg'
  const scroy = -100
  export default {
    data(){
      return{
        payaddress:''
      }
    },
    created(){
      console.log(this.payaddress)
      this.payaddress=this.$route.query.href
    },
    methods:{
      goback(){
        this.$router.replace('/purchaseOrder/qb')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .salesOrderDbk
    .head
      position fixed
      top 0
      left 0
      width 100%
      z-index 999
    /*.content*/
      /*height 100%
      padding-top 220px*/


</style>
