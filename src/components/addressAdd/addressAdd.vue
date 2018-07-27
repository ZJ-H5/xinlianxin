<template>
    <div class="addressAdd">
      <div class="fixedtop">
        <div class="header">
          <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
          <span class="txt">添加地址</span>
          <a class="add" @click="saveaddress">保存</a>
        </div>
      </div>
      <div class="addrmsg">
        <ul class="fptxt clr">
          <li class="flex">
            <span class="fptxtl">收货人</span>
            <span class="fptxtr flex-1"><input type="text" placeholder="请输入" v-model="shname"/></span>
          </li>
          <li class="flex">
            <span class="fptxtl">联系方式</span>
            <span class="fptxtr flex-1"><input type="text" placeholder="请输入" v-model="shtel"/></span>
          </li>
          <li class="flex flex-align-center">
            <span class="fptxtl">收货地址</span>
            <!--<span class="fptxtr flex-1 clr" @click="addressShow=true">
                  <em class="addem"></em>
                  <a class="addsel">请选择 ></a>
              </span>-->
            <group class="flex-1 tr addrbx">
              <x-address :title="title"  :list="addressData" :value="addresslist" placeholder="请选择"  @on-shadow-change="logHide"></x-address>
            </group>
          </li>
          <li>
            <textarea class="txtbx" placeholder="请填写详细地址" v-model="dz" maxlength="30"></textarea>
          </li>
        </ul>
      </div>
      <div class="mt40">
        <group>
          <x-switch title="设为默认" v-model="value" :value-map='[0,1]'></x-switch>
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
import {Popup, XSwitch, Group,XAddress,Toast,Confirm } from 'vux'
import {buyersAppCenterAddressSavedo,findCityListdo,buyersAppUserCenterAddressListdo} from 'api/interfacemethod'
const reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
export default {
  components: {
    addressMsg,
    Popup, XSwitch, Group,XAddress,Toast,Confirm
  },
  data () {
    return {
      title:'',
      value: 0,
      arr:[],
      dz:'',
      shname:'',
      shtel:'',
      addressData: [],
      showAddress: false,
      list:'',
      confirmShow:false,
      confirmText:'保存',
      cancelText:'不保存',
      addresslist:[],
      flag:true
    }
  },
  created(){
    this.getCity();
  },
  methods: {

    turn: function () {
      console.log(this.value)
    },
    goback () {
      if(this.shname===''||this.shtel===''||this.arr===[]||this.dz===''||!reg.test(this.shtel)){
        this.confirmShow=true
      }else{
        this.saveaddress()
      }
    },
    onCancel(){
      this.$router.back()
    },
    onConfirm(){
      if(this.shname===''){
        this.$vux.toast.text('收货人不能为空', 'middle')
        return false
      }
      if(this.shtel===''){
        this.$vux.toast.text('联系方式不能为空', 'middle')
        return false
      }else if(!reg.test(this.shtel)){
        this.$vux.toast.text('手机格式不正确', 'middle')
        return false
      }
      console.log(this.arr)
      if(this.arr.length===0){
        this.$vux.toast.text('收货地址不能为空', 'middle')
        return false
      }
      if(this.dz===''){
        this.$vux.toast.text('收货详细地址不能为空', 'middle')
        return false
      }
      this._buyersAppCenterAddressSavedo()
    },
    logHide (id,name) {
      if(this.flag){
        this.flag=  false
        console.log(this.arr)
        return
      }
      for(var i=0;i<id.length;i++){
        this.arr[i]={id:id[i],name:name[i]};
      }
      console.log(this.arr)

    },
    saveaddress(){
      this.onConfirm()
    },
    _buyersAppCenterAddressSavedo(){
      buyersAppCenterAddressSavedo({
        provinceId:this.arr[0].id,
        provinceName:this.arr[0].name,
        cityId:this.arr[1].id,
        cityName:this.arr[1].name,
        regionId:this.arr[2].id,
        regionName:this.arr[2].name,
        address:this.dz,
        contactName:this.shname,
        contactMobile:this.shtel,
        defaultStatus:this.value,
        type:1
      }).then((res)=>{
        if(res.code===1){
          this.$vux.toast.text(res.msg, 'middle')
          this.$router.back()
        }
      }).catch((res)=>{})
    },
    addressDialog(){
      this.$router.push('/manageAddress')
      this._address()
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
    _address(){
      buyersAppUserCenterAddressListdo({
      }).then((res)=>{
        if(res.code==1){

          this.list=res.data.list //收货地址列表
          this.userId=this.list[0].userId
          console.log(this.list)
        }

      }).catch((res)=>{})
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .addressAdd
    .weui-btn:after
      content: " ";
      width: 200%;
      height: 200%;
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid rgba(0, 0, 0, 0.2);
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      box-sizing: border-box;
      border-radius: 10px;
    .weui-dialog__btn_primary
      color: #1081d1;
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
      width 94%
      height 90px
      line-height 90px
      background-color #ffffff
      padding 0 3%
      color #333333
      font-size 30px
      justify-content space-between
      margin-bottom 80px
      .mint-switch
        margin-top 30px
</style>
