webpackJsonp([58],{"5hPD":function(t,s){},jNpQ:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var l=a("Gu7T"),i=a.n(l),e=a("HD9R"),c=a("aTeQ"),n=a("rHil"),o=a("62KO"),r=a("rLAy"),d=a("ruAw"),_=a("qwAB"),v=a("y/jF"),p=(a("JxNM"),a("4Zr1")),f=(e.a,c.a,n.a,o.a,r.a,v.a,_.a,p.default,{data:function(){return{list:[],data:"",loadflag:!1,pageNum:1,pageSize:1,listenScroll:!0,totalCount:0,type:1}},created:function(){this._sellerOrderListdo(),console.log(this.list)},computed:{loading:function(){return this.$store.state.zj.updatedloading}},components:{Popup:e.a,XSwitch:c.a,Group:n.a,Confirm:o.a,Toast:r.a,Loading:v.a,Scroll:_.a,commitCompany:p.default},methods:{scroll:function(t){if(this.scrollY=t.y,console.log(this.scrollY),this.scrollY<-300){if(this.loadflag=!0,this.list.length>=this.totalCount)return void(this.loadflag=!1);this.pageNum++,this._sellerOrderListdo()}},_sellerOrderListdo:function(){var t=this;Object(d.X)({type:0,pageSize:5,pageNum:this.pageNum,currentType:1}).then(function(s){if(1==s.code){var a;if(s.data.list.length<=0)return void t.$vux.toast.text("暂无数据","middle");t.loadflag=!1,(a=t.list).push.apply(a,i()(s.data.list)),t.totalCount=s.data.total,t.$nextTick(function(){for(var s=0;s<t.list.length;s++)t._sellerOrderDetailsdo(t.list[s].id,s)})}}).catch(function(t){})},confirmOrder:function(t,s){this._submitconfrimOrderdo(t,s)},_submitconfrimOrderdo:function(t,s){var a=this;Object(d._3)({orderId:t}).then(function(t){1==t.code&&(a.$vux.toast.text(t.msg,"middle"),a.list.splice(s,1))}).catch(function(t){})},_sellerOrderDetailsdo:function(t,s){var a=this;Object(d.W)({orderId:t}).then(function(t){1==t.code&&(a.data=t.data,a.$nextTick(function(){a.$set(a.list[s],"data",a.data)}))}).catch(function(t){})}}}),u={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"salesOrderDqr"},[a("scroll",{ref:"scroll",staticClass:"nominate-content",attrs:{data:t.list,"listen-scroll":t.listenScroll},on:{scroll:t.scroll}},[a("div",{staticClass:"box-list"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.loadflag,expression:"loadflag"}],staticClass:"loadmore"}),t._v(" "),t._l(t.list,function(s,l){return a("div",{staticClass:"bgf mb20"},[a("router-link",{attrs:{to:{path:"/orderdetailDqr",query:{orderId:s.id}}}},[a("p",{staticClass:"clr lh80 bdb pl3 pr3"},[a("span",{staticClass:"c0 fs30"},[t._v(t._s(s.phone))]),t._v(" "),a("i",{staticClass:"iconfont icon-right fs26 c6"}),t._v(" "),a("span",{staticClass:"clblue right fs28"},[t._v("待确认")])]),t._v(" "),t._l(s.data,function(s){return a("div",[a("div",{staticClass:"pl3 pr3 bdb"},[a("div",{staticClass:"flex flex-align-center fs28"},[a("p",{staticClass:"flex-1 lh80"},[a("span",{staticClass:"c6"},[t._v("型号")]),t._v(" "),a("span",{staticClass:"c0 ml20"},[t._v(t._s(s.model_code))])]),t._v(" "),a("span",{staticClass:"clred"},[t._v("¥ "+t._s(s.unit_price/100))])]),t._v(" "),a("div",{staticClass:"flex flex-align-center fs28"},[a("p",{staticClass:"flex-1 lh80"},[a("span",{staticClass:"c6"},[t._v("品牌")]),t._v(" "),a("span",{staticClass:"c0 ml20"},[t._v(t._s(s.brand_code))])]),t._v(" "),a("div",[a("p",{staticClass:"c9"},[t._v("单价 ¥ "+t._s(s.unit_price/100))]),t._v(" "),a("p",{staticClass:"c9"},[t._v("数量 "+t._s(s.quantity))])])]),t._v(" "),a("div",{staticClass:"flex flex-align-center fs28"},[a("p",{staticClass:"flex-1 lh80"},[a("span",{staticClass:"c6"},[t._v("批号")]),t._v(" "),a("span",{staticClass:"c0 ml20"},[t._v(t._s(s.batch_code))])])]),t._v(" "),a("div",{staticClass:"flex flex-align-center fs28"},[a("p",{staticClass:"flex-1 lh80"},[a("span",{staticClass:"c6"},[t._v("封装")]),t._v(" "),a("span",{staticClass:"c0 ml20"},[t._v(t._s(s.encapsulation))])])])])])})],2),t._v(" "),a("div",{staticClass:" pl3 pr3 lh60 clr bdb"},[a("div",{staticClass:"flex flex-justify-space"},[0==s.pay_type?a("span",[t._v("第三方担保")]):t._e(),t._v(" "),1==s.pay_type?a("span",[t._v("账期付款")]):t._e(),t._v(" "),2==s.pay_type?a("span",[t._v("线下支付")]):t._e(),t._v(" "),a("span",{staticClass:"flex-1 tc"},[t._v("共"+t._s(s.quantity)+"片\n          "),a("em",{staticClass:"clred"},[t._v("\n            "+t._s(s.total_amount/100)+"\n          ")])]),t._v(" "),a("span",{staticClass:"fs22"},[t._v("含优惠"+t._s(s.discount_amount?s.discount_amount/100:0))])])]),t._v(" "),a("div",{staticClass:"pt30 pb40 pr3 tr"},[""!=s.contract?a("router-link",{staticClass:"z-link c6 inlineblock mr20 z-ckfp",attrs:{to:{path:"/checkUploadFile",query:{contract:s.contract}}}},[t._v("查看合同附件")]):t._e(),t._v(" "),a("commit-company",{attrs:{item:s,type:t.type}}),t._v(" "),a("a",{staticClass:"z-bluek inlineblock",attrs:{href:"javascript:;"},on:{click:function(a){t.confirmOrder(s.id,l)}}},[t._v("确认订单")])],1)],1)})],2)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"loading-container"},[a("loading",{attrs:{loadflag:t.loading}})],1)],1)},staticRenderFns:[]};var h=a("VU/8")(f,u,!1,function(t){a("5hPD")},"data-v-5f8d89e1",null);s.default=h.exports}});