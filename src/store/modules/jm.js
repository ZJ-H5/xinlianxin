import * as types from './mutation-types'

const jm = {
  state: {
    company: {},
    address: {},
    fileList: [],
    bannerShow:true,
    companyId:''
  },
  mutations: {
    SET_OBJ: (state, obj) => {
      state.obj = obj
    },
    [types.SET_COMPANY]: (state, val) => {//方便解构
      state.company = val
    },
    [types.SET_ADDRESS]: (state, val) => {
      state.address = val
    },
    [types.SET_FILELIST]: (state, val) => {
      state.fileList = val
    },
    SET_SHOW: (state, obj) => {
      state.bannerShow = obj
    },
    SET_COMPANYID: (state, obj) => {
      state.companyId = obj
    },
  },
  actions: {
    objAction ({ commit }, obj) {
      // return new Promise((resolve) => {
      commit('SET_OBJ', obj)
      // })
    }

  }
}

export default jm
