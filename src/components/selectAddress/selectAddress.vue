<template>
  <div class="selectAddress">
    <div class="fixedtop">
      <div class="header">
        <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
        <span class="txt">选择收货地址</span>
        <router-link to="/manageAddress" class="add">管理</router-link>
      </div>
    </div>
    <ul class="c-fpcont clr">
      <li class="c-fpcontli" v-for="item in list" @click="backorder(item)">
        <div class="addrtxt">
          <p class="fs30 c3 clr">
            <span class="left">{{item.contactName}}</span>
            <span class="right">{{item.contactMobile}}</span>
          </p>
          <p class="fs26 c6"><span class="clred" v-show="item.defaultStatus==1">[默认地址]</span>{{item.provinceName}}{{item.cityName}}{{item.regionName}}{{item.address}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import {buyersAppUserCenterAddressListdo} from 'api/interfacemethod'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      list: '',
      obj: this.$route.params.obj,
      item: ''

    }
  },
  created () {
    this._address()
  },
  methods: {
    goback () {
      this.$router.back()
    },
    _address () {
      buyersAppUserCenterAddressListdo({
      }).then((res) => {
        if (res.code == 1) {
          this.list = res.data.list // 收货地址列表
          this.userId = this.list[0].userId
          console.log(this.list)
        }
      }).catch((res) => {})
    },
    backorder (item) {
      this.setAddress(item)
      this.$router.back()
    },
    ...mapMutations({setAddress: 'SET_ADDRESS'})
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .selectAddress
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
        .add
          font-size 30px
          color #ffffff
          margin-top 60px
    .c-fpcont
      margin-top 128px
      .c-fpcontli
        width 100%
        border-top 1px solid #e6e6e6
        border-bottom 1px solid #e6e6e6
        margin-bottom 20px
        background-color #ffffff
        color #666666
        float left
        .addrtxt
          padding 25px 3% 15px
          border-bottom 1px solid #e6e6e6
          p
            line-height 36px
            margin-bottom 20px
        .seladd
          padding 25px 3%
          .seladdl
            font-size 26px
            input
              margin-right 10px
          .seladdr
            i
              font-size 32px
            .bianji
              margin-right 10px
</style>
