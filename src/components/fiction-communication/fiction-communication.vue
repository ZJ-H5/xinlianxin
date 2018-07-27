<template>
  <transition name="slide">
    <div class="fixedBox">
      <div class="fixedtop">
        <div class="header">
          <a href="javascript:;"
            class="iconfont icon-back1 fs48 left cfff"
            @click="goback"></a>
          <span class="txt" @click="deleDB(companyName)">{{companyName}}</span>
          <div class="add">
            <i class="iconfont icon-custom-phone fs48" @click="phoneCall"></i>
            <router-link tag="div" class="seller" :to="{name:'introduce',params:{sellerId:companyId}}">进卖家</router-link>
          </div>
        </div>
      </div>
      <!-- 大数组，以时间作节点 type作区分 -->
      <scroll ref="scroll"
          class="nominate-content"
          :listen-scroll="true"
          :data="list.list"
          @scroll="scroll"
          :scrollToEndFlag="true"
          >
        <div class="communbox" ref="communbox" >
          <div v-show="loadingmore" class="loadmore">
            <loading></loading>
          </div>
          <div  v-for="(item,index) in this.list.list" :key="index" class="clearfix border">
            <!-- 这个是客服卖家1号（对方） -->
            <div class="others  mt30" v-if="item.flag===1">
              <div class="comTims" v-if="item.timeType">
                <p>{{item.time}}</p>
              </div>
              <div class="userimg touxiang person">
                <img :src="companyImg" @error="imgError1(companyImg)"
                  alt="">
              </div>
              <div class="comtxt relative comboxbgOne message" v-if="item.contentType=='txt'">
                <span class="triangle"></span>
                <span >{{item.msg}}</span>
              </div>
              <div class="comtxt relative comboxbgOne messageimg" v-if="item.contentType=='img'">
                <span class="triangle"></span>
                <span><img  class="contentimg" :src="item.msg" alt="" @error="imgError3(item)"></span>
              </div>
            </div>
            <!-- 这个是我们2号 （我方）-->
            <div class=" mys  mt30" v-if="item.flag===2">
              <div class="comTims" v-if="item.timeType">
                <p>{{item.time}}</p>
              </div>
              <div class="userimg touxiang person">
                <img :src="myinformation.head_pic" @error="imgError(item)"
                  alt="">
              </div>
              <div class="comtxt relative comboxbgOne message" v-if="item.contentType=='txt'">
                <span class="triangle"></span>
                <span >{{item.msg}}</span>
              </div>
              <div class="comtxt relative comboxbgOne messageimg" v-if="item.contentType=='img'">
                <span class="triangle"></span>
                <span><img  class="contentimg" :src="item.msg" alt=""  @error="imgError3(item)"></span>
              </div>
            </div>
          </div>

        </div>
      </scroll>
      <div class="comlodemessage">
        <div class="inblock comInput">
          <input type="text"
            v-model="message">
        </div>

        <div class="inblock comImg">
          <img src="./shangchuan.png"
            alt="">
            <input class="addbtnipn"
              v-if="ishowFile"
              type="file"
              ref="referenceUpload"

              @change="getFile($event)"
              multiple="multiple" />
        </div>

        <div class="inblock sublimes"
          @click="sends">发表</div>

      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {sendMinx} from '@/api/minxsend'
