<template>
  <transition name="slide">
  <div class="changePhoneA">
    <div class="fixedtop">
      <m-header :title="title"  :headerflag="true"></m-header>
    </div>
    <p class="changept tc c6 "><i>*</i>更换前确保安全，需先验证原手机号码</p>
    <ul class=" clr">
      <li class="pl3 pr3 loginli">
        <span class="fs30 c3 changel">原手机号：</span>
        <span class="fs30 c3 changer">{{params.phone | phoneDoing}}</span>
      </li>
      <li class="pl3 pr3 loginli clr">
        <span class="fs30 c3 changel">短信验证码：</span>
        <input class="inp yzminp"
         type="text"
         v-validate="'required|code'"
        v-model="params.code"
        @blur="inputchange()"
        name="code"
         placeholder="请输入验证码"/>
        <a class="right yzma" v-if="!codeDisabled" @click="sendcodes">获取验证码</a>
        <a class="right yzma disabled" v-if="codeDisabled" >{{time+'s'}}</a>
      </li>
    </ul>
    <div class="lgbtn pl3 pr3">
      <!-- to="changePhoneB" -->
      <a class="lgbtna tc"  @click="next">下一步</a>
    </div>
    <p class="mt20 c6 pl3 pr3 changeptxt">说明：更换手机后，您的原手机号将不能用于登录，必须使用更换后的手机号进行登录</p>
  </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import {nextstep} from 'api/set'
import {OK_TRUE, itemval} from 'api/conflg'
import {sendcode} from 'api/login'
import {EXP} from 'api/exp'
export default {
  data () {
    return {
      title: '更换手机',
      params: {
        phone: '',
        code: ''
      },
      codeDisabled: false,
      time: itemval
    }
  },
  created () {
    this.params.phone = this.$route.query.phone
    if (!this.params.phone) {
      this.$vux.toast.text('系统异常', 'middle')
      this.$router.push('accountInform')
    }
  },
  filters: {
    phoneDoing: function (val) {
      if (!val) return
      return val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
  },
  methods: {
    next () {
      if (!EXP('code', this.params.code)) {
        this._validator('code')
        return
      }
      this._nextstep()
    },
    inputchange () {
      this._validator('code')
    },
    sendcodes () {
      let val = this.params.phone
      if (!EXP('phone', val)) {
        this._validator('phone')
        return
      }
      sendcode({phone: val})
        .then((res) => {
          res.code === OK_TRUE
            ? this._send()
            : this.$vux.toast.text(res.msg, 'middle')
        }).catch((error) => {
          this.$vux.toast.text(error, 'middle')
        })
    },
    _nextstep () {
      nextstep(this.params)
        .then((res) => {
          if (res.code === OK_TRUE) {
            window.clearInterval(this.interval)
            this.$router.push('changePhoneB')
          } else {
            this.$vux.toast.text(res.msg, 'middle')
          }
        })
        .catch(err => {
          this.$vux.toast.text(err, 'middle')
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
    MHeader
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

  .changePhoneA
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
          margin-top 60px
        .txt
          font-size 36px
          margin-top 60px
          margin-left -20px
        .add
          font-size 30px
          color #ffffff
          margin-top 60px
    .changept
      font-size 24px
      margin-top 128px
      height 80px
      line-height 80px
      i
        color #ff0000
    ul
      .loginli
        background-color #ffffff
        border-top 1px solid #e6e6e6
        border-bottom 1px solid #e6e6e6
        height 85px
        line-height 85px
        margin-bottom 15px
        .inp
          width 290px
          height 73px
          padding-top 5px
          vertical-align middle
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
        .changel
          vertical-align middle
          width 185px
          display inline-block
        .changer
          vertical-align middle
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
    .changeptxt
      font-size 24px
      line-height 32px
</style>
