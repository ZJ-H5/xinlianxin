<template>
  <transition name="slide">
  <div class="forgetPassw">
    <div class="fixedtop">
      <div class="header">
          <m-header :title="head" :headerflag="true"></m-header>
        </div>
    </div>
    <ul class=" clr">
      <li class="pl3 pr3 loginli">
        <i class="iconfont icon-phone ml20 mr20"></i>
        <input class="inp"
        v-validate="'required|phone'"
        v-model="typename[0].val"
        @blur="inputchange(0)"
        name="phone"
        type="text" placeholder="请输入手机号码/用户名"/>
      </li>
      <li class="pl3 pr3 loginli clr">
        <i class="iconfont icon-youxiang ml20 mr20"></i>
        <input class="inp yzminp" type="text"
        v-validate="'required|code'"
        v-model="typename[1].val"
        @blur="inputchange(1)"
        name="code"
         placeholder="请输入验证码"/>
        <a class="right yzma" v-if="!codeDisabled" @click="sendcodes">获取验证码</a>
        <a class="right yzma disabled" v-if="codeDisabled" >{{time+'s'}}</a>
      </li>
      <li class="pl3 pr3 loginli">
        <i class="iconfont icon-mima ml20 mr20"></i>
        <input class="inp"
        v-validate="'required|password'"
        v-model="typename[2].val"
        @blur="inputchange(2)"
        name="password"
         type="password" placeholder="请输入密码"/>
      </li>
      <li class="pl3 pr3 loginli">
        <i class="iconfont icon-mima ml20 mr20"></i>
        <input class="inp" type="password"
        v-validate="'required|passwordtwo'"
        v-model="typename[3].val"
        @blur="inputchange(3)"
        name="passwordtwo"
         placeholder="请再次输入密码"/>
      </li>
    </ul>
    <div class="lgbtn pl3 pr3" @click="register"><a class="lgbtna tc">{{head}}</a></div>
    <div class="tc mt40">
      <input class="mr20 regcheck newInput" type="checkbox" v-model="deal" />
      <router-link  class="reg-link" to="/regAgreement">《IC猫用户注册协议》</router-link>
    </div>
    <div class="loading-container" v-show="loading">
        <loading :loadflag="loading"></loading>
      </div>
  </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import {sendcode, registerUser} from 'api/login'
import {OK_TRUE, itemval} from 'api/conflg'
import Loading from 'base/loading/loading'
import {EXP, TYPE_NAME} from 'api/exp'
export default {
  data () {
    return {
      typename: [
        {name: 'phone', flag: false, val: ''},
        {name: 'code', flag: false, val: ''},
        {name: 'password', flag: false, val: ''},
        {name: 'passwordtwo', flag: false, val: ''}
      ],
      time: itemval,
      codeDisabled: false,
      deal: false,
      interval: null,
      head: '注册'
    }
  },
  computed: {
    loading () {
      return this.$store.state.zj.updatedloading
    }
  },
  created () {
  },
  methods: {
    inputchange: function (index) {
      this._validator(index)
    },
    // 发送验证码
    sendcodes () {
      let phonename = this.typename[0].name
      let val = this.typename[0].val
      if (!EXP(phonename, val)) {
        this._validator(0)
        return
      }
      sendcode({phone: val})
        .then((res) => {
          res.code === OK_TRUE
            ? this._send()
            : this.$vux.toast.text(res.msg, 'middle')
        }).catch((error) => {
          this.$vux.toast.text(error.msg, 'middle')
        })
    },
    // 注册
    register: function () {
      let flag = this.typename.every((item) => EXP(item.name, item.val))
      if (!flag) {
        let newindex = this.typename.findIndex((item) => item.name === TYPE_NAME(item.name, item.val))
        this._validator(newindex)
        return
      }
      if (this.typename[2].val !== this.typename[3].val) {
        this.$vux.toast.text('两次密码输入不一致', 'middle')
        return
      }
      if (!this.deal) {
        this.$vux.toast.text('请勾选注册协议', 'middle')
        return
      }
      registerUser(
        {phone: this.typename[0].val, code: this.typename[1].val, pwd: this.typename[3].val}
      )
        .then((res) => {
          res.code === OK_TRUE
            ? (window.clearInterval(this.interval) && this.$router.push('/login'))
            : this.$vux.toast.text(res.msg, 'middle')
        }).catch((error) => {
          this.$vux.toast.text(error.msg, 'middle')
        })
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
  watch: {

  },
  beforeDestroy () {
    window.clearInterval(this.interval)
  },
  destroyed () {
    window.clearInterval(this.interval)
  },
  components: {
    Loading,
    MHeader
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

  .forgetPassw
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
    .mt40
      margin-top 40px
    .reg-link
      font-size 22px
      color #1081d1
      vertical-align top
    .regcheck
      vertical-align top
</style>
