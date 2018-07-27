<template>
  <div class="popup-picker">
    <group>
      <!-- <x-address title="库位"
        v-model="value4"
        class="x-address"
        raw-value
        :list="addressData"
        hide-district
        @on-hide="logHide(value4,getName (value4))"
        @on-show="logShow">
      </x-address> -->
      <popup-picker
      :title="title"
      :data="list1"
      v-model="value1"
      @on-show="onShow"
      @on-hide="onHide"
      @on-change="onChange"></popup-picker>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
import {cityApp} from 'api/nominate'
import {OK_TRUE} from 'api/conflg'
import {PopupPicker, Group} from 'vux'
export default {
  data () {
    return {
      title: '库位',
      value1: [],
      list1: []
    }
  },
  created () {
    this._search()
  },
  methods: {
    onChange (val) {
      this.$emit('ievent', val)
    },
    onShow (str) {},
    onHide (type) {},
    _search () {
      cityApp().then(res => {
        if (res.code === OK_TRUE) {
          this.list1 = [res.data]
        }
      })
    }
  },
  components: {
    PopupPicker,
    Group
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.popup-picker .x-address {
  font-size: 28px;
  padding: 0;
  border: none;
  height: 50px;
  width: 120px;
}

.vux-popup-header {
  height: 80px !important;
}

.vux-popup-header-right, .vux-popup-header-left, .vux-popup-header-title {
  font-size: 32px;
  height: 80px;
  line-height: 80px;
  background: $color-border-e6;
}
.vux-popup-header-right
  color $font-color-blueb !important
.scroller-item
  font-size 32px !important

</style>
