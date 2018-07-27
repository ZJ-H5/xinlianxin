import request from 'common/js/request'
import {relativeurl} from './hosturl'

export function ip () {
  // axios.get('http://freegeoip.net/json/')
  //   .then(function (response) {
  //     return {name: response.data.ip}
  //   })
  //   .catch(function (error) {
  //     return error
  //   })
  return request({
    url: '/ip',
    method: 'get'
  })
}
// 登录
export function loginUserdo (data) {
  return request({
    url: relativeurl + '/loginUser.do',
    method: 'post',
    data
  })
}
// 发送验证码
export function sendcode (data) {
  return request({
    url: relativeurl + '/sendIdentifyingCode.do',
    method: 'post',
    data
  })
}
// 注册
export function registerUser (data) {
  return request({
    url: relativeurl + '/registerUser.do',
    method: 'post',
    data
  })
}
// 跳转查看协议
export function seeAgreement (data) {
  return request({
    url: relativeurl + '/seeAgreement.do',
    method: 'post',
    data
  })
}
// 找回密码
export function updatePwd (data) {
  return request({
    url: relativeurl + '/updatePwd.do',
    method: 'post',
    data
  })
}
