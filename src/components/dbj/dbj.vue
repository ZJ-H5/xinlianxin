<template>
  <div>
    <scroll ref="scroll" class="nominate-content"
            :data="list"
            :listen-scroll="listenScroll"
            @scroll="scroll">
      <div class="box-list">
        <div v-show="loadflag" class="loadmore">
          <loading></loading>
        </div>
        <div class="bgf mb20" v-for="(item,index) in list" :class="{'bdt':index!=0}">
          <div class="pl3 pr3 bdb">
            <div class="flex flex-align-center fs28">
              <p class="flex-1 lh80">
                <span class="c6">型号</span>
                <span class="c0 ml20">{{item.model_code}}</span>
              </p>
            </div>
            <div class="flex flex-align-center fs28">
              <p class="flex-1 lh80">
                <span class="c6">批号</span>
                <span class="c0 ml20">{{item.batch_code}}</span>
              </p>
              <p class="flex-1 tl">
                <span class="c6 ">数量</span>
                <span class="c0 ml20">{{item.quantity}}</span>
              </p>
              <p>
                <span class="c6">货期</span>
                <span class="c0 ml20">{{item.delivery_time}}</span>
              </p>
            </div>
            <div class="flex flex-align-center fs28" v-if="item.buyerRemark!=''&&item.buyerRemark">
              <p class="flex-1 lh80">
                <span class="c6">买家备注</span>
                <span class="c0 ml20">{{item.buyerRemark}}</span>
              </p>
            </div>
           <!-- <div class="flex flex-align-center fs28" v-if="item.seller!==''">
              <p class="flex-1 lh80">
                <span class="c6">卖家备注</span>
                <span class="c0 ml20">{{item.seller_remark}}</span>
              </p>
              <span>{{item.create_time}}</span>
            </div>-->
          </div>
          <p class="clr pt20 pb20 bdb pl3 pr3 flex flex-align-center">
            <span class="c0 fs30 flex-1">{{item.phone}}</span>
            <commitCompany :item="item" :type="type" class="mr20"></commitCompany>
            <a href="javascript:;" class="z-link mr20" @click="ignorebj(item.id,index)">忽略</a>
            <a href="javascript:;" class="z-bluek" @click="bj(item.id,index)">报价</a>
          </p>
        </div>
      </div>
    </scroll>
    <div class="loading-container" v-show="loading">
      <loading :loadflag="loading"></loading>
    </div>

    <x-dialog :show="bjshow" @on-hide="cartDialog">
      <div class="bgf2">
        <div class="bgf mb20">
          <h1 class="fs30 c0 bdb lh80 pl3 pr3">
            填写报价信息
          </h1>
          <p class="flex lh60 pl3 pr3 tr pt20 pb20">
            <span class="inlineblock w-25 fs28 c6">数量：</span>
            <input type="text" class="z-input ml10" placeholder="请输入需求的数量" v-model="offerNum">
          </p>
          <p class="flex lh60 pl3 pr3 tr pt20 pb20">
            <span class="inlineblock w-25 fs28 c6">货期：</span>
            <input type="text" class="z-input ml10" placeholder="请输入需求的数量" v-model="offerFutures">
          </p>
          <p class="flex lh60 pl3 pr3 tr pt20 pb20">
            <span class="inlineblock w-25 fs28 c6">单价：</span>
            <input type="text" class="z-input ml10" placeholder="请输入需求的数量" v-model="offerUnit">
          </p>
          <p class="flex lh60 pl3 pr3 tr pt20 pb20">
            <span class="inlineblock w-25 fs28 c6">备注：</span>
            <input type="text" class="z-input ml10" placeholder="请输入需求的数量" v-model="offerNote">
          </p>
        </div>
        <div class="pt40 fs0 bgf">
          <a href="javascript:;" class="dialogbtn cancel vux-popup-show" @click="cancel">取消</a>
          <a href="javascript:;" class="dialogbtn confirm " @click="addbj">确定</a>
        </div>
      </div>
    </x-dialog>
    <toast position="middle" :value="selectShow" :text="text" @on-hide="cartDialog" width="50%"></toast>
  </div>
