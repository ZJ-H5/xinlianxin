<template>
  <div>
    <ul class="footer clr  flex flex-align-center">
      <li class="w-15 flex flex-align-center flex-justify-center" @click="goToCommuction">
          <div class="">
            <p class="">
              <i class="iconfont icon-kefu c0 fs36"></i>
            </p>
            <p class="mt10">
              客服
            </p>
          </div>
      </li>
      <li class="w-15 flex flex-align-center flex-justify-center" @click="phoneCall">
          <div>
            <p>
              <i class="iconfont icon-custom-phone c0 fs36"></i>
            </p>
            <p class="mt10">
              拨打
            </p>
          </div>
      </li>
      <li class="w-35 bg46adf6" v-if="type" @click="addfollow(3)">
        <p class="lh50 cfff">
          已加关注
        </p>
        <p class="lh50 cfff">
          已有{{followNum?followNum:0}}人关注
        </p>
      </li>
      <li class="w-35 bg46adf6" @click="addfollow(1)" v-if="!type">
        <p class="lh50 cfff" >
          加关注
        </p>
        <p class="lh50 cfff">
          已有{{followNum?followNum:0}}人关注
        </p>
      </li>
      <li class="w-35 b34a0ed" @click="addfollow(4)" v-if="yztype">
        <p class="lh50 cfff" >
          已加优质
        </p>
        <p class="lh50 cfff">
          已有{{highNum?highNum:0}}人加优质
        </p>
      </li>
      <li class="w-35 b34a0ed"  @click="addfollow(2)" v-if="!yztype">
        <p class="lh50 cfff">
          加优质
        </p>
        <p class="lh50 cfff">
          已有{{highNum?highNum:0}}人加优质
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
import {addyzgzdo} from 'api/interfacemethod'
import {Toast, Popup} from 'vux'
import {sellerUserDetailsdo} from 'api/interfacemethod'
export default {
  props: ['companyId', 'tel', 'companyUserId'],
  data () {
    return {
      dialogShow: false,
      qxdialogShow: false,
      yzShow: false,
      qxyzShow: false,
      followNum: '',
      highNum: '',
      type: false,
      yztype: false,
      arrMsg: ['添加关注成功', '取消关注成功', '添加优质成功', '取消优质成功'],
      companyImg: '',
      companyName: '',
    }
  },
  components: {Toast},
  created () {
    this._sellerUserDetailsdo()
  },
  computed:{
    userId(){
      return this.$store.state.user.userId
    },
    loginData () {
      if (typeof (this.$store.state.user.loginData) === 'string') {
        this.$store.state.user.loginData = JSON.parse(this.$store.state.user.loginData)
      }
      return this.$store.state.user.loginData
    }
  },
  methods: {
    goToCommuction (){
      if(parseInt(this.userId)===this.companyUserId){
        this.$vux.toast.text('本公司无法与本公司对话', 'middle')
        return false
      }
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
      this.$router.push({path:'/communication',query:{cid:this.companyUserId,companyId:this.companyId,companyImg:this.companyImg,companyName:this.companyName,tel:this.tel}})
    },
    addfollow (type) {
      if(parseInt(this.userId)===this.companyUserId){
        this.$vux.toast.text('无法加入关注或者优质', 'middle')
        return false
      }else{
        addyzgzdo({
          type: type,
          companyId: this.companyId
        }).then((res) => {
          if (res.code == 1) {
            this.$nextTick(() => {
              this._sellerUserDetailsdo()
              if (type == 1) {
                this.$vux.toast.text(this.arrMsg[0], 'middle')// 添加关注弹窗
              } else if (type == 3) {
                this.$vux.toast.text(this.arrMsg[1], 'middle') // 取消关注弹窗
              } else if (type == 2) {
                this.$vux.toast.text(this.arrMsg[2], 'middle') // 添加优质弹窗
              } else if (type == 4) {
                this.$vux.toast.text(this.arrMsg[3], 'middle') // 取消优质弹窗
              }
            })
          }
        }).catch((res) => {})
      }

    },
    _sellerUserDetailsdo () {
      sellerUserDetailsdo({
        companyId: this.companyId
      }).then((res) => {
        this.$nextTick(() => {
          this.followNum = res.data.count_2 // 关注数量
          this.yztype = res.data.btn0// 优质
          this.type = res.data.btn1// 关注
          this.highNum = res.data.count_1// 优质数量
          this.companyName = res.data.tUserCompany.companyName
          this.companyImg = res.data.companylog.length > 0 ? res.data.companylog[0].company_logo : ''
        })
      }).catch((res) => {})
    },
    phoneCall () {
      window.location.href = 'tel://' + this.tel
    }
  }
}
</script>
<style>
  .footer{
    position: fixed;
    left:0;
    bottom:0;
    height:100px;
    /*line-height: 100px;*/
    width:100%;
    background: #fff;
  }
  .footer li {
    text-align: center;
    height:100%;
  }
  .w-15{
    width:15%;
  }
  .w-25{
    width:25%;
  }
  .bg46adf6{
    background: #46adf6;
  }
  .b34a0ed{
    background: #34a0ed;
  }
  .bg1081d1{
    background: #1081d1;
  }
</style>
