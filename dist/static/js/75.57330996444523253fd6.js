webpackJsonp([75],{"/DOq":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("ruAw"),a=s("H+gd"),c={data:function(){return{orderId:this.$route.query.orderId,list:"",type:this.$route.query.type}},filters:{formatDate:function(t){var e=new Date(t);return Object(a.b)(e,"yyyy-MM-dd hh:mm")}},created:function(){0==this.type?this._getPaymentVoucherListdo():1==this.type&&this._sellerGetPaymentVoucherListdo()},methods:{goback:function(){this.$router.back()},_getPaymentVoucherListdo:function(){var t=this;Object(i.H)({orderId:this.orderId}).then(function(e){1==e.code&&(0==e.data.length?t.$vux.toast.text(e.msg,"middle"):t.$nextTick(function(){t.list=e.data;for(var s=0;s<t.list.length;s++)t.$set(t.list[s],"filelist",t.list[s].filesPath.split(","));console.log(t.list)}))}).catch(function(t){})},_submitAffirmOrderPaymentVoucherdo:function(t){var e=this;Object(i._2)({orderId:t}).then(function(t){1==t.code&&(e.$vux.toast.text(t.msg,"middle"),e.$router.back())}).catch(function(t){})},_sellerGetPaymentVoucherListdo:function(){var t=this;Object(i.V)({orderId:this.orderId}).then(function(e){1==e.code&&(0==e.data.length?t.$vux.toast.text(e.msg,"middle"):t.$nextTick(function(){t.list=e.data;for(var s=0;s<t.list.length;s++)t.$set(t.list[s],"filelist",t.list[s].filesPath.split(","));console.log(t.list)}))}).catch(function(t){})}}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"checkEvidence"},[s("div",{staticClass:"head"},[s("div",{staticClass:"detail-head pl3 tc pr3 relative"},[s("a",{staticClass:"iconfont icon-back1 fs48 left cfff",attrs:{href:"javascript:;"},on:{click:t.goback}}),t._v(" "),s("span",{staticClass:"fs36 cfff"},[t._v("查看付款凭证")])])]),t._v(" "),s("div",{staticClass:"content"},t._l(t.list,function(e){return s("div",{staticClass:"pl3 pr3 bgf pt20 pb20 bdb clr"},[s("p",{staticClass:"lh80 flex"},[s("span",{staticClass:"flex-1 c0 fs30"},[t._v("付款金额："),s("em",{staticClass:"clred"},[t._v(t._s(e.money/100))])]),t._v(" "),s("span",[t._v(t._s(t._f("formatDate")(e.createTime)))])]),t._v(" "),s("ul",{staticClass:"uploadul clr"},t._l(e.filelist,function(t){return s("li",{staticClass:"uploadli"},[s("img",{staticClass:"z-logo",attrs:{src:t,alt:""}})])})),t._v(" "),1==t.type&&0==e.status?s("a",{staticClass:"z-bluek inlineblock mt10 mb10 right",attrs:{href:"javascript:;"},on:{click:function(s){t._submitAffirmOrderPaymentVoucherdo(e.id)}}},[t._v("确认收款")]):t._e()])}))])},staticRenderFns:[]};var l=s("VU/8")(c,n,!1,function(t){s("Ft9j")},null,null);e.default=l.exports},Ft9j:function(t,e){}});