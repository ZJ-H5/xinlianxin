webpackJsonp([22],{JPIR:function(t,s){},eZ9r:function(t,s){},h0rT:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("Gu7T"),i=a.n(e),n=a("Dd8w"),r=a.n(n),c=a("Bab6"),o=a("ju4+"),l=a("3Q4o"),u=a("da8x"),h=a("JxNM"),p=a("7Ah8"),d=a("rHil"),f=(p.a,d.a,{data:function(){return{title:"库位",value1:[],list1:[]}},created:function(){this._search()},methods:{onChange:function(t){this.$emit("ievent",t)},onShow:function(t){},onHide:function(t){},_search:function(){var t=this;Object(u.a)().then(function(s){s.code===h.c&&(t.list1=[s.data])})}},components:{PopupPicker:p.a,Group:d.a}}),m={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"popup-picker"},[a("group",[a("popup-picker",{attrs:{title:t.title,data:t.list1},on:{"on-show":t.onShow,"on-hide":t.onHide,"on-change":t.onChange},model:{value:t.value1,callback:function(s){t.value1=s},expression:"value1"}})],1)],1)},staticRenderFns:[]};var v=a("VU/8")(f,m,!1,function(t){a("eZ9r")},null,null).exports,_=a("NYxO"),g=a("y/jF"),y=a("qwAB"),x=(a("IcnI"),r()({inputValue:function(){return this.searchIndex||""},loading:function(){return this.$store.state.zj.updatedloading},status:function(){return!!this.$store.state.user.token}},Object(_.c)(["searchIndex"])),r()({loadmore:function(t){if(t<-275){if(this.sellerList.length>=this.totalCount)return;this.params.pageNow++,this._searchOrder()}},search:function(t){this._paramsVal(t)},select:function(t){this.flagId=t,Object(l.a)(this.$refs.title.children,t),0===t&&(this.params.allsort="",this.params.goods_type="",this.params.att_type="",this.params.seller_type="",this.params.good_type="",this.params.war_name="",this.params.type=!this.params.type,this.params.type?this.$refs.choosei.className="up":this.$refs.choosei.className="down",this._paramsVal())},capacity:function(t){this.capacityIndex=t,this.params.allsort=0===t?"":t,this.solrtitle=this.capacityList[this.capacityIndex].name,this.flagId=0,this._paramsVal()},screen:function(t,s){var a=this;t.forEach(function(t,a){a!==s&&(t.status=!1)}),t[s].status=!t[s].status,this.screenList.forEach(function(t,s){t.choose&&t.list[0].status&&(a.PopupPickerValue="")})},ievent:function(t){this.PopupPickerValue=t[0],this.screenList.forEach(function(t,s){t.choose&&(t.list[0].status=!1)})},confrim:function(){if(2===this.flagId){var t=this.screenList[0].list.find(function(t){return!0===t.status});this.params.goods_type=t?t.type:"";var s=this.screenList[1].list[0];this.params.att_type=s.status?s.type:"";var a=this.screenList[1].list[1];this.params.good_type=a.status?a.type:"";var e=this.screenList[2].list.find(function(t){return!0===t.status});this.params.seller_type=e?e.type:"",this.params.war_name=this.PopupPickerValue||"",this.flagId=0,this._paramsVal()}},canse:function(){var t=this;1===this.flagId&&this.capacity(0),2===this.flagId&&this.screenList.forEach(function(s,a){s.list.forEach(function(s,a){s.status="",t.PopupPickerValue=""})})},_paramsVal:function(t){this.params.model=t||this.inputValue,this.params.pageNow=1,this.sellerList=[],this._searchOrder()},_searchOrder:function(){var t=this;Object(u.b)(this.params).then(function(s){if(s.code===h.c){var a;if(s.data.map.length<=0&&t.sellerList.length<=0)return void t.$vux.toast.text("暂无数据","middle");t.historyAction(s.data.map[0].model_code);var e=s.data.map;t.totalCount=s.data.page.totalCount,(a=t.sellerList).push.apply(a,i()(e))}else t.$vux.toast.text(s.msg,"middle")}).catch(function(s){t.$vux.toast.text(s.msg,"middle")})}},Object(_.b)(["historyAction"])),c.default,o.a,g.a,y.a,{data:function(){return{params:{model:"",goods_type:"",att_type:"",seller_type:"",good_type:"",war_name:"",type:!0,allsort:"",pageNow:1,pageSize:h.d},totalCount:0,sellerList:[],pullup:!0,flagId:0,capacityIndex:0,PopupPickerValue:"",solrtitle:"智能排序",cityname:"",loadingflag:!1,title:"",capacityList:[{index:"",name:"智能排序"},{index:1,name:"库存数"},{index:2,name:"成交笔数"},{index:3,name:"综合评分"},{index:4,name:"买家评分"},{index:5,name:"上传时间"}],screenList:[{status:!0,title:"现/期货",list:[{name:"所有",status:!1,type:""},{name:"现货",status:!1,type:1},{name:"期货",status:!1,type:2}]},{status:!0,title:"我的优质/关注",list:[{name:"我关注的卖家",status:!1,type:1},{name:"我的优质卖家",status:!1,type:1}]},{status:!0,title:"卖家类型",list:[{name:"所有",status:!1,type:""},{name:"原厂和代理商",status:!1,type:1}]},{status:!0,title:"库位",list:[{name:"不限",status:!1,type:""}],choose:!0}]}},computed:r()({inputValue:function(){return this.searchIndex||""},loading:function(){return this.$store.state.zj.updatedloading},status:function(){return!!this.$store.state.user.token}},Object(_.c)(["searchIndex"])),created:function(){switch(this.params.model=this.inputValue,this.flagId){case 0:this._searchOrder()}console.log(this.status),this.status?this.screenList[1].status=!0:this.screenList[1].status=!1},methods:r()({loadmore:function(t){if(t<-275){if(this.sellerList.length>=this.totalCount)return;this.params.pageNow++,this._searchOrder()}},search:function(t){this._paramsVal(t)},select:function(t){this.flagId=t,Object(l.a)(this.$refs.title.children,t),0===t&&(this.params.allsort="",this.params.goods_type="",this.params.att_type="",this.params.seller_type="",this.params.good_type="",this.params.war_name="",this.params.type=!this.params.type,this.params.type?this.$refs.choosei.className="up":this.$refs.choosei.className="down",this._paramsVal())},capacity:function(t){this.capacityIndex=t,this.params.allsort=0===t?"":t,this.solrtitle=this.capacityList[this.capacityIndex].name,this.flagId=0,this._paramsVal()},screen:function(t,s){var a=this;t.forEach(function(t,a){a!==s&&(t.status=!1)}),t[s].status=!t[s].status,this.screenList.forEach(function(t,s){t.choose&&t.list[0].status&&(a.PopupPickerValue="")})},ievent:function(t){this.PopupPickerValue=t[0],this.screenList.forEach(function(t,s){t.choose&&(t.list[0].status=!1)})},confrim:function(){if(2===this.flagId){var t=this.screenList[0].list.find(function(t){return!0===t.status});this.params.goods_type=t?t.type:"";var s=this.screenList[1].list[0];this.params.att_type=s.status?s.type:"";var a=this.screenList[1].list[1];this.params.good_type=a.status?a.type:"";var e=this.screenList[2].list.find(function(t){return!0===t.status});this.params.seller_type=e?e.type:"",this.params.war_name=this.PopupPickerValue||"",this.flagId=0,this._paramsVal()}},canse:function(){var t=this;1===this.flagId&&this.capacity(0),2===this.flagId&&this.screenList.forEach(function(s,a){s.list.forEach(function(s,a){s.status="",t.PopupPickerValue=""})})},_paramsVal:function(t){this.params.model=t||this.inputValue,this.params.pageNow=1,this.sellerList=[],this._searchOrder()},_searchOrder:function(){var t=this;Object(u.b)(this.params).then(function(s){if(s.code===h.c){var a;if(s.data.map.length<=0&&t.sellerList.length<=0)return void t.$vux.toast.text("暂无数据","middle");t.historyAction(s.data.map[0].model_code);var e=s.data.map;t.totalCount=s.data.page.totalCount,(a=t.sellerList).push.apply(a,i()(e))}else t.$vux.toast.text(s.msg,"middle")}).catch(function(s){t.$vux.toast.text(s.msg,"middle")})}},Object(_.b)(["historyAction"])),components:{nominate:c.default,PopupPicker:v,SearchTitle:o.a,Loading:g.a,Scroll:y.a}}),w={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("transition",{attrs:{name:"slide"}},[a("div",{staticClass:"credit-search"},[a("search-title",{on:{search:t.search}}),t._v(" "),a("div",{ref:"title",staticClass:"title"},[a("div",{staticClass:"active title-item",on:{click:function(s){t.select(0)}}},[a("span",[t._v("默认")]),t._v(" "),a("i",{ref:"choosei",staticClass:"up"})]),t._v(" "),a("div",{staticClass:"title-item",on:{click:function(s){t.select(1)}}},[a("span",[t._v(t._s(t.solrtitle))])]),t._v(" "),a("div",{staticClass:"title-item",on:{click:function(s){t.select(2)}}},[a("span",[t._v("筛选")])])]),t._v(" "),a("div",{staticClass:"list"},[a("div",{directives:[{name:"show",rawName:"v-show",value:0===t.flagId,expression:"flagId===0"}]},[a("transition",{attrs:{name:"fade"}},[a("div",{staticClass:"nomina"},[a("nominate",{attrs:{getdiscList:t.sellerList,flag:!0},on:{"update:getdiscList":function(s){t.sellerList=s},loadmore:t.loadmore}})],1)])],1),t._v(" "),a("transition",{attrs:{name:"fade"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:1===t.flagId,expression:"flagId===1"}],staticClass:"capacity"},[a("ul",t._l(t.capacityList,function(s,e){return a("li",{key:e,class:{"font-active":t.capacityIndex===e},on:{click:function(s){t.capacity(e)}}},[t._v(t._s(s.name)+" ")])}))])]),t._v(" "),a("transition",{attrs:{name:"fade"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:2===t.flagId,expression:"flagId===2"}],staticClass:"screen"},[a("ul",{staticClass:"screen-ul"},t._l(t.screenList,function(s,e){return a("li",{directives:[{name:"show",rawName:"v-show",value:s.status,expression:"item.status"}],key:e},[s.choose?t._e():a("div",{staticClass:"screen-title"},[t._v(t._s(s.title))]),t._v(" "),s.choose?a("div",{staticClass:"screen-title"},[a("span",[t._v(t._s(s.title))]),t._v(" "),a("i",{staticClass:"chooseimg"}),t._v(" "),a("div",{staticClass:"popup-picker"},[a("popup-picker",{on:{ievent:t.ievent}})],1)]):t._e(),t._v(" "),a("ul",{staticClass:"screen-list"},[t._l(s.list,function(e,i){return a("li",{key:i,class:{"screen-active":e.status},on:{click:function(a){a.stopPropagation(),a.preventDefault(),t.screen(s.list,i)}}},[t._v(t._s(e.name))])}),t._v(" "),s.choose&&t.PopupPickerValue?a("li",{staticClass:"screen-active"},[t._v(t._s(t.PopupPickerValue))]):t._e()],2)])}))])])],1),t._v(" "),a("transition",{attrs:{name:"fade"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:2===t.flagId,expression:"flagId===2"}],staticClass:"submit"},[a("button",{staticClass:"canse",on:{click:t.canse}},[t._v("重置")]),t._v(" "),a("button",{staticClass:"confrim",on:{click:t.confrim}},[t._v("确定")])])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"loading-container"},[a("loading",{attrs:{loadflag:t.loading}})],1)],1)])},staticRenderFns:[]};var I=a("VU/8")(x,w,!1,function(t){a("JPIR")},"data-v-135fbbb4",null);s.default=I.exports}});