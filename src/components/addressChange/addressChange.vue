<template>
  <div class="addressChange">
    <div class="fixedtop">
      <div class="header">
        <i class="iconfont icon-back1" @click="goback"></i>
        <span class="txt">修改地址</span>
        <a class="add" @click="saveaddress">保存</a>
      </div>
    </div>
    <div class="addrmsg">
      <ul class="fptxt clr">
        <li class="flex">
          <span class="fptxtl">收货人</span>
          <span class="fptxtr flex-1"><input type="text" placeholder="请输入" v-model="item.contactName"/></span>
        </li>
        <li class="flex">
          <span class="fptxtl">联系方式</span>
          <span class="fptxtr flex-1"><input type="text" placeholder="请输入" v-model="item.contactMobile"/></span>
        </li>
        <li class="flex flex-align-center">
          <span class="fptxtl">收货地址</span>
          <group class="flex-1 tr addrbx">
            <x-address :title="title"  :list="addressData"  placeholder="请选择"  :show.sync="showAddress" @on-shadow-change="logHide"   v-model="editaddress"></x-address>
          </group>
        </li>
        <li>
          <textarea class="txtbx" placeholder="请填写详细地址" v-model="item.address" maxlength="30"></textarea>
        </li>
      </ul>
    </div>
    <div class="mt40">
      <group>
        <x-switch title="设为默认" v-model="item.defaultStatus" :value-map='[0,1]' :checked="item.defaultStatus==1"></x-switch>
      </group>
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

<script type="text/ecmascript-6">
import addressMsg from 'components/addressMsg/addressMsg'
import {Popup, XSwitch, Group,XAddress,Toast,Confirm} from 'vux'
import {buyersAppCenterAddressSavedo,findCityListdo} from 'api/interfacemethod'
const reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
export default {
  data(){
    return{
      /*item:this.$route.query.item,*/
      addressData: [],
      showAddress:false,
      item:this.$route.query.item,
      title:'',
      arr:[],
      editaddress:[this.$route.query.item.provinceId+'',this.$route.query.item.cityId+'',this.$route.query.item.regionId+''],
      text:'',
      confirmShow:false,
      confirmText:'保存',
      cancelText:'不保存'
    }
  },
  components: {
    addressMsg,
    Popup, XSwitch, Group,XAddress,Toast,Confirm
  },
  created(){
    this.getCity()
  },
  methods: {
    goback () {
      if(this.item.contactName===''||this.item.contactMobile===''||this.arr===[]||this.item.address===''||!reg.test(this.item.contactMobile)){
        this.confirmShow=true
      }else{
        this.saveaddress()
      }
    },
    logHide (id,name) {
      for(var i=0;i<id.length;i++){
        this.arr[i]={id:id[i],name:name[i]};
      }
    },
    onCancel(){
      this.$router.back()
    },
    onConfirm(){
      if(this.item.contactName===''){
        this.$vux.toast.text('收货人不能为空', 'middle')
        return false
      }
      if(this.item.contactMobile===''){
        this.$vux.toast.text('联系方式不能为空', 'middle')
        return false
      }else if(!reg.test(this.item.contactMobile)){
        this.$vux.toast.text('手机格式不正确', 'middle')
        return false
      }
      if(this.arr===[]){
        this.$vux.toast.text('收货地址不能为空', 'middle')
        return false
      }
      if(this.item.address===''){
        this.$vux.toast.text('收货详细地址不能为空', 'middle')
        return false
      }
      this._buyersAppCenterAddressSavedo()
    },
    getCity () {
      let that = this
      findCityListdo({

      }).then((res)=>{
        if(res.code==1){
          let aldaddressdata = []
          let aldcitysdata = []
          let alddsdata = []
          res.data.forEach(function (item, idx) {
            that.$set(aldaddressdata, idx, {name: item.name.toString(), value: item.id.toString()})
          })
          res.data1.forEach(function (item, idx) {
            that.$set(aldcitysdata, idx, {name: item.name.toString(), value: item.id.toString(), parent: item.parentid.toString()})
          })
          res.data2.forEach(function (item, idx) {
            that.$set(alddsdata, idx, {name: item.name.toString(), value: item.id.toString(), parent: item.parentid.toString()})
          })
          this.addressData = aldaddressdata.concat(aldcitysdata).concat(alddsdata)
        }
      }).catch((res)=>{})
    },
    saveaddress(){
      this.onConfirm()
    },
    _buyersAppCenterAddressSavedo(){
      buyersAppCenterAddressSavedo({
        userid:this.$route.query.userid,
        provinceId:this.arr[0].id,
        provinceName:this.arr[0].name,
        cityId:this.arr[1].id,
        cityName:this.arr[1].name,
        regionId:this.arr[2].id,
        regionName:this.arr[2].name,
        address:this.item.address,
        contactName:this.item.contactName,
        contactMobile:this.item.contactMobile,
        defaultStatus:this.item.defaultStatus,
        id:this.item.id,
        type:2
      }).then((res)=>{
        if(res.code===1){
          this.$vux.toast.text(res.msg, 'middle')
          this.$router.back()
        }
      }).catch((res)=>{})
    },
    addressDialog(){
      this.$router.back()
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .addressChange
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
    .addrmsg
      margin-top 128px
      .fptxt
        width 100%
        background-color #ffffff
        li
          width 94%
          padding 0 3%
          border-bottom 1px solid #e6e6e6
          color #333333
          .fptxtl
            font-size 30px
            width 180px
            height 90px
            line-height 90px
          .fptxtr
            margin-left 20px
            font-size 26px
            input
              width 68%
              padding 15px 0px
              height 58px
              line-height 58px
            .addem
              width 60%
              float left
              padding-top 15px
              line-height 58px
            .addsel
              float right
              color #999999
              padding-top 15px
              line-height 58px
          .txtbx
            width 100%
            height 120px
            margin 25px 0px
            line-height 30px
            border none
            outline none
          .addrbx
            .weui-cells
              font-size 26px
              &:before
                border-top none
              &:after
                border-bottom none
              .vux-cell-value
                color #666666
    .fpset
      margin-top 85px
      width 100%
      height 90px
      line-height 90px
      background-color #ffffff
      color #333333
      font-size 30px
      margin-bottom 80px
      span
        height 90px
        line-height 90px
        display inline-block
</style>
