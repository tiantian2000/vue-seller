<template>
  <transition name="slide">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" />
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">¥{{food.price}}</span><span class="old">¥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartControl :food="food"></cartControl>
          </div>
          <!-- 如果没有添加商品到购物车则显示加入购物车-->
          <div @click="addFirst($event)" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品介绍</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split v-show="food.info"></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <!-- @rating-select监听子组件触发的rating-select事件,然后调用ratingSelect方法 -->
          <ratingSelect :type="selectType" :only="onlyContent" :desc="desc"
          :ratings="food.ratings"  @rating-select="ratingSelect" @content-toggle="contentToggle"></ratingSelect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar" />
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}">
                  </span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
              暂无评价
            </div>
          </div>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import CartControl from '../cart-control/cart-control'
  import RatingSelect from '../rating-select/rating-select.vue'
  import Split from '../split/split'
  import Vue from 'vue'
  import {formatDate} from '../../common/js/date'

  //满意
  const POSITIVE = 0
  //不满意
  const NEGATIVE = 1
  //所有
  const ALL = 2

  export default{
      props:{
        food:{
            type:Object
        },
      },
      created(){
        console.log(this.food)
      },
      data(){
          return{
              showFlag:false,
              selectType:ALL,
              onlyContent:true,
              desc:{
                  all:'全部',
                  positive:'推荐',
                  negative:'吐槽'

              }
          }
      },
      methods:{
        show(){
            this.showFlag = true
            this.selectType = ALL
            this.onlyContent = true
            this.$nextTick(()=>{
                if(!this.scroll){ //如果第一次加载页面则加载BScroll
                    this.scroll = new BScroll(this.$refs.food,{
                        click:true
                    })
                }else{ //如果不是第一次则刷新BScroll
                    this.scroll.refresh()
                }
            })
        },
        hide(){
          this.showFlag = false
        },
        addFirst(event){
          if(!event._constructed){
              return
          }
          Vue.set(this.food,'count',1)
        },
        //过滤每遍历的一条记录是否显示
        needShow(type,text){
            //如果只显示内容，但是没有内容的话就不显示
            if(this.onlyContent && !text){
                return false
            }
            //如果查看所有则可以通过
            if(this.selectType === ALL){
              return true
            }else{
                //如果选择的是不是全部,则选择的类型和记录的类型一致则通过
                return type === this.selectType
            }
        },
        //④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
        ratingSelect(type){
            this.selectType = type
        },
        contentToggle(content){
            this.onlyContent = content
          this.$nextTick(()=>{
                this.scroll.refresh()
          })

        }

      },
    filters:{
      formatDate(time){
         return formatDate(time)
      }
    },
    components:{
        CartControl,
        Split,
        RatingSelect
      }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .food
    position:fixed
    width:100%
    left:0
    top:0
    bottom: 48px
    z-index:30
    background: #fff
    .image-header
      position:relative
      width:100%
      height:0
      padding-top:100% //使宽高相等
      img
        position:absolute
        left:0
        top:0
        width:100%
        height:100%
      .back
        position:absolute
        top: 10px
        left:0
        .icon-arrow_lift
          display:block
          padding:10px
          font-size: 20px
          color:#fff
    .content
      position:relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight:700
        color:rgb(7,17,27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height:10px
        font-size: 0
        .sell-count,.rating
          font-size: 10px
          color:rgb(147,153,159)
        .sell-count
          margin-right: 12px
      .price
        font-weight:700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color:rgb(240,20,20)
        .old
          text-decoration:line-through
          font-size: 10px
          color:rgb(147,153,159)

      .cartcontrol-wrapper
        position:absolute
        right: 18px
        bottom: 18px
      .buy
        position:absolute
        right: 18px
        bottom: 18px
        z-index:10
        height: 24px
        line-height:24px
        padding: 0 12px
        box-sizing:border-box
        font-size: 10px
        border-radius:12px
        color:#fff
        background:rgb(0,160,220)

    .info
      padding:18px
      .title
        line-height:14px
        margin-bottom:6px
        font-size: 14px
        color:rgb(7,17,27)
      .text
        line-height :24px
        padding:0 8px
        font-size:12px
        color:rgb(77,85,93)

    .rating
      padding-top:18px
      .title
        ling-height:14px
        margin-bottom:6px
        margin-left:18px
        font-size:14px
        color:rgb(7,17,27)
      .rating-wrapper
        padding:0 18px
        .rating-item
          position:relative
          padding:16px 0
          border-bottom-1px(rgba(7,17,27,0.1))
          .user
            position:absolute
            right:0
            top:16px
            line-height:12px
            font-size:0
            .name
              display:inline-block
              vertical-align:top
              margin-right:6px
              font-size:10px
              color:rgb(147,153,159)
            .avatar
              border-radius:50%
          .time
            margin-bottom:6px
            line-height: 12px
            font-size: 10px
            color:rgb(147,153,159)
          .text
            line-height:16px
            font-size: 12px
            color:rgb(7,17,27)
            .icon-thumb_up,.icon-thumb_down
              margin-right: 4px
              line-height:16px
              font-size:12px
            .icon-thumb_up
              color:rgb(0,160,220)
            .icon-thumb_down
              color:rgb(147,153,159)
        .no-rating
          padding:16px 0
          font-size:12px
          color:rgb(147,153,159)
  //路由跳转过场动画
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

</style>
