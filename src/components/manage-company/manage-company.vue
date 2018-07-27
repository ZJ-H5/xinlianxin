<template>
  <div class="collect">
    <div class="detail-head pl3 tc pr3 relative">
      <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
      <span class="fs36 cfff">管理报关公司</span>
      <a href="javascript:;" class="fs30 cfff right" @click="add">新增</a>
    </div>
    <div class="pb20 z-bdb mb20 bgf" v-for="(item,index) in list" :key="index">
      <p class="fs30 c0 lh80  pl3 pr3">
        {{item.customsDeclaration}}
      </p>
      <p class="fs26 c6  z-bdb pb30  pl3 pr3">
        {{item.remark}}
      </p>
      <p class="flex flex-align-center pt20  pl3 pr3">
            <span class="flex-1 fs26" @click="setdefaultbg(item.id)"><input type="radio" class="vtm" :checked="item.defaultStatus==1"/>
              <span class="vtm ml10">
                默认报关
              </span>
            </span>
        <a href="javascript:;" class="iconfont icon-shanchu fs36 mr10" @click="deleteinfo(item.id)"></a>
        <a href="javascript:;" class="iconfont icon-bianji3 fs36 " @click="bjbginfo(item)"></a>
      </p>
    </div>
    <popup position="bottom" :value="addbg"  @on-hide="cartDialog">
      <div class="bgf2">
        <div class="bgf mb20">
          <h1 class="fs36 clblue bdb lh120 pl3 pr3 tc fwb">
            新增报关
          </h1>
          <p class="flex lh60 pl3 pr3 tr pt20 pb20">
            <span class="inlineblock w-25 fs28 c6">公司名称：</span>
            <input type="text" class="z-input ml10" placeholder="请输入公司名称" v-model="bgcompanyname">
          </p>
          <p class="flex lh60 pl3 pr3 tr pt20 pb20">
            <span class="inlineblock w-25 fs28 c6">备注：</span>
            <input type="text" class="z-input ml10" placeholder="请输入备注" v-model="bgremark">
          </p>
            <group>
              <x-switch title="设为默认" v-model="bgvalue" :value-map="[0,1]"></x-switch>
            </group>
        </div>
        <div class="pt40 fs0 bgf">
          <a href="javascript:;" class="dialogbtn cancel vux-popup-show" @click="cartDialog">取消</a>
          <a href="javascript:;" class="dialogbtn confirm" @click="savebginfo(1)">保存</a>
        </div>
      </div>
    </popup>
    <popup position="bottom" :value="bjbg" default="1231313131" @on-hide="cartDialog">
      <div class="bgf2">
        <div class="bgf mb20">
          <h1 class="fs36 clblue bdb lh120 pl3 pr3 tc fwb">
            编辑报关
          </h1>
          <p class="flex lh60 pl3 pr3 tr pt20 pb20">
            <span class="inlineblock w-25 fs28 c6">公司名称：</span>
            <input type="text" class="z-input ml10" placeholder="请输入公司名称" v-model="bjcompanyname">
          </p>
          <p class="flex lh60 pl3 pr3 tr pt20 pb20">
            <span class="inlineblock w-25 fs28 c6">备注：</span>
            <input type="text" class="z-input ml10" placeholder="请输入备注" v-model="bjremark">
          </p>
          <group>
            <x-switch title="设为默认" v-model="bjvalue" :value-map="[0,1]"></x-switch>
          </group>
        </div>
        <div class="pt40 fs0 bgf">
          <a href="javascript:;" class="dialogbtn cancel vux-popup-show" @click="cartDialog">取消</a>
          <a href="javascript:;" class="dialogbtn confirm" @click="savebginfo(2)">保存</a>
        </div>
      </div>
    </popup>
    <confirm v-model="cfshow"
             @on-cancel="onCancel"
             @on-hide="onCancel"
             @on-confirm="deletebg()">
      <p style="text-align:center;">{{'确定删除该报关?'}}</p>
    </confirm>
    <toast position="middle" :value="selectShow" :text="text" width="50%"></toast>
  </div>
</template>

