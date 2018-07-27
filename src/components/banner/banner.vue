<template>
  <div>
    <transition name="fade">
    <div class="z-banner" v-show="showOrNot">
      <div class="count">
        <span class="number">{{number}}</span>
        <span>秒</span>
      </div>
    </div>
    </transition>
  </div>
</template>
<script>
import {sellerUserDetailsdo} from 'api/interfacemethod'
import {formatDate} from 'api/time'
export default {
  props: {
      show: {
        type: Boolean
      }
    },
  data () {
    return {
      number:3,
    }
  },
  computed: {
    showOrNot() {
      return this.$store.state.jm.bannerShow
    }
  },
  activated () {
  },
  created () {
    if(this.showOrNot){
      this.setNumber()
    }
  },
  methods: {
    setNumber(){
      let time=setInterval(
        ()=>{
          this.number--
          if(this.number===0){
            this.$store.commit('SET_SHOW',false)
            clearInterval(time)
          }
        },1000
      )
    }
  },
  components: {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .fade-enter-active, .fade-leave-active {
    transition: opacity 2s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  .z-banner
    width:100%
    height 100vh
    bg-image('iphone6')
    background-size 100% 100%
    position fixed
    top:0
    left:0
    z-index 999999
    .count
      position absolute
      right:3%;
      top:3%;
      width:100px
      height:50px
      border-radius 25px
      border:2px solid #e6e6e6
      color:#ccc
      text-align center
      line-height 50px

</style>
