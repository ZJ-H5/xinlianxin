<template>
    <div class="collect">
      <zHeader :msg="msg" :title="title" :manage="manage" @checkManage="checkManage"></zHeader>
      <!--<div class="detail-head pl3 tc pr3 relative">
        <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
        <span class="fs36 cfff">收藏型号</span>

        <a href="javascript:;" class="iconfont icon-more fs36 cfff right" @click="show"></a>
        <i class="z-dot" @click="show">
          2
        </i>
        <a href="javascript:;" class="right fs30 cfff mr20" @click="checkManage">管理</a>
        <top-msg v-bind:dialogShow="showOrNot" @show="dialog"></top-msg>
      </div>-->
      <div class="bgf">
        <div class="pb40 z-bdb  pl3 pr3 flex flex-align-start pt40 " v-for="(item,index) in list"  :key="index">
          <input type="checkbox" class="mr20 newInput" v-show="checkflag" v-model="item.isCheck" @change="checkAllWether"/>
          <router-link class="flex-1" :to="{path:'/productDetail',query:{cid:item.seller_user_id,tid:item.id}}" tag="div">
            <p class="flex flex-align-center ">
              <span class="c0 flex-1 "><i class="z-cu mr20" >促</i>{{item.model_code}}</span>
              <span class="mr40">库存 <em class="ml20">{{item.quantity}}</em></span>
              <span>笔数 <em class="ml20">{{item.quantity}}</em></span>
            </p>
            <p class="flex flex-align-center pt40">
              <span class="flex-1 c6" :class="{'pl45':checkflag}">{{item.compname}}</span>
              <span class="clred fs36"> ￥56.5</span>
            </p>
          </router-link>

        </div>
      </div>
      <div class="checkFoot" v-show="checkflag">
        <div class="checkContent">
          <span class="flex-1 " >
          <input type="checkbox" v-model="checkAll" @change="checked" class="newInput vtm mb5"/>
            <em class="ml20 ">全选</em>
        </span>
          <a href="javascript:;" class="checkDelete" @click="checkDelete">删除</a>
        </div>

      </div>
    </div>
</template>

<script>
import TopMsg from 'components/top-msg/top-msg'
import {selectAppGzlistdo,addyzgzdo,delectScXhdo} from 'api/interfacemethod'
import zHeader from 'components/z-header/z-header'
export default {
  data () {
    return {
      msg: true,
      showOrNot: false,
      list:'',
      checkflag:false,
      checkAll:false,
      arr:[],
      title:'收藏型号',
      manage:true
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
      this.$router.go(-1)
    },
    _selectAppGzlistdo(){
      selectAppGzlistdo({
        type:3//收藏型号
      }).then((res)=>{
        if(res.code==1){
          console.log(res.data)
          this.list=res.data //关注列表
          this.$nextTick(function () {
            this.list.forEach((item)=>{
              this.$set(item,'isCheck',false)
            })
          })

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
    },
    checkManage(){
      this.checkflag=!this.checkflag
    },
    checkAllWether(){
      let length=0
      this.list.forEach((item)=>{
        if(item.isCheck===true){
          length++
        }
      })
      if(length===this.list.length){
        this.checkAll=this.list[0].isCheck
      }else{
        this.checkAll=false
      }
    },
    checkDelete(){
      console.log( this.list)
      this.list.forEach((item)=>{
        if(item.isCheck===true){
          this.arr.push(item.id)
        }
      })
      this._delectScXhdo(this.arr)
    },
    checked(){
        this.list.forEach((item)=>{
          this.$set(item,'isCheck',this.checkAll)
        })
    },
    _delectScXhdo(ids){
      delectScXhdo({
        ids:JSON.stringify(ids),
      }).then((res)=>{
        if(res.code==1){
          this.$vux.toast.text('删除成功', 'middle')
          this.arr=[]
          this._selectAppGzlistdo()
          this.checkflag=false

        }

      }).catch((res)=>{
        this.arr=[]
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .checkFoot
    position  fixed
    bottom 0
    left 0
    width 100%
    font-size 30px
    .checkContent
      display flex
      align-items center
      background #fff
      height 100px
      padding-left 3%

      .checkDelete
        width 40%
        background #1081d1
        color #fff
        display inline-block
        height 100%
        padding-right 3%
        text-align center
        line-height 100px
  .newInput
    width 36px
    height 36px
    position relative
    outline 0
    appearance none
    &:after
      position absolute
      top:0
      left 0
      content ''
      width 100%
      height 100%
      border 1px solid #ccc
      text-align center
    &:checked:after
      font: normal normal normal 0.186667rem/1 "weui";
      content: '\EA08';
      color: #0093fb;
      font-size:28px
      line-height 36px

</style>
