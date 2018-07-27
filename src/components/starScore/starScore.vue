<template>
    <div class="starScore">
      <span class="star-item" @click="stars(index)" v-for="(itemClass,index) in itemClasses" :class="itemClass"></span>
      <span class="scoreNum">{{this.score}}</span>
    </div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_OFF = 'off';
export default {
  data () {
    return {
    }
  },
  props: {
    score: {
      type: Number
    }
  },
  methods: {
    stars: function (ied) {
      this.score = ied + 1
    }
  },
  computed: {
    itemClasses () {
      this.score > LENGTH ? this.score = LENGTH : this.score;
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .starScore
    .star-item
      display inline-block
      background-repeat no-repeat
      width 27px
      height 26px
      background-size 100%
      margin-right 5px
      &.on
        background-image url("on.png")
      &.off
        background-image url("off.png")
    .scoreNum
      font-size 26px
      color #ffba00
      margin-left 20px
</style>
