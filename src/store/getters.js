const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  obj: state => state.jm.obj,
  updatedloading: state => state.zj.updatedloading,
  searchIndex: state => state.zj.searchIndex,
  history: state => state.zj.history,
  credithistory: state => state.zj.credithistory,
  setflagId: state => state.zj.setflagId,
  orderlist: state => state.zj.orderlist,
  bill: state => state.zj.bill,
  payfor: state => state.zj.payfor,
  thridInformation: state => state.zj.thridInformation,
  orderOther: state => state.zj.orderOther,
  count: state => state.zj.count,
  login: state => state.zj.login,
  fictionListType: state => state.zj.fictionListType,
  statusMessage: state => state.zj.statusMessage,
  sendtype: state => state.zj.sendtype,
  tabStausMessage: state => state.zj.tabStausMessage,
  wstype: state => state.zj.wstype,

  token: state => state.user.token,
  status: state => state.user.status,
  code: state => state.user.code,
  phone: state => state.user.phone,
  username: state => state.user.username,
  userId:state => state.user.userId,


  company: state => state.jm.company,
  address: state => state.jm.address,
  fileList: state => state.jm.fileList,
  bannerShow: state => state.jm.bannerShow,
  companyId:state => state.jm.companyId,
}
export default getters