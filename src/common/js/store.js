/**
 * Created by Administrator on 2017/10/16.
 */
//把数据存储到localStorage
export function saveToLocal(id,key,value){
  let seller = window.localStorage.seller
  if(!seller){//如果没有创建过seller,则构造一个seller对象
    seller = {}
    seller[id] = {}
  }else{//如果有存过,则取出seller
    //从一个字符串中解析出json对象
    seller = JSON.parse(seller)
    if(!seller[id]){ //如果id没存过,则把seller[id]置空
      seller[id] = {}
    }
  }
  //把需要存的值赋值给seller
  seller[id][key] = value
  //用于从一个对象解析出字符串
  localStorage.seller = JSON.stringify(seller)
};

//从localStorage读取数据
export function loadFromLocal(id,key,def){
  let seller = window.localStorage.seller
  if(!seller){//如果没有存过seller则返回默认值
    return def
  }
  //把取出的seller转成JSON对象,取里面的id对象
  seller = JSON.parse(seller)[id]
  if(!seller){ //如果取不到id的对象返回默认值
    return def
  }
  //取对应的id对象中的key
  let ret = seller[key]
  //如果有则返回,没有返回默认值
  return ret || def
};
