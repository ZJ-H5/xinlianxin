import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import {ERR_LOGIN} from '@/api/conflg'
import Alert from '@/base/Confirm'
import router from '@/router'
// import { Message } from 'element-ui'
// import resMessage from '@/utils/resMessage'
// create an axios instance
const service = axios.create({
  baseURL: process.env.API_HOST, // api的base_url
  withCredentials: true // 允许携带cookie

  // timeout: 5000 // request timeout
  // headers: undefined
  // headers: {'Content-Type': undefined}
  // headers: {'Content-Type': 'multipart/form-data'}
})

// 请求拦截
service.interceptors.request.use(config => {
  // Do something before request is sent
  store.commit('UPDATE_LOADING', true) // 显示loading
  if (config.data) {
    // if (store.getters.username) {
    // config.data['username'] = store.getters.username
    // config.data['signature'] = store.getters.signature
    // }
  } else { // 登陆了，比如首页接口不用传参数的情况
    // if (store.getters.username) {
    // config.data = {}
    // config.data['username'] = store.getters.username
    // config.data['signature'] = store.getters.signature
    // }
  }

  config.data = config.data ? qs.stringify(config.data) : null
  return config
}, error => {
  // Do something with request error
  store.commit('UPDATE_LOADING', true)
  console.log(error) // for debug
  Promise.reject(error)
})

// 返回拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    store.commit('UPDATE_LOADING', false)
    if (res.code === ERR_LOGIN || (res[0] && (res[0].code === ERR_LOGIN))) {
      // store.dispatch('loginout', true)
      if (!store.state.zj.login) {
        store.commit('SET_LOGIN', true)
        router.push({name: 'login'})
        // Alert({title: '', content: res.msg || (res[0] && (res[0].msg)), close: '取消', submit: '登录', flag: true}).then(res => {
        //   console.log(res)
        // })
      }
    }
    if (res.error_code && res.error_code !== 0) {
      // if ([122, 124, 125].indexOf(res.error_code) !== -1) { // 错误码和状态码混用导致的暂无数据，接口本质是正常的
      //   return res
      // }
      // if (res.error_code === 1) {
      //   return Promise.reject(res)
      // }
      // const lang = store.getters.language

      // if (res.error_code === 35) {
      // Message({ // 超时状态
      //   message: resMessage[lang][res.error_code] + ' ，5秒后将自动跳转至登陆',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      // setTimeout(() => {
      //   store.dispatch('FedLogOut').then(() => {
      //     location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      //   })
      // }, 5000)
      // return
      // }

      // 错误信息
      // let resultMsg = ''
      // if (res.msg) {
      //   resultMsg = res.msg
      // } else {
      //   resultMsg = resMessage[lang][res.error_code] ? resMessage[lang][res.error_code] : '未知错误：' + res.error_code
      // }
      // Message({ // 其它问题先弹错误信息
      //   message: resultMsg,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      return Promise.reject(response) // 报错给promise catch
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)// for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  })

export default service
