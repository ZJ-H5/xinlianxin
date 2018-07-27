<template>
    <div>
      <div class="bgf2">
        <div class="bgf mb20">
          <h1 class="fs30 c0 bdb lh80 pl3 pr3">
            填写询价信息
          </h1>
          <p class="flex lh60 pl3 pr3 tr pt20 pb20">
            <span class="inlineblock w-25 fs28 c6">数量：</span>
            <input type="text" class="z-input ml10" placeholder="请输入需求的数量" v-model="quantity">
          </p>
          <p class="flex lh60 pl3 pr3 tr pt20 pb20">
            <span class="inlineblock w-25 fs28 c6">货期：</span>
            <input type="text" class="z-input ml10" placeholder="请输入货期" v-model="deliveryTime">
          </p>
          <p class="flex lh60 pl3 pr3 tr pt20 pb20">
            <span class="inlineblock w-25 fs28 c6">有效天数：</span>
            <input type="number" class="z-input ml10" placeholder="请输入有效天数" v-model="validTime">
          </p>
          <p class="flex lh60 pl3 pr3 tr pt20 pb20">
            <span class="inlineblock w-25 fs28 c6">备注：</span>
            <input type="text" class="z-input ml10" placeholder="请输入备注" v-model="remark">
          </p>
        </div>
        <div class="pt40 fs0 bgf">
          <a href="javascript:;" class="dialogbtn cancel vux-popup-show" @click="cancel">取消</a>
          <a href="javascript:;" class="dialogbtn confirm " @click="addenquiry">确定</a>
        </div>
      </div>
    </div>
</template>

<script>
  import {addInquirydo} from 'api/interfacemethod'
export default {
    props:['tid','currentuser','tUserCompany'],
    data(){
      return{
        quantity:'',
        deliveryTime:'',
        validTime:'',
        remark:''

    }
  },
  methods: {
    cancel () {
      this.$emit('cancelxj')
    },
    addenquiry(){
      if(this.currentuser===this.tUserCompany.userId){
        this.$vux.toast.text('本商品无法加入购物车', 'middle')
        return false
      }
      if(this.quantity===''){
        this.$vux.toast.text('数量不能为空', 'middle')
        return false
      }
      if(this.deliveryTime===''){
        this.$vux.toast.text('货期不能为空', 'middle')
        return false
      }else if(parseInt(this.deliveryTime)>100||parseInt(this.deliveryTime)<1){
        this.$vux.toast.text('货期范围为1~100', 'middle')
        return false
      }
      if(this.validTime===''){
        this.$vux.toast.text('有效天数不能为空', 'middle')
        return false
      }else if(parseInt(this.validTime)>100||parseInt(this.validTime)<1){
        this.$vux.toast.text('有效天数范围为1~100', 'middle')
        return false
      }
      if(this.remark==''){
        this.$vux.toast.text('备注不能为空', 'middle')
        return false
      }
      this._addInquirydo()
    },
    _addInquirydo(){
      addInquirydo({
        stockId:this.tid,
        quantity:this.quantity,
        deliveryTime:this.deliveryTime,
        validTime:this.validTime,
        remark:this.remark
      }).then((res)=>{
          this.$vux.toast.text(res.msg, 'middle')//询价单信息
          this.$emit('cancelxj')
          this.deletedata()

      }).catch((res)=>{
        this.$vux.toast.text(res.msg, 'middle')//询价单信息
      })
    },
    deletedata(){
      this.quantity=''
      this.deliveryTime=''
      this.validTime=''
      this.remark=''
    }
  }
}
</script>

<style scoped>

</style>
