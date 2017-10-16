<template>
  <div class="ratings" ref="rating">
    <div class="ratings-content" >
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryPrice}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <!-- @rating-select监听子组件触发的rating-select事件,然后调用ratingSelect方法 -->
      <ratingSelect :type="selectType" :only="onlyContent"
                    :ratings="ratings"  @rating-select="ratingSelect" @content-toggle="contentToggle"></ratingSelect>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28"/>
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">
                  {{item}}
                </span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Star from '../star/star'
  import RatingSelect from '../rating-select/rating-select.vue'
  import Split from '../split/split'
  import {formatDate} from '../../common/js/date'

  const ERROR_NO = 0
  const ALL = 2
  export default {
    props:["seller"],
    data(){
      return{
        showFlag:false,
        selectType:ALL,
        onlyContent:true,
        desc:{
          all:'全部',
          positive:'满意',
          negative:'不满意'
        },
        ratings:[]
      }
    },
    created(){
      this.$ajax('/ratings').then((res)=>{
        if(res.data.errno === ERROR_NO){
            this.ratings = res.data.data
            this.$nextTick(()=>{ //加载完数据后初始化Scroll
              this.scroll = new BScroll(this.$refs.rating,{
                click:true
              })
            })
          }
      })
    },
    methods:{
      ratingSelect(type){
        this.selectType = type
      },
      contentToggle(content){
        this.onlyContent = content
        this.$nextTick(()=>{
          this.scroll.refresh()
        })
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
      }
    },
    filters:{
      formatDate(time){
        return formatDate(time)
      }
    },
    components:{
        Star,
        RatingSelect,
        Split
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratings
    position:absolute
    top:174px
    bottom:0
    left:0
    width:100%
    overflow:hidden
    .overview
      display:flex
      padding:18px 0
      .overview-left
        flex:0 0 137
        padding:6px 0
        width:137px
        text-align:center
        border-right:1px solid rgba(7,17,27,0.1)
        //如果是小屏幕
        @media only screen and (max-width:320px)
          flex:0 0 120px
          width:120px
        .score
          margin-bottom:6px
          line-height: 24px
          font-size: 24px
          color:rgb(255,153,0)
        .title
          margin-bottom:8px
          line-height:12px
          font-size:12px
          color:rgb(7,17,27)
        .rank
          line-height: 10px
          font-size:10px
          color:rgb(147,153,159)
      .overview-right
        flex:1
        padding:6px 0 0 24px
        @media only screen and (max-width:320px)
          padding-left:6px
        .score-wrapper
          margin-bottom:8px
          font-size:0
          .title
            display:inline-block
            line-height:18px
            vertical-align:top
            font-size:12px
            color:rgb(7,17,27)
          .star
            display:inline-block
            margin:0 12px
          .score
            display:inline-block
            line-height:18px
            vertical-align:top
            font-size:12px
        .delivery-wrapper
          .title
            line-height:18px
            font-size: 12px
            coor:rgb(7,17,27)
          .delivery
            margin-left:12px
            font-size:12px
            color:rgb(147,153,159)
    .rating-wrapper
      padding:0 18px
      .rating-item
        display:flex
        padding:18px 0
        border-bottom-1px(rgba(7,17,27,0.1))
        .avatar
          flex:0 0 28px
          width:28px
          margin-right:12px
          img
            border-radius:50%
        .content
          position:relative
          flex:1
          .name
            margin-bottom:4px
            line-height: 12px
            font-size:10px
            color:rgb(7,17,27)
          .star-wrapper
            margin-bottom: 6px
            font-size:0
            .star
              display:inline-block
              margin-right:6px
              vertical-align:top
            .delivery
              display:inline-block
              vertical-align:top
              font-size:10px
              color:rgb(147,153,159)

          .text
            margin-bottom:8px
            line-height: 18px
            font-size:12px
            color:rgb(7,17,27)
          .recommend
            line-height: 16px
            font-size:0
            .icon-thumb_up,.item
              display:inline-block
              margin:0 8px 4px 0
              font-size:9px
            .icon-thumb_up
              color:rgb(0,160,220)
            .item
              padding:0 6px
              border:1px solid rgba(7,17,27,0.1)
              border-radius:1px
              color:rgb(147,153,159)
              background:#fff

          .time
            position:absolute
            top:0
            right:0
            color:rgb(147,153,159)
            font-size:10px
</style>
