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
            <span class="c0 ml20">{{item.delivery_time}}天</span>
          </p>
        </div>
        <div class="flex flex-align-center fs28" v-if="item.buyerRemark!=''&&item.buyerRemark">
          <p class="flex-1 lh80">
            <span class="c6">买家备注</span>
            <span class="c0 ml20">{{item.buyerRemark}}</span>
          </p>
        </div>
        <div class="flex flex-align-center fs28" v-if="item.sellerRemark!=''&&item.sellerRemark">
          <p class="flex-1 lh80">
            <span class="c6">卖家备注</span>
            <span class="c0 ml20">{{item.sellerRemark}}</span>
          </p>
          <span>{{item.create_time}}</span>
        </div>
      </div>
      <p class="clr pt20 pb20 bdb pl3 pr3 flex flex-align-center">
        <span class="c0 fs30 flex-1">{{item.phone}}</span>
        <commitCompany :item="item" :type="type" class=""></commitCompany>
      </p>
    </div>
      </div>
    </scroll>
    <div class="loading-container" v-show="loading">
      <loading :loadflag="loading"></loading>
    </div>
  </div>
</template>

<script>
  import {myOfferListdo,AppofferInitdo} from 'api/interfacemethod'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {OK_TRUE, PAGESIZE2} from 'api/conflg'
  import commitCompany from 'components/commitCompany/commitCompany'
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
          type:1

        }
      },
      components: {Loading,Scroll,commitCompany},
      created(){
        this._myOfferListdo()
      },
      computed: {
        loading () {
          return this.$store.state.zj.updatedloading
        }
      },
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
            type:4,
            pageNum:this.pageNum,
            pageSize:5
          }).then((res)=>{
            if(res.code==1){
              if (res.data.list.length <= 0) {
                this.$vux.toast.text('暂无数据', 'middle')
                return
              }
              this.loadflag = false
              this.list.push(...(res.data.list)) //已过期的列表
              this.totalCount = res.data.total
            }

          }).catch((res)=>{})
        },
        bj(id){
          this.bjshow=true
          this.id=id
        },
        cancel(){
          this.bjshow=false;
        },
        addbj(){
          this._AppofferInitdo()
        },
        cartDialog(){
          this.bjshow=false
          this.selectShow=false
        },
        _AppofferInitdo(){
          AppofferInitdo({
            tuwiId:this.id,
            offerNum:this.offerNum,
            offerFutures:this.offerFutures,
            offerUnit:this.offerUnit,
            offerNote:this.offerNote
          }).then((res)=>{
            if(res.code==1){

              this.text=res.msg
              this.selectShow=true
              this.bjshow=false
              this._myOfferListdo()
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