</template>

<script>
  import {myOfferListdo,AppmyOfferIgnoredo,AppagainOfferdo} from 'api/interfacemethod'
  import {Toast, Popup} from 'vux'
  import TopMsg from 'components/top-msg/top-msg'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {OK_TRUE, PAGESIZE2} from 'api/conflg'
  import commitCompany from 'components/commitCompany/commitCompany'
  import XDialog from "vux/src/components/x-dialog/index";
  const scroy = -100
    export default {
        data(){
          return{
            list:[],
            bjshow:false,
            offerNote:'',
            offerUnit:'',
            offerFutures:'',
            offerNum:'',
            id:'',
            selectShow:false,
            text:'',
            loadflag: false,
            pageNum:1,
            pageSize:1,
            listenScroll:true,
            totalCount: 0,
            bjindex:'',//报价的时候获取列表的索引值，可以在页面上直接去除这条数据，而不是通过刷新页面
            idx:'',//忽略的列表索引值
            type:1//联系买家
          }
        },
      created(){
          this._myOfferListdo()
      },
      computed: {
        loading () {
          return this.$store.state.zj.updatedloading
        }
      },
      components: {XDialog, Toast, Popup, TopMsg,Loading,Scroll,commitCompany},
      methods:{
        scroll (pos) {
          this.scrollY = pos.y
          console.log(this.scrollY)
          if (this.scrollY < scroy) {
            this.loadflag = true
            if (this.list.length >= this.totalCount) {
              this.loadflag = false
              return
            }
            this.pageNum++
            this._myOfferListdo()
          }
        },
        _myOfferListdo(){
          myOfferListdo({
            type:1,
            pageNum:this.pageNum,
            pageSize:10
          }).then((res)=>{
            if(res.code==1){
              console.log(111)
              if (res.data.list.length <= 0) {
                this.$vux.toast.text('暂无数据', 'middle')
                return
              }
              this.loadflag = false
              this.list.push(...(res.data.list)) //待报价的列表
              this.totalCount = res.data.total
            }

          }).catch((res)=>{})
        },
        ignorebj(id,idx){
          this._AppmyOfferIgnoredo(id)
          this.idx=idx
        },
        _AppmyOfferIgnoredo(id){
          let that=this
          AppmyOfferIgnoredo({
            tuwiId:id
          }).then((res)=>{
            if(res.code==1){
              that.$vux.toast.text(res.msg, 'middle')
              console.log(that.list)
              that.list.splice(that.idx,1)
              /*debugger*/
              console.log(that.list)
              /*this._myOfferListdo()*/
              console.log('忽略成功')
            }

          }).catch((res)=>{})
        },
        bj(id,index){
          this.bjshow=true
          this.id=id
          this.bjindex=index
        },
        cancel(){
          this.bjshow=false;
        },
        addbj(){
          this._AppagainOfferdo()
        },
        cartDialog(){
          this.bjshow=false
          this.selectShow=false
        },
        _AppagainOfferdo(){
          AppagainOfferdo({
            tuwiId:this.id,
            offerNum:this.offerNum,
            offerFutures:this.offerFutures,
            offerUnit:this.offerUnit*100,
            offerNote:this.offerNote
          }).then((res)=>{
            if(res.code==1){
              this.$vux.toast.text(res.msg, 'middle')// 成功信息弹窗
              this.bjshow=false
              console.log(this.bjindex)
              this.list.splice(this.bjindex,1)
            }

          }).catch((res)=>{})
        }
      }
    }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .nominate-content
    position: absolute
    height: 100%
    width 100%
    overflow: hidden
    .box-list
      padding-bottom 240px
    .loadmore
      margin-top 6px
</style>
