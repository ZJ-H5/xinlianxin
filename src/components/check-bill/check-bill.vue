<template>
    <div class="checkBill">
      <div class="head">
      <div class="detail-head pl3 tc pr3 relative">
        <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
        <span class="fs36 cfff">查看发票</span>
      </div>
      </div>
      <div class="content f28">
      <div class="pl3 pr3 mb20 bgf" v-for="item in list">
          <p class="flex pt40">
            <span class="flex-1 c0">
              发票号码：{{item.invoiceCode}}
            </span>
            <span class="">
              {{item.billingTime | formatDate}}
            </span>
          </p>
        <p class="flex pt20 pb40 flex-align-center">
            <span class="flex-1 c0">
              开票金额：{{item.billingMoney/100}}
            </span>
        </p>
      </div>
    </div>
    </div>
</template>

<script>
  import {sellerGetInvoiceListdo} from 'api/interfacemethod'
  import {formatDate} from 'api/time'
    export default {
        data(){
          return{
            orderId:this.$route.query.orderId,
            list:''
          }
        },
      filters: {
        formatDate(time) {
          var date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
      },
      created(){
          this._sellerGetInvoiceListdo()
      },
      methods:{
        goback(){
          this.$router.back()
        },
        _sellerGetInvoiceListdo(){
          sellerGetInvoiceListdo({
            orderId:this.orderId,
          }).then((res)=>{
            if(res.code==1){
              if(res.data.length==0){
                this.$vux.toast.text('暂无数据', 'middle')
              }else{
                this.$nextTick(()=>{
                  this.list=res.data
                })
              }
            }

          }).catch((res)=>{})
        },
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .checkBill
    .head
      position fixed
      top 0
      left 0
      width 100%
      z-index 999
    .content
      padding-top 128px
      color #333

</style>
