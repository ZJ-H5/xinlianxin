webpackJsonp([109],{"93KA":function(e,t){},"Jwy/":function(e,t,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=c("mvHQ"),a=c.n(s),i=c("qp4g"),l=c("ruAw"),n=c("2R9+"),o=(i.default,n.default,{data:function(){return{msg:!0,showOrNot:!1,list:"",checkflag:!1,checkAll:!1,arr:[],title:"收藏型号",manage:!0}},created:function(){this._selectAppGzlistdo()},components:{TopMsg:i.default,zHeader:n.default},methods:{show:function(){this.showOrNot=!0},dialog:function(){this.showOrNot=!1},goback:function(){this.$router.go(-1)},_selectAppGzlistdo:function(){var e=this;Object(l.R)({type:3}).then(function(t){1==t.code&&(console.log(t.data),e.list=t.data,e.$nextTick(function(){var e=this;this.list.forEach(function(t){e.$set(t,"isCheck",!1)})}))}).catch(function(e){})},addattention:function(e,t){this._addyzgzdo(e,t)},_addyzgzdo:function(e,t){var c=this;Object(l.j)({type:t,companyId:e}).then(function(e){1==e.code&&(c.$vux.toast.text(e.msg,"middle"),c._selectAppGzlistdo())}).catch(function(e){})},checkManage:function(){this.checkflag=!this.checkflag},checkAllWether:function(){var e=0;this.list.forEach(function(t){!0===t.isCheck&&e++}),e===this.list.length?this.checkAll=this.list[0].isCheck:this.checkAll=!1},checkDelete:function(){var e=this;console.log(this.list),this.list.forEach(function(t){!0===t.isCheck&&e.arr.push(t.id)}),this._delectScXhdo(this.arr)},checked:function(){var e=this;this.list.forEach(function(t){e.$set(t,"isCheck",e.checkAll)})},_delectScXhdo:function(e){var t=this;Object(l.D)({ids:a()(e)}).then(function(e){1==e.code&&(t.$vux.toast.text("删除成功","middle"),t.arr=[],t._selectAppGzlistdo(),t.checkflag=!1)}).catch(function(e){t.arr=[]})}}}),h={render:function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("div",{staticClass:"collect"},[c("zHeader",{attrs:{msg:e.msg,title:e.title,manage:e.manage},on:{checkManage:e.checkManage}}),e._v(" "),c("div",{staticClass:"bgf"},e._l(e.list,function(t,s){return c("div",{key:s,staticClass:"pb40 z-bdb  pl3 pr3 flex flex-align-start pt40 "},[c("input",{directives:[{name:"show",rawName:"v-show",value:e.checkflag,expression:"checkflag"},{name:"model",rawName:"v-model",value:t.isCheck,expression:"item.isCheck"}],staticClass:"mr20 newInput",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.isCheck)?e._i(t.isCheck,null)>-1:t.isCheck},on:{change:[function(c){var s=t.isCheck,a=c.target,i=!!a.checked;if(Array.isArray(s)){var l=e._i(s,null);a.checked?l<0&&(t.isCheck=s.concat([null])):l>-1&&(t.isCheck=s.slice(0,l).concat(s.slice(l+1)))}else e.$set(t,"isCheck",i)},e.checkAllWether]}}),e._v(" "),c("router-link",{staticClass:"flex-1",attrs:{to:{path:"/productDetail",query:{cid:t.seller_user_id,tid:t.id}},tag:"div"}},[c("p",{staticClass:"flex flex-align-center "},[c("span",{staticClass:"c0 flex-1 "},[c("i",{staticClass:"z-cu mr20"},[e._v("促")]),e._v(e._s(t.model_code))]),e._v(" "),c("span",{staticClass:"mr40"},[e._v("库存 "),c("em",{staticClass:"ml20"},[e._v(e._s(t.quantity))])]),e._v(" "),c("span",[e._v("笔数 "),c("em",{staticClass:"ml20"},[e._v(e._s(t.quantity))])])]),e._v(" "),c("p",{staticClass:"flex flex-align-center pt40"},[c("span",{staticClass:"flex-1 c6",class:{pl45:e.checkflag}},[e._v(e._s(t.compname))]),e._v(" "),c("span",{staticClass:"clred fs36"},[e._v(" ￥56.5")])])])],1)})),e._v(" "),c("div",{directives:[{name:"show",rawName:"v-show",value:e.checkflag,expression:"checkflag"}],staticClass:"checkFoot"},[c("div",{staticClass:"checkContent"},[c("span",{staticClass:"flex-1 "},[c("input",{directives:[{name:"model",rawName:"v-model",value:e.checkAll,expression:"checkAll"}],staticClass:"newInput vtm mb5",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.checkAll)?e._i(e.checkAll,null)>-1:e.checkAll},on:{change:[function(t){var c=e.checkAll,s=t.target,a=!!s.checked;if(Array.isArray(c)){var i=e._i(c,null);s.checked?i<0&&(e.checkAll=c.concat([null])):i>-1&&(e.checkAll=c.slice(0,i).concat(c.slice(i+1)))}else e.checkAll=a},e.checked]}}),e._v(" "),c("em",{staticClass:"ml20 "},[e._v("全选")])]),e._v(" "),c("a",{staticClass:"checkDelete",attrs:{href:"javascript:;"},on:{click:e.checkDelete}},[e._v("删除")])])])],1)},staticRenderFns:[]};var r=c("VU/8")(o,h,!1,function(e){c("93KA")},"data-v-0463d8cc",null);t.default=r.exports}});