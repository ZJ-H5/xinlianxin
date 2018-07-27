<template>
    <div class="uploadFile">
      <div class="fixedtop">
        <div class="header">
          <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
          <span class="txt">上传合同附件</span>
          <a class="add" @click="saveupload" href="javascript:;">保存</a>
        </div>
      </div>
      <div class="uploadbx">
        <ul class="uploadul clr">
          <li class="uploadli" v-for="(item,index) in filelist"><span>
            <img :src="item"></span>
            <i @click="deleteImg(index)" class="close"></i>
          </li>
          <li class="uploadli">
            <div class="addbtn">
              <span class="addbtnbg"></span>
              <input class="addbtnipn" type="file" @change="getFile($event)" multiple="multiple"/>
            </div>
          </li>
        </ul>
      </div>
      <confirm v-model="confirmShow"
               @on-cancel="onCancel"
               @on-confirm="onConfirm"
               :confirm-text="confirmText"
               :cancel-text="cancelText">
        <p style="text-align:center;">{{('是否保存本次编辑结果?') }}</p>
      </confirm>
    </div>
</template>

<script type="text/ecmascript-6">
  import {addContractdo} from 'api/interfacemethod'
  import {mapMutations} from 'vuex'
  import {Confirm } from 'vux'
  import {mapGetters} from 'vuex'
  import {fileurl} from 'api/hosturl'
  import {updatefile} from 'common/js/updatefile'
export default {
  data () {
    return {
      imgurl: require('./uploada.png'),
      file:'',
      filelist:[],
      confirmShow:false,
      confirmText:'保存',
      cancelText:'不保存',
      orderId:this.$route.query.orderId
    }
  },
  components: {
    Confirm
  },
  /*computed: {
    ...mapGetters(['fileList'])
  },*/
  activated(){
    console.log(this.fileList)
  },
  methods: {
    goback () {
      if(this.filelist.length!=0){
        this.confirmShow=true
      }else{
        this.$router.back()
      }
    },
    onConfirm(){
      this.$vux.toast.text('图片保存成功', 'middle')
      this.$router.back()
    },
    onCancel(){
      this.$router.back()
    },
    getFile(event){
      let formData = updatefile(event)
      this.$http.post(fileurl,
        formData
      ).then((res)=>{
        let array=res.data.data.split(',')
        for (var i = 0; i < array.length; i++) {
          this.filelist.push(array[i])
        }
      },()=>{
      });
    },
    saveupload(){
      addContractdo({
        contract:this.filelist.toString(),
        orderId:this.orderId
      }).then((res)=>{
        if(res.code==1){
          this.$vux.toast.text('保存成功', 'middle')
          this.$router.back()

        }

      }).catch((res)=>{})
    },
    deleteImg(idx){
      this.filelist.splice(idx,1)
    },
    ...mapMutations({setFileList: 'SET_FILELIST'})
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .uploadFile
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
    .uploadbx
      background-color #ffffff
      .uploadul
        margin-left -80px
        padding 25px 3% 80px
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
