<template>
  <div class="cartcontrol">
    <transition name="slide-fade">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
      props:{
          food:{
              type:Object
          }
      },
      methods:{
          addCart(){
              if(!event._constructed){
                  return
              }
              //添加到购物车,如果count不存在，则默认是1,存在则+1
              //为对添加一个属性时,vue是监测不到变化的,需要通过Vue.set方法来添加
              if(!this.food.count){
                  //this.food.count = 1
                  Vue.set(this.food,'count',1)
              }else{
                  this.food.count++
              }
          },
        decreaseCart(){
              if(!event._constructed){
                  return
              }
              this.food.count--
        }
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .cartcontrol
    font-size:0
    .cart-decrease
      display:inline-block
      line-height:24px
      font-size:24px
      color:rgb(0,160,220)
    .cart-count
      display:inline-block
      width:12px
      vertical-align:top
      line-height:24px
      font-size:10px
      text-align:center
      color:rgb(147,153,159)
    .cart-add
      display:inline-block
      line-height:24px
      font-size:24px
      color:rgb(0,160,220)
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active
      transition: all .3s ease;
    .slide-fade-leave-active
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    .slide-fade-enter, .slide-fade-leave-to
      /* .slide-fade-leave-active for below version 2.1.8 */
      transform: translateX(10px);
      opacity: 0;
</style>
