<template>
  <div class="uploadFile">
    <div class="head">
      <div class="detail-head pl3 tc pr3 relative clr">
        <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
        <span class="fs36 cfff">上传付款凭证</span>
        <a class="add right f30 cfff" href="javascript:;" @click="addPayFile">提交</a>
      </div>
    </div>
    <div class="uploadbx">
      <div class="pb30 pt30 pl3 pr3 bgf c0">
        <span class="fs30">
          付款金额：
        </span>
        <span class="fs26 uploadlisa"><em class="ml10 mr20">¥</em><input class="" placeholder="输入金额" v-model="money"/></span>
      </div>
      <ul class="uploadul clr">
        <li class="uploadli" v-for="(item,index) in filelist"><span>
            <img :src="item"></span>
          <i @click="deleteImg(index)" class="close"></i>
        </li>
        <li class="uploadli">
          <div class="addbtn">
            <span class="addbtnbg"></span>
            <input class="addbtnipn" type="file" @change="getFile($event)" multiple="multiple"/>
          </div>
        </li>
      </ul>
    </div>
    <confirm v-model="confirmShow"
             @on-cancel="onCancel"
             @on-confirm="onConfirm"
             :confirm-text="confirmText"
             :cancel-text="cancelText">
      <p style="text-align:center;">{{('是否保存本次编辑结果?') }}</p>
    </confirm>
  </div>
</template>

<script>
  import {addPaymentVoucherdo} from 'api/interfacemethod'
  import {Confirm } from 'vux'
  import {fileurl} from 'api/hosturl'
  import {updatefile} from 'common/js/updatefile'
  export default {
    data() {
      return {
        orderId:this.$route.query.orderId,
        money:'',
        filelist:[],
        confirmShow:false,
        confirmText:'保存',
        cancelText:'不保存',
        amount:this.$route.query.count,
      }
    },
    components: {
      Confirm
    },
    methods:{
      goback () {
        if(this.filelist.length!=0||this.money!=''){
          this.confirmShow=true
        }else{
          this.$router.back()
        }
      },
      onConfirm(){
        console.log(111)
        if(this.money==''){
          this.$vux.toast.text('未输入付款金额', 'middle')
          return
        }
        if(parseInt(this.money*100)>parseInt(this.amount)){
          this.$vux.toast.text('汇款金额大于总金额', 'middle')
          this.money=''
          return
        }
        if(this.filelist.length==0){
          this.$vux.toast.text('未上传付款凭证', 'middle')
          return
        }

        this._addPaymentVoucherdo()
      },
      onCancel(){
        this.$router.back()
        this.filelist=[]
        this.money=''
      },
      getFile(event){
        let formData = updatefile(event)
        this.$http.post(fileurl,
          formData
        ).then((res)=>{
          let array=res.data.data.split(',')
          for (var i = 0; i < array.length; i++) {
            this.filelist.push(array[i])
          }
        },()=>{
        });
      },
      addPayFile(){
        this.onConfirm()
      },
      deleteImg(idx){
        this.filelist.splice(idx,1)
      },
      _addPaymentVoucherdo(){
        addPaymentVoucherdo({
          orderId:this.orderId,
          filesPath:this.filelist.toString(),
          money:this.money
        }).then((res)=>{
          if(res.code==1){
            this.$vux.toast.text(res.msg, 'middle')
            this.$router.back()
          }

        }).catch((res)=>{})
      },
    },
    watch:{
      money(){
        this.money=this.money.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');

      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .uploadFile
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
    .uploadbx
      background-color #ffffff
      margin-top 128px
      .uploadlisa
        width 350px
        height 50px
        line-height 50px
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
      .z-bd
        display inline-block
        border: 1px solid #ccc
        padding 10px 20px
      .uploadul
        margin-left -80px
        padding 25px 3% 80px
        .uploadli
          width 180px
          height 150px
          float left
          margin-left 80px
          position relative
          margin-bottom 50px
          span
            width 180px
            height 150px
            img
              width 100%
              height 100%
          i
            position absolute
            top 0px
            right 0px
            font-size 24px
            color #666
            display inline-block
            width 50px
            height 50px
            bg-image('close')
            background-size:100% 100%
          .addbtn
            width 100px
            height 100px
            margin 25px 0 0 40px
            position relative
            .addbtnbg
              width 100px
              height 100px
              display inline-block
              bg-image('addmore')
              background-size 100px 100px
            .addbtnipn
              width 100px
              height 100px
              position absolute
              left 0px
              top 0px
              opacity 0
</style>
