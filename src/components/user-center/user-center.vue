<template>
    <div class="user-center">
      <div class="user-header pr3 pl3">
        <p class="clr pt60">
          <router-link to="/set" class="iconfont icon-shezhi fs30 cfff right mr20"></router-link>
        </p>
        <div class="pt20 lh50">
          <img v-lazy="headPic" alt="" class="tx vtm mr20">
          <span class="z-witek mr20">{{user.phone}}</span>
          <i class="iconfont icon-star fs50 clyellow vtm"></i>
        </div>
      </div>
      <ul class="flex z-ul bgf mb20 flex-align-center ">
        <router-link tag="li" class="flex-1 lh50" to="/collectModels">
          <div class="tc bdr">
            <p class="c6 fs36">
              {{user.shoucang}}
            </p>
            <p class="fs26">
              收藏型号
            </p>
          </div>
        </router-link>

        <router-link tag="li" class="flex-1 lh50" to="/attentionSellers">
          <div class="tc bdr">
            <p class="c6 fs36">
              {{user.guanzhu}}
            </p>
            <p class="fs26">
              关注卖家
            </p>
          </div>
        </router-link>
        <router-link tag="li" class="flex-1 lh50" to="/highSellers">
          <div class="tc">
            <p class="c6 fs36">
             {{user.youzhi}}
            </p>
            <p class="fs26">
              优质卖家
            </p>
          </div>
        </router-link>
      </ul>
      <ul class="flex z-ul bgf mb20 flex-align-center ">
        <router-link tag="li" class="flex-1 lh50" to="/purchaseOrder/qb">
          <div class="bdr flex flex-align-center flex-justify-center">
            <i class="iconfont icon-caigoudingdan fs70 clblue mr20"> </i>
            <span class="tc clblue fs30">
            采购订单
          </span>
          </div>
        </router-link>
        <li class="flex-1 lh50"  @click="goToSalesOrder">
          <div class="flex flex-align-center flex-justify-center">
            <i class="iconfont icon-xiaoshoubaobiao fs70 clblue mr20"> </i>
            <span class="tc clblue fs30">
              销售订单
            </span>
          </div>
        </li>
      </ul>
      <div class="mb20 pt60 pb60 bgf pr3 pl3">
        <ul class="z-ul33 clr">
          <router-link tag="li" class="lh50 left bdr bdb" to="/myAsk/yxj">
            <div class="tc">
              <img :src="ask" alt="" class="ask">
              <p class="fs26 mt20">
                询价单
              </p>
            </div>
          </router-link>
          <li class="lh50 left bdr bdb"  @click="goToMyOffer">
            <div class="tc">
              <img :src="offer" alt="" class="ask">
              <p class="fs26 mt20">
                报价单
              </p>
            </div>
          </li>
          <router-link tag="li" class="lh50 left  bdb" :to="{path:'/fiction/fictionImmediate'}">
            <div class="tc">
              <img :src="service" alt="" class="ask">
              <p class="fs26 mt20">
                客服中心
              </p>
            </div>
          </router-link>
          <router-link tag="li" class="lh50 left bdr" :to="{path:'/manageAddress'}">
            <div class="tc">
              <img :src="address" alt="" class="ask">
              <p class="fs26 mt20">
                收货地址
              </p>
            </div>
          </router-link>
          <router-link tag="li" class="lh50 left bdr" :to="{path:'/manageBill'}">
            <div class="tc">
              <img :src="invoice" alt="" class="ask">
              <p class="fs26 mt20">
                发票信息
              </p>
            </div>
          </router-link>
          <router-link tag="li" class="lh50 left" to="/manageCompany">
            <div class="tc">
              <img :src="customer" alt="" class="ask">
              <p class="fs26 mt20">
                报关信息
              </p>
            </div>
          </router-link>
        </ul>
      </div>
      <tab></tab>
    </div>
</template>

<script>
import tab from 'components/tab/tab'
import {tiaozhuanMYdo} from 'api/interfacemethod'
import store from '@/store'
export default {
  data () {
    return {
      imgurl: require('./uploada.png'),
      ask: require('./ask@2x.png'),
      address: require('./address@2x.png'),
      customer: require('./customer@2x.png'),
      invoice: require('./invoice@2x.png'),
      service: require('./service@2x.png'),
      offer: require('./offer@2x.png'),
      user: '',
      headPic: ''
    }
  },
  computed:{
    openSeller(){
      return this.$store.state.user.openSeller
    }
  },
  created () {
    this._tiaozhuanMYdo()
  },
  components: {tab},
  methods: {
    _tiaozhuanMYdo () {
      tiaozhuanMYdo({
      }).then((res) => {
        this.user = res.data // 个人账户
        this.headPic = this.user.Photo.headPic
      }).catch((res) => {})
    },
    goToSalesOrder(){
      console.log(this.openSeller)
      if(this.openSeller==1){
        this.$router.push('/salesOrder/salesOrderAll')
      }else{
        this.$vux.toast.text('您没有权限进入卖家中心', 'middle')
        return false;
      }
    },
    goToMyOffer(){
      if(this.openSeller==1){
        this.$router.push('/myOffer/dbj')
      }else{
        this.$vux.toast.text('您没有权限进入卖家中心', 'middle')
        return false;
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .user-center
    .user-header
      height 325px
      bg-image('bg')
      background-size 100%
      .tx
        width 100px
        height 100px
        border-radius 50%
        border:5px solid #fff
    .z-ul
      height 150px
    .z-ul33 li
      width 33%
      height 200px
      display flex
      flex-direction row
      align-items center
      justify-content  center
      .ask
        width 90px
        height 90px
</style>