export default {
  mixins: [sendMinx],
  data () {
    return {

    }
  },
  computed: {
  },
  mounted () {
  },

  created () {
  },
  methods: {
    imgError (item) {
      this.myinformation.head_pic = require('@/common/image/defaultkf.jpg')
    },
    imgError1 (item) {
      this.companyImg = require('@/common/image/users.png')
    },
    imgError3 (item) {
      item.msg = require('@/common/image/shangchuan.png')
    },
    goback () {
      this.$router.back()
    },
    phoneCall () {
      window.location.href = 'tel://' + this.tel
    },
    scroll (scoy) {
      let list = this.typelist
      if (list.length <= 10) {
        this.showList = list
        return
      }
      if (scoy.y > 20 && (this.showList.length < list.length)) {
        let arr = this._getNumber(list, this.pageSize, this.pageNumber)
        if (arr.length > 0) {
          this.scrollToEndFlag = true
          this.loadingmore = true
          setTimeout(() => {
            this.showList.unshift(...arr)
            this.pageSize++
            this.loadingmore = false
          }, 200)
        }
      }
    }

  },

  watch: {
    oldtime (newval, oldval) {
      oldval && (this.timecha = (newval.getTime() - oldval.getTime()) / 1000)
    },
    showList (newval) {
      console.log(newval)
      // this.$refs.scroll.refresh()
      let el = this.$refs.communbox.clientHeight
      // let disY = oldval.clientHeigh
      // let disY=60; 这样写滚动正常
      // 这样写就滚动不正常（每次从头开始滚，很不好的体验）
      // let disY = el[oldval.length - 1].clientHeight
      // let disYto = el[newval.length - 1].clientHeight
      if (this.type && !this.scrollToEndFlag) {
        console.log(el)
        // let el = newval[newval.length - 1].clientHeight
        this.$refs.scroll.scrollTo(0, -el)
      }
      this.$refs.scroll.scrollTo(0, -el)
    }
  },
  components: {
    Loading,
    Scroll
  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.slide-enter-active, .slide-leave-active {
  transition: all 0.5s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

.fixedBox {
  background-color: #f5f5f5;

  .fixedtop {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    z-index: 99

    .header {
      height: 128px;
      background-color: #1081d1;
      color: #ffffff;
      padding: 0 3%;
      display: flex;
      justify-content: space-between;

      .icon-back1 {
        font-size: 48px;
        margin-top: 60px;
      }

      .txt {
        font-size: 34px;
        margin-top: 60px;
        text-align:center;
        overflow-ellipsis(440px)
        line-height 40px;
      }

      .add {
        font-size: 30px;
        color: #ffffff;
        margin-top: 60px;
      }
    }
  }

  .seller {
    padding: 0 10px;
    height: 45px;
    line-height: 50px;
    border: 1px solid #fff;
    color: #fff;
    display: inline-block;
    font-size: 24px;
    vertical-align: top;
    text-align: center;
    margin-left: 10px;
  }

  .userimg {
    width: 100px;
    height: 100px;

    img {
      width: 100%;
      height: 100px;
    }
  }
  .nominate-content{
    position: absolute
    width: 100%
    height 100%
    overflow: hidden
  }

  .communbox {
    padding: 130px 20px 100px 20px;
    .border{
      width:100%;
    }
  }

  .touxiang {
    display: inline-block;
  }

  .comtxt {
    display: inline-block;
    margin-left: 20px;
    padding: 25px;
    vertical-align: top;
    border: 2px solid #ccc;
  }

  .sanjiao {
    height: 0;
    border-top: 10px solid transparent;
    border-right: 20px solid #1081d1;
    border-bottom: 10px solid transparent;
    position: absolute;
    left: -20px;
    top: 25px;
  }

  .comboxbgOne {
    background-color: #1081d1;
    color: #fff;
    border-radius: 8px;
    margin-top: 15px;
  }

  .message{
    max-width: 70%;
  }

  .messageimg{
    max-width: 35%;
  }

  .triangle {
    display: block;
    width: 0;
    height: 0;
    border-width: 15px;
    border-style: solid;
    border-color: transparent #1081d1 transparent transparent;
    position: absolute;
    top: 20px;
    left: -30px;
  }

  .triangle:after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-width: 15px;
    border-style: solid;
    border-color: transparent #1081d1 transparent transparent;
    position: absolute;
    top: -15px;
    left: -13px;
  }

  .others {
    float: left;
    width: 620px;
    .contentimg {
        width 100%
        height 100%
      }
  }

  .mys {
    float: right;
    width: 620px;

    .touxiang {
      float: right;
    }

    .comboxbgOne {
      background-color: #fff;
      color: #333;
      .contentimg {
        width 100%
        height 100%
      }
    }

    .comtxt {
      float: right;
      margin-right: 25px;
      margin-left: 0;
    }

    .triangle {
      border-color: transparent transparent transparent #ccc;
      right: -30px;
      left: auto;
    }

    .triangle:after {
      border-color: transparent transparent transparent #fff;
      right: -13px;
      left: auto;
    }
  }

  .comlodemessage {
    position: fixed;
    bottom: 0;
    left: 0;
    font-size: 0;
    width: 94%;
    padding: 15px 3%;
    background-color: #fff;

    .inblock {
      display: inline-block;
      font-size: 18px;
      vertical-align: middle;
    }

    .comInput {
      width: 530px;

      input {
        width: 96%;
        padding: 0 2%;
        border: 1px solid #ccc;
        height: 65px;
        font-size: 26px;
      }
    }

    .comImg {
      width: 60px;
      height: 50px;
      margin: 0 20px;
      position: relative
      img {
        width: 100%;
      }
      .addbtnipn{
        width: 60px;
        height: 50px;
        position: absolute
        top: 0
        left:0
        opacity:0
      }

    }

    .sublimes {
      color: #1081d1;
      width: 80px;
      height: 70px;
      line-height: 70px;
      font-size: 30px;
      text-align: center;
      position: absolute
      z-index:8
      background:#fff
    }
  }

  .comTims {
    width: 100%;
    text-align: center;
    float: left;
    margin: 20px 0 20px 0;

    p {
      display: inline-block;
      padding: 10px 20px;
      color: #999;
      background-color: #e6e6e6;
      border-radius: 8px;
      font-size: 22px;
    }
  }
}
</style>
