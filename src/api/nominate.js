import request from 'common/js/request'
import {saleorderurl} from './hosturl'
import store from '@/store'

// 首页跳转推荐
export function slectRecommend (data) {
  return request({
    url: saleorderurl + '/slectRecommend.do',
    method: 'post',
    data
  })
}
// 排行榜-销量排行榜
export function selectSaleslist (data) {
  return request({
    url: saleorderurl + '/selectSaleslist.do',
    method: 'post',
    data
  })
}
// 排行榜-型号排行榜
export function selectsellerlist (data) {
  return request({
    url: saleorderurl + '/selectsellerlist.do',
    method: 'post',
    data
  })
}
// 信用 -卖家信用
export function sellercredit (data) {
  return request({
    url: saleorderurl + '/sellercredit.do',
    method: 'post',
    data
  })
}

// 搜索型号
export function searchOrder (data) {
  return request({
    url: saleorderurl + '/searchOrder.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}

// 省名
export function cityApp (data) {
  return request({
    url: saleorderurl + '/cityApp.do',
    method: 'post',
    data
  })
}

// 搜索信用
export function searchcredit (data) {
  return request({
    url: saleorderurl + '/searchcredit.do',
    method: 'post',
    data
  })
}
