webpackJsonp([41],{Fj6j:function(t,e){},fwVb:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var c=s("Dd8w"),a=s.n(c),i=s("ruAw"),n=s("HD9R"),o=s("aTeQ"),l=s("rHil"),r=s("62KO"),p=s("rLAy"),f=s("NYxO"),u=(n.a,o.a,l.a,r.a,p.a,a()({goback:function(){this.$router.replace("/checkOrder")},_buyersAppCenterInvoiceListdo:function(){var t=this;Object(i.v)({}).then(function(e){1===e.code&&(t.list=e.data.list,t.userId=e.data.list[0].userId)}).catch(function(t){})},setdefault:function(t){this._buyersAppCenterInvoiceCheckdo(t)},_buyersAppCenterInvoiceCheckdo:function(t){var e=this;Object(i.t)({fpids:t}).then(function(t){1===t.code&&(e.deleteshow=!0,e.text=t.msg,e._buyersAppCenterInvoiceListdo())}).catch(function(t){})},_buyersAppCenterInvoiceDeletedo:function(t){var e=this;Object(i.u)({fpids:t}).then(function(t){1===t.code&&(e.deleteshow=!0,e.text=t.msg,e._buyersAppCenterInvoiceListdo())}).catch(function(t){})},deletebill:function(t){this._buyersAppCenterInvoiceDeletedo(t)},backorder:function(t){this.setBill(t),this.$router.back()}},Object(f.d)({setBill:"SET_BILL"})),{data:function(){return{list:"",text:"",deleteshow:!1,obj:this.$route.params.obj,item:""}},components:{Popup:n.a,XSwitch:o.a,Group:l.a,Confirm:r.a,Toast:p.a},created:function(){console.log(this.obj),this._buyersAppCenterInvoiceListdo()},methods:a()({goback:function(){this.$router.replace("/checkOrder")},_buyersAppCenterInvoiceListdo:function(){var t=this;Object(i.v)({}).then(function(e){1===e.code&&(t.list=e.data.list,t.userId=e.data.list[0].userId)}).catch(function(t){})},setdefault:function(t){this._buyersAppCenterInvoiceCheckdo(t)},_buyersAppCenterInvoiceCheckdo:function(t){var e=this;Object(i.t)({fpids:t}).then(function(t){1===t.code&&(e.deleteshow=!0,e.text=t.msg,e._buyersAppCenterInvoiceListdo())}).catch(function(t){})},_buyersAppCenterInvoiceDeletedo:function(t){var e=this;Object(i.u)({fpids:t}).then(function(t){1===t.code&&(e.deleteshow=!0,e.text=t.msg,e._buyersAppCenterInvoiceListdo())}).catch(function(t){})},deletebill:function(t){this._buyersAppCenterInvoiceDeletedo(t)},backorder:function(t){this.setBill(t),this.$router.back()}},Object(f.d)({setBill:"SET_BILL"}))}),d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"collect"},[s("div",{staticClass:"detail-head pl3 tc pr3 relative"},[s("a",{staticClass:"iconfont icon-back1 fs48 left cfff",attrs:{href:"javascript:;"},on:{click:t.goback}}),t._v(" "),s("span",{staticClass:"fs36 cfff"},[t._v("选择发票信息")]),t._v(" "),s("router-link",{staticClass:"fs30 cfff right",attrs:{to:{path:"/manageBill"}}},[t._v("管理")])],1),t._v(" "),t._l(t.list,function(e,c){return s("div",{key:c,staticClass:"pb20 z-bdb mb20 bgf pt20",on:{click:function(s){t.backorder(e)}}},[s("p",{staticClass:"lh50 pl3"},[s("span",{directives:[{name:"show",rawName:"v-show",value:1==e.defaultStatus,expression:"item.defaultStatus==1"}],staticClass:"clred"},[t._v("[默认发票]")])]),t._v(" "),s("p",{staticClass:"flex lh50 pl3 pr3"},[s("span",{staticClass:"fs26 c6 w-25"},[t._v("发票抬头")]),t._v(" "),s("span",{staticClass:"fs26 c0 flex-1"},[t._v(t._s(e.invoiceHend))])]),t._v(" "),s("p",{staticClass:"flex lh50 pl3 pr3"},[s("span",{staticClass:"fs26 c6 w-25"},[t._v("发票类型")]),t._v(" "),s("span",{staticClass:"fs26 c0 flex-1"},[t._v(t._s(0==e.type?"普通发票":"增值税专票"))])]),t._v(" "),s("p",{staticClass:"flex lh50 pl3 pr3"},[s("span",{staticClass:"fs26 c6 w-25"},[t._v("税务登记号")]),t._v(" "),s("span",{staticClass:"fs26 c0 flex-1"},[t._v(t._s(e.taxCode))])]),t._v(" "),s("p",{staticClass:"flex lh50 pl3 pr3"},[s("span",{staticClass:"fs26 c6 w-25"},[t._v("收票人")]),t._v(" "),s("span",{staticClass:"fs26 c0 flex-1"},[t._v(t._s(e.contactName))])]),t._v(" "),s("p",{staticClass:"flex lh50 pl3 pr3"},[s("span",{staticClass:"fs26 c6 w-25"},[t._v("联系方式")]),t._v(" "),s("span",{staticClass:"fs26 c0 flex-1"},[t._v(t._s(e.contactMobile))])]),t._v(" "),s("p",{staticClass:"flex lh50 pl3 pr3"},[s("span",{staticClass:"fs26 c6 w-25"},[t._v("收票人地址")]),t._v(" "),s("span",{staticClass:"fs26 c0 flex-1"},[t._v(t._s(e.provinceName)+t._s(e.cityName)+t._s(e.regionName)+t._s(e.address))])])])})],2)},staticRenderFns:[]};var v=s("VU/8")(u,d,!1,function(t){s("Fj6j")},"data-v-92793116",null);e.default=v.exports}});