
<template>
  <!-- <transition name="slide"> -->
    <div class="nominate">
      <scroll ref="scroll"
        class="nominate-content"
        :listen-scroll="pullup"
        :data="discList"
        @scroll="loadmore"
        >
        <div class="wrap">
          <ul>
            <router-link class="item-box"
              v-for="(item,index) in discList"
              :key="index"
              :to="{path:'/productDetail',query:{cid:item.cid,tid:item.id}}"
              tag="li">
              <div class="column">
                <span class="item">
                  <span class="hint" v-if="item.sale_type == 1">促</span>
                  <span class="hint" v-if="item.sale_type == 2">热</span>
                  <!-- <span class="hint" v-if="item.sale_type == 0">常</span> -->
                  <span class="productId">{{item.model_code}}</span>
                </span>
                <span class="item ">
                  <span class="stock">库存：
                    <span>{{item.quantity}}</span>
                  </span>
                  <span class="volume">成交笔数：
                    <span>{{item.self_data}}</span>
                  </span>
                </span>
              </div>
              <div class="column">
                <span class="item title">{{item.company_name}}</span>
                <span class="item price">
                  <span>{{item.unit_price}}</span>
                </span>
              </div>
            </router-link>
          </ul>
          <div class=" h200 w100-" style="background:#f5f5f5"></div>
        </div>
        <div class="loading-container"
          v-show="!discList.length">
          <loading :title="'正在载入...'" :loadflag="true" :loadimg="false"></loading>
        </div>
      </scroll>
    </div>
  <!-- </transition> -->
</template>

<script type="text/ecmascript-6">
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import {slectRecommend} from 'api/nominate'
import {OK_TRUE} from 'api/conflg'
import storage from 'api/storage'
import {socketMixin} from '@/api/minxsocket'

export default {
  mixins: [socketMixin],
  props: {
    getdiscList: {
      type: Array,
      default: null
    },
    flag: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      discList: [],
      alllist: [],
      pullup: true,
      title: '暂无数据'
    }
  },
  computed: {
    loadflag () {
      return !!this.discList
    },
    userId () {
      return this.$store.state.user.userId
    }

  },
  created () {
    if (this.flag) {
      this.discList = this.getdiscList
      if (this.discList.length <= 0 || !this.discList) {
        this.title = '暂无数据'
      }
    } else {
      this._getDiscList()
    }
    (storage.getStore('user') && storage.getStore('user').pwd && !this.userId) && this._login()
  },
  mounted () {

  },
  methods: {
    _login () {
      let params = {
        phone: storage.getStore('user').phone,
        pwd: storage.getStore('user').pwd,
        type: 0
      }
      this.$store.dispatch('loginUserdo', params)
        .then((res) => {
          if (res.code === OK_TRUE) {
            this.$router.push(this.$store.state.user.redirect)
            this.websockets()
          } else {
            this.$vux.toast.text(res.msg, 'middle')
          }
        }).catch((error) => {
          this.$vux.toast.text(error.msg, 'middle')
        })
    },
    loadmore (posy) {
      this.$emit('loadmore', posy.y)
    },
    _getDiscList () {
      slectRecommend()
        .then((res) => {
          res.code === OK_TRUE
            ? (this.discList = res.data)
            : this.$vux.toast.text(res.msg, 'middle')
        })
        .catch(err => {
          this.$vux.toast.text(err, 'middle')
        })
    }

  },
  watch: {
    getdiscList: function (newval) {
      this.discList = newval
    }
  },
  components: {
    Loading,
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

@import '~common/stylus/variable';
@import '~common/stylus/mixin';
@import '~@/assets/css/app.css';

.slide-enter-active, .slide-leave-active {
  transition: all 0.5s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

.nominate {
  background-color: $color-background-fff;

  .nominate-content {
    position: absolute;
    height: 100%;
    overflow: hidden;

    .wrap {
      position: relative;
      width: 100%;
      overflow: hidden;
      background-color: $color-background-fff;
      ul {
        margin-bottom 30px
      }
      .item-box {
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        border-bottom: 1px solid $color-border-e6;
        padding: 0 40px 24px 40px;

        .column {
          flex-basis: 100%;
          display: flex;
          align-items: baseline;
          justify-content: space-between;

          .item {
            margin-top: 36px;

            .stock {
              font-size: 20px;
              margin-right: 30px;
            }

            .volume {
              font-size: 20px;
            }
          }

          .hint {
            display: inline-block;
            font-size: 24px;
            width: 36px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            background-color: $color-background-bulr;
            color: $color-text-f;
            border-radius: 5px;
          }

          .productId {
            color: $color-text-3;
            font-size: 28px;
            overflow-ellipsis(250px);
          }

          .title {
            color: $color-text-6;
            font-size: 22px;
            line-height 25px
            overflow-ellipsis(400px);
          }

          .price {
            color: $color-text-reddc;
            font-size: 36px;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
