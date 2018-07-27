<template>
  <div class="collect">
    <div class="head">
      <div class="detail-head pl3 tc pr3 relative">
        <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
        <span class="fs36 cfff">管理收货地址</span>
        <router-link :to="{path:'/addressAdd',query:{userid:userId}}" class="fs30 cfff right">新增</router-link>
        <!--<a href="javascript:;" class="fs30 cfff right" @click="add"></a>-->
      </div>
    </div>
    <div class="content">
      <div class="pb20 z-bdb mb20 bgf" v-for="item in list">
        <p class="fs30 c0 lh80  pl3 pr3 flex">
         <span class="flex-1">
          {{item.contactName}}
         </span>
          <span>
            {{item.contactMobile}}
          </span>
        </p>
        <p class="fs26 c6  z-bdb pb30  pl3 pr3 lh50">
          {{item.provinceName}}{{item.cityName}}{{item.regionName}}{{item.address}}
        </p>
        <p class="flex flex-align-center pt20  pl3 pr3">
            <span class="flex-1 fs26" @click="setdefault(item.id)"><input type="radio" class="vtm" :checked="item.defaultStatus==1"/>
              <span class="vtm ml10">
                默认地址
              </span>
            </span>
          <a href="javascript:;" class="iconfont icon-shanchu fs36 mr10" @click="onShow(item.id)"></a>
          <router-link :to="{path:'/addressChange',query:{item:item,userid:userId}}" class="iconfont icon-bianji3 fs36"></router-link>
        </p>
      </div>
    </div>

    <popup position="bottom" :value="addbg" default="1231313131" @on-hide="cartDialog">
      <div class="bgf2">
        <div class="bgf mb20">
          <h1 class="fs36 clblue bdb lh120 pl3 pr3 tc fwb">
            新增报关
          </h1>
          <p class="flex lh60 pl3 pr3 tr pt20 pb20">
            <span class="inlineblock w-25 fs28 c6">公司名称：</span>
            <input type="text" class="z-input ml10" placeholder="请输入公司名称">
          </p>
          <p class="flex lh60 pl3 pr3 tr pt20 pb20">
            <span class="inlineblock w-25 fs28 c6">备注：</span>
            <input type="text" class="z-input ml10" placeholder="请输入备注">
          </p>
          <group>
            <x-switch title="设为默认" v-model="value"></x-switch>
          </group>
        </div>
        <div class="pt40 fs0 bgf">
          <a href="javascript:;" class="dialogbtn cancel vux-popup-show" @click="cartDialog">取消</a>
          <a href="javascript:;" class="dialogbtn confirm">保存</a>
        </div>
      </div>
    </popup>
    <div>
      <confirm v-model="cfshow"
               @on-cancel="onCancel"
               @on-hide="onCancel"
               @on-confirm="deleteaddress(idx)">
        <p style="text-align:center;">{{'确定删除该地址?'}}</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import {Popup, XSwitch, Group, Confirm,Toast} from 'vux'
import {buyersAppUserCenterAddressListdo,buyersAppCenterAddressDeletedo,buyersAppCenterAddressCheckdo} from 'api/interfacemethod'
export default {
  data () {
    return {
      addbg: false,
      value: true,
      cfshow: false,
      list:'',
      userId:0,
      idx:0,
      text:''
    }
  },
  created(){
    this._address()
  },
  components: {Popup, XSwitch, Group, Confirm,Toast},
  methods: {
    cartDialog () {
      this.addbg = false
    },
    add () {
      this.addbg = true
    },
    goback () {
      this.$router.back()
    },
    onCancel () {
      this.cfshow = false
    },
    onShow (idx) {
      this.cfshow = true
      this.idx=idx
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
    deleteaddress(idx){
      console.log(idx)
      buyersAppCenterAddressDeletedo({
        ShdzId:idx
      }).then((res)=>{
        if(res.code==1){
          this.text=res.msg
          this.deleteshow=true;
          this._address();
        }

      }).catch((res)=>{})
    },
    _buyersAppCenterAddressCheckdo(id){
      buyersAppCenterAddressCheckdo({
        ShdzId:id
      }).then((res)=>{
        if(res.code==1){
          this.$vux.toast.text(res.msg, 'middle')
          this._address();
        }

      }).catch((res)=>{})
    },
    setdefault(id){
      this._buyersAppCenterAddressCheckdo(id)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
  .collect
    .head
      position fixed
      top 0
      left 0
      width 100%
      z-index 999
    .content
      padding-top 128px
      input[type="radio" i] {
        -webkit-appearance: radio;
        box-sizing: border-box;
      }

</style>
