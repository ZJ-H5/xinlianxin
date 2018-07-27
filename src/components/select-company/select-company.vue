<template>
  <div class="collect">
    <div class="detail-head pl3 tc pr3 relative">
      <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
      <span class="fs36 cfff">选择报关公司</span>
      <router-link to="/manageCompany" class="fs30 cfff right">管理</router-link>
    </div>
    <div class=" z-bdb mb20 bgf " v-for="(item,index) in list" :key="index" @click="backorder(item)">
      <p class="fs30 pb20 pl3 pt20">
        <span class="clred" v-show="item.defaultStatus==1">[默认报关]</span>
      </p>
      <p class="fs30 c0 pb20  pl3 pr3">
        {{item.customsDeclaration}}
      </p>
      <p class="fs26 c6 pb30  pl3 pr3">
        {{item.remark}}
      </p>
    </div>
  </div>
</template>

<script>
import {Popup, XSwitch, Group, Toast, Confirm} from 'vux'
import {buyersAppCenterCustomsListdo, buyersAppUserCenterCustomsSavedo, buyersAppCenterCustomsDeletedo, buyersAppCenterCustomsCheckdo} from 'api/interfacemethod'
import {mapMutations} from 'vuex'
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
      cfshow: false,
      obj: this.$route.params.obj,
      item: ''

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
      if (flag === 1) {
        this._buyersAppUserCenterCustomsSavedo(flag, this.userid, this.bgcompanyname, this.bgremark, this.bgvalue, '')
      } else if (flag === 2) {
        this._buyersAppUserCenterCustomsSavedo(flag, this.userid, this.bjcompanyname, this.bjremark, this.bjvalue, this.id)
      }
    },
    _buyersAppUserCenterCustomsSavedo (type, userId, customsDeclaration, bgremark, defaultStatus, id) {
      buyersAppUserCenterCustomsSavedo({
        type: type,
        userId: userId,
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
      /*if (!this.item) {
        this.obj.item = this.item
      }*/
      this.$router.back()
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
    },
    backorder (item) {
      this.setCompany(item)
      this.$router.back()
    },
    ...mapMutations({setCompany: 'SET_COMPANY'})
  }
}
</script>

<style>
  .weui-label{
    font-size:28px;
  }
  .weui-cell {
    padding: 10px 15px;
  }
</style>
