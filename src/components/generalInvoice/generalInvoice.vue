<template>
  <div class="generalInvoice">
    <ul class="fptxt clr">
      <li class="flex">
        <span class="fptxtl">发票抬头</span>
        <span class="fptxtr flex-1"><input type="text" placeholder="请输入" @blur="blurs" v-model="obj.invoiceHend"/></span>
      </li>
      <li class="flex">
        <span class="fptxtl">税务登记号</span>
        <span class="fptxtr flex-1"><input type="text" placeholder="请输入" @blur="blurs" v-model="obj.taxCode" /></span>
      </li>
      <li class="flex">
        <span class="fptxtl">收票人</span>
        <span class="fptxtr flex-1"><input type="text" placeholder="请输入" @blur="blurs" v-model="obj.contactName" /></span>
      </li>
      <li class="flex">
        <span class="fptxtl">联系方式</span>
        <span class="fptxtr flex-1"><input type="text" placeholder="请输入" @blur="blurs" v-model="obj.contactMobile"/></span>
      </li>
      <li class="flex flex-align-center">
        <span class="fptxtl">收货地址</span>
        <group class="flex-1 tr addrbx">
          <x-address :title="title" :value="addressid" :list="addressData"  placeholder="请选择"  :show.sync="showAddress" @on-shadow-change="logHide" @on-hide="addressClose"></x-address>
        </group>
      </li>
      <li>
        <textarea class="txtbx" placeholder="请填写详细地址" v-model="obj.address" maxlength="30"></textarea>
      </li>
    </ul>
    <div class="mt40">
      <group>
        <x-switch title="设为默认" v-model="obj.defaultStatus" @blur="blurs" :value-map="[0,1]"></x-switch>
      </group>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Group, XAddress,XSwitch } from 'vux'
import {findCityListdo} from 'api/interfacemethod'
export default {
  props:['name'],
  data () {
    return {
      valueSw: true,
      title: '',
      valueAddr: [],
      showAddress: false,
      addressData: [],
      value:0,
      obj:{
        id:'',
        invoiceHend: '',
        companyAddress:'',
        companyPhone:'',
        taxCode:'',
        contactName:'',
        provinceId:'',
        cityId:'',
        regionId:'',
        address:'',
        defaultStatus:'',
        contactMobile:'',
        provinceName:'',
        cityName:'',
        regionName:'',
        type:0,
        /*userId:this.$route.params.userId*/
      },
      arr:[],
      addressid:[]
    }
  },
  created(){
    this.getCity()
    /*this.$emit('getuser',this.$route.params.userId)*/
    console.log(this.obj)
    this.$store.commit('SET_OBJ',this.obj)
    /*console.log(this.$route.params.userId)*/
    if(this.$route.params.item){
      let item=this.$route.params.item
      this.obj.invoiceHend=item.invoiceHend
      this.obj.taxCode=item.taxCode
      this.obj.contactMobile=item.contactMobile
      this.obj.contactName=item.contactName
      this.obj.address=item.address
      this.obj.defaultStatus=item.defaultStatus
      this.obj.provinceId=item.provinceId
      this.obj.cityId=item.cityId
      this.obj.regionId=item.regionId
      this.addressid=[item.provinceId+'',item.cityId+'',item.regionId+'']
      this.obj.id=item.id
    }
  },
  methods: {
    turn: function () {
      console.log(this.valueSw)
    },
    logHide(id,name){
      for(var i=0;i<id.length;i++){
        this.arr[i]={id:id[i],name:name[i]};
      }
    },
    addressClose(){
      this.obj.provinceId=this.arr[0].id
      this.obj.cityId=this.arr[1].id
      this.obj.regionId=this.arr[2].id
      this.obj.provinceName=this.arr[0].name
      this.obj.cityName=this.arr[1].name
      this.obj.regionName=this.arr[2].name
      this.$store.commit('SET_OBJ',this.obj)
    },
    blurs(){
      this.$store.commit('SET_OBJ',this.obj)

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
    }
  },
  components: {
    XAddress,
    Group,
    XSwitch
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.generalInvoice
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
