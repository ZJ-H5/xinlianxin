webpackJsonp([59],{"2Edm":function(t,s){},Cym1:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("ruAw"),n={data:function(){return{getParentId:this.$route.query.companyId,pjlist:""}},methods:{goback:function(){this.$router.replace({name:"introduce",params:{sellerId:this.getParentId}})},_pingfendo:function(){var t=this;Object(e.N)({getParentId:this.getParentId}).then(function(s){1==s.code&&(t.pjlist=s.data)}).catch(function(t){console.log(t)})}},mounted:function(){this._pingfendo()}},i={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"pjsm"},[a("div",{staticClass:"detail-head pl3 tc pr3 relative"},[a("a",{staticClass:"iconfont icon-back1 fs48 left cfff",attrs:{href:"javascript:;"},on:{click:t.goback}}),t._v(" "),a("span",{staticClass:"fs36 cfff"},[t._v("评价说明")])]),t._v(" "),a("div",{staticClass:"pt20 pb20 bgf pr3 pl3"},[a("table",{staticClass:"fs28 lh50"},[a("tr",[a("td",{staticClass:"tr c0",attrs:{width:"40%"}},[t._v("网站综合评分：")]),t._v(" "),a("td",[t._v(t._s(t.pjlist.total))])]),t._v(" "),a("tr",[a("td",{staticClass:"tr c0",attrs:{width:"40%"}},[t._v("\n          服务等级：\n        ")]),t._v(" "),a("td",[t._v("\n          "+t._s(t.pjlist.caculateServiceLevel)+"\n        ")])]),t._v(" "),a("tr",[a("td",{staticClass:"tr c0",attrs:{width:"40%"}},[t._v("\n          销售等级：\n        ")]),t._v(" "),a("td",[a("p",[a("span",{staticClass:"mr10"},[t._v("成交笔数 "+t._s(t.pjlist.ClinchPenNumber))]),t._v(" "),a("span",[t._v("销售金额  "+t._s(t.pjlist.total_sales))])]),t._v(" "),a("p",[t._v("\n           实单率 "+t._s(t.pjlist.caculateRateOfSingleEnd)+"%\n         ")])])])])])])},staticRenderFns:[]};var c=a("VU/8")(n,i,!1,function(t){a("2Edm")},"data-v-5dbbd629",null);s.default=c.exports}});