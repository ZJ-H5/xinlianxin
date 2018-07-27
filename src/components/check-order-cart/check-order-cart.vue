<template>
  <transition name="slide">
    <div class="checkOrderCart">
      <m-header :title="title"
        :headerflag="true"></m-header>
      <scroll ref="scroll"
        class="nominate-content"
        :listen-scroll="scrolltype"
        @scroll="scroll"
        :data="orderlist">
        <div>
          <div class="address bgf  lh60  fs30  pl3 pr3 mb20 c6">
            <p class="flex"
              v-if="AddressList && AddressList.id">
              <span class="flex-1">
                收货人：{{AddressList.contactName}}
              </span>
              <span>
                {{AddressList.contactMobile}}
              </span>
            </p>
            <router-link :to="{name:'selectAddress'}"
              class="flex flex-align-center"
              tag="p">
              <span class="flex-1"
                v-if="AddressList && AddressList.id">收货地址：{{AddressList.provinceName}}{{AddressList.cityName}}{{AddressList.regionName}}{{AddressList.address}}</span>
              <span class="flex-1"
                v-if="!AddressList || !AddressList.id">请选择收货地址</span>
              <i class="iconfont icon-right"></i>
            </router-link>
          </div>

          <cart-detail :data="orderlist"
            @count="count"
            @onpricelist="onpricelist"
            :datatype="true"
            ref="cardetail"></cart-detail>

          <div class="mb40">
            <ul class="setlu clr">
              <li class="pl3 pr3 flex"
                @click="dialogpay">
                <span class="flex-1">支付方式</span>
                <div>
                  <span class="c6">{{payfortext}}</span>
                  <i class="iconfont icon-right"></i>
                </div>
              </li>
              <router-link class="pl3 pr3 flex"
                :to="{name:'invoiceManagement'}"
                tag="li">
                <span class="flex-1">发票信息</span>
                <div>
                  <span class="c6">{{bill.type===0 && (bill.invoiceHend + ' 普通发票') || bill.type===1 && (bill.invoiceHend+' 增值税专票') || !bill.type && no}}</span>
                  <i class="iconfont icon-right"></i>
                </div>
              </router-link>
              <router-link class="pl3 pr3 flex"
                :to="{name:'selectCompany'}"
                tag="li">
                <span class="flex-1">第三方信息</span>
                <div>
                  <span class="c6">{{company.customsDeclaration||no}}</span>
                  <i class="iconfont icon-right"></i>
                </div>
              </router-link>
              <router-link to="/uploadFile"
                class="pl3 pr3 flex"
                tag="li">
                <span class="flex-1">上传合同附件</span>
                <div>
                  <span class="c6">{{params.contract?yes:no}}</span>
                  <i class="iconfont icon-right"></i>
                </div>
              </router-link>
              <div style="width: 100%;margin-top: -1px">
                <group>
                  <x-switch title="单价是否含税"
                    v-model="params.priceTaxStatus"
                    :value-map='[0,1]'
                    class="c0"></x-switch>
                </group>
              </div>
              <li class="pl3 pr3">
                <span>优惠金额：</span>
                <div class="z-inputbox inlineblock ml20">
                  <em class="c0 z-rmb"></em><input type="number"
                    class=""
                    placeholder="输入金额"
                    v-model="params.discountAmount">
                </div>
              </li>
              <li class="pl3 pr3">
                <span>付款说明：</span>
                <input type="text"
                  placeholder="请输入付款说明"
                  class="ml20"
                  v-model="params.paymentExplain">
              </li>
              <li class="pl3 pr3">
                <span>货期说明：</span>
                <input type="text"
                  placeholder="请输入付款说明"
                  class="ml20"
                  v-model="params.deliveryExplain">
              </li>
              <li class="pl3 pr3">
                <span>运费说明：</span>
                <input type="text"
                  placeholder="请输入付款说明"
                  class="ml20"
                  v-model="params.freightExplain">
              </li>
              <li class="pl3 pr3">
                <span>买家备注：</span>
                <input type="text"
                  placeholder="请输入付款说明"
                  class="ml20"
                  v-model="params.remark">
              </li>
            </ul>
          </div>

          <div class="bottomval"></div>
        </div>
      </scroll>

      <div class="bgf tr z-tjdd">
        <div class="pl3 lh80">
          <span class="c3 fs30">合计：
            <em>{{oneprice}}片</em>
            <em class="clred">{{countval.toFixed(2)}}</em>
          </span>
          <a class="z-blued ml20"
            @click="order">提交订单</a>
        </div>
      </div>

      <popup position="bottom"
        :value="paymethod"
        @on-cancel="cartDialog">
        <div class="bgf2">
          <div class="bgf mb20">
            <h1 class="fs36 clblue bdb lh120 pl3 pr3 tc fwb">
              支付方式
            </h1>
            <div class=" lh60 pl3 pr3 tr pt20 pb20">
              <label for="payradio_0"
                class="pay_label">
                <span class="inlineblock w-25 fs28 c6 flex-1 tl">{{listname[0].name}}</span>
                <p class="paymethod">
                  <input type="radio"
                    value="0"
                    id="payradio_0"
                    class="payradio"
                    name="paymethod"
                    v-model="other.gogo"
                    @change="linePayTypeEve(0)">
                  <span class="paycheck"></span>
                </p>
              </label>
            </div>
            <div class=" lh60 pl3 pr3 tr pt20 pb20 bdt relative">
              <label for="termTime1"
                class="pay_label">
                <span class="inlineblock fs28 c6  tl ">{{listname[1].name}}</span>
                <input type="text"
                  placeholder="选择最后还款日期"
                  class="selectdate"
                  readonly
                  v-model="other.othertermTime">
                <p class="paymethod">
                  <input type="radio"
                    value="1"
                    id="termTime1"
                    class="payradio"
                    name="paymethod"
                    v-model="other.gogo"
                    @change="linePayTypeEve(1)">
                  <span class="paycheck"></span>
                </p>
                <div class="z-detetime">
                  <group>
                    <datetime v-model="other.othertermTime"
                      format="YYYY-MM-DD"></datetime>
                  </group>
                </div>
              </label>

            </div>
            <div class=" lh60 pl3 pr3 tl pt20 pb20 bdt">
              <span class="inlineblock fs28 c6 ">{{listname[2].name}}</span>
            </div>
            <div class=" lh60 pl3 pr3 tr pt20 pb20"
              v-for="(item,index) in linePayType"
              :key="index">
              <label :for="'linePayType'+index"
                class="pay_label">
                <span class="inlineblock fs28 c6  tl pl30">{{item.name}}</span>
                <p class="paymethod">
                  <input type="radio"
                    :value="item.val"
                    :id="'linePayType'+index"
                    class="payradio"
                    v-model="other.gogo"
                    name="paymethod"
                    @change="linePayTypeEve(item.index,item.name)">
                  <span class="paycheck"></span>
                </p>
              </label>
            </div>
            <div class=" lh60 pl3 pr3 tr pt20 pb20">
              <label for="linePayTypeother"
                class="pay_label pl30">
                <input type="text"
                  placeholder="其他方式"
                  class="pl30 selectdate"
                  v-model="other.others">
                <p class="paymethod">
                  <input type="radio"
                    value="2"
                    id="linePayTypeother"
                    class="payradio"
                    name="paymethod"
                    v-model="other.gogo"
                    @change="linePayTypeEve(2,other.others,true)">
                  <span class="paycheck"></span>
                </p>
              </label>
            </div>
          </div>
          <div class="pt40 fs0 bgf">
            <a href="javascript:;"
              class="dialogbtn cancel vux-popup-show"
              @click="cartDialog">取消</a>
            <a href="javascript:;"
              class="dialogbtn confirm"
              @click="payforsave">保存</a>
          </div>
        </div>
      </popup>

    </div>
  </transition>
