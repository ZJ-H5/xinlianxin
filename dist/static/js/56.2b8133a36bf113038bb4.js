webpackJsonp([56],{"B/3T":function(e,t){},wlhD:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("HD9R"),o=a("aTeQ"),i=a("rHil"),c=a("62KO"),s=a("rLAy"),r=a("ruAw"),d=(n.a,o.a,i.a,c.a,s.a,{data:function(){return{text:"",userId:""}},computed:{name:function(){}},components:{Popup:n.a,XSwitch:o.a,Group:i.a,Confirm:c.a,Toast:s.a},created:function(){console.log(this.$store.state.jm.obj)},methods:{goback:function(){this.$router.back()},fetchDate:function(){console.log(this.$route)},savefp:function(){this._buyersAppCenterInvoiceSavedo(this.$store.state.jm.obj)},_buyersAppCenterInvoiceSavedo:function(e){var t=this;Object(r.w)({id:e.id,type:e.type,invoiceHend:e.invoiceHend,companyAddress:e.companyAddress?e.companyAddress:"",companyPhone:e.companyPhone?e.companyPhone:"",taxCode:e.taxCode,bankName:e.bankName?e.bankName:"",bankCode:e.bankCode?e.bankCode:"",provinceId:e.provinceId,provinceName:e.provinceName,cityId:e.cityId,cityName:e.cityName,regionId:e.regionId,regionName:e.regionName,address:e.address,defaultStatus:e.defaultStatus,contactName:e.contactName,contactMobile:e.contactMobile}).then(function(e){1==e.code&&(t.$vux.toast.text(e.msg,"middle"),t.$router.back())}).catch(function(e){})}}}),l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"fixedtop"},[a("div",{staticClass:"header"},[a("a",{staticClass:"iconfont icon-back1 fs48 left cfff",attrs:{href:"javascript:;"},on:{click:e.goback}}),e._v(" "),a("span",{staticClass:"txt"},[e._v("修改发票信息")]),e._v(" "),a("a",{staticClass:"add",on:{click:e.savefp}},[e._v("保存")])])]),e._v(" "),a("div",{staticClass:"fptab clr"},[a("router-link",{staticClass:"fptab-link",attrs:{tag:"div",to:{name:"editgeneralInvoice",params:{type:0}},name:e.name,replace:""}},[a("p",[e._v("普通发票")])]),e._v(" "),a("router-link",{staticClass:"fptab-link",attrs:{tag:"div",to:{name:"editvatInvoice"},name:e.name,replace:""}},[a("p",[e._v("增值税发票")])])],1),e._v(" "),a("keep-alive",[a("router-view")],1),e._v(" "),a("toast",{attrs:{position:"middle",value:e.deleteshow,text:e.text,width:"50%"}})],1)},staticRenderFns:[]};var p=a("VU/8")(d,l,!1,function(e){a("B/3T")},null,null);t.default=p.exports}});