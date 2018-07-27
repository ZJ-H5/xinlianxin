<template>
    <div class="uploadInvoice">
      <div class="head">
        <div class="detail-head pl3 tc pr3 relative">
          <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
          <span class="fs36 cfff">上传发票</span>
          <a class="add fs36 cfff right" href="javascript:;" @click="addInvoice">提交</a>
        </div>
      </div>
      <ul class="uploadul bgf clr">
        <li class="uploadli clr c3">
          <span class="left fs30 mr20 uploadlisb">发票信息：</span>
          <span class="fs26 uploadlisa"><input class="inpa f28"  placeholder="输入发票号码" v-model="invoiceNumber"/></span>
        </li>
        <li class="uploadli clr c3">
          <span class="left fs30 mr20 uploadlisb">开票金额：</span>
          <span class="fs26 uploadlisa"><em class="ml10 mr20">¥</em><input class="f28" placeholder="输入金额" v-model="invoicemoney" /></span>
        </li>
        <li class="uploadli clr c3">
          <span class="left fs30 mr20 uploadlisb">开票时间：</span>
          <!--<span class="fs26 uploadlisa"><input class="inpa" placeholder="选择开票日期 >"/></span>-->
          <span class="fs26 ">
            <group>
              <datetime
                v-model="invoiceTime"
                @on-change="change" format="YYYY-MM-DD HH:mm"
                placeholder="选择开票日期"></datetime>
            </group>

          </span>
        </li>
      </ul>
      <confirm v-model="confirmShow"
               @on-cancel="onCancel"
               @on-confirm="onConfirm"
               :confirm-text="confirmText"
               :cancel-text="cancelText">
        <p style="text-align:center;">{{('是否保存本次编辑结果?') }}</p>
      </confirm>
    </div>
</template>

<script type="text/ecmascript-6">
import {Datetime, Group,Confirm} from 'vux'
import {addInvoicedo} from 'api/interfacemethod'
export default {
  data() {
    return {
      invoiceTime: '',
      orderId:this.$route.query.orderId,
      invoiceNumber:'',
      invoicemoney:'',
      confirmShow:false,
      confirmText:'保存',
      cancelText:'不保存'
    }
  },
  components: {
    Datetime,
    Group,
    Confirm
  },
  created(){
    console.log(1111)
  },
  methods: {
    change (value) {
      console.log('change', value)
    },
    onCancel(){
      this.$router.go(-1)
      this.invoiceTime=''
      this.invoiceNumber=''
      this.invoicemoney=''
    },
    onConfirm(){
      if(this.invoiceNumber===''){
        this.$vux.toast.text('开票信息不能为空', 'middle')
        return false
      }
      if(this.invoicemoney===''){
        this.$vux.toast.text('开票金额不能为空', 'middle')
        return false
      }
      if(this.invoiceTime===''){
        this.$vux.toast.text('开票时间不能为空', 'middle')
        return false
      }
      this._addInvoicedo()
    },
    goback () {
      this.$router.go(-1)
    },
    addInvoice(){
      this.onConfirm()
    },
    _addInvoicedo(){
      addInvoicedo({
        orderId:this.orderId,
        invoiceNumber:this.invoiceNumber,
        invoicemoney:this.invoicemoney,
        invoiceTime:this.invoiceTime
      }).then((res)=>{
        if(res.code==1){
          this.$vux.toast.text('保存成功', 'middle')
          this.$router.back()

        }

      }).catch((res)=>{})
    },
  },
  watch:{
    invoicemoney(){
      this.invoicemoney=this.invoicemoney.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .uploadInvoice
    .fixedtop
      position fixed
      left 0px
      top 0px
      width 100%
      .header
        height 128px
        background-color #1081d1
        color #ffffff
        padding 0 3%
        display flex
        justify-content space-between
        .icon-back1
          font-size 48px
          margin-top 60px
        .txt
          font-size 36px
          margin-top 60px
        .add
          font-size 30px
          color #ffffff
          margin-top 60px
    .uploadul
      margin-top 128px
      padding 30px 0px
      .uploadli
        padding 0 3%
        width 94%
        float left
        margin-bottom 30px
        .uploadlisa
          width 350px
          height 55px
          line-height 55px
          border 1px solid #e6e6e6
          display inline-block
          input
            width 300px
            height 38px
            line-height 38px
            padding-top 5px
            border none
            outline none
          .inpa
            margin-left 10px
        .weui-cells
          width 350px
          height 50px
          margin-top 0px
          border 2px solid #e6e6e6
          &:before
            border-top none
          &:after
            border-bottom none
          .weui-cell__ft
            text-align left
            &:after
              display none
            .vux-cell-value
                margin-left 30px
                font-size 28px
                line-height 28px
            .vux-cell-value
              color #333333
        .uploadlisb
          margin-top 7px
  .dp-container
    .dp-header
      padding-top 20px
      .dp-item
        font-size 32px
    .dp-content
      .scroller-item
        font-size 28px
</style>
