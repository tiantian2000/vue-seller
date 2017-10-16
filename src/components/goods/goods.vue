<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <!-- 如果当前的遍历的索引和计算出来的滚动到的落位在数组中的索引相等则引用class -->
        <li v-for="item,index in goods" class="menu-item"
        :class="{'current':currentIndex===index}" @click="selectMenus(index,$event)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)"  v-for="food in item.foods" class="food-item ">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartControl :food="food"></cartControl>
                </div>
              </div>

            </li>
          </ul>
        </li>
      </ul>
    </div>
    <cart :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></cart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Cart from '../cart/cart'
  import Food from '../food/food'
  import CartControl from '../cart-control/cart-control'
  const ERROR_NO = 0
  export default {
    props:{
     seller:{
         type:Object
     }
    },
    data(){
        return{
          goods:[],
          classMap:['decrease','discount','special','invoice','guarantee'],
          listHeight:[],
          scrollY:0,
          selectedFood:{}
        }
    },
    components:{
      Cart,
      CartControl,
      Food
    },
    created(){
        this.$ajax('/goods').then((res)=>{
            if(res.data.errno === ERROR_NO){
                this.goods = res.data.data
                //操作原生dom的时候,放在nextTick方法中,保证dom先渲染完毕
                //$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，
                // 在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM
                this.$nextTick(()=>{
                  this._initScroll()
                  this.calculateHeight()
                })
            }
            console.log(this.goods)
        })
    },
    computed:{
      currentIndex(){
          for(let i=0;i<this.listHeight.length;i++){
            let height1 = this.listHeight[i]
            let height2 = this.listHeight[i+1]
            //console.log(height1+','+height2)
            if(!height2 || (this.scrollY>=height1&&this.scrollY<height2)){
              return i
            }
          }
        return 0
      },
      //把选中的商品添加到数组对象
      selectFoods(){
        let foods = []
        this.goods.forEach((good)=>{
          good.foods.forEach((food)=>{
            if(food.count){
              foods.push(food)
            }
          })
        })
        return foods
      },

    },
    methods:{
      //点击菜单
      selectMenus(index,event){
        //只有better_scroll才有event
        //如果是浏览器触发的事件则return
        if(!event._constructed){
            return
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        //找到需要跳转到的dom
        let el = foodList[index]
        //使用better_scroll跳转
        this.foodsScroll.scrollToElement(el,300)

      },
        _initScroll(){ //初始化滚动条
            this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                'click':true //让自定义的点击事件生效,这时候不是移动端点击会触发两次事件
            })

            this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
              probeType: 3, //屏幕滚动时适实获取位置
              'click':true
            })
            //监听滚动事件,返回坐标
            this.foodsScroll.on('scroll',(pos)=>{
                //取纵坐标
                this.scrollY = Math.abs(Math.round(pos.y))
                //console.log(this.scrollY)
            })
        },
        //计算每个区间高度
        calculateHeight(){
          //根据class找到元素，这里就是每个区块的li
          let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
          //console.log('每个区块高度:'+foodList.length)
          let height = 0
          this.listHeight.push(height)
          //遍历每一个区块的li,把每一个li的实际在屏幕中的高度(递增)存入数组
          for(let i=0;i<foodList.length;i++){
              let item = foodList[i]
              height += item.clientHeight
              this.listHeight.push(height)
          }
          //console.log(this.listHeight)
        },
      //查看商品详情
      selectFood(food,event){
        console.log(food)
        if(!event._constructed){
          return
        }
        this.selectedFood = food
        //调用子组件事件
        this.$refs.food.show()
      }

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    position:absolute
    top: 174px
    width:100%
    bottom:46px
    display:flex
    overflow:hidden
    .menu-wrapper
      flex:0 0 80px //宽度占80px
      width:80px
      background:#f3f5f7
      .menu-item
        display:table //可以显示垂直居中
        height: 54px
        width: 56px
        padding:0 12px
        line-height 14px
        font-size: 14px
        &.current
          position:relative
          background:#fff
          font-weight:700
          z-index:10
        .icon
          display:inline-block
          vertical-align:top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size:12px 12px
          background-repeat:no-repeat
          &.decrease
            bg-image('../../common/image/decrease_3')
          &.discount
            bg-image('../../common/image/discount_3')
          &.guarantee
            bg-image('../../common/image/guarantee_3')
          &.invoice
            bg-image('../../common/image/invoice_3')
          &.special
            bg-image('../../common/image/special_3')
        .text
          display:table-cell
          width: 56px
          vertical-align:middle
          border-bottom-1px(rgba(7,17,27,0.1))
          font-size:12px
    .foods-wrapper
      flex:1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left:2px solid #d9dde1
        font-size: 12px
        color:rgb(147,153,159)
        background: #f3f5f7
      .food-item
        display:flex
        margin: 18px
        padding-bottom:18px
        border-bottom-1px(rgba(7,17,27,0.1))
        &:last-child
          margin-bottom:0
        .icon
          flex:0 0 57px
          margin-right: 10px
        .content
          position:relative
          flex:1
          .name
            margin:2px 0 8px 0
            height:14px
            line-height: 14px
            font-size: 14px
            color:rgb(7,17,27)
          .desc,.extra
            line-height: 10px
            font-size: 10px
            color:rgb(147,153,159)
          .desc
            line-height:12px
            margin-bottom: 8px
          .extra
            line-height: 10px
            .count
              margin-right: 12px
          .price
            font-weight:700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color:rgb(240,20,20)
            .old
              text-decoration :line-through
              font-size:10px
              color:rgb(147,153,159)
          .cartcontrol-wrapper
            position:absolute
            right:0
            bottom:0
</style>
