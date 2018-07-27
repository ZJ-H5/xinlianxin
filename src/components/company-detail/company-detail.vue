  <template>
    <transition name="slide">
    <div class="companydetail">
      <div class="head">
        <zHeader :title="title" :info="info" :msg="msg" :showOrNot="showOrNot" :companyId="parseInt(companyId)"></zHeader>
      </div>
      <div class="content">
        <div class="flex pl3 pr3 flex-align-center pt20 pb20 bgf">
          <img :src="companyImg" alt="" class="z-logo mr20">
          <div class="flex-1">
            <p class="pb20">
          <span class="fs28 c0">
          {{tUserCompany.companyName}}
          </span>
              <span class="z-pf bdr5">{{tUserCompany.operatingAge+'+'}}</span>
            </p>
            <span class="z-blued fs24" v-if="tUserCompany.sellerType==0">
            代理商
          </span>
            <span class="z-blued fs24" v-else-if="tUserCompany.sellerType==1">
            原厂
          </span>
            <span class="z-blued fs24" v-else-if="tUserCompany.sellerType==2">
            贸易商
          </span>
          </div>
          <!--<div class="">
            <p class="pb20">
              <i class="z-gz" v-if="type==0">关注</i>
              <i class="z-gz" v-if="type==1">已关注</i>
            </p>
            <p class="">
              <span>{{followNum?followNum:0}}关注</span>
            </p>
          </div>-->

        </div>
        <div class="bgf pl3 pr3 fs26 pb20  mb20">
          <p class="pb20 pt20 c0">
            <span>网站综合评分  <em class="clred ml20">{{total}}</em></span>
          </p>
          <div class="flex flex-align-center lh50">
            <p class="flex-1 flex flex-align-center">
              <span class="c6 mr20 f24">服务</span>
              <star :starlist="service.level"></star>
            </p>
            <p class="flex-1 flex flex-align-center f24">
              <span class="c6 mr20">销量</span>
              <star :starlist="volume.level"></star>
            </p>
          </div>
          <div class="flex flex-align-center lh50">
            <p class="flex-1 flex flex-align-center">
              <span class="c6 mr20 f24">买家评分</span>
              <span>{{commentTotalS}}</span>
              <!--<span class="z-starbg">
                <i class="z-star" :style="{width:commentTotalS/5*100+'%'}"></i>
            </span>-->
            </p>
            <p class="flex-1 flex flex-align-center">
              <span class="c6 mr20 f24">信誉</span>
              <!--<span class="z-starbg">
                <i class="z-star" :style="{width:tUserCompany.sellerOrderDealQty/5*100+'%'}"></i>
            </span>-->
            </p>
          </div>
        </div>
        <div class="bgf">
          <ul class="detail-tab flex flex-alin-center">
            <router-link to="/companyDetail/introduce" tag="li" replace>
              公司介绍
            </router-link>
            <router-link :to="{name:'hotproduct',params:{companyId:companyId}}" tag="li" replace>
              热卖产品
            </router-link>
            <router-link :to="{name:'tjproduct',params:{companyId:companyId}}" tag="li" replace>
              特价促销
            </router-link>
            <router-link :to="{name:'customerpj',params:{companyId:companyId}}" tag="li" replace>
              买家评论
            </router-link>
          </ul>
        </div>
        <keep-alive>
          <router-view>
          </router-view>
        </keep-alive>
      </div>

      <company-footer :companyUserId="companyUserId" :companyId="companyId" :tel="tel"></company-footer>
    </div>
    </transition>
</template>
<script>
import CompanyFooter from 'components/company-footer/company-footer'
import TopMsg from 'components/top-msg/top-msg'
import {sellerUserDetailsdo} from 'api/interfacemethod'
import {defaultImg} from '@/api/conflg'
import Star from 'base/star/star'
import zHeader from 'components/z-header/z-header'
export default {
  data () {
    return {
      title:'卖家',
      info:true,
      msg: true,
      showOrNot: false,
      userId: 208,
      // companyId: this.$route.params.sellerId || this.$route.query.companyId,
      tid: this.$route.params.tid,
      total: '',
      tUserCompanyDetails: '',
      followNum: '',
      service: '',
      volume: '',
      tUserCompany: '',
      commentTotalS: '',
      type: false,
      yztype: false,
      highNum: 0,
      tel: '',
      companyImg: '',
      companyUserId: ''
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
  components: {CompanyFooter, TopMsg, Star,zHeader},
  created () {
    this._sellerUserDetailsdo()
  },
  methods: {
    followChange (msg) {
      this.followNum = msg
    },
    show () {
      this.showOrNot = true
    },
    dialog () {
      this.showOrNot = false
    },
    goback () {
      this.$router.back()
    },
    _sellerUserDetailsdo () {
      console.log('companyid' + this.companyId)
      sellerUserDetailsdo({
        // userId:this.userId,
        companyId: this.companyId
      }).then((res) => {
        this.tUserCompanyDetails = res.data.tUserCompanyDetails // 公司详情信息
        this.total = res.data.total // 网站评分
        this.followNum = res.data.count_2 // 关注数量
        this.service = res.data.service // 服务
        this.volume = res.data.volume // 销量
        this.tUserCompany = res.data.tUserCompany // 公司信息
        this.commentTotalS = res.data.commentTotalS// 买家评分
        this.yztype = res.data.btn0// 优质
        this.type = res.data.btn1// 关注
        this.highNum = res.data.count_1// 优质数量
        this.tel = res.data.phone// 公司电话
        this.companyImg = res.data.companylog.company_logo ? res.data.companylog.company_logo : defaultImg
        this.companyUserId = res.data.tUserCompany.userId
      }).catch((res) => {})
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('to:',to.path,'from:',from.path,333)
   /* if(this.computed)*/
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('to:',to.path,'from:',from.path,1111)
    if(to.path==='/communication'){
      this.$store.commit('SET_COMPANYID',this.companyId)
    }
    next()
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .slide-enter-active, .slide-leave-active {
    transition: all 0.5s;
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .companydetail
    overflow hidden
    .head
      position fixed
      top 0
      left 0
      width 100%
      z-index 999
      .detail-head
        background: #1081d1
        height: 128px
        line-height: 128px
        a
          line-height: 128px;
  .content
    padding-top 128px
    .z-logo
      width: 100px
      height: 100px
    .detail-tab
      height:80px
      line-height: 80px
      li
        width:25%
        text-align: center
        border-bottom:1px solid #ccc
        font-size:30px;
        &.router-link-exact-active
          color:$font-color-blueb
          border-bottom:1px solid #1081d1
    .z-starbg
      display:inline-block
      position relative
      width:140px;
      height:30px;
      bg-image('star')
      background-size:100% 100%
      .z-star
        display:inline-block
        position absolute
        left 0
        top 0
        width:0;
        height:30px;
        bg-image('stars')
        background-size:140px 30px

</style>
