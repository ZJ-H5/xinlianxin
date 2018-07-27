<template>
  <div class="pjsm">
    <div class="detail-head pl3 tc pr3 relative">
      <a href="javascript:;" class="iconfont icon-back1 fs48 left cfff" @click="goback"></a>
      <span class="fs36 cfff">评价说明</span>
    </div>
    <div class="pt20 pb20 bgf pr3 pl3">
      <table class="fs28 lh50">
        <tr>
          <td width="40%" class="tr c0">网站综合评分：</td>
          <td>{{pjlist.total}}</td>
        </tr>
        <tr>
          <td  width="40%" class="tr c0">
            服务等级：
          </td>
          <td>
            {{pjlist.caculateServiceLevel}}
          </td>
        </tr>
        <tr>
          <td  width="40%" class="tr c0">
            销售等级：
          </td>
          <td>
            <p>
              <span class="mr10">成交笔数 {{pjlist.ClinchPenNumber}}</span>   <span>销售金额  {{pjlist.total_sales}}</span>
            </p>
           <p>
             实单率 {{pjlist.caculateRateOfSingleEnd}}%
           </p>

          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import {pingfendo} from 'api/interfacemethod'
export default {
  data(){
    return{
      getParentId:this.$route.query.companyId,
      pjlist:''
    }
  },
  methods: {
    goback () {
      this.$router.replace({name:'introduce',params:{sellerId:this.getParentId}});
    },
    _pingfendo(){
      pingfendo({getParentId:this.getParentId})
        .then((res) => {
          if(res.code==1){
            this.pjlist=res.data;
          }
        }).catch((error) => {
          console.log(error)
        })
    }
  },
  mounted:function(){
    this._pingfendo()

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .pjsm
    .detail-head
      background: #1081d1
      height: 128px
      line-height: 128px
      a
        line-height: 128px;
</style>
