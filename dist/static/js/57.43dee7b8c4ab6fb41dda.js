webpackJsonp([57],{MIci:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("Gu7T"),i=a.n(e),l=a("ruAw"),o=a("rLAy"),n=a("HD9R"),c=a("qp4g"),r=a("qwAB"),f=a("y/jF"),p=(a("JxNM"),a("4Zr1")),d=a("/kga"),u=(d.a,o.a,n.a,c.default,f.a,r.a,p.default,{data:function(){return{list:[],bjshow:!1,offerNote:"",offerUnit:"",offerFutures:"",offerNum:"",id:"",selectShow:!1,text:"",loadflag:!1,pageNum:1,pageSize:1,listenScroll:!0,totalCount:0,type:1}},computed:{loading:function(){return this.$store.state.zj.updatedloading}},components:{XDialog:d.a,Toast:o.a,Popup:n.a,TopMsg:c.default,Loading:f.a,Scroll:r.a,commitCompany:p.default},created:function(){this._myOfferListdo()},methods:{scroll:function(t){if(this.scrollY=t.y,console.log(this.scrollY),this.scrollY<-100){if(this.loadflag=!0,this.list.length>=this.totalCount)return void(this.loadflag=!1);this.pageNum++,this._myOfferListdo()}},_myOfferListdo:function(){var t=this;Object(l.J)({type:2,pageNum:this.pageNum,pageSize:5}).then(function(s){if(1==s.code){var a;if(s.data.list.length<=0)return void t.$vux.toast.text("暂无数据","middle");t.loadflag=!1,(a=t.list).push.apply(a,i()(s.data.list)),t.totalCount=s.data.total}}).catch(function(t){})},bj:function(t,s){this.bjshow=!0,this.id=t,this.index=s},cancel:function(){this.bjshow=!1},addbj:function(){this._AppagainOfferdo()},cartDialog:function(){this.bjshow=!1,this.selectShow=!1},_AppagainOfferdo:function(){var t=this;Object(l.a)({tuwiId:this.id,offerNum:this.offerNum,offerFutures:this.offerFutures,offerUnit:100*this.offerUnit,offerNote:this.offerNote}).then(function(s){1==s.code&&(t.$vux.toast.text(s.msg,"middle"),t.bjshow=!1,t.list[t.index].quantity=t.offerNum,t.list[t.index].quoted_delivery_time=t.offerFutures,t.list[t.index].quoted_price=t.offerUnit,t.list[t.index].seller_remark=t.offerNote,t._myOfferListdo(),console.log("报价成功"))}).catch(function(t){})},dialogShow:function(){this._AppofferInitdo()},_AppofferInitdo:function(){var t=this;Object(l.c)({tuwiId:this.id}).then(function(s){1==s.code&&(t.offerNum=s.data.quoted_quantity,t.offerUnit=s.data.quoted_price/100,t.offerNote=s.data.remark,t.offerFutures=s.data.quoted_delivery_time)}).catch(function(t){})}}}),v={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("scroll",{ref:"scroll",staticClass:"nominate-content",attrs:{data:t.list,"listen-scroll":t.listenScroll},on:{scroll:t.scroll}},[a("div",{staticClass:"box-list"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.loadflag,expression:"loadflag"}],staticClass:"loadmore"},[a("loading")],1),t._v(" "),t._l(t.list,function(s,e){return a("div",{staticClass:"bgf mb20",class:{bdt:0!=e}},[a("div",{staticClass:"pl3 pr3 bdb"},[a("div",{staticClass:"flex flex-align-center fs28"},[a("p",{staticClass:"flex-1 lh80"},[a("span",{staticClass:"c6"},[t._v("型号")]),t._v(" "),a("span",{staticClass:"c0 ml20"},[t._v(t._s(s.model_code))])]),t._v(" "),a("span",{staticClass:"clred"},[t._v("¥ "+t._s(s.quoted_price/100))])]),t._v(" "),a("div",{staticClass:"flex flex-align-center fs28"},[a("p",{staticClass:"flex-1 lh80"},[a("span",{staticClass:"c6"},[t._v("批号")]),t._v(" "),a("span",{staticClass:"c0 ml20"},[t._v(t._s(s.batch_code))])]),t._v(" "),a("div",{staticClass:"flex-1 tl"},[a("p",{staticClass:"pt20 pb20"},[a("span",{staticClass:"c6 "},[t._v("询价数量")]),t._v(" "),a("span",{staticClass:"c0 ml20"},[t._v(t._s(s.quantity))])]),t._v(" "),a("p",[a("span",{staticClass:"c6 "},[t._v("报价数量")]),t._v(" "),a("span",{staticClass:"c0 ml20"},[t._v(t._s(s.quoted_quantity))])])]),t._v(" "),a("div",[a("p",{staticClass:"pt20 pb20"},[a("span",{staticClass:"c6 w-35"},[t._v("询价货期")]),t._v(" "),a("span",{staticClass:"c0 ml20"},[t._v(t._s(s.delivery_time)+"天")])]),t._v(" "),a("p",[a("span",{staticClass:"c6 w-35"},[t._v("报价货期")]),t._v(" "),a("span",{staticClass:"c0 ml20"},[t._v(t._s(s.quoted_delivery_time)+"天")])])])]),t._v(" "),""!=s.buyerRemark&&s.buyerRemark?a("div",{staticClass:"flex flex-align-center fs28"},[a("p",{staticClass:"flex-1 lh80"},[a("span",{staticClass:"c6"},[t._v("买家备注")]),t._v(" "),a("span",{staticClass:"c0 ml20"},[t._v(t._s(s.buyerRemark))])])]):t._e(),t._v(" "),""!==s.sellerRemark?a("div",{staticClass:"flex flex-align-center fs28"},[a("p",{staticClass:"flex-1 lh80"},[a("span",{staticClass:"c6"},[t._v("卖家备注")]),t._v(" "),a("span",{staticClass:"c0 ml20"},[t._v(t._s(s.sellerRemark))])]),t._v(" "),a("span",[t._v(t._s(s.create_time))])]):t._e()]),t._v(" "),a("p",{staticClass:"clr pt20 pb20 bdb pl3 pr3 flex flex-align-center"},[a("span",{staticClass:"c0 fs30 flex-1"},[t._v(t._s(s.phone))]),t._v(" "),a("commitCompany",{staticClass:"mr20",attrs:{item:s,type:t.type}}),t._v(" "),a("a",{staticClass:"z-bluek",attrs:{href:"javascript:;"},on:{click:function(a){t.bj(s.id,e)}}},[t._v("重新报价")])],1)])})],2)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"loading-container"},[a("loading",{attrs:{loadflag:t.loading}})],1),t._v(" "),a("x-dialog",{attrs:{show:t.bjshow,default:"1231313131"},on:{"on-hide":t.cartDialog,"on-show":t.dialogShow}},[a("div",{staticClass:"bgf2"},[a("div",{staticClass:"bgf mb20"},[a("h1",{staticClass:"fs30 c0 bdb lh80 pl3 pr3"},[t._v("\n          填写报价信息\n        ")]),t._v(" "),a("p",{staticClass:"flex lh60 pl3 pr3 tr pt20 pb20"},[a("span",{staticClass:"inlineblock w-25 fs28 c6"},[t._v("数量：")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.offerNum,expression:"offerNum"}],staticClass:"z-input ml10",attrs:{type:"text",placeholder:"请输入需求的数量"},domProps:{value:t.offerNum},on:{input:function(s){s.target.composing||(t.offerNum=s.target.value)}}})]),t._v(" "),a("p",{staticClass:"flex lh60 pl3 pr3 tr pt20 pb20"},[a("span",{staticClass:"inlineblock w-25 fs28 c6"},[t._v("货期：")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.offerFutures,expression:"offerFutures"}],staticClass:"z-input ml10",attrs:{type:"text",placeholder:"请输入需求的数量"},domProps:{value:t.offerFutures},on:{input:function(s){s.target.composing||(t.offerFutures=s.target.value)}}})]),t._v(" "),a("p",{staticClass:"flex lh60 pl3 pr3 tr pt20 pb20"},[a("span",{staticClass:"inlineblock w-25 fs28 c6"},[t._v("单价：")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.offerUnit,expression:"offerUnit"}],staticClass:"z-input ml10",attrs:{type:"text",placeholder:"请输入需求的数量"},domProps:{value:t.offerUnit},on:{input:function(s){s.target.composing||(t.offerUnit=s.target.value)}}})]),t._v(" "),a("p",{staticClass:"flex lh60 pl3 pr3 tr pt20 pb20"},[a("span",{staticClass:"inlineblock w-25 fs28 c6"},[t._v("备注：")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.offerNote,expression:"offerNote"}],staticClass:"z-input ml10",attrs:{type:"text",placeholder:"请输入需求的数量"},domProps:{value:t.offerNote},on:{input:function(s){s.target.composing||(t.offerNote=s.target.value)}}})])]),t._v(" "),a("div",{staticClass:"pt40 fs0 bgf"},[a("a",{staticClass:"dialogbtn cancel vux-popup-show",attrs:{href:"javascript:;"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),a("a",{staticClass:"dialogbtn confirm ",attrs:{href:"javascript:;"},on:{click:t.addbj}},[t._v("确定")])])])]),t._v(" "),a("toast",{attrs:{position:"middle",value:t.selectShow,text:t.text,width:"50%"},on:{"on-hide":t.cartDialog}})],1)},staticRenderFns:[]};var _=a("VU/8")(u,v,!1,function(t){a("iKnS")},"data-v-647366f5",null);s.default=_.exports},iKnS:function(t,s){}});