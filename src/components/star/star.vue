<template>
  <div class="star" :class="starType">
    <span v-for="item in itemClasses" :class="item" class="star-item"></span>
  </div>
</template>

<script>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

  export default {
    props:{
        size:{ //星星的大小
            type:Number
        },
        score:{ //评分
            type:Number
        }
    },
    computed:{
        starType(){
            return 'star-' + this.size
        },
        itemClasses(){
          let result = []
          //向下取整,再/2,得出是0.5的倍数
          let score = Math.floor(this.score*2)/2
          //有没有小数部分
          let hasDecimal = score%1 !== 0
          //取整数部分
          let integer = Math.floor(score)
          //把全星的数量存入数组
          for(let i=0;i<integer;i++){
              result.push(CLS_ON)
          }
          if(hasDecimal){ //如果有半星,存入数组
              result.push(CLS_HALF)
          }

          while(result.length<LENGTH){ //如果不够5个,补没有星
              result.push(CLS_OFF)
          }

          return result;

        }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star
    font-size:0
    .star-item
      display:inline-block
      background-repeat:no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right:22px
        background-size:20px 20px
        &:last-child //最后一个元素没有右间距
          margin-right:0
        &.on //全星
          bg-image('star48_on')
        &.half //半星
          bg-image('star48_half')
        &.off //没有星
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right:6px
        background-size:15px 15px
        &:last-child //最后一个元素没有右间距
          margin-right:0
        &.on //全星
            bg-image('star36_on')
        &.half //半星
            bg-image('star36_half')
        &.off //没有星
            bg-image('star36_off')
    &.star-24
        .star-item
          width: 10px
          height:10px
          margin-right:3px
          background-size:10px 10px
          &:last-child //最后一个元素没有右间距
            margin-right:0
          &.on //全星
            bg-image('star24_on')
          &.half //半星
            bg-image('star24_half')
          &.off //没有星
            bg-image('star24_off')
</style>
