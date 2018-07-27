import request from 'common/js/request'
import {news} from './hosturl'
import store from '@/store'

// 消息（交易物流，系统通知）
export function buyerAppMessageList (data) {
  return request({
    url: news + '/buyerAppMessageList.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 消息次数
export function buyerAppcount (data) {
  return request({
    url: news + '/buyerAppcount.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 点击更改未已读
export function updatamessage (data) {
  return request({
    url: news + '/updateappmessage.do',
    method: 'post',
    data
  })
}
// 获取即使通讯客服列表
export function findAppBuyerInfo (data) {
  return request({
    url: news + '/findAppBuyerInfo.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 更新消息状态
export function updateappmessage (data) {
  return request({
    url: news + '/updateappmessage.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}

// 获取用户信息
export function queryUsercontro (data) {
  return request({
    url: news + '/queryUsercontro.do',
    method: 'post',
    data: {...data}
  })
}
