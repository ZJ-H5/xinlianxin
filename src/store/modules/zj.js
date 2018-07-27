import * as types from './mutation-types'
const zj = {
  state: {
    updatedloading: false,
    searchIndex: '',
    history: [],
    credithistory: [],
    orderlist: [],
    setflagId: 0,
    setphone: '',
    bill: {},
    payfor: {},
    thridInformation: {},
    orderOther: {},
    count: false,
    login: false,
    fictionListType: false,
    statusMessage: 0,
    sendtype: false,
    tabStausMessage: 0,
    wstype: true
  },
  mutations: {
    UPDATE_LOADING: (state, updatedloading) => {
      state.updatedloading = updatedloading
    },
    [types.SEARCH_INDEX]: (state, searchIndex) => {
      state.searchIndex = searchIndex
    },
    [types.HISTORY]: (state, history) => {
      state.history.push(history)
    },
    [types.CREDITHISTORY]: (state, credithistory) => {
      state.credithistory.push(credithistory)
    },
    [types.SET_HISTORY]: (state, history) => {
      state.history = history
    },
    [types.SET_CREDITHISTORY]: (state, credithistory) => {
      state.credithistory = credithistory
    },
    [types.FLAGID]: (state, setflagId) => {
      state.setflagId = setflagId
    },
    [types.ORDER_LIST]: (state, val) => {
      state.orderlist[0] = val
    },
    [types.SET_BILL]: (state, val) => {
      state.bill = val
    },
    [types.SET_PAYFOR]: (state, val) => {
      state.payfor = val
    },
    [types.SET_THRIDINFORMATION]: (state, val) => {
      state.thridInformation = val
    },
    [types.SET_ORDEROTHER]: (state, val) => {
      state.orderOther = val
    },
    [types.SET_COUNT]: (state, val) => {
      state.count = val
    },
    SET_LOGIN: (state, flag) => {
      state.login = flag
    },
    [types.SET_FICTIONLISTTYPE]: (state, flag) => {
      state.fictionListType = flag
    },
    [types.SET_STATUSMESSAGE]: (state, type) => {
      if (!type) {
        state.statusMessage = 0
      } else {
        state.statusMessage++
      }
    },
    [types.SET_SENDTYPE]: (state, sendtype) => {
      state.sendtype = sendtype
    },
    [types.SET_TABSTATUSMESSAGE]: (state, number) => {
      state.tabStausMessage = number
    },
    [types.SET_WSTYPE]: (state, flag) => {
      state.wstype = flag
    }
  },
  actions: {
    loadingAction ({ commit }, updatedloading) {
      // return new Promise((resolve) => {
      commit('UPDATE_LOADING', updatedloading)
      // })
    },
    searchIndexAction ({commit}, searchIndex) {
      commit(types.SEARCH_INDEX, searchIndex)
    },
    historyAction ({commit}, history) {
      commit(types.HISTORY, history)
    },
    credithistoryAction ({commit}, credithistory) {
      commit(types.CREDITHISTORY, credithistory)
    },
    countAction ({commit}, flag) {
      commit(types.SET_COUNT, flag)
    },
    loginAction ({commit}, flag) {
      commit('SET_LOGIN', flag)
    },
    fictionListTypeAction ({commit}, flag) {
      commit(types.SET_FICTIONLISTTYPE, flag)
    },
    statusMessageAction ({commit}, flag) {
      commit(types.SET_STATUSMESSAGE, flag)
    },
    sendtypeAction ({commit}, flag) {
      commit(types.SET_SENDTYPE, flag)
    },
    wstypeAction ({commit}, flag) {
      commit(types.SET_WSTYPE, flag)
    }
  }
}

export default zj
