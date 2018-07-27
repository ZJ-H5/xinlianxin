<template>
  <div>
    <ul class="footer clr  flex flex-align-center">
      <!--<router-link class="w-15 flex flex-align-center flex-justify-center" v-if="currentuser!==tUserCompany.userId" tag="li" :to="{path:'/communication',query:{cid:tUserCompany.userId,companyImg:companyImg,companyName:tUserCompany.companyName,tel:tel}}">-->
      <li class="w-15 flex flex-align-center flex-justify-center" v-if="currentuser!==tUserCompany.userId" @click="goToCommuction">
          <div class="">
            <p class="">
              <i class="iconfont icon-kefu c0 fs36"></i>
            </p>
            <p class="mt10">
              客服
            </p>
          </div>
      </li>
      <li href="javascript:;" class="w-15 flex flex-align-center flex-justify-center" v-if="currentuser===tUserCompany.userId" @click="sameUserIdClick('本公司无法与本公司对话')">
        <div class="">
          <p class="">
            <i class="iconfont icon-kefu c0 fs36"></i>
          </p>
          <p class="mt10">
            客服
          </p>
        </div>
      </li>
      <router-link :to="{name:'introduce',params:{sellerId:sellerId,buyerId:buyerId,tid:tid}}" tag="li" class="w-15 flex flex-align-center flex-justify-center">
          <div>
            <p>
              <i class="iconfont icon-tab_seller c0 fs36"></i>
            </p>
            <p class="mt10">
              卖家
            </p>
          </div>
      </router-link>
      <li class="w-15 flex flex-align-center flex-justify-center" @click="addsc">
          <div >
            <p>
              <i class="iconfont icon-star2 fs48 clyellow" :class="{'icon-star': collection==1}"></i>
            </p>
            <p class="" v-if="collection==1">
              已收藏
            </p>
            <p class="" v-if="collection==0">
              收藏
            </p>
          </div>
      </li>
      <li class="w-25 bg46adf6 lh100" @click="showCart">
        <a href="javascript:;" class="cfff fs28" >加购物车</a>
      </li>
      <li class="w-15 b34a0ed lh100" @click="showXj">
        <a href="javascript:;" class="cfff fs28" >询价</a>
      </li>
      <li class="w-15 bg1081d1 lh100 z-footOrder">
        <a href="javascript:;" v-if="currentuser===tUserCompany.userId" class="cfff fs28" @click="sameUserIdClick('本商品无法加入购物车')">下单</a>
        <router-link v-if="currentuser!=tUserCompany.userId" :to="{name:'checkOrder',params:{obj:{stockBackups:this.stockBackups,
        tUserCompany:this.tUserCompany,xjid:this.xjid?this.xjid:'',item:this.item,company:'',invoice:''}}}" class="cfff fs28">下单</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import store from '@/store'
// var loginData=store.state.user.loginData
export default {
  props: ['selectShow', 'collection', 'sellerId', 'buyerId', 'stockBackups', 'tUserCompany', 'xjid', 'currentuser', 'tid', 'companyImg', 'tel'],
  data () {
    return {
      userId: '',
      companyId: this.$route.params.sellerId,
      token: this.$route.params.token,
      item: ''
    }
  },
  created () {
    console.log(this.stockBackups)
  },
  computed: {
    loginData () {
      if (typeof (this.$store.state.user.loginData) === 'string') {
        this.$store.state.user.loginData = JSON.parse(this.$store.state.user.loginData)
      }
      return this.$store.state.user.loginData
    }
  },
  components: {},
  methods: {
    goToCommuction () {
      console.log(this.loginData)
      if (!this.loginData) {
        this.$vux.toast.text('未登录，请登录', 'middle')
        setTimeout(() => {
          this.$router.push('/login')
        }, 1000)
        return false
      }
      if (this.loginData.company == '') {
        this.$vux.toast.text('请设置公司名', 'middle')
        setTimeout(() => {
          this.$router.push('/accountInform')
        }, 1000)
        return false
      }
      if (this.loginData.head_pic == '') {
        this.$vux.toast.text('请设置头像', 'middle')
        setTimeout(() => {
          this.$router.push('/accountInform')
        }, 1000)
        return false
      }
      console.log(this.tUserCompany)
      this.$router.replace({path: '/communication', query: {cid: this.tUserCompany.userId, companyId: this.tUserCompany.id, companyImg: this.companyImg, companyName: this.tUserCompany.companyName, tel: this.tel}})
    },
    sameUserIdClick (msg) {
      this.$vux.toast.text(msg, 'middle')
    },
    showCart () {
      this.$emit('cart')
    },
    showXj () {
      this.$emit('xj')
    },
    addsc () {
      this.$emit('addcollect', this.collection)
    },

    ...mapMutations({setAddress: 'SET_ADDRESS'})

  }
}
</script>
<style>
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 100px;
    /*line-height: 100px;*/
    width: 100%;
    background: #fff;
  }

  .footer li {
    text-align: center;
    height:100%;
  }

  .w-15 {
    width: 15%;
  }

  .w-25 {
    width: 25%;
  }

  .bg46adf6 {
    background: #46adf6;
  }

  .b34a0ed {
    background: #34a0ed;
  }

  .bg1081d1 {
    background: #1081d1;
  }
  .weui-icon_toast.weui-icon-success-no-circle:before{
    color:#ffba00;
  }
  .weui-toast__content {
    margin: .5rem 0 .5rem;
  }
  .weui-toast {
    position: fixed;
    z-index: 5001;
    width: 7.6em;
    min-height: 2em;
    top: 2.4rem;
    left: 50%;
    margin-left: -3.8em;
    background: rgba(17, 17, 17, 0.6);
    text-align: center;
    border-radius: .5rem;
    color: #FFFFFF;
  }
  .weui-toast__content{
    font-size:30px;
  }
  .z-footOrder a{
    display: inline-block;
    width:100%;
    height:100%;
  }
</style>
