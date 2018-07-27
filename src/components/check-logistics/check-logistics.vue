<template>
  <div class="logistics">
    <div class="detail-head pl3 tc pr3 relative">
      <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
      <span class="fs36 cfff">查看物流收货</span>
    </div>
    <div class="bgf pb20">
      <scroll ref="scroll" :scrollX="true" class="nominate-content" v-if="list.length!=0">

        <ul class="detail-tab clearfix" v-if="list.length>0" ref="scrollul">
          <li v-for="(item,index) in list" @click="showwl(index)" v-bind:class="{'bdblue':idx==index}" ref="scrollli">
            物流{{index+1}}
          </li>
        </ul>
      </scroll>
      <div class="bgf pl3 pr3 pt40 tc fs30 pb20" v-if="list.length==0">
        暂无物流数据
      </div>
      <div class="bgf pl3 pr3" v-if="list.length>0" v-for="item in data.tlds">
        <p class="flex flex-align-center pb30 fs30 c0 pt30"  >
        <span class="flex-1">
          发货型号：{{item.model_code}}
        </span>
          <span>
          数量：{{item.deliver_qty}}
        </span>
        </p>
        <p class="tr pt30 pb30">
          <span class="z-link inlineblock" v-if="data.status==1">
            已确认
          </span>
          <a href="javascript:;" class="z-bluek inlineblock" v-if="data.status==0" @click="getwl(data.id)">确认</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import {getLogisticsListdo,confirmLogisticsdo} from 'api/interfacemethod'
    export default {
      data(){
        return{
          orderid:this.$route.query.orderId,
          list:'',
          data:'',
          idx:0
        }
      },
      created(){
        this._getLogisticsListdo()
      },
       methods:{
         goback () {
           this.$router.back()
         },
         _getLogisticsListdo(){
           getLogisticsListdo({
             orderId:this.orderid
           }).then((res)=>{
             if(res.code==1){
               this.list=res.data//物流信息
               this.data=this.list[0]
               console.log(this.data)
               this.$nextTick(()=>{
                 if(this.list.length==1){
                   console.log(this.$refs.scrollli)
                   this.$refs.scrollul.style.width='100%'
                   this.$refs.scrollli[0].style.width='100%'
                 }else{
                   this.$refs.scrollul.style.width=res.data.length*5+'rem'
                 }
               })
             }
           }).catch((res)=>{})
       },
         showwl(idx){
           this.idx=idx
           this.data=this.list[idx]
         },
         getwl(id){
            this._confirmLogisticsdo(id)
         },
         _confirmLogisticsdo(id){
           confirmLogisticsdo({
             logisticsId:id
           }).then((res)=>{
             if(res.code==1){
               this.$vux.toast.text(res.msg, 'middle')
               this.$router.back()
             }
           }).catch((res)=>{})
         }
       },
      components: {
        Scroll
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .logistics
    .nominate-content
      /*position absolute*/
      width: 100%
      height: 80px
      overflow hidden
      /*.content
        position: relative
        width: 100%
        overflow: hidden*/
      .detail-tab
        width 3000px
        position: relative
        height:80px
        line-height: 80px
        li
          width:5rem
          text-align: center
          border-bottom:1px solid #ccc
          font-size:30px;
          float left
          /*&.router-link-exact-active
           color:$font-color-blueb
           border-bottom:1px solid #1081d1*/
          &.bdblue
            color:$font-color-blueb
            border-color:#1081d1
</style>
