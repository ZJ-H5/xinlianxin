<template>
  <transition name="slide">
    <div class="accountInform">
      <div class="fixedtop">
        <m-header :title="title" :headerflag="true"></m-header>
      </div>
      <ul class="setlu clr">
        <li class="pl3 pr3 flex head">
          <span>头像</span>
          <span>
            <img class="headimg" v-lazy="headUrl" />
            <i class="iconfont icon-right"></i>
          </span>
          <input class="inputfile" type="file" name="file" @change="inputfile" style="height:56px;">
        </li>
        <router-link :to="{name:'changeCompanyName',query:{userName:this.userName}}" class="pl3 pr3 flex" tag="li">
          <span>公司名称</span>
          <span>
            <span class="phonenum mr10">{{userName}}</span>
            <i class="iconfont icon-right"></i>
          </span>
        </router-link>
        <router-link :to="{name:'ChangePhoneA',query:{phone:this.phone}}" class="pl3 pr3 flex" tag="li">
            <span>更换手机</span>
            <span>
               <span class="phonenum mr10">{{phone | phoneDoing}}</span>
              <i class="iconfont icon-right"></i>
            </span>
        </router-link>
        <router-link to="/changePassw" class="pl3 pr3 flex" tag="li">
            <span>修改密码</span>
            <i class="iconfont icon-right"></i>
        </router-link>
      </ul>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import {AppgetHeadUrl, AppchangeHeadUrl} from 'api/set'
import {fileurl} from 'api/hosturl'
import {OK_TRUE} from 'api/conflg'
import {updatefile} from 'common/js/updatefile'
export default {
  data () {
    return {
      title: '帐号信息',
      headUrl: '',
      phone: '',
      userName: ''
    }
  },
  created () {
    this._AppgetHeadUrl()
  },
  filters: {
    phoneDoing: function (val) {
      if (!val) return
      return val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
  },
  methods: {
    inputfile (e) {
      let formData = updatefile(e)
      this.$http.post(
        fileurl,
        formData
      ).then((res) => {
        AppchangeHeadUrl({headUrl: res.data.data.split(',')[0]})
          .then(err => {
            if (err.code === OK_TRUE) {
              this.$vux.toast.text('上传成功！', 'middle')
              this._AppgetHeadUrl()
            } else {
              this.$vux.toast.text(err.msg, 'middle')
            }
          })
      })
        .catch(err => {
          this.$vux.toast.text(err.msg, 'middle')
        })
    },
    _AppgetHeadUrl () {
      AppgetHeadUrl()
        .then(res => {
          if (res.code === OK_TRUE) {
            this.headUrl = res.data.headPic
            this.phone = res.data.phone
            this.userName = res.data.userName
            this.$store.dispatch('loginheadimgAction', this.headUrl)
            this.$store.dispatch('loginheadnameAction', this.userName || this.phone)
          } else {
            this.$vux.toast.text(res.msg, 'middle')
          }
        })
        .catch(err => {
          this.$vux.toast.text(err.msg, 'middle')
        })
    }
  },
  components: {
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

  .accountInform
    .fixedtop
      position fixed
      left 0px
      top 0px
      width 100%
      z-index 9
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
    .setlu
      position relative
      padding-top 128px
      .inputfile
        width: 100%
        height 90px
        background: #ccc
        position: absolute
        left: 0
        top: 0
        opacity 0

      background-color #ffffff
      li
        height 90px
        line-height 90px
        justify-content space-between
        border-bottom 1px solid #e6e6e6
        color #333333
        font-size 30px
        align-items center
        .icon-right
          vertical-align middle
          color #666666
          padding 25px 0px
        .phonenum
          color #333333
          font-size 30px
          vertical-align middle
      .head
        height 130px
        line-height 130px
        position relative
        .headimg
          width 85px
          height 85px
          border-radius 45px
          margin-right 10px
          vertical-align middle
</style>
