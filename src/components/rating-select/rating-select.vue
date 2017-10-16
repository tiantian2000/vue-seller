<template>
  <div class="ratingselect">
      <div class="rating-type">
        <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">
          {{desc.all}}<span class="count">{{ratings.length}}</span></span>
        <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">
          {{desc.positive}}<span class="count">{{positives.length}}</span></span>
        <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">
          {{desc.negative}}<span class="count">{{negatives.length}}</span></span>
      </div>
      <div @click="toggleContent" class="switch" :class="{'on':onlyContent===true}">
        <span class="icon-check_circle"></span>
        <span class="text">只看有内容的评价</span>
      </div>

  </div>
</template>

<script>
  //满意
  const POSITIVE = 0
  //不满意
  const NEGATIVE = 1
  //所有
  const ALL = 2

  export default {
    props:{
        ratings:{
            type:Array,
            default(){
                return []
            }
        },
        type:{ //选中的类型
            type:Number,
            default:ALL
        },
        only:{ //是否只显示内容
            type:Boolean,
            default:false
        },
        desc:{ //描述
            type:Object,
            default(){
                return{
                  all:'全部',
                  positive:'满意',
                  negative:'不满意'
                }
            }
        }
    },
    data(){
      return{
        //①创建props属性type的副本--selectType
        selectType:this.type,
        onlyContent:this.only
      }
    },
    computed:{
      //计算有多少是推荐的数组
      positives(){
          return this.ratings.filter((rating)=>{
              return rating.rateType === POSITIVE
          })
      } ,
      negatives(){
          return this.ratings.filter((rating)=>{
              return rating.rateType === NEGATIVE
          })
      }
    },
    watch:{
      //②监听外部对props属性type的变更，并同步到组件内的data属性
      type(val){
        this.selectType = val
      },
      //③组件内对selectType变更后向外部发送事件通知
      selectType(val){
        console.log('组件内对selectType变更后向外部发送事件通知')
        this.$emit("rating-select",val)
      },
      only(val){
          this.onlyContent = val
      },
      onlyContent(val){
          this.$emit("content-toggle",val)
      }
    },
    methods:{
        select(type,event){
            if(!event._constructed){
                return
            }
            this.selectType = type

        },
        toggleContent(event){
            if(!event._constructed){
                return
            }
            this.onlyContent = !this.onlyContent
        }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratingselect
    .rating-type
      padding:18px 0
      margin:0 18px
      border-bottom-1px(rgba(7,17,27,0.1))
      font-size:0
      .block
        display:inline-block
        padding:8px 12px
        margin-right:8px
        line-height:16px
        border-radius: 1px
        color:rgb(77,85,93)
        font-size:12px
        &.active
          color:#fff
        .count
          font-size: 8px
          margin-left:2px
        &.positive
          background:rgba(0,160,220,0.2)
          &.active
            background:rgb(0,160,220)
        &.negative
          background:rgba(77,85,93,0.2)
          &.active
            background:rgb(77,85,93)
    .switch
      padding:12px 18px
      line-height: 24px
      border-bottom:1px solid rgba(7,17,27,0.1)
      color:rgb(147,153,159)
      font-size:0
      &.on
        .icon-check_circle
          color:#00c850
      .icon-check_circle
        display:inline-block
        vertical-align:top
        margin-right:4px
        font-size:24px
      .text
        font-size:12px
</style>
