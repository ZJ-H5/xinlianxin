import {loginUserdo} from 'api/login'
import {ApploginOut} from 'api/set'
import {getToken, setToken, setAny, getAny, removeToken, removeAny} from 'api/auth'
import {OK_TRUE} from '@/api/conflg'
import storage from 'api/storage'
const user = {
  state: {
    user: '',
    status: '',
    code: getAny('code'),
    phone: getAny('phone'),
    token: getToken(),
    username: '',
    userId: getAny('userId'),
    redirect: 'recommend/nominate', // 重定向
    loginflag: false, // 用户没有登录 2
    loginData: getAny('loginData'),
    openSeller: ''// 是否是卖家
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_USETNAME: (state, username) => {
      state.username = username
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    SET_REDIRECT: (state, redirect) => {
      state.redirect = redirect
    },
    SET_USERID: (state, redirect) => {
      state.userId = redirect
    },
    SET_OPENSELLER: (state, redirect) => {
      state.openSeller = redirect
    },
    SET_LOGINFLAG: (state, type) => {
      state.loginflag = type
    },
    SET_LOGINDATA: (state, obj) => {
      state.loginData = typeof (state.loginData) === 'string' ? JSON.parse(state.loginData) : state.loginData
      state.loginData = obj
    },
    SET_LOGINDATAIMG: (state, headimg) => {
      state.loginData = typeof (state.loginData) === 'string' ? JSON.parse(state.loginData) : state.loginData
      state.loginData.head_pic = headimg
    },
    SET_LOGINDATANAME: (state, company) => {
      state.loginData = typeof (state.loginData) === 'string' ? JSON.parse(state.loginData) : state.loginData
      state.loginData.company = company
    }
  },
  actions: {
    loginUserdo ({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        loginUserdo(userInfo).then((response) => {
          if (response.code !== OK_TRUE) {
            reject(response)
            // ApploginOut
            return
          }
          setToken(response.data.data.token)
          commit('SET_LOGINDATA', response.data.data)
          commit('SET_TOKEN', response.data.data.token)
          commit('SET_USERID', response.data.data.userId)
          commit('SET_OPENSELLER', response.data.data.open_seller)
          setAny('phone', userInfo.phone)
          setAny('code', userInfo.type)
          setAny('userId', response.data.data.userId)
          setAny('loginData', response.data.data)
          setAny('openSeller', response.data.data.open_seller)

          storage.setStore('token', response.data.data.token)
          storage.setStore('hmd', response.data.data.hmd)
          storage.setStore('user', {phone: userInfo.phone, pwd: userInfo.pwd})
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    loginout ({commit}, type) {
      return new Promise((resolve, reject) => {
        ApploginOut().then((response) => {
          if (response.code !== OK_TRUE) {
            reject(response)
            return
          }
          removeToken()
          commit('SET_TOKEN', '')
          removeAny('phone', '')
          removeAny('code', '')
          removeAny('loginData', '')
          removeAny('openSeller', '')
          storage.setStore('token', '')
          storage.setStore('hmd', false)
          storage.setStore('user', {phone: storage.getStore('user').phone, pwd: ''})
          resolve(response)
        })
      })
    },
    redirectAction ({ commit }, redirect) {
      commit('SET_REDIRECT', redirect)
    },
    loginheadimgAction ({ commit }, img) {
      console.log(img)
      commit('SET_LOGINDATAIMG', img)
    },
    loginheadnameAction ({ commit }, name) {
      commit('SET_LOGINDATANAME', name)
    }
  }
}
export default user
