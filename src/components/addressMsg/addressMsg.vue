<template xmlns:v-touch="http://www.w3.org/1999/xhtml">
    <div class="addressMsg">

      <!--<div class="address" v-show="addressShow">
        <div class="address-mask" @click="addressShow=false"></div>
        <div class="address-content">
          <div class="cont-head" @click="addressShow=false">
            <span class="head-left">取消</span>
            <span class="head-center"></span>
            <span class="head-right">确定</span>
          </div>
          <div class="cont">
            <div class="provinces">
              <div class="scroll-cont" >
                <v-touch class="scroll-mask"  tag="div" v-on:pan="onPan($event,1,list.length)" v-on:panend="onPanend(1)"></v-touch>
                <div class="scroller-indicator"></div>
                <div class="provinces-list" ref="provincesList"
                     :style="{transform:'translateY('+deltay+'px)'}">
                  <div class="scroller-item" :dateValue="item.id" ref="provincesItem" :class="{select:idx==index}" v-for="(item,index) in list" >
                    {{item.name}}
                  </div>

                </div>
              </div>
            </div>
            <div class="citys">
              <div class="scroll-cont">
                <v-touch class="scroll-mask"  tag="div" v-on:pan="onPan($event,2,citylist.length)" v-on:panend="onPanend(2)"></v-touch>
                &lt;!&ndash;<div class="scroll-mask"></div>&ndash;&gt;
                <div class="scroller-indicator"></div>
                <div class="citys-list"
                     ref="provincesList"
                     :style="{transform:'translateY('+deltay2+'px)'}">
                  <div class="scroller-item" :dateValue="item.id" :class="{select:idx2==index}" v-for="(item,index) in citylist" >
                    {{item.name}}
                  </div>
                </div>
              </div>
            </div>
            <div class="districts">
              <div class="scroll-cont">
                <v-touch class="scroll-mask"  tag="div" v-on:pan="onPan($event,3,dslist.length)"></v-touch>
                &lt;!&ndash;<div class="scroll-mask"></div>&ndash;&gt;
                <div class="scroller-indicator"></div>
                <div class="districts-list" :style="{transform:'translateY('+deltay3+'px)'}">

                  <div class="scroller-item" :dateValue="item.id" :class="{select:idx3==index}" v-for="(item,index) in dslist" >
                    {{item.name}}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>-->
    </div>
</template>

