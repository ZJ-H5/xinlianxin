<template>
    <div class="checkEvidence">
      <div class="head">
        <div class="detail-head pl3 tc pr3 relative">
          <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
          <span class="fs36 cfff">查看付款凭证</span>
        </div>
      </div>
      <div class="content">
        <div class="pl3 pr3 bgf pt20 pb20 bdb clr" v-for="item in list">
          <p class="lh80 flex">
            <span class="flex-1 c0 fs30">付款金额：<em class="clred">{{item.money/100}}</em></span>
            <span>{{item.createTime|formatDate}}</span>
          </p>
          <ul class="uploadul clr">
            <li class="uploadli" v-for="img in item.filelist">
              <img :src="img" alt="" class="z-logo" >
            </li>
          </ul>
          <a href="javascript:;" class="z-bluek inlineblock mt10 mb10 right" v-if="type==1&&item.status==0" @click="_submitAffirmOrderPaymentVoucherdo(item.id)">确认收款</a>
        </div>
      </div>

    </div>
</template>

<script>
  import {getPaymentVoucherListdo,submitAffirmOrderPaymentVoucherdo,sellerGetPaymentVoucherListdo} from 'api/interfacemethod'
  import {formatDate} from 'api/time'
  export default {
    data(){
      return{
        orderId:this.$route.query.orderId,
        list:'',
        type:this.$route.query.type
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    created(){
      if(this.type==0){
        this._getPaymentVoucherListdo()
      }else if(this.type==1){
        this._sellerGetPaymentVoucherListdo()
      }

    },
    methods:{
      goback(){
        this.$router.back()
      },
      _getPaymentVoucherListdo(){
        getPaymentVoucherListdo({
          orderId:this.orderId,
        }).then((res)=>{
          if(res.code==1){
            if(res.data.length==0){
              this.$vux.toast.text(res.msg, 'middle')
            }else{
              this.$nextTick(()=>{
                this.list=res.data
                for(var i=0;i<this.list.length;i++){
                  this.$set(this.list[i],'filelist',this.list[i].filesPath.split(','))
                }
                console.log(this.list)
              })
            }
          }

        }).catch((res)=>{})
      },
      _submitAffirmOrderPaymentVoucherdo(id){
        submitAffirmOrderPaymentVoucherdo({
          orderId:id,
        }).then((res)=>{
          if(res.code==1) {
            this.$vux.toast.text(res.msg, 'middle')
            this.$router.back()
          }
        }).catch((res)=>{})
      },
      _sellerGetPaymentVoucherListdo(){
        sellerGetPaymentVoucherListdo({
          orderId:this.orderId,
        }).then((res)=>{
          if(res.code==1){
            if(res.data.length==0){
              this.$vux.toast.text(res.msg, 'middle')
            }else{
              this.$nextTick(()=>{
                this.list=res.data
                for(var i=0;i<this.list.length;i++){
                  this.$set(this.list[i],'filelist',this.list[i].filesPath.split(','))
                }
                console.log(this.list)
              })
            }
          }

        }).catch((res)=>{})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .checkEvidence
  .head
    position fixed
    top 0
    left 0
    width 100%
    z-index 999
  .content
    padding-top 128px
    color #333
    .uploadul
      margin-left -80px
      padding 25px 3% 0px
      .uploadli
        width 160px
        height 200px
        float left
        margin-left 80px
        position relative
        margin-bottom 20px
        text-align center
        img

          width 160px
          height 150px
</style>
