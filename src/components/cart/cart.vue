<template>
  <div>
    <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i>
              <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
            </i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">¥{{totalPrice}}</div>
        <div class="desc">另需配送费¥{{deliveryPrice}}</div>
      </div>
      <!-- @click.stop.prevet 阻止事件冒泡 -->
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <transition name="fade">
      <div class="car-list" v-show="listShow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content" ref="listContentWrapper">
        <ul>
          <li class="food" v-for="food in selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>¥{{food.price*food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartControl :food="food"></cartControl>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>
  </div>
    <transition name="fade">
      <div class="list-mark" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import CartControl from '../cart-control/cart-control'
  export default {
    props:{
        selectFoods:{ //选择的商品,里面放的food对象
            type:Array,
            default(){
                return []
            }
        },
        deliveryPrice:{ //配送费
            type:Number
        },
        minPrice:{ //最低配送费
            type:Number
        }
    },
    data(){
        return{
            fold:true
        }
    },
    created(){
      console.log('购物车中的'+this.selectFoods)
    },
    computed:{
        //总价
        totalPrice(){
            let total = 0
            this.selectFoods.forEach((food)=>{
                total += food.price * food.count
            })
          return total
        },
        //总共多少商品
        totalCount(){
            let count = 0
            this.selectFoods.forEach((food)=>{
                count += food.count
            })
          return count
        },
        //描述
        payDesc(){
          //js==两边类型不致会做自动类型转换,===不会
          if(this.totalPrice === 0){
              return `¥${this.minPrice}元起送`
          }else if(this.totalPrice<this.minPrice){
              let diff = this.minPrice - this.totalPrice
              return `还差¥${diff}元起送`
          }else{
              return '去结算'
          }
        },
        //按是否去结算显示不一样的class
        payClass(){
            if(this.totalPrice<this.minPrice){
                return 'not-enough'
            }else{
                return 'enough'
            }
        },
        listShow(){
          //如果没有购买商品
          if(!this.totalCount){
              this.fold = true
              return false
          }
          let show = !this.fold
          if(show){
              this.$nextTick(()=>{
                  if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.listContentWrapper,{
                      click:true
                    })
                  }else{
                      this.scroll.refresh()
                  }
              })
          }
          return show
        }
    },
    methods:{
      toggleList(){
          console.log('展开')
          if(!this.totalCount){
              return
          }
          this.fold = !this.fold
      },
      //清空购物车
      empty(){
          this.selectFoods.forEach((food)=>{
              food.count = 0
          })
      },
      hideList(){
          this.fold = true
      },
      pay(){
          if(this.totalPrice<this.minPrice){
              return
          }
          window.alert(`支付${this.totalPrice}元`)
      }
    },
    components:{
      CartControl
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .shopcart
    position:fixed
    left:0
    bottom:0
    height: 48px
    width:100%
    z-index:50
    .content
      height:100%
      display:flex
      background:#141d27
      .content-left
        flex:1
        font-size:0
        .logo-wrapper
          display:inline-block
          position:relative
          top: -10px
          margin:0 12px
          padding:6px
          width: 56px
          height:56px
          box-sizing:border-box
          vertical-align:top
          border-radius:50%
          background:#141d27
          .logo
            display:inline-block
            width:100%
            height:100%
            border-radius: 50%
            background: #2b343c
            text-align:center
            &.highlight
              background:rgb(0,160,220)
            .icon-shopping_cart
              line-height:44px
              font-size:24px
              color:#80858a
              &.highlight
                color:#fff
          .num
            position:absolute
            top:0
            right:0
            width: 24px
            height: 16px
            line-height: 16px
            border-radius: 16px
            font-size: 9px
            font-weight:700
            color: #fff
            text-align: center;
            background:rgb(240,20,20)
            box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display:inline-block
          vertical-align: top
          margin-top:12px
          line-height: 24px
          padding-right:12px
          border-sizing:border-box
          border-right:1px solid rgba(255,255,255,0.1)
          font-size:16px
          font-weight:700
          color:rgba(255,255,255,0.4)
          &.highlight
            color: #fff
        .desc
          display:inline-block
          vertical-align:top
          line-height: 24px
          margin:12px 0 0 12px
          font-size:12px
          color:rgba(255,255,255,0.4)
      .content-right
        flex:0 0 105px
        width:105px
        .pay
          height:48px
          line-height:48px
          text-align:center
          font-size:12px
          font-weight:700
          color:rgba(255,255,255,0.4)
          &.not-enough
            background:#2b333b
          &.enough
            background:#00b43c
            color:#fff
    .car-list
      position:absolute
      left:0
      top:-305px
      width:100%
      &.fade-enter-active, &.fade-leave-active
        transition: opacity .5s
      &.fade-enter, &.fade-leave-active
        opacity: 0
      border-top-1px(rgba(7,17,27,0.1))
      .list-header
        height: 40px
        line-height: 40px
        padding:0 18px
        background: #f3f5f7
        border-bottom:1px soid rgba(7,17,27,0.1)
        .title
          float:left
          font-size: 14px
          color:rgb(7,17,27)
        .empty
          float:right
          font-size: 12px
          color:rgb(0,160,220)
      .list-content
        padding:0 18px
        max-height:217px
        font-size:12px
        overflow:hidden
        background: #fff
        .food
          position:relative
          padding:12px 0
          box-sizing:border-box
          border-bottom-1px(rgba(7,17,27,0.1))
          .name
            line-height: 24px
            font-size: 14px
            color:rgb(7,17,27)
          .price
            position:absolute
            right: 90px
            bottom:12px
            line-height:24px
            font-size: 14px
            font-weight:700
            color:rgb(240,20,20)
          .cartcontrol-wrapper
            position:absolute
            right:0
            bottom:12px

  .list-mark
    position:fixed
    top:0
    left:0
    width:100%
    height:100%
    z-index:40
    background:rgba(7,17,27,0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: opacity .5s
    &.fade-enter, &.fade-leave-active
      opacity: 0

</style>
