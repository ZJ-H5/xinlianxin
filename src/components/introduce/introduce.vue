<template>
  <div class="introduce pb120">
    <div class="bgf pl3 pr3 mb20">
      <p class="fs30 c0 lh80">
        公司经营状况
      </p>
      <div class="fs25 pb20">
        <div class="clr">
          <p class="flex pb30 w-60">
            <span class="c6 z-title ">经营年限</span>
            <span class="ml20 flex-1 c0">{{tUserCompany.operatingAge}}年</span>
          </p>
          <p class="flex pb30 w-40">
            <span class="c6 z-title">库存来源</span>
            <span class="ml20 flex-1 c0">{{tUserCompanyDetails.source?tUserCompanyDetails.source:''}}</span>
          </p>
        </div>
        <div class="clr">
          <p class="flex pb30 w-60">
            <span class="c6 z-title ">规模</span>
            <span class="ml20 flex-1 c0">{{tUserCompanyDetails.scale+'人'}}</span>
          </p>
          <p class="flex pb30 w-40">
            <span class="c6 z-title">卖家类型</span>
            <span class="ml20 flex-1 c0" v-if="tUserCompany.sellerType==0">
            代理商
            </span>
            <span class="ml20 flex-1 c0" v-else-if="tUserCompany.sellerType==1">
            原厂
            </span>
            <span class="ml20 flex-1 c0" v-else-if="tUserCompany.sellerType==2">
            原厂
            </span>
          </p>
        </div>
        <div class="clr">
          <p class="flex pb30 w-60">
            <span class="c6 z-title ">信息化水平</span>
            <span class="ml20 flex-1 c0">{{tUserCompanyDetails.informationLevel}}</span>
          </p>
          <p class="flex pb30 w-40">
            <span class="c6 z-title">现货/期货</span>
            <span class="ml20 flex-1 c0">{{tUserCompanyDetails.goodsType}}</span>
          </p>
        </div>
        <div class="clr">
          <p class="flex pb30 w-60">
            <span class="c6 z-title ">主营品牌</span>
            <span class="ml20 flex-1 c0">{{tUserCompanyDetails.productBrand}}</span>
          </p>
          <p class="flex pb30 w-40">
            <span class="c6 z-title">备注</span>
            <span class="ml20 flex-1 c0">{{tUserCompanyDetails.remark}}</span>
          </p>
        </div>
        <div class="clr">
          <p class="flex pb30">
            <span class="c6 z-alltitle">办事处</span>
            <span class="ml20 flex-1 c0">{{tUserCompanyDetails.office}}</span>
          </p>
        </div>
        <div class="clr">
          <p class="flex pb30">
            <span class="c6 z-alltitle">公司地址</span>
            <span class="ml20 flex-1 c0">{{tUserCompanyDetails.companyAddress}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="bgf pl3 pr3 mb20">
      <p class="fs28 c0 lh80">
        工商信息
      </p>
      <div class="fs25">
        <div class="clr">
          <p class="flex pb20">
            <span class="c6 z-alltitle">成立日期</span>
            <span class="ml20 flex-1 c0">{{tUserCompanyDetails.foundTime|formatDate}}</span>
          </p>
        </div>
        <div class="clr">
          <p class="flex pb20">
            <span class="c6 z-alltitle">经营状态</span>
            <span class="ml20 flex-1 c0">{{tUserCompanyDetails.manageStatus}}</span>
          </p>
        </div>
        <div class="clr">
          <p class="flex pb20">
            <span class="c6 z-alltitle">注册资金</span>
            <span class="ml20 flex-1 c0">{{tUserCompanyDetails.registeredCapital}}万人民币</span>
          </p>
        </div>
        <div class="clr">
          <p class="flex pb20">
            <span class="c6 z-alltitle">法人</span>
            <span class="ml20 flex-1 c0">{{tUserCompanyDetails.legalPerson}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="bgf pl3 pr3 mb20">
      <p class="fs28 c0 lh80">
        公司账户信息
      </p>
      <div class="fs25">
        <div class="clr">
          <p class="flex pb20">
            <span class="c6 z-alltitle">银行账户</span>
            <span class="ml20 flex-1 c0">{{tUserCompanyDetails.bankCode}}</span>
          </p>
        </div>
        <div class="clr">
          <p class="flex pb20">
            <span class="c6 z-alltitle">开户行</span>
            <span class="ml20 flex-1 c0">{{tUserCompanyDetails.bankName}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="bgf pl3 pr3 mb20 pb20">
      <p class="fs28 c0 lh80">
        公司简介
      </p>
      <p class="lh50 c0" v-html="tUserCompanyDetails.briefIntroduction">

      </p>
      <div class="imgList">
        <img :src="p" alt="" v-for="p in picList" class="z-gsjjimg mb10"/>
      </div>
     <!-- <p class="lh50 c0">
        公司地址：{{tUserCompanyDetails.companyAddress}}
      </p>-->
    </div>
  </div>
</template>
<script>
import {sellerUserDetailsdo} from 'api/interfacemethod'
import {formatDate} from 'api/time'
export default {
  data () {
    return {
      picList: [],
      /*companyId: this.$route.params.sellerId || this.$route.query.companyId,*/
      total: '',
      tUserCompanyDetails: '',
      followNum: '',
      service: '',
      volume: '',
      tUserCompany: '',
      commentTotalS: ''
    }
  },
  computed:{
    companyId(){
      let id=this.$route.params.sellerId || this.$route.query.companyId
      if(id){
        return id
      }else{
        return this.$store.state.jm.companyId
      }
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  activated(){
    if (this.companyId) {
      this._sellerUserDetailsdo()
    } else {
      this.$vux.toast.text('未登录，无法查看', 'middle')
      setTimeout(() => {
        this.$router.push('/recommend/nominate')
      }, 1000)
      return false
    }
  },
  created () {
    console.log(this.companyId)
    if (this.companyId) {
      this._sellerUserDetailsdo()
    } else {
      this.$vux.toast.text('未登录，无法查看', 'middle')
      setTimeout(() => {
        this.$router.push('/recommend/nominate')
      }, 1000)
      return false
    }
  },
  methods: {
    _sellerUserDetailsdo () {
      sellerUserDetailsdo({
        // userId:this.userId,
        companyId: this.companyId
      }).then((res) => {
        console.log(1111)
        this.tUserCompanyDetails = res.data.tUserCompanyDetails // 公司详情信息
        this.total = res.data.total // 网站评分
        this.followNum = res.data.followNum // 关注数量
        this.service = res.data.service // 服务
        this.volume = res.data.volume // 销量
        this.tUserCompany = res.data.tUserCompany // 公司信息
        this.commentTotalS = res.data.commentTotalS// 买家评分
        let list=res.data.companylog.company_image_path.split(',')
        console.log(list)
        this.picList=list//公司图片列表
      }).catch((res) => {})
    }
  },
  components: {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .introduce
    height 9rem
    overflow auto
    .z-title
      display: inline-block
      width: 42%
    .w-60
      width 60%
      float left
    .w-40
      width: 40%
      float left
    .z-alltitle
      width: 25%
    .imgList
      margin-left -5px
      .z-gsjjimg
        width:30%;
        margin-left 10px
</style>
