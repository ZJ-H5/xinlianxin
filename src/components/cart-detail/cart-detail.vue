<template>
   <div class="cart-detail">
      <div class="bgf mb20" v-for="(item,index) in list" :key="index">
        <p class="clr lh80 bdb pl3 pr3 pt10">
          <input type="checkbox" :disabled="datatype" class="z-checkbox mr20 newInput" v-model="item.isCheckedAll" @change="checkAll(index)">
          <span class="c0 fs30">{{item.title}}</span>
          <!-- <i class="iconfont icon-right fs26 c6"></i> -->
        </p>

        <div v-for="(list,ind) in item.data" :key="ind">
          <div class="pl3 pr3">
            <div class="flex flex-align-center fs28">
              <p class="flex-1 lh80">
                <input type="checkbox" :disabled="datatype" class="z-checkbox mr20 newInput" @change="check(index)" v-model="list.isChecked">
                <span class="c6">型号</span>
                <span class="c0 ml20">{{list.model_code}}</span>
              </p>
              <div>
                <span class="">{{list.type == 1?'采纳加入':'搜索加入'}}</span>
                <input class="z-cartinput"
                 v-model="list.number"
                 type="number"
                 onkeyup="this.value=this.value.replace(/\D/g,'')"
                 @input="countval(list,'count')"
                  placeholder="输入数量">
              </div>

            </div>
            <div class="flex flex-align-center fs28">
              <p class="flex-1 lh80">
                <span class="c6 ml50">品牌</span>
                <span class="c0 ml20">{{list.brand_code}}</span>
              </p>
              <div class="z-inputbox">
                <em class="c0 z-rmb"></em>
                <input type="number"
                @input="countval(list)"
                onkeyup="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){this.value='';}"
                v-model="list.unitcount"
                placeholder="输入单价">
              </div>
            </div>
            <div class="flex flex-align-center fs28">
              <p class="flex-1 lh80">
                <span class="c6 ml50">批号</span>
                <span class="c0 ml20">{{list.batch_code}}</span>
              </p>
            </div>
            <div class="flex flex-align-center fs28">
              <p class="flex-1 lh80">
                <span class="c6 ml50">封装</span>
                <span class="c0 ml20">{{list.encapsulation}}</span>
              </p>
              <span class="clred fs30">¥ {{(list.zongjia) | files}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
import {mapMutations} from 'vuex'
import { Checklist } from 'vux'
export default {
  name: 'cartDetail', // 这个name有什么作用呢
  props: {
    data: {
      type: Array,
      default: null
    },
    datatype: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      list: [],
      fruitIds: [],
      count: 0,
      onpricelist: 0
    }
  },
  created () {
    if (this.datatype) {
      this.list = this.data
      if (!this.data || this.data.length <= 0) {
        this.$vux.toast.text('暂无订单列表', 'middle')
        return
      }
      this.list[0].data.forEach((item, indexs) => {
        item.unitcount = (item.unitcount ? this._filters(item.unitcount) : 0)
        item.number = (item.number ? this._filters(item.number) : 0)
      })
      this.list[0].isCheckedAll = true
      this.countval()
      this.$emit('count', this.count)
      this.$emit('onpricelist', this.list[0].data.length)
    } else {
      this.list = this._sellerListlist(this.data)
    }
  },
  watch: {
    data: function (newval) {
      if (this.datatype) {
        this.list = newval
      } else {
        this.list = this._sellerListlist(newval)
        this.countval()
      }
    },
    count: function (newval) {
      this.$emit('count', newval)
    },
    onpricelist: function (newval) {
      this.$emit('onpricelist', newval)
    },
    list: function (newval) {
      this.$emit('listArr', newval)
    }
  },
  filters: {
    files: function (val) {
      return isNaN(parseInt(val)) === true ? 0 : val.toFixed(2)
    }
  },
  methods: {
    check (index) {
      this.$nextTick(function () {
        let arr = this.list[index].data
        let type = arr.every(item => !item.isChecked)
        if (type) {
          this.list[index].isCheckedAll = false
        }
        let typelength = arr.every(item => item.isChecked)

        if (typelength) {
          this.list[index].isCheckedAll = true
        }

        let typelength2 = arr.filter(item => item.isChecked)
        typelength2.length > 0 ? (this.onpricelist = typelength2.length) : this.onpricelist = 0
      })
    },
    countval (lists, flag, e) {
      this.count = 0
      this.list.forEach((item, indexs) => {
        item.data.forEach((list, ind) => {
          let val = this._filters(list.number) * this._filters(list.unitcount)
          this.$set(list, 'zongjia', val)
          this.count += val
        })
      })
      return this.count
    },
    checkAll (index) {
      let arr = this.list[index]
      // arr.isCheckedAll = !arr.isCheckedAll
      this.onpricelist = arr.data.length
      if (arr.isCheckedAll) {
        arr.data.forEach((item, index) => {
          item.isChecked = true
        })
      } else {
        this.onpricelist = 0
        arr.data.forEach((item, index) => {
          item.isChecked = false
        })
      }
    },
    ...mapMutations({setorderlist: 'ORDER_LIST'}),
    _filters (val) {
      return isNaN(parseInt(val)) === true ? 0 : Number(val)
    },
    _sellerListlist (list) {
      let map = {}
      let dest = []
      list.forEach((ai, index) => {
        ai.number = 1
        ai.unitcount = this.datatype ? 0 : ai.unit_price
        this.$set(ai, 'zongjia', this._filters(ai.number) * this._filters(ai.unitcount))
        this.isChecked = false
        if (!map[ai.sellerId]) {
          dest.push({
            id: ai.sellerId,
            title: ai.company_name,
            data: [ai],
            isCheckedAll: false
          })
          map[ai.sellerId] = ai
        } else {
          dest.forEach((item, indexs) => {
            if (item.id === ai.sellerId) {
              item.data.push(ai)
            }
          })
        }
      })
      return dest
    },
    _check (val) {
      let type = this.list.filter(item => item.isCheckedAll === true)
      let listType = []
      let storelistType = []
      let index = null
      let vals = 0
      let numbervals = 0
      let unitcount = 0
      if (type.length > 1) {
        this.$vux.toast.text('不同买家不能同时下单', 'middle')
        return
      }
      this.list.forEach((item, indexs) => {
        let typelist = item.data.filter(list => list.isChecked)
        if (typelist.length) {
          listType.push(...typelist)
          index = indexs
          storelistType = {
            id: item.id,
            title: item.title,
            data: listType,
            isCheckedAll: item.isCheckedAll
          }
        }
      })
      if (listType.length <= 0) {
        this.$vux.toast.text('请选择一个买家或型号', 'middle')
        return
      }
      if (listType.length > 1 && type.length > 1) {
        this.$vux.toast.text('不同买家不能同时下单', 'middle')
        return
      }
      if (listType.length > 1 && index > 0) {
        this.$vux.toast.text('不同买家不能同时下单', 'middle')
        return
      }

      this.list.forEach((item, indexs) => {
        item.data.forEach((list, ind) => {
          if (list.isChecked) {
            numbervals = this._filters(list.number)
            unitcount = this._filters(list.unitcount)
            vals = this._filters(list.number) * this._filters(list.unitcount)
          }
        })
      })
      if (!numbervals || numbervals === 0) {
        this.$vux.toast.text('请输入数量', 'middle')
        return
      }
      if (!unitcount || unitcount === 0) {
        this.$vux.toast.text('请输入单价', 'middle')
        return
      }
      // if (!vals || vals === 0) {
      //   this.$vux.toast.text('请输入产品价格和单价', 'middle')
      //   return
      // }
      this.setorderlist(storelistType)
      this.$router.push({name: 'checkOrderCart'})
    },
    _checkalls (val) {
      this.list.forEach((item, indexs) => {
        val ? item.isCheckedAll = true : item.isCheckedAll = false
        item.data.forEach((list, ind) => {
          val ? list.isChecked = true : list.isChecked = false
        })
      })
    }

  },
  mounted () {
    this.$on('bridge', (val) => {
      this._check(val)
    })
    this.$on('checkalls', (val) => {
      this._checkalls(val)
    })
  },
  components: {
    Checklist
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.cart-detail
  .z-cartinput
        width 170px
        height 50px
        border 1px solid #ccc
        padding-left 10px
    .z-inputbox
        width 170px
        height 50px
        border 1px solid #ccc
        padding-left 10px
        line-height 50px
        input
          width 80%

</style>
