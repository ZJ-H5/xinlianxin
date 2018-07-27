import request from 'common/js/request'
import {setup, my} from './hosturl'
import store from '@/store'

// 账号信息
export function AppgetHeadUrl (data) {
  return request({
    url: setup + '/AppgetHeadUrl.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 下一步
export function nextstep (data) {
  return request({
    url: setup + '/nextstep.do',
    method: 'post',
    data
  })
}
// 修改手机号
export function AppupdatePhone (data) {
  return request({
    url: setup + '/AppupdatePhone.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 上传头像更改
export function AppchangeHeadUrl (data) {
  return request({
    url: setup + '/AppchangeHeadUrl.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 修改密码
export function AppupdatePwd (data) {
  return request({
    url: setup + '/AppupdatePwd.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 退出
export function ApploginOut (data) {
  return request({
    url: my + '/ApploginOut.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
