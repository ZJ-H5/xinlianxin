import request from 'common/js/request'
import {getToken} from './auth'
import store from '@/store'
console.log(typeof (store.state.user.token))
let token = {token: getToken()}
let tokenval = JSON.stringify(token)
// 评价说明
export function pingfendo (data) {
  return request({
    url: '/xlxapp/app/List/pingfen.do',
    method: 'post',
    data
  })
}
// 商品详情页
export function orderListdo (data) {
  return request({
    url: '/xlxapp/app/List/orderList.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 公司全部评价
export function orderAllEvaluatedo (data) {
  return request({
    url: '/xlxapp/app/List/orderAllEvaluate.do',
    method: 'post',
    data
  })
}
// 公司详情
export function sellerUserDetailsdo (data) {
  return request({
    url: '/xlxapp/app/List/sellerUserDetails.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 热卖产品
export function sellerRmOrderdo (data) {
  return request({
    url: '/xlxapp/app/List/sellerRmOrder.do',
    method: 'post',
    data
  })
}
// 特价促销
export function sellerCxOrderdo (data) {
  return request({
    url: '/xlxapp/app/List/sellerCxOrder.do',
    method: 'post',
    data
  })
}
// 添加收藏
export function shoucangXhdo (data) {
  return request({
    url: '/xlxapp/app/List/shoucangXh.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 添加购物车
export function addShopCardo (data) {
  return request({
    url: '/xlxapp/app/List/addShopCar.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 账户中心收货地址
export function buyersAppUserCenterAddressListdo (data) {
  return request({
    url: 'xlxapp/app/my/buyersAppUserCenterAddressList.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 发起询价
export function addInquirydo (data) {
  return request({
    url: 'xlxapp/app/List/addInquiry.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 添加关注或者添加优质
export function addyzgzdo (data) {
  return request({
    url: 'xlxapp/app/List/addyzgz.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 个人账户
export function tiaozhuanMYdo (data) {
  return request({
    url: 'xlxapp/app/my/tiaozhuanMY.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 发票列表
export function buyersAppCenterInvoiceListdo (data) {
  return request({
    url: 'xlxapp/app/my/buyersAppCenterInvoiceList.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 省市区地址初始化列表
export function findCityListdo (data) {
  return request({
    url: 'xlxapp/app/my/findCityList1.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 省市区地址编辑保存
export function buyersAppCenterAddressSavedo (data) {
  return request({
    url: 'xlxapp/app/my/buyersAppCenterAddressSave.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 省市区地址地址删除
export function buyersAppCenterAddressDeletedo (data) {
  return request({
    url: 'xlxapp/app/my/buyersAppCenterAddressDelete.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 报关列表
export function buyersAppCenterCustomsListdo (data) {
  return request({
    url: 'xlxapp/app/Order/buyersAppCenterCustomsList.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 报关保存
export function buyersAppUserCenterCustomsSavedo (data) {
  return request({
    url: 'xlxapp/app/Order/buyersAppUserCenterCustomsSave.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 报关删除
export function buyersAppCenterCustomsDeletedo (data) {
  return request({
    url: 'xlxapp/app/Order/buyersAppCenterCustomsDelete.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 报关设置默认
export function buyersAppCenterCustomsCheckdo (data) {
  return request({
    url: 'xlxapp/app/Order/buyersAppCenterCustomsCheck.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 收货地址设置默认
export function buyersAppCenterAddressCheckdo (data) {
  return request({
    url: 'xlxapp/app/my/buyersAppCenterAddressCheck.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 发票保存
export function buyersAppCenterInvoiceSavedo (data) {
  return request({
    url: 'xlxapp/app/my/buyersAppCenterInvoiceSave.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 发票默认
export function buyersAppCenterInvoiceCheckdo (data) {
  return request({
    url: 'xlxapp/app/my/buyersAppCenterInvoiceCheck.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 发票删除
export function buyersAppCenterInvoiceDeletedo (data) {
  return request({
    url: 'xlxapp/app/my/buyersAppCenterInvoiceDelete.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 关注收藏列表
export function selectAppGzlistdo (data) {
  return request({
    url: 'xlxapp/app/my/selectAppGzlist.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 我的询价列表
export function buyersUserInquiryListdo (data) {
  return request({
    url: 'xlxapp/app/my/buyersUserInquiryList.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 报价单列表
export function myOfferListdo (data) {
  return request({
    url: 'xlxapp/app/my/myOfferList.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 报价忽略
export function AppmyOfferIgnoredo (data) {
  return request({
    url: 'xlxapp/app/my/AppmyOfferIgnore.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 报价初始化
export function AppofferInitdo (data) {
  return request({
    url: 'xlxapp/app/my/AppofferInit.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 重新报价
export function AppagainOfferdo (data) {
  return request({
    url: 'xlxapp/app/my/AppagainOffer.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 商品详情页下单
export function saveOrderdo (data) {
  return request({
    url: 'xlxapp/app/Order/saveOrder.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 销售订单
export function sellerOrderListdo (data) {
  return request({
    url: 'xlxapp/app/saleorder/sellerOrderList.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 确认订单
export function submitconfrimOrderdo (data) {
  return request({
    url: 'xlxapp/app/saleorder/submitconfrimOrder.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 待付款待补款的信息
export function sellerOrderDetailsdo (data) {
  return request({
    url: 'xlxapp/app/saleorder/sellerOrderDetails.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 查看物流
export function getLogisticsListdo (data) {
  return request({
    url: 'xlxapp/app/purchaseOrder/getLogisticsList.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 求购订单（订单列表）
export function buyersOrderListdo (data) {
  return request({
    url: 'xlxapp/app/purchaseOrder/buyersUserCenterBuyersOrderList.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 求购订单订单详情
export function buyersOrderDetailsdo (data) {
  return request({
    url: 'xlxapp/app/purchaseOrder/buyersUserCenterBuyersOrderDetails.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 买家评分保存
export function saveCommentdo (data) {
  return request({
    url: 'xlxapp/app/purchaseOrder/saveComment.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 卖家评分保存
export function saveSellCommentdo (data) {
  return request({
    url: 'xlxapp/app/saleorder/saveSellComment.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 取消订单
export function deleteOrderdo (data) {
  return request({
    url: 'xlxapp/app/purchaseOrder/deleteOrder.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 确认收货
export function confirmLogisticsdo (data) {
  return request({
    url: 'xlxapp/app/purchaseOrder/confirmLogistics.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 删除收藏
export function delectScXhdo (data) {
  return request({
    url: 'xlxapp/app/my/delectScXh.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 支付宝支付
export function alipayPaydo (data) {
  return request({
    url: 'xlxapp/app/alipay/alipayPay.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}

// 提醒卖家发货
export function appremainSendGoodsdo (data) {
  return request({
    url: 'xlxapp/app/purchaseOrder/appremainSendGoods.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 采购订单里面的上传合同
export function addContractdo (data) {
  return request({
    url: 'xlxapp/app/purchaseOrder/addContract.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 销售订单里面的上传发票
export function addInvoicedo (data) {
  return request({
    url: 'xlxapp/app/saleorder/addInvoice.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 销售订单里面的查看发票
export function sellerGetInvoiceListdo (data) {
  return request({
    url: 'xlxapp/app/saleorder/sellerGetInvoiceList.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 采购订单里面的上传汇款凭证
export function addPaymentVoucherdo (data) {
  return request({
    url: 'xlxapp/app/purchaseOrder/addPaymentVoucher.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 采购订单里面的查看汇款凭证
export function getPaymentVoucherListdo (data) {
  return request({
    url: 'xlxapp/app/purchaseOrder/getPaymentVoucherList.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 销售订单里面的确认汇款凭证
export function submitAffirmOrderPaymentVoucherdo (data) {
  return request({
    url: 'xlxapp/app/saleorder/submitAffirmOrderPaymentVoucher.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 销售订单里面的查看汇款凭证
export function sellerGetPaymentVoucherListdo (data) {
  return request({
    url: 'xlxapp/app/saleorder/sellerGetPaymentVoucherList.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 退出登录
export function ApploginOutdo (data) {
  return request({
    url: 'xlxapp/app/my/ApploginOut.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 关于ic猫
export function abloutICMdo (data) {
  return request({
    url: 'xlxapp/app/setup/abloutICM.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 订单详情
export function orderDetilsdo (data) {
  return request({
    url: 'xlxapp/app/purchaseOrder/orderDetils.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 热搜排行榜
export function modelAppSearchDatado (data) {
  return request({
    url: 'xlxapp/app/saleorder/modelAppSearchData.do',
    method: 'post',
    data: {...data}
  })
}
// 买家信誉
export function selectBuyersreputationdo (data) {
  return request({
    url: 'xlxapp/app/saleorder/selectBuyersreputation.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 首页咨询
export function subjectconsultationdo (data) {
  return request({
    url: 'xlxapp/app/saleorder/subjectconsultation.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// 修改公司名称
export function appupdateCompanyNamedo (data) {
  return request({
    url: 'xlxapp/app/setup/appupdateCompanyName.do',
    method: 'post',
    data: {token: store.state.user.token, ...data}
  })
}
// :{token:store.state.user.token,...data}
