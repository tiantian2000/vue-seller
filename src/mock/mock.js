/**
 * Created by Administrator on 2017/7/17.
 */
import axios from 'axios';
import Mock from 'mockjs';
import MockAdapter from 'axios-mock-adapter';

import { Seller } from './data/seller';

let _seller = Seller.seller
let _goods = Seller.goods
let _ratings = Seller.ratings

export default {
  bootstrap(){
    // 设置模拟调试器实例
    var mock = new MockAdapter(axios);

    //取商家信息
    mock.onGet('/seller').reply(config=>{
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              errno:0,
              data:_seller
            }]);
          }, 1000);
        });
      }
    )

    //取商品信息
    mock.onGet('/goods').reply(config=>{
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              errno:0,
              data:_goods
            }]);
          }, 1000);
        });
      }
    )

    //取评价信息
    mock.onGet('/ratings').reply(config=>{
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              errno:0,
              data:_ratings
            }]);
          }, 1000);
        });
      }
    )
  }
}




