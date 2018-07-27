<template>
  <div class="changePassw">
    <div class="fixedtop">
      <div class="header">
          <m-header :title="head" :headerflag="true"></m-header>
        </div>
    </div>
    <ul class=" clr">
      <li class="pl3 pr3 loginli">
        <span class="fs30 c3 changel">原密码：</span>
        <input class="inp"
        v-validate="'required|oldpassword'"
        v-model="typename[0].val"
        @blur="inputchange(0)"
        name="oldpassword"
        type="password"
         placeholder="请输入原始密码"/>
      </li>
      <li class="pl3 pr3 loginli">
        <span class="fs30 c3 changel">新密码：</span>
        <input class="inp"
        v-validate="'required|password'"
        v-model="typename[1].val"
        @blur="inputchange(1)"
        name="password"
        type="password"
         placeholder="请输入新密码"/>
      </li>
      <li class="pl3 pr3 loginli">
        <span class="fs30 c3 changel">确认新密码：</span>
        <input class="inp"
        v-validate="'required|passwordtwo'"
        v-model="typename[2].val"
        @blur="inputchange(2)"
        name="passwordtwo"
        type="password"
         placeholder="再次输入新密码"/>
      </li>
    </ul>
    <div class="lgbtn pl3 pr3" @click="register"><a class="lgbtna tc">保存</a></div>
    <div class="loading-container" v-show="loading">
        <loading :loadflag="loading"></loading>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import Loading from 'base/loading/loading'
import {EXP, TYPE_NAME} from 'api/exp'
import {OK_TRUE} from 'api/conflg'
import {AppupdatePwd} from 'api/set'
export default {
  data () {
    return {
      head: '修改登录密码',
      typename: [
        {name: 'oldpassword', flag: false, val: ''},
        {name: 'password', flag: false, val: ''},
        {name: 'passwordtwo', flag: false, val: ''}
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.state.zj.updatedloading
    }
  },
  methods: {
    inputchange: function (index) {
      this._validator(index)
    },
    // 提交
    register: function () {
      let flag = this.typename.every((item) => EXP(item.name, item.val))
      if (!flag) {
        let newindex = this.typename.findIndex((item) => item.name === TYPE_NAME(item.name, item.val))
        this._validator(newindex)
        return
      }
      if (this.typename[2].val !== this.typename[1].val) {
        this.$vux.toast.text('两次密码输入不一致', 'middle')
        return
      }
      AppupdatePwd(
        {oldPwd: this.typename[0].val, newPwd: this.typename[1].val}
      )
        .then((res) => {
          res.code === OK_TRUE
            ? this.$router.push('/login')
            : this.$vux.toast.text(res.msg, 'middle')
        }).catch((error) => {
          this.$vux.toast.text(error, 'middle')
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
    }
  },
  components: {
    Loading,
    MHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .changePassw
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
          width 60%
          height 73px
          padding-top 5px
          vertical-align middle
        .changel
          vertical-align middle
          width 185px
          display inline-block
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