<script type="text/ecmascript-6">
import { Group, XAddress, ChinaAddressV4Data } from 'vux'
import {findCityListdo} from 'api/interfacemethod'
export default {
  data () {
    return {
      title: '',
      valueAddr: [],
      showAddress: false,
      addressData: [],
      idx:0,
      /*height:this.$refs.item.offsetHeight,*/
      deltay:0,
      idx2:0,
      deltay2:0,
      idx3:0,
      deltay3:0,
      list:'',
      height:0,
      citylist:'',
      dslist:'',
      provinceid:'',
      cityid:'',
      dsid:'',
      addressShow:false,
      arr:[],
      dz:'',
      shname:'',
      shtel:''
    }
  },
  created(){
    this.getCity();
    /*this._findCityListdo(0,0);*/
    /*this.$nextTick(()=>{
      this.deltay=this.getheight()*3
      this.deltay2=this.getheight()*3
      this.deltay3=this.getheight()*3
    })*/
  },
   mounted(){

   },
  methods: {
     getheight(){
       this.height=this.$refs.provincesItem[0].offsetHeight
       this.deltay = this.height* 3
       this.deltay2 = this.height* 3
       this.deltay3 = this.height* 3
       console.log(this.height);
       /*return height*/
     },
    logHide (id,name) {

       for(var i=0;i<id.length;i++){
         this.arr[i]={id:id[i],name:name[i]};
       }

    },
    addresshide(){
      this.$emit('address',this.arr,this.dz,this.shname,this.shtel)
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
    onPan(e,flag,length){
      var left= e.target.nextElementSibling.nextElementSibling.style['transform'].indexOf('(')
      var right =e.target.nextElementSibling.nextElementSibling.style['transform'].indexOf('p')
      let num= e.target.nextElementSibling.nextElementSibling.style['transform'].slice(left+1,right)
      var height=this.$refs.provincesItem[0].offsetHeight
      var mxheight=(length-4)*height
      var minheight=3*height
      if(flag==1){
        this.deltay=parseInt(num)+parseInt(e.deltaY/height)*height;

        if(this.deltay>minheight){
          this.deltay=minheight
          this.idx=0
        }else if(this.deltay<-mxheight){
          this.deltay=-mxheight
          this.idx=length-1
        }else{
            this.idx=Math.abs(parseInt((this.deltay-minheight)/height));
            console.log(this.idx)

        }
      }else if(flag==2){
        this.deltay2=parseInt(num)+parseInt(e.deltaY/height)*height;
        if(this.deltay2>minheight){
          this.deltay2=minheight
          this.idx2=0
        }else if(this.deltay2<-mxheight){
          this.deltay2=-mxheight
          this.idx2=length-1
        }else{
          this.idx2=Math.abs(parseInt((this.deltay2-minheight)/height));
          console.log(this.idx2)

        }

      }else if(flag==3){
        this.deltay3=parseInt(num)+parseInt(e.deltaY/height)*height;
        if(this.deltay3>minheight){
          this.deltay3=minheight
          this.idx3=0;
        }else if(this.deltay3<-mxheight){
          this.deltay3=-mxheight
          this.idx3=length-1
        }else{
          this.idx3=Math.abs(parseInt((this.deltay3-minheight)/height));
          console.log(this.idx3)

        }

      }


    },
    _findCityListdo(flag,parentid){
      findCityListdo({
        parentid:parentid
      }).then((res)=>{
        if(res.code===1){
          console.log(res.data)
          /*this.list=res.data*/
          switch (flag){
            case 0:this.list=res.data;break
            case 1:this.citylist=res.data;
              this.deltay2 = this.height* 3;
              this.deltay3 = this.height* 3;break
            case 2:this.dslist=res.data;
              this.deltay3 = this.height* 3;
              break
          }
          if(flag===0){
            this.$nextTick(()=> {
              this.getheight()
            })
          }


        }

      })/*.catch((res)=>{})*/
    },
    onPanend(flag){
      console.log('滑动结束');
       if(flag==1){
         this.provinceid=this.list[this.idx].id
         this._findCityListdo(flag,this.provinceid)
         console.log(flag)
       }else if(flag==2){
         this.cityid=this.citylist[this.idx2].id
         this._findCityListdo(flag,this.cityid)
         console.log(flag)
       }else if(flag==3){
         this.dsid=this.dslist[this.idx3].id
         /*this._findCityListdo(flag,this.dsid)*/
       }

    }

  },
  components: {
    XAddress,
    Group
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .addressMsg
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
    .address
      display block

      .address-mask
        position fixed
        top 0
        left 0
        width 100%
        height 100%
        background rgba(0,0,0,.5)
      .address-content
        position fixed
        bottom 0
        left 0
        width 100%
        max-height 100%
        background #eee
        overflow-y scroll;
        z-index 9999
        transition-duration: 300ms;
        .cont-head
          display flex
          font-size 30px
          border-bottom 1px solid #ccc
          line-height 60px
          .head-center
            flex 1
          .head-left
            padding-left 3%
          .head-right
            padding-right 3%
        .cont
          display flex
          align-items center;
          .provinces
            flex 1

            .scroll-cont
              height 476px
              display: block;
              position: relative;
              overflow: hidden;
              width: 100%
              .scroll-mask
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                margin: 0 auto;
                width: 100%;
                z-index: 3;
                transform: translateZ(0px);
                background-image: linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.6)), linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.6));
                background-position: top, bottom;
                background-size: 100% 200px;
                background-repeat: no-repeat;
              .scroller-indicator
                width: 100%;
                height: 68px;
                position: absolute;
                left: 0;
                top: 200px;
                z-index: 3;
                background-image: linear-gradient(to bottom, #d0d0d0, #d0d0d0, transparent, transparent), linear-gradient(to top, #d0d0d0, #d0d0d0, transparent, transparent);
                background-position: top, bottom;
                background-size: 100% 1px;
                background-repeat: no-repeat;

              .provinces-list
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                z-index: 1;
                /*transform: translateY(204px);*/
                transition-duration: 300ms;
                .scroller-item
                  height 68px
                  text-align: center;
                  font-size: 30px;
                  line-height: 68px;
                  color: #000;
          .citys
            flex 1
            .scroll-cont
              height 476px
              display: block;
              position: relative;
              overflow: hidden;
              width: 100%
              .scroll-mask
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                margin: 0 auto;
                width: 100%;
                z-index: 3;
                transform: translateZ(0px);
                background-image: linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.6)), linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.6));
                background-position: top, bottom;
                background-size: 100% 200px;
                background-repeat: no-repeat;
              .scroller-indicator
                width: 100%;
                height: 68px;
                position: absolute;
                left: 0;
                top: 200px;
                z-index: 3;
                background-image: linear-gradient(to bottom, #d0d0d0, #d0d0d0, transparent, transparent), linear-gradient(to top, #d0d0d0, #d0d0d0, transparent, transparent);
                background-position: top, bottom;
                background-size: 100% 1px;
                background-repeat: no-repeat;
              .citys-list
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                z-index: 1;
                /*transform: translateY(204px);*/
                transition-duration: 300ms;
                .scroller-item
                  height 68px
                  text-align: center;
                  font-size: 30px;
                  line-height: 68px;
                  color: #000;

          .districts
            flex 1
            .scroll-cont
              height 476px
              display: block;
              position: relative;
              overflow: hidden;
              width: 100%
              .scroll-mask
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                margin: 0 auto;
                width: 100%;
                z-index: 3;
                transform: translateZ(0px);
                background-image: linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.6)), linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.6));
                background-position: top, bottom;
                background-size: 100% 200px;
                background-repeat: no-repeat;
              .scroller-indicator
                width: 100%;
                height: 68px;
                position: absolute;
                left: 0;
                top: 200px;
                z-index: 3;
                background-image: linear-gradient(to bottom, #d0d0d0, #d0d0d0, transparent, transparent), linear-gradient(to top, #d0d0d0, #d0d0d0, transparent, transparent);
                background-position: top, bottom;
                background-size: 100% 1px;
                background-repeat: no-repeat;
              .districts-list
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                z-index: 1;
                /*transform: translateY(204px);*/
                transition-duration: 300ms;
                .scroller-item
                  height 68px
                  text-align: center;
                  font-size: 30px;
                  line-height: 68px;
                  color: #000;


</style>
