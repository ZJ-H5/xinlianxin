webpackJsonp([49],{"4v5e":function(t,s){},u3d1:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("Gu7T"),l=a.n(e),i=a("ruAw"),o=a("qwAB"),n=a("y/jF"),c=(a("JxNM"),a("4Zr1")),r=(n.a,o.a,c.default,{data:function(){return{list:[],bjshow:!1,offerNote:"",offerUnit:"",offerFutures:"",offerNum:"",id:"",selectShow:!1,text:"",loadflag:!1,pageNum:1,pageSize:1,listenScroll:!0,totalCount:0,type:1}},components:{Loading:n.a,Scroll:o.a,commitCompany:c.default},created:function(){this._myOfferListdo()},computed:{loading:function(){return this.$store.state.zj.updatedloading}},methods:{scroll:function(t){if(this.scrollY=t.y,console.log(this.scrollY),this.scrollY<-100){if(this.loadflag=!0,this.list.length>=this.totalCount)return void(this.loadflag=!1);this.pageNum++,this._myOfferListdo()}},_myOfferListdo:function(){var t=this;Object(i.J)({type:4,pageNum:this.pageNum,pageSize:5}).then(function(s){if(1==s.code){var a;if(s.data.list.length<=0)return void t.$vux.toast.text("暂无数据","middle");t.loadflag=!1,(a=t.list).push.apply(a,l()(s.data.list)),t.totalCount=s.data.total}}).catch(function(t){})},bj:function(t){this.bjshow=!0,this.id=t},cancel:function(){this.bjshow=!1},addbj:function(){this._AppofferInitdo()},cartDialog:function(){this.bjshow=!1,this.selectShow=!1},_AppofferInitdo:function(){var t=this;Object(i.c)({tuwiId:this.id,offerNum:this.offerNum,offerFutures:this.offerFutures,offerUnit:this.offerUnit,offerNote:this.offerNote}).then(function(s){1==s.code&&(t.text=s.msg,t.selectShow=!0,t.bjshow=!1,t._myOfferListdo())}).catch(function(t){})}}}),f={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("scroll",{ref:"scroll",staticClass:"nominate-content",attrs:{data:t.list,"listen-scroll":t.listenScroll},on:{scroll:t.scroll}},[a("div",{staticClass:"box-list"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.loadflag,expression:"loadflag"}],staticClass:"loadmore"},[a("loading")],1),t._v(" "),t._l(t.list,function(s,e){return a("div",{staticClass:"bgf mb20",class:{bdt:0!=e}},[a("div",{staticClass:"pl3 pr3 bdb"},[a("div",{staticClass:"flex flex-align-center fs28"},[a("p",{staticClass:"flex-1 lh80"},[a("span",{staticClass:"c6"},[t._v("型号")]),t._v(" "),a("span",{staticClass:"c0 ml20"},[t._v(t._s(s.model_code))])])]),t._v(" "),a("div",{staticClass:"flex flex-align-center fs28"},[a("p",{staticClass:"flex-1 lh80"},[a("span",{staticClass:"c6"},[t._v("批号")]),t._v(" "),a("span",{staticClass:"c0 ml20"},[t._v(t._s(s.batch_code))])]),t._v(" "),a("p",{staticClass:"flex-1 tl"},[a("span",{staticClass:"c6 "},[t._v("数量")]),t._v(" "),a("span",{staticClass:"c0 ml20"},[t._v(t._s(s.quantity))])]),t._v(" "),a("p",[a("span",{staticClass:"c6"},[t._v("货期")]),t._v(" "),a("span",{staticClass:"c0 ml20"},[t._v(t._s(s.delivery_time)+"天")])])]),t._v(" "),""!=s.buyerRemark&&s.buyerRemark?a("div",{staticClass:"flex flex-align-center fs28"},[a("p",{staticClass:"flex-1 lh80"},[a("span",{staticClass:"c6"},[t._v("买家备注")]),t._v(" "),a("span",{staticClass:"c0 ml20"},[t._v(t._s(s.buyerRemark))])])]):t._e(),t._v(" "),""!=s.sellerRemark&&s.sellerRemark?a("div",{staticClass:"flex flex-align-center fs28"},[a("p",{staticClass:"flex-1 lh80"},[a("span",{staticClass:"c6"},[t._v("卖家备注")]),t._v(" "),a("span",{staticClass:"c0 ml20"},[t._v(t._s(s.sellerRemark))])]),t._v(" "),a("span",[t._v(t._s(s.create_time))])]):t._e()]),t._v(" "),a("p",{staticClass:"clr pt20 pb20 bdb pl3 pr3 flex flex-align-center"},[a("span",{staticClass:"c0 fs30 flex-1"},[t._v(t._s(s.phone))]),t._v(" "),a("commitCompany",{attrs:{item:s,type:t.type}})],1)])})],2)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"loading-container"},[a("loading",{attrs:{loadflag:t.loading}})],1)],1)},staticRenderFns:[]};var d=a("VU/8")(r,f,!1,function(t){a("4v5e")},"data-v-71c9efad",null);s.default=d.exports}});