<template>
  <transition name="slide">
    <div class="login">
      <div class="fixedtop">
        <div class="header clr">
          <m-header :title="title" :headerflag="true"></m-header>
        </div>
      </div>
      <ul class=" clr">
        <li class="pl3 pr3 loginli">
          <i class="iconfont icon-phone ml20 mr20"></i>
          <input class="inp" type="text"
          v-validate="'required|phone'"
          v-model="typename[0].val"
          @blur="inputchange(0)"
          name="phone"
          maxlength="11"
           placeholder="请输入手机号码/用户名"/>
        </li>
        <li class="pl3 pr3 loginli">
          <i class="iconfont icon-mima ml20 mr20"></i>
          <input class="inp" type="password"
          v-validate="'required|password'"
          v-model="typename[1].val"
          @blur="inputchange(1)"
          name="password"
           placeholder="请输入密码"/>
        </li>
      </ul>
      <!-- <div class="tl mt40 pr ml40">
        <input class="mr20 regcheck newInput" type="checkbox" v-model="deal" />
        <span class="reg-link pr" style="top:-3px">记住密码</span>
      </div> -->
      <div class="lgbtn pl3 pr3"><a @click="login" class="lgbtna tc">{{title}}</a></div>
      <div class="lgbt pl3 pr3">
        <router-link  class="lgbt-link" to="/phoneLogin">手机验证登录</router-link>
        <router-link  class="lgbt-link lgbtm" to="/register">用户注册</router-link>
        <router-link  class="lgbt-link" to="/forgetPassw">忘记密码</router-link>
      </div>
      <div class="loading-container" v-show="loading">
        <loading :loadflag="loading"></loading>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import {OK_TRUE} from 'api/conflg'
import Loading from 'base/loading/loading'
import {EXP, TYPE_NAME} from 'api/exp'
import storage from 'api/storage'
import {socketMixin} from '@/api/minxsocket'
export default {
  mixins: [socketMixin],
  data () {
    return {
      typename: [
        {name: 'phone', val: ''},
        {name: 'password', val: ''}
      ],
      type: 0,
      title: '登录',
      val: '',
      params: {},
      deal: false
    }
  },
  created () {
    let storageval = storage.getStore('user')
    storageval &&
    (this.typename[0].val = storageval.phone) &&
    (this.typename[1].val = storageval.pwd || '')
    storageval.pwd && (this.deal = true)
  },
  computed: {
    loading () {
      return this.$store.state.zj.updatedloading
    }
  },
  methods: {
    login () {
      let flag = this.typename.every((item) => EXP(item.name, item.val))
      if (!flag) {
        let newindex = this.typename.findIndex((item) => item.name === TYPE_NAME(item.name, item.val))
        this._validator(newindex)
        return
      }
      this.params = {
        phone: this.typename[0].val,
        pwd: this.typename[1].val,
        type: this.type
      }

      this.$store.dispatch('loginUserdo', this.params)
        .then((res) => {
          if (res.code === OK_TRUE) {
            this.$router.push(this.$store.state.user.redirect)
            this.websockets()
          } else {
            this.$vux.toast.text(res.msg, 'middle')
          }
        }).catch((error) => {
          this.$vux.toast.text(error.msg, 'middle')
        })
    },
    inputchange (index) {
      this._validator(index)
    },
    // 表单验证
    _validator: function (index) {
      let name = this.typename[index].name
      this.$validator.validate(name).then(result => {
        if (!result) {
          let text = this.$validator.errors.first(name)
          this.$vux.toast.text(text, 'middle')
        } else {
          return true
        }
      })
    }

  },
  components: {
    MHeader,
    Loading
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
      transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

  .fade-enter-active, .slide-leave-active
      transition: all 0.5s

  .fade-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

  .login
    background #f5f5f5
    ul
      margin-top 158px
      .loginli
        background-color #ffffff
        border-top 1px solid #e6e6e6
        border-bottom 1px solid #e6e6e6
        height 85px
        line-height 85px
        margin-bottom 15px
        .inp
          width 80%
          height 73px
          padding-top 5px
          vertical-align middle
        .iconfont
          font-size 34px
          vertical-align middle
          color #999999
        .icon-phone
          font-size 38px
    .lgbtn
      margin-top 90px
      .lgbtna
        width 100%
        height 90px
        line-height 90px
        font-size 36px
        display inline-block
        background-color #1081d1
        border-radius 10px
        color #ffffff
    .lgbt
      margin-top 60px
      font-size 0
      .lgbt-link
        color #1081d1
        font-size 22px
        display inline-block
        width 33%
        text-align center
      .lgbtm
        border-left 1px solid #cccccc
        border-right 1px solid #cccccc
        width 32%
</style>