<script>
import {Popup, XSwitch, Group, Toast, Confirm} from 'vux'
import {buyersAppCenterCustomsListdo, buyersAppUserCenterCustomsSavedo, buyersAppCenterCustomsDeletedo, buyersAppCenterCustomsCheckdo} from 'api/interfacemethod'
export default {
  data () {
    return {
      addbg: false,
      bgvalue: 0,
      list: '',
      bgremark: '',
      bgcompanyname: '',
      userid: 0,
      selectShow: false,
      bjbg: false,
      bjcompanyname: '',
      bjremark: '',
      bjvalue: 0,
      text: '',
      id: 0,
      cfshow: false

    }
  },
  created () {
    this._buyersAppCenterCustomsListdo()
  },
  components: {Popup, XSwitch, Group, Toast, Confirm},
  methods: {
    onCancel () {
      this.cfshow = false
    },
    cartDialog () {
      this.addbg = false
      this.bjbg = false
    },

    savebginfo (flag) {
      console.log(111)

      if (flag === 1) {
        if(!this.bgcompanyname) {
          this.$vux.toast.text('公司名不能为空', 'middle')
          return
        }
        if(!this.bgremark) {
          this.$vux.toast.text('备注不能为空', 'middle')
          return
        }
        this._buyersAppUserCenterCustomsSavedo(flag, this.userid, this.bgcompanyname, this.bgremark, this.bgvalue, '')
      } else if (flag === 2) {
        if(!this.bjcompanyname) {
          this.$vux.toast.text('公司名不能为空', 'middle')
          return
        }
        if(!this.bjremark) {
          this.$vux.toast.text('备注不能为空', 'middle')
          return
        }
        this._buyersAppUserCenterCustomsSavedo(flag, this.userid, this.bjcompanyname, this.bjremark, this.bjvalue, this.id)
      }
    },
    _buyersAppUserCenterCustomsSavedo (type, userId, customsDeclaration, bgremark, defaultStatus, id) {
      buyersAppUserCenterCustomsSavedo({
        type: type,
        customsDeclaration: customsDeclaration,
        remark: bgremark,
        defaultStatus: defaultStatus,
        id: id// 如果是新增的话，id为空
      }).then((res) => {
        if (res.code === 1) {
          this.addbg = false
          this.bjbg = false
          this.text = res.msg
          this.selectShow = true
          this._buyersAppCenterCustomsListdo()
        }
      }).catch((res) => {})
    },
    add () {
      this.addbg = true
    },
    goback () {
      this.$router.go(-1)
    },

    _buyersAppCenterCustomsListdo () {
      buyersAppCenterCustomsListdo({
      }).then((res) => {
        if (res.code === 1) {
          this.list = res.data.list
          this.userid = res.data.list[0].userId
        }
      }).catch((res) => {})
    },
    bjbginfo (item) {
      this.bjbg = true
      this.bjcompanyname = item.customsDeclaration
      this.bjremark = item.remark
      this.bjvalue = item.defaultStatus
      this.id = item.id
    },
    deleteinfo (id) {
      this.cfshow = true
      this.id = id
    },
    deletebg () {
      this._buyersAppCenterCustomsDeletedo(this.id)
    },
    _buyersAppCenterCustomsDeletedo (id) {
      buyersAppCenterCustomsDeletedo({
        ids: id
      }).then((res) => {
        if (res.code === 1) {
          this.text = res.msg
          this.selectShow = true
          this._buyersAppCenterCustomsListdo()
        }
      }).catch((res) => {})
    },
    setdefaultbg (id) {
      this._buyersAppCenterCustomsCheckdo(id)
    },
    _buyersAppCenterCustomsCheckdo (id) {
      buyersAppCenterCustomsCheckdo({
        id: id
      }).then((res) => {
        if (res.code === 1) {
          this.text = res.msg
          this.selectShow = true
          this._buyersAppCenterCustomsListdo()
        }
      }).catch((res) => {})
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
 /* input[type="radio" i] {
    -webkit-appearance: radio;
    box-sizing: border-box;
  }*/
</style>

