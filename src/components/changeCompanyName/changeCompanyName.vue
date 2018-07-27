<template>
    <div class="companyName">
      <div class="head">
        <div class="detail-head pl3 tc pr3 relative clr">
          <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
          <span class="fs36 cfff">公司名称</span>
        </div>
      </div>
      <div class="companyContent">
        <div>
          <input type="text" maxlength="20" v-model="name" placeholder="请输入公司名称">
        </div>
        <i class="deleteText" v-show="name!=''" @click="deleteName"></i>
        <p>注意：与芯连芯业务或卖家品牌冲突的名字，芯连芯有权收回</p>
        <a href="javascript:;" class="companySave" @click="save">保存</a>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {appupdateCompanyNamedo} from 'api/interfacemethod'
export default {
  components: {
  },
  data () {
    return {
      name: this.$route.query.userName ? this.$route.query.userName : ''
    }
  },
  created () {
  },
  methods: {
    goback () {
      this.$router.back()
    },
    deleteName () {
      this.name = ''
    },
    _appupdateCompanyNamedo () {
      appupdateCompanyNamedo({
        companyName: this.name
      }).then((res) => {
        if (res.code === 1) {
          this.$store.dispatch('loginheadnameAction', this.name)
          this.$vux.toast.text(res.msg, 'middle')
          this.$router.back()
        } else {
          this.$vux.toast.text(res.msg, 'middle')
          this.$router.back()
        }
      }).catch((res) => {})
    },
    save () {
      this._appupdateCompanyNamedo()
    }

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/mixin';
  .companyName
    .companyContent
      margin-top 160px
      text-align center
      position relative
      .deleteText
        position absolute
        top 10px
        right 10%
        width 50px
        height 50px
        bg-image('close');
        background-size: 100% 100%;
      div
        width:80%;
        height 80px
        border-bottom 1px solid #1081d1
        border-left 1px solid #1081d1
        border-right 1px solid #1081d1
        margin 0  auto 20px
        input
          width:101%;
          height 90%
          line-height 80px
          background-color:#f5f5f5
          font-size 28px
          margin-left -1px
      .companySave
        display inline-block
        width 80%
        height 80px
        background #1081d1
        color #ffffff
        font-size 28px
        line-height 80px
        margin-top 30px
</style>
