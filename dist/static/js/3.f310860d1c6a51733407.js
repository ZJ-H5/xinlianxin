webpackJsonp([3],{"0IpB":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("Dd8w"),i=n.n(r),s=n("woOf"),o=n.n(s),a=n("//Fk"),c=n.n(a),u=n("hU7x"),l=n.n(u);function h(e,t,n){return e+=(e.indexOf("?")<0?"?":"&")+function(e){var t="";for(var n in e){var r=void 0!==e[n]?e[n]:"";t+="&"+n+"="+encodeURIComponent(r)}return t?t.substring(1):""}(t),new c.a(function(t,r){l()(e,n,function(e,n){e?r(e):t(n)})})}var f=n("JxNM");function d(){return h("https://c.y.qq.com/v8/fcg-bin/v8.fcg",o()({},f.f,{channel:"singer",page:"list",key:"all_all_all",pagesize:100,pagenum:1,hostUin:0,needNewCode:0,platform:"yqq"}),f.i)}var g=n("Zrlr"),m=n.n(g),p=function e(t){var n=t.id,r=t.name;m()(this,e),this.id=n,this.name=r,this.avatar="https://y.gtimg.cn/music/photo_new/T001R300x300M000"+n+".jpg?max_age=2592000"},v=n("qwAB"),w=n("3Q4o"),y=n("y/jF"),_=(Array,v.a,y.a,{created:function(){this.touch={},this.listenScroll=!0,this.listHeight=[],this.probeType=3},data:function(){return{scrollY:-1,currentIndex:0,diff:-1}},props:{data:{type:Array,default:null}},computed:{shortcutList:function(){return this.data.map(function(e){return e.title.substr(0,1)})},fixedTitle:function(){return this.scrollY>0?"":this.data[this.currentIndex]?this.data[this.currentIndex].title:""}},methods:{selectTiem:function(e){this.$emit("select",e)},onShortcutTouchStart:function(e){var t=Object(w.b)(e.target,"index"),n=e.touches[0];this.touch.y1=n.pageY,this.touch.anchorIndex=t,this._scrollTo(t)},onShortcutTouchMove:function(e){var t=e.touches[0];this.touch.y2=t.pageY;var n=(this.touch.y2-this.touch.y1)/18|0,r=parseInt(this.touch.anchorIndex)+n;this._scrollTo(r)},scroll:function(e){this.scrollY=e.y},_scrollTo:function(e){(e||0===e)&&(e<0?e=0:e>this.listHeight.length-2&&(e=this.listHeight.length-2),this.scrollY=-this.listHeight[e],this.$refs.listview.scrollToElement(this.$refs.listGroup[e],0))},_calculateHeight:function(){this.listHeight=[];var e=this.$refs.listGroup,t=0;this.listHeight.push(t);for(var n=0;n<e.length;n++){t+=e[n].clientHeight,this.listHeight.push(t)}}},watch:{data:function(){var e=this;setTimeout(function(){e._calculateHeight()},20)},scrollY:function(e){var t=this.listHeight;if(e>0)this.currentIndex=0;else{for(var n=0;n<t.length-1;n++){var r=t[n],i=t[n+1];if(-e>=r&&-e<i)return this.currentIndex=n,void(this.diff=i+e)}this.currentIndex=t.length-2}},diff:function(e){var t=e>0&&e<30?e-30:0;this.fixedTop!==t&&(this.fixedTop=t,this.$refs.fixed.style.transform="translate3d(0,"+t+"px,0)")}},components:{Scroll:v.a,Loading:y.a}}),x={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("scroll",{ref:"listview",staticClass:"listview",attrs:{data:e.data,listenScroll:e.listenScroll,probeType:e.probeType},on:{scroll:e.scroll}},[n("ul",e._l(e.data,function(t,r){return n("li",{key:r,ref:"listGroup",refInFor:!0,staticClass:"list-group"},[n("h2",{staticClass:"list-group-title"},[e._v(e._s(t.title))]),e._v(" "),n("ul",e._l(t.items,function(t,r){return n("li",{key:r,staticClass:"list-group-item",on:{click:function(n){e.selectTiem(t)}}},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.avatar,expression:"item.avatar"}],staticClass:"avatar",attrs:{alt:""}}),e._v(" "),n("span",{staticClass:"name"},[e._v(e._s(t.name))])])}))])})),e._v(" "),n("div",{staticClass:"list-shortcut",on:{touchstart:function(t){t.stopPropagation(),t.preventDefault(),e.onShortcutTouchStart(t)},touchmove:function(t){t.stopPropagation(),t.preventDefault(),e.onShortcutTouchMove(t)}}},[n("ul",e._l(e.shortcutList,function(t,r){return n("li",{key:r,staticClass:"item",class:{current:e.currentIndex===r},attrs:{"data-index":r}},[e._v("\n        "+e._s(t)+"\n      ")])}))]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.fixedTitle,expression:"fixedTitle"}],ref:"fixed",staticClass:"list-fixed"},[n("h1",{staticClass:"fixed-title"},[e._v(e._s(e.fixedTitle))])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.data.length,expression:"!data.length"}],staticClass:"loading-container"},[n("loading")],1)])},staticRenderFns:[]};var b=n("VU/8")(_,x,!1,function(e){n("Ie7t")},"data-v-2a6ed26a",null).exports,S=n("NYxO"),C=(i()({selectSinger:function(e){this.$router.push({path:"/singer/"+e.id}),this.setSinger(e)},_getSingerList:function(){var e=this;d().then(function(t){t.code===f.b&&(e.singers=e._normalizeSinger(t.data.list),console.log(e.singers))})},_normalizeSinger:function(e){var t={hot:{title:"热门",items:[]}};e.forEach(function(e,n){n<10&&t.hot.items.push(new p({name:e.Fsinger_name,id:e.Fsinger_mid}));var r=e.Findex;t[r]||(t[r]={title:r,items:[]}),t[r].items.push(new p({name:e.Fsinger_name,id:e.Fsinger_mid}))});var n=[],r=[];for(var i in t){var s=t[i];s.title.match(/[z-zA-Z]/)?r.push(s):"热门"===s.title&&n.push(s)}return r.sort(function(e,t){return e.title.charCodeAt(0)-t.title.charCodeAt(0)}),n.concat(r)}},Object(S.d)({setSinger:"SET_SINGER"})),{data:function(){return{singers:[]}},created:function(){this._getSingerList()},methods:i()({selectSinger:function(e){this.$router.push({path:"/singer/"+e.id}),this.setSinger(e)},_getSingerList:function(){var e=this;d().then(function(t){t.code===f.b&&(e.singers=e._normalizeSinger(t.data.list),console.log(e.singers))})},_normalizeSinger:function(e){var t={hot:{title:"热门",items:[]}};e.forEach(function(e,n){n<10&&t.hot.items.push(new p({name:e.Fsinger_name,id:e.Fsinger_mid}));var r=e.Findex;t[r]||(t[r]={title:r,items:[]}),t[r].items.push(new p({name:e.Fsinger_name,id:e.Fsinger_mid}))});var n=[],r=[];for(var i in t){var s=t[i];s.title.match(/[z-zA-Z]/)?r.push(s):"热门"===s.title&&n.push(s)}return r.sort(function(e,t){return e.title.charCodeAt(0)-t.title.charCodeAt(0)}),n.concat(r)}},Object(S.d)({setSinger:"SET_SINGER"})),components:{ListView:b}}),T={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"singer"},[t("list-view",{attrs:{data:this.singers},on:{select:this.selectSinger}}),this._v(" "),t("router-view")],1)},staticRenderFns:[]};var E=n("VU/8")(C,T,!1,function(e){n("3wKQ")},"data-v-3bd00abe",null);t.default=E.exports},"3wKQ":function(e,t){},EarI:function(e,t){var n=1e3,r=60*n,i=60*r,s=24*i,o=365.25*s;function a(e,t,n){if(!(e<t))return e<1.5*t?Math.floor(e/t)+" "+n:Math.ceil(e/t)+" "+n+"s"}e.exports=function(e,t){t=t||{};var c,u=typeof e;if("string"===u&&e.length>0)return function(e){if((e=String(e)).length>100)return;var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(!t)return;var a=parseFloat(t[1]);switch((t[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return a*o;case"days":case"day":case"d":return a*s;case"hours":case"hour":case"hrs":case"hr":case"h":return a*i;case"minutes":case"minute":case"mins":case"min":case"m":return a*r;case"seconds":case"second":case"secs":case"sec":case"s":return a*n;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return a;default:return}}(e);if("number"===u&&!1===isNaN(e))return t.long?a(c=e,s,"day")||a(c,i,"hour")||a(c,r,"minute")||a(c,n,"second")||c+" ms":function(e){if(e>=s)return Math.round(e/s)+"d";if(e>=i)return Math.round(e/i)+"h";if(e>=r)return Math.round(e/r)+"m";if(e>=n)return Math.round(e/n)+"s";return e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},Ie7t:function(e,t){},gIbM:function(e,t,n){var r;function i(e){function n(){if(n.enabled){var e=n,i=+new Date,s=i-(r||i);e.diff=s,e.prev=r,e.curr=i,r=i;for(var o=new Array(arguments.length),a=0;a<o.length;a++)o[a]=arguments[a];o[0]=t.coerce(o[0]),"string"!=typeof o[0]&&o.unshift("%O");var c=0;o[0]=o[0].replace(/%([a-zA-Z%])/g,function(n,r){if("%%"===n)return n;c++;var i=t.formatters[r];if("function"==typeof i){var s=o[c];n=i.call(e,s),o.splice(c,1),c--}return n}),t.formatArgs.call(e,o),(n.log||t.log||console.log.bind(console)).apply(e,o)}}return n.namespace=e,n.enabled=t.enabled(e),n.useColors=t.useColors(),n.color=function(e){var n,r=0;for(n in e)r=(r<<5)-r+e.charCodeAt(n),r|=0;return t.colors[Math.abs(r)%t.colors.length]}(e),"function"==typeof t.init&&t.init(n),n}(t=e.exports=i.debug=i.default=i).coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){t.enable("")},t.enable=function(e){t.save(e),t.names=[],t.skips=[];for(var n=("string"==typeof e?e:"").split(/[\s,]+/),r=n.length,i=0;i<r;i++)n[i]&&("-"===(e=n[i].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")))},t.enabled=function(e){var n,r;for(n=0,r=t.skips.length;n<r;n++)if(t.skips[n].test(e))return!1;for(n=0,r=t.names.length;n<r;n++)if(t.names[n].test(e))return!0;return!1},t.humanize=n("EarI"),t.names=[],t.skips=[],t.formatters={}},hU7x:function(e,t,n){var r=n("rRaD")("jsonp");e.exports=function(e,t,n){"function"==typeof t&&(n=t,t={});t||(t={});var o,a,c=t.prefix||"__jp",u=t.name||c+i++,l=t.param||"callback",h=null!=t.timeout?t.timeout:6e4,f=encodeURIComponent,d=document.getElementsByTagName("script")[0]||document.head;h&&(a=setTimeout(function(){g(),n&&n(new Error("Timeout"))},h));function g(){o.parentNode&&o.parentNode.removeChild(o),window[u]=s,a&&clearTimeout(a)}return window[u]=function(e){r("jsonp got",e),g(),n&&n(null,e)},e=(e+=(~e.indexOf("?")?"&":"?")+l+"="+f(u)).replace("?&","?"),r('jsonp req "%s"',e),(o=document.createElement("script")).src=e,d.parentNode.insertBefore(o,d),function(){window[u]&&g()}};var i=0;function s(){}},rRaD:function(e,t,n){(function(r){function i(){var e;try{e=t.storage.debug}catch(e){}return!e&&void 0!==r&&"env"in r&&(e=Object({NODE_ENV:"production",ENV_CONFIG:"prod",API_HOST:"https://www.icmao.com"}).DEBUG),e}(t=e.exports=n("gIbM")).log=function(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},t.formatArgs=function(e){var n=this.useColors;if(e[0]=(n?"%c":"")+this.namespace+(n?" %c":" ")+e[0]+(n?"%c ":" ")+"+"+t.humanize(this.diff),!n)return;var r="color: "+this.color;e.splice(1,0,r,"color: inherit");var i=0,s=0;e[0].replace(/%[a-zA-Z%]/g,function(e){"%%"!==e&&"%c"===e&&(s=++i)}),e.splice(s,0,r)},t.save=function(e){try{null==e?t.storage.removeItem("debug"):t.storage.debug=e}catch(e){}},t.load=i,t.useColors=function(){if("undefined"!=typeof window&&window.process&&"renderer"===window.process.type)return!0;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},t.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(e){}}(),t.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],t.formatters.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},t.enable(i())}).call(t,n("W2nU"))}});