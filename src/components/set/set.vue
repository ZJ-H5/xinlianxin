<template>
  <transition name="slide">
    <div class="set">
      <div class="fixedtop">
        <m-header :title="title"
          :headerflag="true"></m-header>
      </div>
      <ul class="setlu clr">
        <router-link to="/accountInform"
          class="pl3 pr3 flex"
          tag="li">
          <span>设置</span>
          <i class="iconfont icon-right"></i>
        </router-link>
        <router-link to="/aboutICCat"
          class="pl3 pr3 flex"
          tag="li">
          <span>关于IC猫</span>
          <i class="iconfont icon-right"></i>
        </router-link>
        <li class="pl3 pr3 flex"
          @click="loginout">
          <span>退出登录</span>
          <i class="iconfont icon-right"></i>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import { OK_TRUE } from 'api/conflg'
import Alert from '@/base/Confirm'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      title: '设置',
      confirmShow: false,
      confirmText: '退出',
      cancelText: '取消'
    }
  },
  methods: {
    loginout () {
      this.confirmShow = true
      Alert({
        title: '',
        content: '确定退出登录吗?',
        close: '取消',
        submit: '退出',
        flag: true,
        closeflag: false
      }).then(res => {
        res && this.onConfirm()
      })
    },
    // ...mapMutations({ setwstype: 'SET_WSTYPE' }),
    ...mapActions([
      'wstypeAction'
    ]),
    onConfirm () {
      this.$store
        .dispatch('loginout')
        .then(res => {
          if (res.code === OK_TRUE) {
            this.confirmShow = false
            this.$bus.emit('close', true)
            this.$router.push('/login')
            this.wstypeAction(false)
          }
          this.$vux.toast.text(res.msg, 'middle')
        })
        .catch(res => {
          this.$vux.toast.text(res.msg, 'middle')
        })
    }
  },
  components: {
    MHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

.fade-enter-active, .slide-leave-active {
  transition: all 0.5s;
}

.fade-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

.set {
  .fixedtop {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;

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
        font-size: 36px;
        margin-top: 60px;
        margin-left: -20px;
      }

      .add {
        font-size: 30px;
        color: #ffffff;
        margin-top: 60px;
      }
    }
  }

  .setlu {
    padding-top: 128px;
    background-color: #ffffff;

    li {
      height: 90px;
      line-height: 90px;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      color: #333333;
      font-size: 30px;
      align-items: center;

      .icon-right {
        vertical-align: middle;
        color: #666666;
        padding: 25px 0px;
      }
    }
  }
}
</style>
