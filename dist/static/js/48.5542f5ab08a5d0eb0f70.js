webpackJsonp([48],{La1r:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("HD9R"),i=a("aTeQ"),n=a("rHil"),o=a("rLAy"),c=a("62KO"),l=a("ruAw"),r=(e.a,i.a,n.a,o.a,c.a,{data:function(){return{addbg:!1,bgvalue:0,list:"",bgremark:"",bgcompanyname:"",userid:0,selectShow:!1,bjbg:!1,bjcompanyname:"",bjremark:"",bjvalue:0,text:"",id:0,cfshow:!1}},created:function(){this._buyersAppCenterCustomsListdo()},components:{Popup:e.a,XSwitch:i.a,Group:n.a,Toast:o.a,Confirm:c.a},methods:{onCancel:function(){this.cfshow=!1},cartDialog:function(){this.addbg=!1,this.bjbg=!1},savebginfo:function(t){if(console.log(111),1===t){if(!this.bgcompanyname)return void this.$vux.toast.text("公司名不能为空","middle");if(!this.bgremark)return void this.$vux.toast.text("备注不能为空","middle");this._buyersAppUserCenterCustomsSavedo(t,this.userid,this.bgcompanyname,this.bgremark,this.bgvalue,"")}else if(2===t){if(!this.bjcompanyname)return void this.$vux.toast.text("公司名不能为空","middle");if(!this.bjremark)return void this.$vux.toast.text("备注不能为空","middle");this._buyersAppUserCenterCustomsSavedo(t,this.userid,this.bjcompanyname,this.bjremark,this.bjvalue,this.id)}},_buyersAppUserCenterCustomsSavedo:function(t,s,a,e,i,n){var o=this;Object(l.y)({type:t,customsDeclaration:a,remark:e,defaultStatus:i,id:n}).then(function(t){1===t.code&&(o.addbg=!1,o.bjbg=!1,o.text=t.msg,o.selectShow=!0,o._buyersAppCenterCustomsListdo())}).catch(function(t){})},add:function(){this.addbg=!0},goback:function(){this.$router.go(-1)},_buyersAppCenterCustomsListdo:function(){var t=this;Object(l.s)({}).then(function(s){1===s.code&&(t.list=s.data.list,t.userid=s.data.list[0].userId)}).catch(function(t){})},bjbginfo:function(t){this.bjbg=!0,this.bjcompanyname=t.customsDeclaration,this.bjremark=t.remark,this.bjvalue=t.defaultStatus,this.id=t.id},deleteinfo:function(t){this.cfshow=!0,this.id=t},deletebg:function(){this._buyersAppCenterCustomsDeletedo(this.id)},_buyersAppCenterCustomsDeletedo:function(t){var s=this;Object(l.r)({ids:t}).then(function(t){1===t.code&&(s.text=t.msg,s.selectShow=!0,s._buyersAppCenterCustomsListdo())}).catch(function(t){})},setdefaultbg:function(t){this._buyersAppCenterCustomsCheckdo(t)},_buyersAppCenterCustomsCheckdo:function(t){var s=this;Object(l.q)({id:t}).then(function(t){1===t.code&&(s.text=t.msg,s.selectShow=!0,s._buyersAppCenterCustomsListdo())}).catch(function(t){})}}}),p={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"collect"},[a("div",{staticClass:"detail-head pl3 tc pr3 relative"},[a("a",{staticClass:"iconfont icon-back1 fs48 left cfff",attrs:{href:"javascript:;"},on:{click:t.goback}}),t._v(" "),a("span",{staticClass:"fs36 cfff"},[t._v("管理报关公司")]),t._v(" "),a("a",{staticClass:"fs30 cfff right",attrs:{href:"javascript:;"},on:{click:t.add}},[t._v("新增")])]),t._v(" "),t._l(t.list,function(s,e){return a("div",{key:e,staticClass:"pb20 z-bdb mb20 bgf"},[a("p",{staticClass:"fs30 c0 lh80  pl3 pr3"},[t._v("\n      "+t._s(s.customsDeclaration)+"\n    ")]),t._v(" "),a("p",{staticClass:"fs26 c6  z-bdb pb30  pl3 pr3"},[t._v("\n      "+t._s(s.remark)+"\n    ")]),t._v(" "),a("p",{staticClass:"flex flex-align-center pt20  pl3 pr3"},[a("span",{staticClass:"flex-1 fs26",on:{click:function(a){t.setdefaultbg(s.id)}}},[a("input",{staticClass:"vtm",attrs:{type:"radio"},domProps:{checked:1==s.defaultStatus}}),t._v(" "),a("span",{staticClass:"vtm ml10"},[t._v("\n              默认报关\n            ")])]),t._v(" "),a("a",{staticClass:"iconfont icon-shanchu fs36 mr10",attrs:{href:"javascript:;"},on:{click:function(a){t.deleteinfo(s.id)}}}),t._v(" "),a("a",{staticClass:"iconfont icon-bianji3 fs36 ",attrs:{href:"javascript:;"},on:{click:function(a){t.bjbginfo(s)}}})])])}),t._v(" "),a("popup",{attrs:{position:"bottom",value:t.addbg},on:{"on-hide":t.cartDialog}},[a("div",{staticClass:"bgf2"},[a("div",{staticClass:"bgf mb20"},[a("h1",{staticClass:"fs36 clblue bdb lh120 pl3 pr3 tc fwb"},[t._v("\n          新增报关\n        ")]),t._v(" "),a("p",{staticClass:"flex lh60 pl3 pr3 tr pt20 pb20"},[a("span",{staticClass:"inlineblock w-25 fs28 c6"},[t._v("公司名称：")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.bgcompanyname,expression:"bgcompanyname"}],staticClass:"z-input ml10",attrs:{type:"text",placeholder:"请输入公司名称"},domProps:{value:t.bgcompanyname},on:{input:function(s){s.target.composing||(t.bgcompanyname=s.target.value)}}})]),t._v(" "),a("p",{staticClass:"flex lh60 pl3 pr3 tr pt20 pb20"},[a("span",{staticClass:"inlineblock w-25 fs28 c6"},[t._v("备注：")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.bgremark,expression:"bgremark"}],staticClass:"z-input ml10",attrs:{type:"text",placeholder:"请输入备注"},domProps:{value:t.bgremark},on:{input:function(s){s.target.composing||(t.bgremark=s.target.value)}}})]),t._v(" "),a("group",[a("x-switch",{attrs:{title:"设为默认","value-map":[0,1]},model:{value:t.bgvalue,callback:function(s){t.bgvalue=s},expression:"bgvalue"}})],1)],1),t._v(" "),a("div",{staticClass:"pt40 fs0 bgf"},[a("a",{staticClass:"dialogbtn cancel vux-popup-show",attrs:{href:"javascript:;"},on:{click:t.cartDialog}},[t._v("取消")]),t._v(" "),a("a",{staticClass:"dialogbtn confirm",attrs:{href:"javascript:;"},on:{click:function(s){t.savebginfo(1)}}},[t._v("保存")])])])]),t._v(" "),a("popup",{attrs:{position:"bottom",value:t.bjbg,default:"1231313131"},on:{"on-hide":t.cartDialog}},[a("div",{staticClass:"bgf2"},[a("div",{staticClass:"bgf mb20"},[a("h1",{staticClass:"fs36 clblue bdb lh120 pl3 pr3 tc fwb"},[t._v("\n          编辑报关\n        ")]),t._v(" "),a("p",{staticClass:"flex lh60 pl3 pr3 tr pt20 pb20"},[a("span",{staticClass:"inlineblock w-25 fs28 c6"},[t._v("公司名称：")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.bjcompanyname,expression:"bjcompanyname"}],staticClass:"z-input ml10",attrs:{type:"text",placeholder:"请输入公司名称"},domProps:{value:t.bjcompanyname},on:{input:function(s){s.target.composing||(t.bjcompanyname=s.target.value)}}})]),t._v(" "),a("p",{staticClass:"flex lh60 pl3 pr3 tr pt20 pb20"},[a("span",{staticClass:"inlineblock w-25 fs28 c6"},[t._v("备注：")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.bjremark,expression:"bjremark"}],staticClass:"z-input ml10",attrs:{type:"text",placeholder:"请输入备注"},domProps:{value:t.bjremark},on:{input:function(s){s.target.composing||(t.bjremark=s.target.value)}}})]),t._v(" "),a("group",[a("x-switch",{attrs:{title:"设为默认","value-map":[0,1]},model:{value:t.bjvalue,callback:function(s){t.bjvalue=s},expression:"bjvalue"}})],1)],1),t._v(" "),a("div",{staticClass:"pt40 fs0 bgf"},[a("a",{staticClass:"dialogbtn cancel vux-popup-show",attrs:{href:"javascript:;"},on:{click:t.cartDialog}},[t._v("取消")]),t._v(" "),a("a",{staticClass:"dialogbtn confirm",attrs:{href:"javascript:;"},on:{click:function(s){t.savebginfo(2)}}},[t._v("保存")])])])]),t._v(" "),a("confirm",{on:{"on-cancel":t.onCancel,"on-hide":t.onCancel,"on-confirm":function(s){t.deletebg()}},model:{value:t.cfshow,callback:function(s){t.cfshow=s},expression:"cfshow"}},[a("p",{staticStyle:{"text-align":"center"}},[t._v(t._s("确定删除该报关?"))])]),t._v(" "),a("toast",{attrs:{position:"middle",value:t.selectShow,text:t.text,width:"50%"}})],2)},staticRenderFns:[]};var u=a("VU/8")(r,p,!1,function(t){a("kaDv")},null,null);s.default=u.exports},kaDv:function(t,s){}});