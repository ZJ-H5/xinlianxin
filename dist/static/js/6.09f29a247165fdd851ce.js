webpackJsonp([6,33,93],{"2PTm":function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("Dd8w"),i=a.n(e),c=a("NYxO"),l=(a("IcnI"),i()({goToCommuction:function(){var t=this;return console.log(this.loginData),this.loginData?""==this.loginData.company?(this.$vux.toast.text("请设置公司名","middle"),setTimeout(function(){t.$router.push("/accountInform")},1e3),!1):""==this.loginData.head_pic?(this.$vux.toast.text("请设置头像","middle"),setTimeout(function(){t.$router.push("/accountInform")},1e3),!1):(console.log(this.tUserCompany),void this.$router.replace({path:"/communication",query:{cid:this.tUserCompany.userId,companyId:this.tUserCompany.id,companyImg:this.companyImg,companyName:this.tUserCompany.companyName,tel:this.tel}})):(this.$vux.toast.text("未登录，请登录","middle"),setTimeout(function(){t.$router.push("/login")},1e3),!1)},sameUserIdClick:function(t){this.$vux.toast.text(t,"middle")},showCart:function(){this.$emit("cart")},showXj:function(){this.$emit("xj")},addsc:function(){this.$emit("addcollect",this.collection)}},Object(c.d)({setAddress:"SET_ADDRESS"})),{props:["selectShow","collection","sellerId","buyerId","stockBackups","tUserCompany","xjid","currentuser","tid","companyImg","tel"],data:function(){return{userId:"",companyId:this.$route.params.sellerId,token:this.$route.params.token,item:""}},created:function(){console.log(this.stockBackups)},computed:{loginData:function(){return"string"==typeof this.$store.state.user.loginData&&(this.$store.state.user.loginData=JSON.parse(this.$store.state.user.loginData)),this.$store.state.user.loginData}},components:{},methods:i()({goToCommuction:function(){var t=this;return console.log(this.loginData),this.loginData?""==this.loginData.company?(this.$vux.toast.text("请设置公司名","middle"),setTimeout(function(){t.$router.push("/accountInform")},1e3),!1):""==this.loginData.head_pic?(this.$vux.toast.text("请设置头像","middle"),setTimeout(function(){t.$router.push("/accountInform")},1e3),!1):(console.log(this.tUserCompany),void this.$router.replace({path:"/communication",query:{cid:this.tUserCompany.userId,companyId:this.tUserCompany.id,companyImg:this.companyImg,companyName:this.tUserCompany.companyName,tel:this.tel}})):(this.$vux.toast.text("未登录，请登录","middle"),setTimeout(function(){t.$router.push("/login")},1e3),!1)},sameUserIdClick:function(t){this.$vux.toast.text(t,"middle")},showCart:function(){this.$emit("cart")},showXj:function(){this.$emit("xj")},addsc:function(){this.$emit("addcollect",this.collection)}},Object(c.d)({setAddress:"SET_ADDRESS"}))}),n={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("ul",{staticClass:"footer clr  flex flex-align-center"},[t.currentuser!==t.tUserCompany.userId?a("li",{staticClass:"w-15 flex flex-align-center flex-justify-center",on:{click:t.goToCommuction}},[t._m(0)]):t._e(),t._v(" "),t.currentuser===t.tUserCompany.userId?a("li",{staticClass:"w-15 flex flex-align-center flex-justify-center",attrs:{href:"javascript:;"},on:{click:function(s){t.sameUserIdClick("本公司无法与本公司对话")}}},[t._m(1)]):t._e(),t._v(" "),a("router-link",{staticClass:"w-15 flex flex-align-center flex-justify-center",attrs:{to:{name:"introduce",params:{sellerId:t.sellerId,buyerId:t.buyerId,tid:t.tid}},tag:"li"}},[a("div",[a("p",[a("i",{staticClass:"iconfont icon-tab_seller c0 fs36"})]),t._v(" "),a("p",{staticClass:"mt10"},[t._v("\n            卖家\n          ")])])]),t._v(" "),a("li",{staticClass:"w-15 flex flex-align-center flex-justify-center",on:{click:t.addsc}},[a("div",[a("p",[a("i",{staticClass:"iconfont icon-star2 fs48 clyellow",class:{"icon-star":1==t.collection}})]),t._v(" "),1==t.collection?a("p",{},[t._v("\n            已收藏\n          ")]):t._e(),t._v(" "),0==t.collection?a("p",{},[t._v("\n            收藏\n          ")]):t._e()])]),t._v(" "),a("li",{staticClass:"w-25 bg46adf6 lh100",on:{click:t.showCart}},[a("a",{staticClass:"cfff fs28",attrs:{href:"javascript:;"}},[t._v("加购物车")])]),t._v(" "),a("li",{staticClass:"w-15 b34a0ed lh100",on:{click:t.showXj}},[a("a",{staticClass:"cfff fs28",attrs:{href:"javascript:;"}},[t._v("询价")])]),t._v(" "),a("li",{staticClass:"w-15 bg1081d1 lh100 z-footOrder"},[t.currentuser===t.tUserCompany.userId?a("a",{staticClass:"cfff fs28",attrs:{href:"javascript:;"},on:{click:function(s){t.sameUserIdClick("本商品无法加入购物车")}}},[t._v("下单")]):t._e(),t._v(" "),t.currentuser!=t.tUserCompany.userId?a("router-link",{staticClass:"cfff fs28",attrs:{to:{name:"checkOrder",params:{obj:{stockBackups:this.stockBackups,tUserCompany:this.tUserCompany,xjid:this.xjid?this.xjid:"",item:this.item,company:"",invoice:""}}}}},[t._v("下单")]):t._e()],1)],1)])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{},[s("p",{},[s("i",{staticClass:"iconfont icon-kefu c0 fs36"})]),this._v(" "),s("p",{staticClass:"mt10"},[this._v("\n            客服\n          ")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{},[s("p",{},[s("i",{staticClass:"iconfont icon-kefu c0 fs36"})]),this._v(" "),s("p",{staticClass:"mt10"},[this._v("\n          客服\n        ")])])}]};var r=a("VU/8")(l,n,!1,function(t){a("QLQs")},null,null);s.default=r.exports},KmU9:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("ruAw"),i={props:["tid","currentuser","tUserCompany"],data:function(){return{quantity:"",deliveryTime:"",validTime:"",remark:""}},methods:{cancel:function(){this.$emit("cancelxj")},addenquiry:function(){return this.currentuser===this.tUserCompany.userId?(this.$vux.toast.text("本商品无法加入购物车","middle"),!1):""===this.quantity?(this.$vux.toast.text("数量不能为空","middle"),!1):""===this.deliveryTime?(this.$vux.toast.text("货期不能为空","middle"),!1):parseInt(this.deliveryTime)>100||parseInt(this.deliveryTime)<1?(this.$vux.toast.text("货期范围为1~100","middle"),!1):""===this.validTime?(this.$vux.toast.text("有效天数不能为空","middle"),!1):parseInt(this.validTime)>100||parseInt(this.validTime)<1?(this.$vux.toast.text("有效天数范围为1~100","middle"),!1):""==this.remark?(this.$vux.toast.text("备注不能为空","middle"),!1):void this._addInquirydo()},_addInquirydo:function(){var t=this;Object(e.f)({stockId:this.tid,quantity:this.quantity,deliveryTime:this.deliveryTime,validTime:this.validTime,remark:this.remark}).then(function(s){t.$vux.toast.text(s.msg,"middle"),t.$emit("cancelxj"),t.deletedata()}).catch(function(s){t.$vux.toast.text(s.msg,"middle")})},deletedata:function(){this.quantity="",this.deliveryTime="",this.validTime="",this.remark=""}}},c={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("div",{staticClass:"bgf2"},[a("div",{staticClass:"bgf mb20"},[a("h1",{staticClass:"fs30 c0 bdb lh80 pl3 pr3"},[t._v("\n        填写询价信息\n      ")]),t._v(" "),a("p",{staticClass:"flex lh60 pl3 pr3 tr pt20 pb20"},[a("span",{staticClass:"inlineblock w-25 fs28 c6"},[t._v("数量：")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.quantity,expression:"quantity"}],staticClass:"z-input ml10",attrs:{type:"text",placeholder:"请输入需求的数量"},domProps:{value:t.quantity},on:{input:function(s){s.target.composing||(t.quantity=s.target.value)}}})]),t._v(" "),a("p",{staticClass:"flex lh60 pl3 pr3 tr pt20 pb20"},[a("span",{staticClass:"inlineblock w-25 fs28 c6"},[t._v("货期：")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.deliveryTime,expression:"deliveryTime"}],staticClass:"z-input ml10",attrs:{type:"text",placeholder:"请输入货期"},domProps:{value:t.deliveryTime},on:{input:function(s){s.target.composing||(t.deliveryTime=s.target.value)}}})]),t._v(" "),a("p",{staticClass:"flex lh60 pl3 pr3 tr pt20 pb20"},[a("span",{staticClass:"inlineblock w-25 fs28 c6"},[t._v("有效天数：")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.validTime,expression:"validTime"}],staticClass:"z-input ml10",attrs:{type:"number",placeholder:"请输入有效天数"},domProps:{value:t.validTime},on:{input:function(s){s.target.composing||(t.validTime=s.target.value)}}})]),t._v(" "),a("p",{staticClass:"flex lh60 pl3 pr3 tr pt20 pb20"},[a("span",{staticClass:"inlineblock w-25 fs28 c6"},[t._v("备注：")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.remark,expression:"remark"}],staticClass:"z-input ml10",attrs:{type:"text",placeholder:"请输入备注"},domProps:{value:t.remark},on:{input:function(s){s.target.composing||(t.remark=s.target.value)}}})])]),t._v(" "),a("div",{staticClass:"pt40 fs0 bgf"},[a("a",{staticClass:"dialogbtn cancel vux-popup-show",attrs:{href:"javascript:;"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),a("a",{staticClass:"dialogbtn confirm ",attrs:{href:"javascript:;"},on:{click:t.addenquiry}},[t._v("确定")])])])])},staticRenderFns:[]};var l=a("VU/8")(i,c,!1,function(t){a("cB+W")},"data-v-1d8d85aa",null);s.default=l.exports},QLQs:function(t,s){},"cB+W":function(t,s){},oLsP:function(t,s){},tbIG:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("pFYg"),i=a.n(e),c=a("2PTm"),l=a("rLAy"),n=a("HD9R"),r=a("qp4g"),o=a("KmU9"),d=a("ruAw"),p=a("IcnI"),u=a("JxNM"),m=a("H+gd"),v=a("BMXq"),f=a("/kga"),_=a("2R9+"),h=(f.a,l.a,c.default,n.a,o.default,r.default,v.a,_.default,{data:function(){return{title:"商品详情页",cart:!0,msg:!0,xjshow:!1,showOrNot:!1,cid:this.$route.query.cid,tid:this.$route.query.tid,stockBackups:"",orderDaos:"",comment:"",tUserCompany:"",total:"",guanzhu:0,selectShow:!1,collection:"",id:"",commentlist:"",xjid:this.$route.query.xjid,guanzhuma:"",volume:"",service:"",commentTotalS:"",arrMsg:["添加购物车成功","添加询价单成功","添加收藏成功"],currentuser:"",userId:"",tel:"",companyImg:"",Mfprice:""}},components:{XDialog:f.a,Toast:l.a,DetailFooter:c.default,Popup:n.a,xj:o.default,TopMsg:r.default,Star:v.a,zHeader:_.default},filters:{formatDate:function(t){var s=new Date(t);return Object(m.b)(s,"yyyy-MM-dd")},phoneDoing:function(t){if(t)return t.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")}},methods:{formatDate:function(t){var s=new Date(t);return Object(m.b)(s,"yyyy-MM-dd")},cartShow:function(){return this.tUserCompany.userId===this.currentuser?(this.$vux.toast.text("本商品无法加入购物车","middle"),!1):0===this.stockBackups.quantity?(this.$vux.toast.text("库存为0  无法添加","middle"),!1):void this._addShopCardo()},goToProductDetail:function(t){this.$router.push({path:"productDetail",query:{cid:this.cid,tid:t}})},_addShopCardo:function(){var t=this;Object(d.i)({stockId:this.tid}).then(function(s){s.code,t.$vux.toast.text(s.msg,"middle")}).catch(function(t){})},cartDialog:function(){this.xjshow=!1,this.selectShow=!1},addscproduct:function(t){var s=this;if(this.tUserCompany.userId===this.currentuser)return this.$vux.toast.text("本商品无法加入收藏","middle"),!1;t=1==t?0:1,Object(d._0)({stockId:this.tid,companyId:this.cid,type:t,id:this.id}).then(function(t){1==t.code&&(s._orderListdo(),s.xjshow=!1)}).catch(function(t){})},xjShow:function(){this.xjshow=!0},xjshowOrNot:function(){this.xjshow=!1},goback:function(){this.$router.back()},show:function(){this.showOrNot=!0},dialog:function(){this.showOrNot=!1},_orderListdo:function(){var t=this;Object(d.M)({cid:this.cid,tid:this.tid}).then(function(s){if(1==s.code){if(t.stockBackups=s.data.stockBackups,t.stockBackups.createTime){var a=t.formatDate(t.stockBackups.createTime);t.stockBackups.createTime=a}else t.stockBackups.createTime="";t.orderDaos=s.data.orderDaos,0!=s.data.comment.length&&(t.comment=s.data.comment[0]),t.volume=s.data.volume,t.service=s.data.service,console.log(i()(t.service.level),t.service.level),t.commentTotalS=s.data.commentTotalS,t.commentlist=s.data.comment,t.tUserCompany=s.data.tUserCompany,t.total=s.data.total,t.guanzhu=parseInt(s.data.guanzhu),t.guanzhuma=s.data.guanzhuma,t.currentuser=s.data.currentuser,t.tel=s.data.phone,t.Mfprice=s.data.Mfprice,t.companyImg=s.data.company_logo?s.data.company_logo:u.g,t.collection=s.data.shoucang.collection,t.id=s.data.shoucang.id}}).catch(function(t){console.log(t)})},getStatus:function(t){var s=t.split("/");return s[s.length-1]}},created:function(){this.userId=p.a.state.user.userId,""===this.cid&&this.$route.back(),this._orderListdo()},watch:{$route:function(t,s){t.query.tid!==s.query.tid&&(this.tid=t.query.tid,this._orderListdo())}},activated:function(){this.cid&&this._orderListdo()}}),C={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("transition",{attrs:{name:"slide"}},[a("div",[a("div",{staticClass:"pb120"},[a("div",{staticClass:"head"},[a("zHeader",{attrs:{title:t.title,cart:t.cart,msg:t.msg,showOrNot:t.showOrNot}})],1),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"bgf lh50 pl3 pr3"},[a("p",{staticClass:"pt20"},[a("span",{staticClass:"c6"},[t._v("型号")]),a("span",{staticClass:"fs28 c0"},[1==t.stockBackups.saleType?a("i",{staticClass:"z-cu ml20 vtm"},[t._v("促")]):t._e(),t._v(" "),2==t.stockBackups.saleType?a("i",{staticClass:"z-cu ml20 vtm"},[t._v("热")]):t._e(),t._v("\n          "+t._s(t.stockBackups.modelCode))])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex-1"},[a("p",{},[a("span",{staticClass:"c6"},[t._v("品牌")]),a("span",{staticClass:"c0 ml20 fs28 "},[t._v(t._s(t.stockBackups.brandCode))])])]),t._v(" "),a("div",{staticClass:"flex-1 pl30"},[a("p",{},[a("span",{staticClass:"c6"},[t._v("库存")]),a("span",{staticClass:"clred fs28 ml20"},[t._v(t._s(t.stockBackups.quantity))])])])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex-1"},[a("p",{},[a("span",{staticClass:"c6"},[t._v("批号")]),a("span",{staticClass:"c0 fs28 ml20"},[t._v(t._s(t.stockBackups.batchCode))])])]),t._v(" "),a("div",{staticClass:"flex-1 pl30"},[a("p",{},[a("span",{staticClass:"c6"},[t._v("封装")]),a("span",{staticClass:"c0 fs28 ml20"},[t._v(t._s(t.stockBackups.encapsulation))])])])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex-1"},[a("p",{},[a("span",{staticClass:"c6"},[t._v("日期")]),a("span",{staticClass:"c0 fs28 ml20"},[t._v(t._s(t.stockBackups.createTime||""))])])]),t._v(" "),a("div",{staticClass:"flex-1 pl30"},[a("p",{},[a("span",{staticClass:"c6"},[t._v("仓位")]),a("span",{staticClass:"c0 fs28 ml20"},[t._v(t._s(t.stockBackups.warName))])])])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex-1"},[a("p",{},[a("span",{staticClass:"c6"},[t._v("说明")]),a("span",{staticClass:"fs28 c0 ml20"},[t._v(t._s(t.stockBackups.remark))])])]),t._v(" "),a("div",{staticClass:"flex-1 pl30"},[a("p",{},[a("span",{staticClass:"c6"},[t._v("单价")]),a("span",{staticClass:"clred fs28 ml20"},[t._v("¥ "+t._s(t.stockBackups.unitPrice))])])])])]),t._v(" "),a("div",{staticClass:"flex bdt bdb lh80 bgf"},[a("div",{staticClass:"flex-1 pl3"},[a("p",{staticClass:"fs30"},[a("span",{staticClass:"clblue"},[t._v("市场参考价 ")]),a("span",{staticClass:"clred ml20"},[t._v("¥ "+t._s(t.Mfprice?t.Mfprice:"0.00"))])])]),t._v(" "),a("div",{staticClass:"flex-1 pr3 pl30"},[a("p",{staticClass:"fs30"},[a("span",{staticClass:"clblue"},[t._v("成交笔数")]),a("span",{staticClass:"clred ml20"},[t._v(t._s(t.stockBackups.self_data))])])])]),t._v(" "),a("div",{staticClass:"flex pl3 pr3 flex-align-center pt20 pb20 bgf"},[a("img",{staticClass:"z-logo mr20",attrs:{src:t.companyImg,alt:""}}),t._v(" "),a("div",{staticClass:"flex-1"},[a("p",{staticClass:"pb20"},[a("span",{staticClass:"fs28 c0"},[t._v("\n        "+t._s(t.tUserCompany.companyName)+"\n        ")]),t._v(" "),a("span",{staticClass:"z-pf bdr5"},[t._v(t._s(t.tUserCompany.operatingAge+"+"))])]),t._v(" "),0==t.tUserCompany.sellerType?a("span",{staticClass:"z-blued fs24"},[t._v("\n          代理商\n        ")]):1==t.tUserCompany.sellerType?a("span",{staticClass:"z-blued fs24"},[t._v("\n          原厂\n        ")]):2==t.tUserCompany.sellerType?a("span",{staticClass:"z-blued fs24"},[t._v("\n          原厂\n        ")]):t._e()]),t._v(" "),a("div",{},[a("p",{staticClass:"pb20"},[t.guanzhuma?t._e():a("i",{staticClass:"z-gz"},[t._v("关注")]),t._v(" "),t.guanzhuma?a("i",{staticClass:"z-gz"},[t._v("已关注")]):t._e()]),t._v(" "),a("p",{},[a("span",[t._v(t._s(t.guanzhu)+"关注")])])])]),t._v(" "),a("div",{staticClass:"bgf pl3 pr3 fs24 pb20  mb20"},[a("p",{staticClass:"pb20 pt20 c0 f28"},[a("span",[t._v("网站综合评分  "),a("em",{staticClass:"clred ml20"},[t._v(t._s(t.total))])])]),t._v(" "),a("div",{staticClass:"flex "},[a("p",{staticClass:"flex-1 flex pt20 flex-align-center"},[a("span",{staticClass:"c6 mr20"},[t._v("服务")]),t._v(" "),a("star",{attrs:{starlist:t.service.level}})],1),t._v(" "),a("p",{staticClass:"flex-1 flex pt20 flex-align-center ml80"},[a("span",{staticClass:"c6 mr20"},[t._v("销量")]),t._v(" "),a("star",{attrs:{starlist:t.volume.level}})],1)]),t._v(" "),a("div",{staticClass:"flex"},[a("p",{staticClass:"flex-1 flex flex-align-center pt20"},[a("span",{staticClass:"c6 mr20"},[t._v("买家评分")]),t._v(" "),a("span",[t._v("\n              "+t._s(t.commentTotalS)+"\n            ")])]),t._v(" "),a("p",{staticClass:"flex-1  flex flex-align-center pt20 ml80"},[a("span",{staticClass:"c6 mr20"},[t._v("信誉")])])]),t._v(" "),a("p",{staticClass:"tc pt40 pb20"},[a("router-link",{staticClass:"z-pf bdr5",attrs:{to:{name:"introduce",params:{sellerId:t.cid,buyerId:t.tid}}}},[t._v("\n            进店逛逛\n          ")])],1)]),t._v(" "),a("div",{staticClass:"bgf pb20 pl3 pr3 pt20 mb20 f26"},[a("div",{staticClass:"relative"},[a("i",{staticClass:"z-longline"}),t._v(" "),a("span",{staticClass:"mr10 ml10 z-pjtitle f24"},[t._v("收到来自买家的评价")])]),t._v(" "),a("div",{staticClass:"pt20"},[t.comment.phone?a("p",{staticClass:"clr pb20 f26"},[a("span",{staticClass:"left c0"},[t._v("\n             "+t._s(t._f("phoneDoing")(t.comment.phone))+"\n            ")]),t._v(" "),a("span",{staticClass:"right"},[t._v(t._s(t.comment.create_time|t.formatDate||""))])]):t._e(),t._v(" "),a("div",{staticClass:"flex flex-align-center c6 mb20 f26"},[a("p",{staticClass:"flex-1 "},[t._v("\n              支付方式：\n              "),0==t.comment.pay_type?a("span",[t._v("第三方支付")]):1==t.comment.pay_type?a("span",[t._v("账款支付")]):2==t.comment.pay_type?a("span",[t._v("线下支付")]):t._e()])]),t._v(" "),a("div",{staticClass:"flex flex-align-center mb20 "},[a("p",{staticClass:"flex-1 flex flex-align-center"},[a("span",{staticClass:"c0 mr20"},[t._v("响应速度")]),t._v(" "),a("span",{staticClass:"z-starbg"},[a("i",{staticClass:"z-star",style:{width:t.comment.answer_star/5*100+"%"}})]),t._v(" "),a("span",[t._v(t._s(t.comment.answer_star))])]),t._v(" "),a("p",{staticClass:"flex-1 flex flex-align-center"},[a("span",{staticClass:"c0 mr20"},[t._v("信息真实性")]),t._v(" "),a("span",{staticClass:"z-starbg"},[a("i",{staticClass:"z-star",style:{width:t.comment.real_star/5*100+"%"}})]),t._v(" "),a("span",[t._v(t._s(t.comment.real_star))])])]),t._v(" "),a("div",{staticClass:"flex flex-align-center mb20"},[a("p",{staticClass:"flex-1 flex flex-align-center"},[a("span",{staticClass:"c0 mr20"},[t._v("订单履约")]),t._v(" "),a("span",{staticClass:" z-starbg"},[a("i",{staticClass:"z-star",style:{width:t.comment.seller_perform_star/5*100+"%"}})]),t._v(" "),a("span",[t._v(t._s(t.comment.seller_perform_star))])]),t._v(" "),a("p",{staticClass:"flex-1 flex flex-align-center"},[a("span",{staticClass:"c0 mr20"},[t._v("物流速度")]),t._v(" "),a("span",{staticClass:"ml20 z-starbg"},[a("i",{staticClass:"z-star",style:{width:t.comment.logistics_star/5*100+"%"}})]),t._v(" "),a("span",[t._v(t._s(t.comment.logistics_star))])])]),t._v(" "),a("div",{staticClass:"flex flex-align-center mb20"},[a("p",{staticClass:"flex-1 flex flex-align-center"},[a("span",{staticClass:"c0 mr20"},[t._v("产品质量")]),t._v(" "),a("span",{staticClass:"z-starbg"},[a("i",{staticClass:"z-star",style:{width:t.comment.quality_star/5*100+"%"}})]),t._v(" "),a("span",[t._v(t._s(t.comment.quality_star))])])])]),t._v(" "),a("p",{staticClass:"tc pt40 pb20"},[a("router-link",{staticClass:"z-pf bdr5 f24",attrs:{to:{path:"/allAppraise",query:{sellerId:t.cid}}}},[t._v("\n            全部评价\n          ")])],1)]),t._v(" "),a("div",{staticClass:"bgf pt20 pb20 "},[a("h1",{staticClass:"z-bdb pb20 fs30 c0 pl3 pr3"},[t._v("相似推荐")]),t._v(" "),t._l(t.orderDaos,function(s,e){return a("div",{key:e,staticClass:"pb40 z-bdb pl3 pr3",on:{click:function(a){t.goToProductDetail(s.id)}}},[a("p",{staticClass:"flex flex-align-center pt40"},[a("span",{staticClass:"c0 flex-1  fs28"},[1==s.sale_type?a("i",{staticClass:"z-cu mr20 vtm"},[t._v("促")]):t._e(),t._v(" "),2==s.sale_type?a("i",{staticClass:"z-cu mr20 vtm"},[t._v("热")]):t._e(),t._v("\n              "+t._s(s.model_code))]),t._v(" "),a("span",{staticClass:"mr40"},[t._v("库存："),a("em",{},[t._v(t._s(s.quantity))])]),t._v(" "),a("span",[t._v("笔数："+t._s(s.self_data)),a("em",{})])]),t._v(" "),a("p",{staticClass:"flex flex-align-center pt40"},[a("span",{staticClass:"flex-1 c6"},[t._v(t._s(s.company_name))]),t._v(" "),a("span",{staticClass:"clred fs36"},[t._v(" "+t._s(s.unit_price))])])])})],2)]),t._v(" "),a("x-dialog",{attrs:{show:t.xjshow},on:{"on-hide":t.cartDialog}},[a("xj",{attrs:{tid:t.tid,currentuser:t.currentuser,tUserCompany:t.tUserCompany},on:{cancelxj:t.xjshowOrNot}})],1)],1),t._v(" "),a("detail-footer",{attrs:{selectShow:t.selectShow,collection:t.collection,sellerId:t.cid,buyerId:t.tid,stockBackups:t.stockBackups,tUserCompany:t.tUserCompany,xjid:t.xjid,currentuser:t.currentuser,tid:t.tid,tel:t.tel,companyImg:t.companyImg},on:{cart:t.cartShow,xj:t.xjShow,addcollect:t.addscproduct}})],1)])},staticRenderFns:[]};var x=a("VU/8")(h,C,!1,function(t){a("oLsP")},"data-v-7cafb628",null);s.default=x.exports}});