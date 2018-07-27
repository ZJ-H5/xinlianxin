<template>
    <div class="uploadFile">
      <div class="head">
        <div class="detail-head pl3 tc pr3 relative clr">
          <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
          <span class="fs36 cfff">查看合同附件</span>
        </div>
      </div>
      <div class="content">
        <div class="uploadbx">
          <ul class="uploadul clr"  v-if="filelist.length>0">
            <li class="uploadli" v-for="item in filelist"><span>
            <img :src="item"></span>
            </li>
          </ul>
          <p v-if="filelist.length==0" class="pt20 pb20 tc">
            暂无数据
          </p>
        </div>

      </div>

    </div>
</template>

<script type="text/ecmascript-6">
  import {saveAppuploaddo} from 'api/interfacemethod'
  import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      imgurl: require('./uploada.png'),
      file:'',
      filelist:this.$route.query.contract?this.$route.query.contract:[],
    }
  },
  activated(){
    console.log(this.filelist)
    if(this.$route.query.contract){
      this.filelist=this.$route.query.contract.split(',')
    }
  },
  methods: {
    goback () {
        this.$router.back()
      this.filelist=[]
    }

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .uploadFile
    .head
      position fixed
      top 0
      left 0
      width 100%
      z-index 999
    .content
      color #333
      .uploadbx
        background-color #ffffff
        .uploadul
          margin-left -80px
          padding 25px 3% 25px
          .uploadli
            width 180px
            height 150px
            float left
            margin-left 80px
            position relative
            margin-bottom 50px
            span
              width 180px
              height 150px
              img
                width 100%
                height 100%
            i
              position absolute
              top 0px
              right 0px
              font-size 24px
              color #666
              display inline-block
              width 50px
              height 50px
              bg-image('close')
              background-size:100% 100%
            .addbtn
              width 100px
              height 100px
              margin 25px 0 0 40px
              position relative
              .addbtnbg
                width 100px
                height 100px
                display inline-block
                bg-image('addmore')
                background-size 100px 100px
              .addbtnipn
                width 100px
                height 100px
                position absolute
                left 0px
                top 0px
                opacity 0
</style>
