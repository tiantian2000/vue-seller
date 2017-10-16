<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliverTime}}分钟送达</div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <!--<transition>中只有name属性，不可添加其他标签属性
        <transition>中只能有一个子元素并且该子元素需要有v-show或者v-if来控制是否显示
        v-enter: 定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。
        v-enter-active: 定义进入过渡的结束状态。在元素被插入时生效，在transition/animation完成之后移除。
        v-leave:定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。
        v-leave-active: 定义离开过渡的结束状态。在离开过渡被触发时生效，在transition/animation完成之后移除。
    -->
    <transition name="fade">
      <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item,index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hiddenDetail">
        <i class="icon-close"></i>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>

  import star from '../star/star'

  export default {
    data(){
        return{
            detailShow:false,
            classMap:['decrease','discount','special','invoice','guarantee']
        }
    },
    props: {
      seller:{
          type:Object
      }
    },
    methods:{
      showDetail(){
          this.detailShow = true
      },
      hiddenDetail(){
          this.detailShow = false
      }
    },
    components:{
        star
    }
  }
</script >

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .header
    position:relative
    color: #fff
    background:rgba(7,17,27,0.5)
    overflow: hidden
    .content-wrapper
      position : relative
      padding:24px 12px 18px 24px
      font-size: 0 //清除中间的缝隙
      .avatar
        display: inline-block
        vertical-align : top //顶部对齐
        img
          border-radius:2px
      .content
        display: inline-block
        margin-left:16px
        font-size:14px
        .title
          margin:2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width:30px;
            height:18px;
            bg-image('brand')
            background-size:30px 18px
          .name
            margin-left: 6px
            font-size:16px
            line-height 18px
            font-weight: bold
        .description
          margin-bottom: 10px
          line-height:12px
          font-size:12px
        .support
          .icon
            display:inline-block
            vertical-align: top
            width:14px
            height: 14px
            margin-right:4px
            background-size:14px 14px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.special
              bg-image('special_1')
            &.invoice
              bg-image('invoice_1')
          .text
            line-height: 12px
            font-size: 10px

      .support-count
        position:absolute
        right:12px
        bottom:14px
        padding: 0 8px
        height:24px
        line-height:24px
        border-radius 14px
        background: rgba(0,0,0,0.2)
        text-align: center
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size:10px
    .bulletin-wrapper
      position:relative
      height:28px
      line-height: 28px
      padding:0 22px 0 12px
      white-space : nowrap
      overflow : hidden
      text-overflow: ellipsis
      background:rgba(7,17,27,0.2)
      .bulletin-title
        display:inline-block
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-zie:22px 12px
        background-repeat:no-repeat
      .bulletin-text
        vertical-align : top
        margin:0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position:absolute
        font-size:10px
        right:12px
        top:8px
    .background
      position:absolute
      top:0
      left:0
      width:100%
      height:100%
      z-index:-1
      filter:blur(10px)
    .detail
      position:fixed
      z-index:100
      top:0
      left:0
      width:100%
      height:100%
      overflow: auto
      background: rgba(7,17,27,0.8)
      //背景模糊,IPHONE手机才有效果
      backdrop-filter:blur(10px)
      &.fade-enter-active, &.fade-leave-active
        transition: opacity .5s
      &.fade-enter, &.fade-leave-active
        opacity: 0
      .detail-wrapper
        min-height:100%
        width:100%
        .detail-main
          margin-top: 64px
          padding-bottom:64px
          .name
            line-height 16px
            text-align:center
            font-size: 16px
            font-weight:700
          .star-wrapper
            margin-top: 18px
            padding:2px 0
            text-align:center
          .title
            display:flex
            width:80%
            margin:28px auto 24px auto
            .line
              flex:1
              position:relative
              top: -6px
              border-bottom:1px solid rgba(255,255,255,0.2)
            .text
              padding:0 12px
              font-weight:700
              font-size: 14px

          .supports
            width:80%
            margin:0 auto
            .support-item
              padding:0 12px
              margin-bottom: 12px
              font-size:0
              &:last-child
                margin-bottom:0
              .icon
                display:inline-block
                width:16px;
                height:16px;
                vertical-align:top
                margin-right:16px
                background-size:16px 16px;
                background-repeat:no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.special
                  bg-image('special_2')
                &.invoice
                  bg-image('invoice_2')
              .text
                line-height: 16px
                font-size:12px
                font-weight:200

          .bulletin
            width:80%
            margin:0 auto
            .content
              padding:0 12px
              line-height: 24px
              font-size:12px
      .detail-close
          position:relative
          width: 32px
          height: 32px
          margin:-64px auto 0 auto
          clear:both
          font-size:32px

</style>
