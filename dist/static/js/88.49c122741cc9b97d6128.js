webpackJsonp([88],{K328:function(t,s){},XLBN:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var l=i("qwAB"),e=i("ruAw"),a=(l.a,{data:function(){return{orderid:this.$route.query.orderId,list:"",data:"",idx:0}},created:function(){this._getLogisticsListdo()},methods:{goback:function(){this.$router.back()},_getLogisticsListdo:function(){var t=this;Object(e.G)({orderId:this.orderid}).then(function(s){1==s.code&&(t.list=s.data,t.data=t.list[0],console.log(t.data),t.$nextTick(function(){1==t.list.length?(console.log(t.$refs.scrollli),t.$refs.scrollul.style.width="100%",t.$refs.scrollli[0].style.width="100%"):t.$refs.scrollul.style.width=5*s.data.length+"rem"}))}).catch(function(t){})},showwl:function(t){this.idx=t,this.data=this.list[t]},getwl:function(t){this._confirmLogisticsdo(t)},_confirmLogisticsdo:function(t){var s=this;Object(e.C)({logisticsId:t}).then(function(t){1==t.code&&(s.$vux.toast.text(t.msg,"middle"),s.$router.back())}).catch(function(t){})}},components:{Scroll:l.a}}),c={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"logistics"},[i("div",{staticClass:"detail-head pl3 tc pr3 relative"},[i("a",{staticClass:"iconfont icon-back1 fs48 left cfff",attrs:{href:"javascript:;"},on:{click:t.goback}}),t._v(" "),i("span",{staticClass:"fs36 cfff"},[t._v("查看物流收货")])]),t._v(" "),i("div",{staticClass:"bgf pb20"},[0!=t.list.length?i("scroll",{ref:"scroll",staticClass:"nominate-content",attrs:{scrollX:!0}},[t.list.length>0?i("ul",{ref:"scrollul",staticClass:"detail-tab clearfix"},t._l(t.list,function(s,l){return i("li",{ref:"scrollli",refInFor:!0,class:{bdblue:t.idx==l},on:{click:function(s){t.showwl(l)}}},[t._v("\n          物流"+t._s(l+1)+"\n        ")])})):t._e()]):t._e(),t._v(" "),0==t.list.length?i("div",{staticClass:"bgf pl3 pr3 pt40 tc fs30 pb20"},[t._v("\n      暂无物流数据\n    ")]):t._e(),t._v(" "),t._l(t.data.tlds,function(s){return t.list.length>0?i("div",{staticClass:"bgf pl3 pr3"},[i("p",{staticClass:"flex flex-align-center pb30 fs30 c0 pt30"},[i("span",{staticClass:"flex-1"},[t._v("\n        发货型号："+t._s(s.model_code)+"\n      ")]),t._v(" "),i("span",[t._v("\n        数量："+t._s(s.deliver_qty)+"\n      ")])]),t._v(" "),i("p",{staticClass:"tr pt30 pb30"},[1==t.data.status?i("span",{staticClass:"z-link inlineblock"},[t._v("\n          已确认\n        ")]):t._e(),t._v(" "),0==t.data.status?i("a",{staticClass:"z-bluek inlineblock",attrs:{href:"javascript:;"},on:{click:function(s){t.getwl(t.data.id)}}},[t._v("确认")]):t._e()])]):t._e()})],2)])},staticRenderFns:[]};var n=i("VU/8")(a,c,!1,function(t){i("K328")},"data-v-236a48ea",null);s.default=n.exports}});