import request from 'common/js/request'
import {Order, shop, my} from './hosturl'
import store from '@/store'
// 报关列表
export function buyersAppCenterCustomsList (data) {
  return request({
    url: Order + '/buyersAppCenterCustomsList.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 点击购物车列表
export function shopCarList (data) {
  return request({
    url: shop + '/shopCarList.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 提交订单
export function saveShopCarOrder (data) {
  return request({
    url: shop + '/saveShopCarOrder.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 收货地址
export function buyersAppUserCenterAddressList (data) {
  return request({
    url: my + '/buyersAppUserCenterAddressList.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 购物车下单
export function addShopCarOrder (data) {
  return request({
    url: shop + '/addShopCarOrder.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 删除购物车
export function deleteShopCar (data) {
  return request({
    url: shop + '/deleteShopCar.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
