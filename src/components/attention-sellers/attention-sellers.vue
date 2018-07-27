<template>
    <div class="collect bgf">
      <zHeader :msg="msg" :title="title"></zHeader>
      <!--<div class="detail-head pl3 tc pr3 relative">
        <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
        <span class="fs36 cfff">关注卖家</span>
        <a href="javascript:;" class="iconfont icon-more fs36 cfff right" @click="show"></a>
        <i class="z-dot" @click="show">
          2
        </i>
        <top-msg v-bind:dialogShow="showOrNot" @show="dialog"></top-msg>
      </div>-->
      <div class="bgf pl3 pr3">
        <ul>
          <li class="flex flex-align-center h100" v-for="item in list">
            <span class="flex-1 c0 fs30 ">{{item.company_name}}</span>
            <a href="javascript:;" class="z-bluek fs26" v-if="item.att_type==1" @click="addattention(item.cid,3)">取消关注</a>
            <a href="javascript:;" class="z-bluek fs26" v-if="item.att_type==0" @click="addattention(item.cid,1)">关注</a>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import {selectAppGzlistdo,addyzgzdo} from 'api/interfacemethod'
import TopMsg from 'components/top-msg/top-msg'
  import zHeader from 'components/z-header/z-header'
export default {
  data () {
    return {
      msg: true,
      showOrNot: false,
      list:'',
      title:'关注卖家'
    }
  },
  created(){
    this._selectAppGzlistdo()
  },
  components: {TopMsg,zHeader},
  methods: {
    show () {
      this.showOrNot = true
    },
    dialog () {
      this.showOrNot = false
    },
    goback () {
      this.$router.back()
    },
    _selectAppGzlistdo(){
      selectAppGzlistdo({
        type:1
      }).then((res)=>{
        if(res.code==1){
          this.list=res.data //关注列表
        }

      }).catch((res)=>{})
    },
    addattention(cid,flag){
      this._addyzgzdo(cid,flag)
    },
    _addyzgzdo(id,flag){
      addyzgzdo({
        type:flag,
        companyId:id
      }).then((res)=>{
        if(res.code==1){
          this.$vux.toast.text(res.msg, 'middle')// 成功信息弹窗
          this._selectAppGzlistdo()
        }

      }).catch((res)=>{})
    }
  }
}
</script>

<style scoped>

</style>
