webpackJsonp([61],{"3cRK":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("Dd8w"),n=s.n(i),o=s("HD9R"),a=s("aTeQ"),c=s("rHil"),r=s("rLAy"),u=s("62KO"),d=s("ruAw"),b=s("NYxO"),h=(o.a,a.a,c.a,r.a,u.a,n()({onCancel:function(){this.cfshow=!1},cartDialog:function(){this.addbg=!1,this.bjbg=!1},savebginfo:function(t){1===t?this._buyersAppUserCenterCustomsSavedo(t,this.userid,this.bgcompanyname,this.bgremark,this.bgvalue,""):2===t&&this._buyersAppUserCenterCustomsSavedo(t,this.userid,this.bjcompanyname,this.bjremark,this.bjvalue,this.id)},_buyersAppUserCenterCustomsSavedo:function(t,e,s,i,n,o){var a=this;Object(d.y)({type:t,userId:e,customsDeclaration:s,remark:i,defaultStatus:n,id:o}).then(function(t){1===t.code&&(a.addbg=!1,a.bjbg=!1,a.text=t.msg,a.selectShow=!0,a._buyersAppCenterCustomsListdo())}).catch(function(t){})},add:function(){this.addbg=!0},goback:function(){this.$router.back()},_buyersAppCenterCustomsListdo:function(){var t=this;Object(d.s)({}).then(function(e){1===e.code&&(t.list=e.data.list,t.userid=e.data.list[0].userId)}).catch(function(t){})},bjbginfo:function(t){this.bjbg=!0,this.bjcompanyname=t.customsDeclaration,this.bjremark=t.remark,this.bjvalue=t.defaultStatus,this.id=t.id},deleteinfo:function(t){this.cfshow=!0,this.id=t},deletebg:function(){this._buyersAppCenterCustomsDeletedo(this.id)},_buyersAppCenterCustomsDeletedo:function(t){var e=this;Object(d.r)({ids:t}).then(function(t){1===t.code&&(e.text=t.msg,e.selectShow=!0,e._buyersAppCenterCustomsListdo())}).catch(function(t){})},setdefaultbg:function(t){this._buyersAppCenterCustomsCheckdo(t)},_buyersAppCenterCustomsCheckdo:function(t){var e=this;Object(d.q)({id:t}).then(function(t){1===t.code&&(e.text=t.msg,e.selectShow=!0,e._buyersAppCenterCustomsListdo())}).catch(function(t){})},backorder:function(t){this.setCompany(t),this.$router.back()}},Object(b.d)({setCompany:"SET_COMPANY"})),{data:function(){return{addbg:!1,bgvalue:0,list:"",bgremark:"",bgcompanyname:"",userid:0,selectShow:!1,bjbg:!1,bjcompanyname:"",bjremark:"",bjvalue:0,text:"",id:0,cfshow:!1,obj:this.$route.params.obj,item:""}},created:function(){this._buyersAppCenterCustomsListdo()},components:{Popup:o.a,XSwitch:a.a,Group:c.a,Toast:r.a,Confirm:u.a},methods:n()({onCancel:function(){this.cfshow=!1},cartDialog:function(){this.addbg=!1,this.bjbg=!1},savebginfo:function(t){1===t?this._buyersAppUserCenterCustomsSavedo(t,this.userid,this.bgcompanyname,this.bgremark,this.bgvalue,""):2===t&&this._buyersAppUserCenterCustomsSavedo(t,this.userid,this.bjcompanyname,this.bjremark,this.bjvalue,this.id)},_buyersAppUserCenterCustomsSavedo:function(t,e,s,i,n,o){var a=this;Object(d.y)({type:t,userId:e,customsDeclaration:s,remark:i,defaultStatus:n,id:o}).then(function(t){1===t.code&&(a.addbg=!1,a.bjbg=!1,a.text=t.msg,a.selectShow=!0,a._buyersAppCenterCustomsListdo())}).catch(function(t){})},add:function(){this.addbg=!0},goback:function(){this.$router.back()},_buyersAppCenterCustomsListdo:function(){var t=this;Object(d.s)({}).then(function(e){1===e.code&&(t.list=e.data.list,t.userid=e.data.list[0].userId)}).catch(function(t){})},bjbginfo:function(t){this.bjbg=!0,this.bjcompanyname=t.customsDeclaration,this.bjremark=t.remark,this.bjvalue=t.defaultStatus,this.id=t.id},deleteinfo:function(t){this.cfshow=!0,this.id=t},deletebg:function(){this._buyersAppCenterCustomsDeletedo(this.id)},_buyersAppCenterCustomsDeletedo:function(t){var e=this;Object(d.r)({ids:t}).then(function(t){1===t.code&&(e.text=t.msg,e.selectShow=!0,e._buyersAppCenterCustomsListdo())}).catch(function(t){})},setdefaultbg:function(t){this._buyersAppCenterCustomsCheckdo(t)},_buyersAppCenterCustomsCheckdo:function(t){var e=this;Object(d.q)({id:t}).then(function(t){1===t.code&&(e.text=t.msg,e.selectShow=!0,e._buyersAppCenterCustomsListdo())}).catch(function(t){})},backorder:function(t){this.setCompany(t),this.$router.back()}},Object(b.d)({setCompany:"SET_COMPANY"}))}),f={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"collect"},[s("div",{staticClass:"detail-head pl3 tc pr3 relative"},[s("a",{staticClass:"iconfont icon-back1 fs48 left cfff",attrs:{href:"javascript:;"},on:{click:t.goback}}),t._v(" "),s("span",{staticClass:"fs36 cfff"},[t._v("选择报关公司")]),t._v(" "),s("router-link",{staticClass:"fs30 cfff right",attrs:{to:"/manageCompany"}},[t._v("管理")])],1),t._v(" "),t._l(t.list,function(e,i){return s("div",{key:i,staticClass:" z-bdb mb20 bgf ",on:{click:function(s){t.backorder(e)}}},[s("p",{staticClass:"fs30 pb20 pl3 pt20"},[s("span",{directives:[{name:"show",rawName:"v-show",value:1==e.defaultStatus,expression:"item.defaultStatus==1"}],staticClass:"clred"},[t._v("[默认报关]")])]),t._v(" "),s("p",{staticClass:"fs30 c0 pb20  pl3 pr3"},[t._v("\n      "+t._s(e.customsDeclaration)+"\n    ")]),t._v(" "),s("p",{staticClass:"fs26 c6 pb30  pl3 pr3"},[t._v("\n      "+t._s(e.remark)+"\n    ")])])})],2)},staticRenderFns:[]};var p=s("VU/8")(h,f,!1,function(t){s("ZtAl")},null,null);e.default=p.exports},ZtAl:function(t,e){}});