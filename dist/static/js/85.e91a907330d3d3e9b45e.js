webpackJsonp([85],{ls8k:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("Xtdt"),n=a("JxNM"),s=a("yscp"),o=a("y/jF"),r=a("M9A7"),l=(i.default,o.a,{data:function(){return{title:"手机验证码登录",time:n.h,codeDisabled:!1,interval:null,deal:!1,params:{phone:"",code:"",type:1}}},created:function(){},computed:{loading:function(){return this.$store.state.zj.updatedloading}},methods:{sendcodes:function(){var e=this;Object(s.a)("phone",this.params.phone)?Object(r.d)({phone:this.params.phone}).then(function(t){t.code===n.c?e._send():e.$vux.toast.text(t.msg,"middle")}).catch(function(t){e.$vux.toast.text(t.msg,"middle")}):this._validator("phone")},inputchange:function(e){this._validator(e)},login:function(){Object(s.a)("phone",this.params.phone)?Object(s.a)("code",this.params.code)?this._loginUserdo():this._validator("code"):this._validator("phone")},_loginUserdo:function(){var e=this;this.$store.dispatch("loginUserdo",this.params).then(function(t){t.code===n.c?(window.clearInterval(e.interval),e.$router.push(e.$store.state.user.redirect)):e.$vux.toast.text(t.msg,"middle")}).catch(function(t){e.$vux.toast.text(t.msg,"middle")})},_validator:function(e){var t=this;this.$validator.validate(e).then(function(a){if(a)return!0;var i=t.$validator.errors.first(e);t.$vux.toast.text(i,"middle")})},_send:function(){var e=this,t=this;t.codeDisabled=!0,this.interval=window.setInterval(function(){t.time--<=0&&(t.time=n.h,t.codeDisabled=!1,window.clearInterval(e.interval))},1e3)}},components:{MHeader:i.default,Loading:o.a},beforeDestroy:function(){window.clearInterval(this.interval)},destroyed:function(){window.clearInterval(this.interval)}}),d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("transition",{attrs:{name:"slide"}},[a("div",{staticClass:"phoneLogin"},[a("div",{staticClass:"fixedtop"},[a("div",{staticClass:"header"},[a("div",{staticClass:"header"},[a("m-header",{attrs:{title:e.title,headerflag:!0}})],1)])]),e._v(" "),a("ul",{staticClass:" clr"},[a("li",{staticClass:"pl3 pr3 loginli"},[a("i",{staticClass:"iconfont icon-phone ml20 mr20"}),e._v(" "),a("input",{directives:[{name:"validate",rawName:"v-validate",value:"required|phone",expression:"'required|phone'"},{name:"model",rawName:"v-model",value:e.params.phone,expression:"params.phone"}],staticClass:"inp",attrs:{type:"text",name:"phone",maxlength:"11",placeholder:"请输入手机号码"},domProps:{value:e.params.phone},on:{blur:function(t){e.inputchange("phone")},input:function(t){t.target.composing||e.$set(e.params,"phone",t.target.value)}}})]),e._v(" "),a("li",{staticClass:"pl3 pr3 loginli clr"},[a("i",{staticClass:"iconfont icon-youxiang ml20 mr20"}),e._v(" "),a("input",{directives:[{name:"validate",rawName:"v-validate",value:"required|code",expression:"'required|code'"},{name:"model",rawName:"v-model",value:e.params.code,expression:"params.code"}],staticClass:"inp yzminp",attrs:{type:"text",name:"code",placeholder:"请输入验证码"},domProps:{value:e.params.code},on:{blur:function(t){e.inputchange("code")},input:function(t){t.target.composing||e.$set(e.params,"code",t.target.value)}}}),e._v(" "),e.codeDisabled?e._e():a("a",{staticClass:"right yzma",on:{click:e.sendcodes}},[e._v("获取验证码")]),e._v(" "),e.codeDisabled?a("a",{staticClass:"right yzma disabled"},[e._v(e._s(e.time+"s"))]):e._e()])]),e._v(" "),a("div",{staticClass:"lgbtn pl3 pr3",on:{click:e.login}},[a("a",{staticClass:"lgbtna tc"},[e._v("登录")])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"loading-container"},[a("loading",{attrs:{loadflag:e.loading}})],1)])])},staticRenderFns:[]};var c=a("VU/8")(l,d,!1,function(e){a("zI23")},null,null);t.default=c.exports},zI23:function(e,t){}});