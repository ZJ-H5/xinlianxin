webpackJsonp([45],{"49bU":function(t,e){},xmbJ:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("qp4g"),i=s("2R9+"),n=(a.default,i.default,{data:function(){return{msg:!0,showOrNot:!1,title:"我的询价"}},components:{TopMsg:a.default,zHeader:i.default},methods:{show:function(){this.showOrNot=!0},dialog:function(){this.showOrNot=!1},goback:function(){this.$router.back()}}}),r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"my-ask"},[e("div",{staticClass:"head"},[e("zHeader",{attrs:{msg:this.msg,title:this.title}})],1),this._v(" "),e("div",{staticClass:"content"},[e("div",{staticClass:"bgf pb20"},[e("ul",{staticClass:"detail-tab flex flex-alin-center"},[e("router-link",{attrs:{to:"/myAsk/yxj",tag:"li",replace:""}},[this._v("\n          已报价\n        ")]),this._v(" "),e("router-link",{attrs:{to:"/myAsk/wxj",tag:"li",replace:""}},[this._v("\n          未报价\n        ")])],1)]),this._v(" "),e("keep-alive",[e("router-view")],1)],1)])},staticRenderFns:[]};var l=s("VU/8")(n,r,!1,function(t){s("49bU")},"data-v-7bff365e",null);e.default=l.exports}});