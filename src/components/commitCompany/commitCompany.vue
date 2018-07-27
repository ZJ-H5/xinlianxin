<template>
  <div class="inlineblock">

    <a href="javascript:;" class="z-link c6 inlineblock" @click="goToCommuction(item,type)" v-if="type==1">联系买家</a>
    <a href="javascript:;" class="z-link c6 inlineblock" @click="goToCommuction(item,type)" v-if="type==0">联系卖家</a>
  </div>
</template>

<script>
  import {buyersOrderListdo,buyersOrderDetailsdo,appremainSendGoodsdo} from 'api/interfacemethod'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {OK_TRUE, PAGESIZE2} from 'api/conflg'
  const scroy = -100
  export default {
    props:['item','type'],
    data(){
      return{
      }
    },
    created(){
     console.log(this.item)
    },
    computed: {
      loginData () {
        return this.$store.state.user.loginData
      }
    },
    components: {Loading,Scroll},
    methods: {
      goToCommuction(data,type) {
        if(type==0){
          if (this.loginData.company === '') {
            this.$vux.toast.text('请设置公司名', 'middle')
            setTimeout(() => {
              this.$router.push('/accountInform')
            }, 1000)
            return false
          }
          if (this.loginData.head_pic === '') {
            this.$vux.toast.text('请设置头像', 'middle')
            setTimeout(() => {
              this.$router.push('/accountInform')
            }, 1000)
            return false
          }
          this.$router.replace({
            path: '/communication',
            query: {cid: data.id, companyImg: data.companylogo, companyName: data.company_name? data.company_name:'admin', tel: data.phone}
          })
        }else{
          /*if (data.company === '') {
            this.$vux.toast.text('对方未设置公司名，无法沟通', 'middle')
            /!*setTimeout(() => {
              this.$router.push('/accountInform')
            }, 1000)*!/
            return false
          }
          if (data.head_pic === '') {
            this.$vux.toast.text('对方未设置头像，无法沟通', 'middle')
            /!*setTimeout(() => {
              this.$router.push('/accountInform')
            }, 1000)*!/
            return false
          }*/
          this.$router.replace({
            path: '/communication',
            query: {cid: data.cid, companyImg: data.companylogo, companyName: (data.company_name? data.company_name:'admin'), tel: data.phone}
          })
        }

      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .nominate-content
    position: absolute
    height: 100%
    width 100%
    overflow: hidden
    .box-list
      padding-bottom 240px
    .loadmore
      margin-top 6px

</style>
