<template>
  <transition name="slide">
  <div class="phoneLogin">
    <div class="fixedtop">
      <div class="header">
        <div class="header">
          <m-header :title="title" :headerflag="true"></m-header>
        </div>
      </div>
    </div>
    <ul class=" clr">
      <li class="pl3 pr3 loginli">
        <i class="iconfont icon-phone ml20 mr20"></i>
        <input class="inp" type="text"
        v-validate="'required|phone'"
        v-model="params.phone"
        @blur="inputchange('phone')"
        name="phone"
        maxlength="11"
        placeholder="请输入手机号码"/>
      </li>
      <li class="pl3 pr3 loginli clr">
        <i class="iconfont icon-youxiang ml20 mr20"></i>
        <input class="inp yzminp" type="text"
        v-validate="'required|code'"
        v-model="params.code"
        @blur="inputchange('code')"
        name="code"
         placeholder="请输入验证码"/>
        <a class="right yzma" v-if="!codeDisabled" @click="sendcodes">获取验证码</a>
        <a class="right yzma disabled" v-if="codeDisabled" >{{time+'s'}}</a>
      </li>
    </ul>
    <div class="lgbtn pl3 pr3" @click="login"><a class="lgbtna tc" >登录</a></div>
    <div class="loading-container" v-show="loading">
        <loading :loadflag="loading"></loading>
      </div>
  </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import {OK_TRUE, itemval} from 'api/conflg'
import {EXP} from 'api/exp'
import Loading from 'base/loading/loading'
import {sendcode} from 'api/login'
export default {
  data () {
    return {
      title: '手机验证码登录',
      time: itemval,
      codeDisabled: false,
      interval: null,
      deal: false,
      params: {
        phone: '',
        code: '',
        type: 1
      }
    }
  },
  created () {

  },
  computed: {
    loading () {
      return this.$store.state.zj.updatedloading
    }
  },
  methods: {
    sendcodes () {
      if (!EXP('phone', this.params.phone)) {
        this._validator('phone')
        return
      }
      sendcode({phone: this.params.phone})
        .then((res) => {
          res.code === OK_TRUE
            ? this._send()
            : this.$vux.toast.text(res.msg, 'middle')
        }).catch((error) => {
          this.$vux.toast.text(error.msg, 'middle')
        })
    },
    inputchange (name) {
      this._validator(name)
    },
    login () {
      if (!EXP('phone', this.params.phone)) {
        this._validator('phone')
        return
      }
      if (!EXP('code', this.params.code)) {
        this._validator('code')
        return
      }
      this._loginUserdo()
    },
    // 登录
    _loginUserdo () {
      this.$store.dispatch('loginUserdo', this.params)
        .then((res) => {
          if (res.code === OK_TRUE) {
            window.clearInterval(this.interval)
            this.$router.push(this.$store.state.user.redirect)
          } else {
            this.$vux.toast.text(res.msg, 'middle')
          }
        }).catch((error) => {
          this.$vux.toast.text(error.msg, 'middle')
        })
    },

    // 表单验证
    _validator: function (name) {
      this.$validator.validate(name).then(result => {
        if (!result) {
          let text = this.$validator.errors.first(name)
          this.$vux.toast.text(text, 'middle')
        } else {
          return true
        }
      })
    },
    // 验证码定时器
    _send () {
      let me = this
      me.codeDisabled = true
      this.interval = window.setInterval(() => {
        if ((me.time--) <= 0) {
          me.time = itemval
          me.codeDisabled = false
          window.clearInterval(this.interval)
        }
      }, 1000)
    }
  },
  components: {
    MHeader,
    Loading
  },
  beforeDestroy () {
    window.clearInterval(this.interval)
  },
  destroyed () {
    window.clearInterval(this.interval)
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

  .phoneLogin
    .fixedtop
      position fixed
      left 0px
      top 0px
      width 100%
      .header
        height 128px
        background-color #1081d1
        color #ffffff
        padding 0 3%
        display flex
        justify-content space-between
        .icon-back1
          font-size 48px
          // margin-top 60px
        .txt
          font-size 36px
          margin-top 60px
          margin-left -20px
        .add
          font-size 30px
          color #ffffff
          margin-top 60px
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
        .yzminp
          width 60%
        .yzma
          width 160px
          height 60px
          line-height 60px
          text-align center
          color #ffffff
          font-size 28px
          background-color #1081d1
          border-radius 8px
          margin-top 15px
          &.disabled
            background-color #999
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
</style>
