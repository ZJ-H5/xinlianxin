<template>
    <div>
      <div class="fixedtop">
        <div class="header">
          <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
          <span class="txt">新增发票信息</span>
          <a class="add" @click="savefp">保存</a>
        </div>
      </div>
      <div class="fptab clr">
        <router-link tag="div"  class="fptab-link" :to="{name:'generalInvoice',params:{type:0}}" :name="name" replace>
          <p>普通发票</p>
        </router-link>
        <router-link tag="div" class="fptab-link"  :to="{name:'vatInvoice'}" :name="name" replace>
          <p>增值税发票</p>
        </router-link>
      </div>
      <keep-alive>
        <router-view ></router-view>
      </keep-alive>
    </div>
</template>

<script type="text/ecmascript-6">
  import {Popup, XSwitch, Group, Confirm,Toast} from 'vux'
  import {buyersAppCenterInvoiceSavedo} from 'api/interfacemethod'
export default {
  data(){
    return{
      text:'',
      userId:''
    }
  },
  computed:{
    name(){

    }
  },
  components: {Popup, XSwitch, Group, Confirm,Toast},
  created(){
    console.log(this.$store.state.jm.obj)
  },
  methods:{
    goback(){
      this.$router.back()
    },
    fetchDate(){
      console.log(this.$route)
    },
    savefp(){
      console.log(this.$store.state.jm.obj)
      let obj=this.$store.state.jm.obj
        if(!obj.invoiceHend){
          this.$vux.toast.text('发票抬头不能为空', 'middle')
          return
        }
        if(!obj.taxCode){
          this.$vux.toast.text('税务登记号不能为空', 'middle')
          return
        }
      if(!obj.contactName){
        this.$vux.toast.text('收票人不能为空', 'middle')
        return
      }
      if(!obj.contactMobile){
        this.$vux.toast.text('收票人电话不能为空', 'middle')
        return
      }
      if(!obj.provinceId||!obj.address){
        this.$vux.toast.text('收货地址不能为空', 'middle')
        return
      }
      if(obj.type==1){
        if(!obj.companyAddress){
          this.$vux.toast.text('公司地址不能为空', 'middle')
          return
        }
        if(!obj.companyPhone){
          this.$vux.toast.text('公司电话不能为空', 'middle')
          return
        }
        if(!obj.bankName){
          this.$vux.toast.text('开户银行不能为空', 'middle')
          return
        }
        if(!obj.bankCode){
          this.$vux.toast.text('银行账号不能为空', 'middle')
          return
        }
      }
      this._buyersAppCenterInvoiceSavedo(this.$store.state.jm.obj)
    },
    _buyersAppCenterInvoiceSavedo(obj){
      buyersAppCenterInvoiceSavedo({
        id:'',
        type:obj.type,
        invoiceHend:obj.invoiceHend,
        companyAddress:obj.companyAddress?obj.companyAddress:'',
        companyPhone:obj.companyPhone?obj.companyPhone:'',
        taxCode:obj.taxCode,
        bankName:obj.bankName?obj.bankName:'',
        bankCode:obj.bankCode?obj.bankCode:'',
        provinceId:obj.provinceId,
        provinceName:obj.provinceName,
        cityId:obj.cityId,
        cityName:obj.cityName,
        regionId:obj.regionId,
        regionName:obj.regionName,
        address:obj.address,
        defaultStatus:obj.defaultStatus,
        contactName:obj.contactName,
        contactMobile:obj.contactMobile
      }).then((res)=>{
        if(res.code==1){
          this.$vux.toast.text(res.msg, 'middle')
          setTimeout(function(){
            this.$router.replace('/manageBill');
          },1000)

        }

      }).catch((res)=>{})
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
  .fptab
    width 100%
    margin-top 128px
    height 88px
    border-bottom 1px solid #e6e6e6
    background-color #ffffff
    .fptab-link
      width 50%
      float left
      p
        text-align center
        height 86px
        line-height 86px
        color #333333
        font-size 30px
      &.router-link-active
        p
          color #1081d1
          border-bottom 2px solid #1081d1

</style>