</template>

<script>
import {
  Popup,
  XSwitch,
  Group,
  Confirm,
  Radio,
  DatetimeView,
  XButton,
  TransferDom,
  Datetime
} from 'vux'
import MHeader from 'components/m-header/m-header'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import { buyersAppUserCenterAddressList, saveShopCarOrder } from 'api/cart'
import cartDetail from 'components/cart-detail/cart-detail'
import { mapGetters, mapMutations } from 'vuex'
import { OK_TRUE } from 'api/conflg'
let counts = 0
export default {
  directives: {
    TransferDom
  },
  data () {
    return {
      list: [],
      title: '确认订单',
      scrolltype: true,
      oneprice: 0,
      countval: 0,
      paymethod: false,
      pageNum: 1,
      // 收货地址
      AddressList: {},
      params: {
        dataItem: '', //
        priceTaxStatus: 0, // 单位是否含税
        deliveryExplain: '', // 发货说明
        paymentExplain: '', // 付款说明
        remark: '', // 备注
        payType: -1, // 支付方式
        termTime: '', // 最后还款日期
        linePayType: '', // 线下支付方式
        freightExplain: '', // 运费说明
        customsId: '', // 报关id
        receivingAddressId: '', // 收货地址id
        invoiceId: '', // 发票id
        discountAmount: '', // 优惠金额
        contract: '' // 合同
      },
      linePayType: [
        { name: '银行', index: 2, val: 3 },
        { name: '微信', index: 2, val: 4 },
        { name: '支付宝', index: 2, val: 5 }
      ],
      listname: [
        { name: '第三方担保' },
        { name: '账期付款' },
        { name: '线下支付' }
      ],
      other: {
        // 其它支付方式val名字
        others: '',
        // 其它支付方式val判断
        othertype: false,
        // 勾
        gogo: -1,
        // 其它支付方式名字
        more: '',
        // 时间
        othertermTime: '',
        // 支付方式
        type: -1
      },

      no: '未选择',
      yes: '已选择',
      payfortext: '',
      faInformationText: ''
    }
  },
  computed: {
    ...mapGetters([
      'orderlist',
      'bill',
      'payfor',
      'thridInformation',
      'address',
      'company',
      'orderOther',
      'fileList'
    ])
  },
  created () {
    Object.keys(this.address).length !== 0
      ? (this.AddressList = this.address)
      : this._buyersAppUserCenterAddressList()
    this.params.invoiceId =
      Object.keys(this.bill).length !== 0 ? this.bill.id : ''
    this.params.customsId =
      Object.keys(this.company).length !== 0 ? this.company.id : ''
    this.params.contract =
      Object.keys(this.fileList).length !== 0
        ? this.fileList.toString()
        : ''
    this.params.priceTaxStatus = this.orderOther.priceTaxStatus
    this.params.discountAmount = this.orderOther.discountAmount
    this.params.paymentExplain = this.orderOther.paymentExplain
    this.params.deliveryExplain = this.orderOther.deliveryExplain
    this.params.freightExplain = this.orderOther.freightExplain
    this.params.remark = this.orderOther.remark

    this.other = this.payfor
    this._switch(this.other.type)
    this.params.payType = this.other.type
    this.params.termTime = this.other.othertermTime
    this.params.linePayType = this.other.othertype
      ? this.other.others
      : this.other.more
  },

  watch: {
    params: {
      handler: function (val) {
        if (val.discountAmount > this.countval) {
          this.$vux.toast.text('优惠金额不能大于总金额', 'middle')
          val.discountAmount = ''
          this.countval = counts
          return
        }
        this.countval = counts - this._filters(val.discountAmount)
        console.log(
          this.countval,
          this._filters(val.discountAmount),
          this.countval - val.discountAmount
        )
        this.setorderOther(val)
      },
      deep: true
    }
  },
  methods: {
    scroll (posy) {
      console.log(posy)
    },
    order () {
      let val = 0
      let numbervals = 0
      let unitcount = 0
      let paramslist = []
      if (val === 0 || !val) {
        this.orderlist.forEach((item, indexs) => {
          item.data.forEach((list, ind) => {
            paramslist[ind] = [
              list.id.toString(),
              list.stock_id.toString(),
              list.unitcount.toString(),
              list.number.toString()
            ]
            val = this._filters(list.number * list.unitcount)
            numbervals = this._filters(list.number)
            unitcount = this._filters(list.unitcount)
          })
        })
      }
      this.params.receivingAddressId =
      (this.AddressList && this.AddressList.id) || ''
      // if (val === 0 || !val) {
      //   this.$vux.toast.text('请输入产品价格和单价', 'middle')
      //   return
      // }
      if (!numbervals || numbervals === 0) {
        this.$vux.toast.text('请输入数量', 'middle')
        return
      }
      if (!unitcount || unitcount === 0) {
        this.$vux.toast.text('请输入单价', 'middle')
        return
      }

      if (!this.params.receivingAddressId) {
        this.$vux.toast.text('请选择收货地址', 'middle')
        return
      }

      if (this.params.payType < 0 || this.params.payType === undefined) {
        this.$vux.toast.text('请选择支付方式', 'middle')
        return
      }

      if (!this.orderlist && this.orderlist.length <= 0) {
        this.$vux.toast.text('请选择至少一个下单产品', 'middle')
        return
      }
      if (this.params.discountAmount >= this.countval) {
        this.$vux.toast.text('优惠金额不能大于总金额', 'middle')
        return
      }
      this.params.discountAmount = this.params.discountAmount || '0'
      this.params.dataItem = JSON.stringify([
        [
          this.orderlist[0].data[0].sellerId.toString(),
          [...paramslist],
          this.params.discountAmount.toString()
        ]
      ])
      this._saveShopCarOrder()
    },
    count (val) {
      this.countval = this._filters(val)
      counts = this.countval
    },
    _filters (val) {
      return isNaN(parseInt(val)) === true ? 0 : Number(val)
    },
    onpricelist (val) {
      this.oneprice = val
    },
    // 取消弹窗
    cartDialog () {
      this.paymethod = false

      this.other.othertype = false
      this.other.more = ''
      this.other.others = ''
      this.other.type = -1
      this.other.othertermTime = ''
    },
    // 支付弹窗
    dialogpay () {
      this.paymethod = true
    },
    // 线下支付
    linePayTypeEve (val, val2, val3) {
      this.other.type = val
      this.other.more = val2
      val !== 1 && (this.other.othertermTime = '')
      !val3 && (this.other.others = '')
      val3 ? (this.other.othertype = true) : (this.other.othertype = false)
    },
    // 支付保存
    payforsave () {
      this.setparfor(this.other)
      if (!this.other.others && this.other.othertype) {
        this.$vux.toast.text('请输入其它支付方式名称', 'middle')
        return
      }
      if (this.other.type === 1 && !this.other.othertermTime) {
        this.$vux.toast.text('请输入账期付款时间', 'middle')
        return
      }

      this.params.linePayType = this.other.more
      if (this.other.othertype) {
        this.params.linePayType = this.other.others
      }
      this.params.payType = this.other.type
      this.params.termTime = this.other.othertermTime
      this._switch(this.params.payType)
      this.paymethod = false
    },
    _switch (val) {
      switch (val) {
        case -1:
          this.payfortext = this.no
          break
        case 0:
          this.payfortext = this.listname[0].name
          break
        case 1:
          this.payfortext =
            this.listname[1].name + ' ' + this.other.othertermTime
          break
        case 2:
          this.payfortext =
            this.listname[2].name +
            ' ' +
            (this.other.othertype ? this.other.others : this.other.more)
          break
        default:
          this.payfortext = this.no
      }
    },
    // 收货 地址
    _buyersAppUserCenterAddressList () {
      buyersAppUserCenterAddressList(this.pageNum)
        .then(res => {
          res.code === OK_TRUE
            ? (this.AddressList = res.data.list.find(
              item => item.defaultStatus === 1
            ))
            : this.$vux.toast.text(res.msg, 'middle')
        })
        .catch(err => {
          this.$vux.toast.text(err.msg, 'middle')
        })
    },
    _saveShopCarOrder () {
      saveShopCarOrder(this.params)
        .then(res => {
          res.code === OK_TRUE
            ? this.$router.push('/purchaseOrder/qb')
            : this.$vux.toast.text(res.msg, 'middle')
        })
        .catch(err => {
          this.$vux.toast.text(err.msg, 'middle')
        })
    },
    ...mapMutations({
      setBill: 'SET_BILL',
      setparfor: 'SET_PAYFOR',
      setorderOther: 'SET_ORDEROTHER',
      setbilelist: 'SET_FILELIST',
      setaddress: 'SET_ADDRESS',
      setcompany: 'SET_COMPANY',
      setthridInformation: 'SET_THRIDINFORMATION'
    })
  },
  // beforeRouteEnter (to, from, next) {
  //   console.log(from.meta, to.meta)
  //   if (from.meta.title === 'cart') {
  //     to.meta.noCache = true
  //   } else {
  //     to.meta.noCache = true
  //   }
  //   next()
  // },
  // // beforeRouteUpdate  (to, from, next) {
  // //   console.log(from.meta, to.meta)
  // //   next()
  // // },
  beforeRouteLeave (to, from, next) {
    if (to.meta.title === 'cart') {
      this.params.discountAmount = ''
      this.setorderOther(this.params)
    }

    next()
  },

  components: {
    MHeader,
    Scroll,
    Loading,
    cartDetail,
    Popup,
    XSwitch,
    Group,
    Confirm,
    Radio,
    DatetimeView,
    XButton,
    TransferDom,
    Datetime
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

.fade-enter-active, .slide-leave-active {
  transition: all 0.5s;
}

.fade-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

.checkOrderCart {
  .nominate-content {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;

    .address {
      margin-top: 126px;
    }

    .z-cartinput {
      width: 170px;
      height: 50px;
      border: 1px solid #ccc;
      padding-left: 10px;
    }

    .z-inputbox {
      width: 170px;
      height: 50px;
      border: 1px solid #ccc;
      padding-left: 10px;
      line-height: 50px;

      input {
        width: 80%;
      }
    }

    .setlu {
      background-color: #ffffff;

      li {
        height: 90px;
        line-height: 90px;
        justify-content: space-between;
        border-bottom: 1px solid #e6e6e6;
        color: #333333;
        font-size: 30px;
        align-items: center;

        .icon-right {
          vertical-align: middle;
          color: #666666;
          padding: 25px 0px;
        }
      }
    }

    .bottomval {
      height: 180px;
      width: 100%;
    }
  }

  .z-tjdd {
    position: fixed;
    left: 0;
    bottom: 0px;
    width: 100%;

    .z-blued {
      display: inline-block;
      text-align: center;
      line-height: 80px;
      width: 170px;
      font-size: 30px;
      padding: 0;
    }
  }

  .fpxx {
    div {
      line-height: 60px;
      color: #333;
      font-size: 30px;
    }
  }

  .pay_label {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .payradio {
      opacity: 0;
    }

    .payradio:checked + .paycheck:before {
      display: inline-block;
      font: normal normal normal 0.186667rem / 1 'weui';
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      content: '\EA08';
      color: #09BB07;
      font-size: 0.213333rem;
    }

    .selectdate {
      border: 1px solid #cccccc;
      padding: 20px 20px;
    }
  }

  .z-detetime {
    opacity: 0;
    position: absolute;
    width: 80%;
    height: 100%;
    left: 0;
    top: 0;
    a {
      display: inline-block;
      height:40px;
      width:100%;
    }
  }
}
</style>
