webpackJsonp([78],{e7pd:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("Dd8w"),a=s.n(i),n=s("ruAw"),c=s("HD9R"),l=s("aTeQ"),o=s("rHil"),r=s("62KO"),d=s("rLAy"),f=s("Xtdt"),u=s("y/jF"),p=s("qwAB"),v=s("JxNM"),h=s("NYxO"),_=(c.a,l.a,o.a,r.a,d.a,f.default,p.a,u.a,a()({fago:function(){this.$router.push("manageBill")},scroll:function(t){console.log(t.y)},_buyersAppCenterInvoiceListdo:function(){var t=this;Object(n.v)().then(function(e){if(e.code===v.c){if(!e.data.list||e.data.list.length<=0)return void t.$vux.toast.text("暂无数据","middle");t.list=e.data.list,t.userId=e.data.list[0].userId}}).catch(function(t){})},setdefault:function(t){this._buyersAppCenterInvoiceCheckdo(t)},_buyersAppCenterInvoiceCheckdo:function(t){var e=this;Object(n.t)({fpids:t}).then(function(t){t.code===v.c&&(e.deleteshow=!0,e.text=t.msg,e._buyersAppCenterInvoiceListdo())}).catch(function(t){})},_buyersAppCenterInvoiceDeletedo:function(t){var e=this;Object(n.u)({fpids:t}).then(function(t){t.code===v.c&&(e.deleteshow=!0,e.text=t.msg,e._buyersAppCenterInvoiceListdo())}).catch(function(t){})},deletebill:function(t){this._buyersAppCenterInvoiceDeletedo(t)},backorder:function(t){this.setBill(t),this.$router.back()}},Object(h.d)({setBill:"SET_BILL"})),{data:function(){return{list:[],text:"",deleteshow:!1,title:"选择发票信息",rightText:"管理",listenScroll:!0}},components:{Popup:c.a,XSwitch:l.a,Group:o.a,Confirm:r.a,Toast:d.a,MHeader:f.default,Scroll:p.a,Loading:u.a},created:function(){this._buyersAppCenterInvoiceListdo()},methods:a()({fago:function(){this.$router.push("manageBill")},scroll:function(t){console.log(t.y)},_buyersAppCenterInvoiceListdo:function(){var t=this;Object(n.v)().then(function(e){if(e.code===v.c){if(!e.data.list||e.data.list.length<=0)return void t.$vux.toast.text("暂无数据","middle");t.list=e.data.list,t.userId=e.data.list[0].userId}}).catch(function(t){})},setdefault:function(t){this._buyersAppCenterInvoiceCheckdo(t)},_buyersAppCenterInvoiceCheckdo:function(t){var e=this;Object(n.t)({fpids:t}).then(function(t){t.code===v.c&&(e.deleteshow=!0,e.text=t.msg,e._buyersAppCenterInvoiceListdo())}).catch(function(t){})},_buyersAppCenterInvoiceDeletedo:function(t){var e=this;Object(n.u)({fpids:t}).then(function(t){t.code===v.c&&(e.deleteshow=!0,e.text=t.msg,e._buyersAppCenterInvoiceListdo())}).catch(function(t){})},deletebill:function(t){this._buyersAppCenterInvoiceDeletedo(t)},backorder:function(t){this.setBill(t),this.$router.back()}},Object(h.d)({setBill:"SET_BILL"}))}),C={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"slide"}},[s("div",{staticClass:"invoice-management"},[s("div",{},[s("m-header",{attrs:{title:t.title,rightText:t.rightText,faflag:!0,headerflag:!0},on:{falevent:t.fago}})],1),t._v(" "),s("div",{staticClass:"content"},[s("scroll",{ref:"scroll",staticClass:"nominate-content",attrs:{data:t.list,"listen-scroll":t.listenScroll},on:{scroll:t.scroll}},[s("div",{},[t._l(t.list,function(e,i){return s("div",{key:i,staticClass:"pb20 z-bdb mb20 bgf pt20",on:{click:function(s){t.backorder(e)}}},[s("p",{staticClass:"lh50 pl3"},[s("span",{directives:[{name:"show",rawName:"v-show",value:1==e.defaultStatus,expression:"item.defaultStatus==1"}],staticClass:"clred"},[t._v("[默认发票]")])]),t._v(" "),s("p",{staticClass:"flex lh50 pl3 pr3"},[s("span",{staticClass:"fs26 c6 w-25"},[t._v("发票抬头")]),t._v(" "),s("span",{staticClass:"fs26 c0 flex-1"},[t._v(t._s(e.invoiceHend))])]),t._v(" "),s("p",{staticClass:"flex lh50 pl3 pr3"},[s("span",{staticClass:"fs26 c6 w-25"},[t._v("发票类型")]),t._v(" "),s("span",{staticClass:"fs26 c0 flex-1"},[t._v(t._s(0==e.type?"普通发票":"增值税专票"))])]),t._v(" "),s("p",{staticClass:"flex lh50 pl3 pr3"},[s("span",{staticClass:"fs26 c6 w-25"},[t._v("税务登记号")]),t._v(" "),s("span",{staticClass:"fs26 c0 flex-1"},[t._v(t._s(e.taxCode))])]),t._v(" "),s("p",{staticClass:"flex lh50 pl3 pr3"},[s("span",{staticClass:"fs26 c6 w-25"},[t._v("收票人")]),t._v(" "),s("span",{staticClass:"fs26 c0 flex-1"},[t._v(t._s(e.contactName))])]),t._v(" "),s("p",{staticClass:"flex lh50 pl3 pr3"},[s("span",{staticClass:"fs26 c6 w-25"},[t._v("联系方式")]),t._v(" "),s("span",{staticClass:"fs26 c0 flex-1"},[t._v(t._s(e.contactMobile))])]),t._v(" "),s("p",{staticClass:"flex lh50 pl3 pr3"},[s("span",{staticClass:"fs26 c6 w-25"},[t._v("收票人地址")]),t._v(" "),s("span",{staticClass:"fs26 c0 flex-1"},[t._v(t._s(e.provinceName)+t._s(e.cityName)+t._s(e.regionName)+t._s(e.address))])])])}),t._v(" "),s("div",{staticClass:"h126"})],2)])],1)])])},staticRenderFns:[]};var b=s("VU/8")(_,C,!1,function(t){s("eY8j")},"data-v-317d18c0",null);e.default=b.exports},eY8j:function(t,e){}});