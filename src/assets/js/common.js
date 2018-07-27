// *根据屏幕尺寸改变根元素字体
//(function(doc, win) {
//	var docEl = doc.documentElement,
//		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//		recalc = function() 
//		{
//			var clientWidth = docEl.clientWidth >= 1024 ? 540 : docEl.clientWidth,
//				clientHeight=docEl.clientHeight < 540 ? 540 : docEl.clientHeight;
//			if (!clientWidth) return;
//			if($(".l-redbox").length>0)
//			{
//				$(".l-redbox").height(clientHeight);
//				
//			}
//			var fsize=9.1 * (clientWidth / 375)>15?15:9.1 * (clientWidth / 375);
//			docEl.style.fontSize = fsize+ 'px';
//		
//		};
//		if (!doc.addEventListener) return;
//		win.addEventListener(resizeEvt, recalc, false);
//		doc.addEventListener('DOMContentLoaded', recalc, false);
//})(document, window);
$(function(){
	$(".bntclick").click(function(){
		var _this=$(this),count=60,ctime=null; 
			_this.attr({ 
				"disabled":"false", 
				}); 
			ctime=setInterval(function(){ 
				count--; 
				_this.val("倒计时"+count+""); 
				if(count<0) 
				{ 
					_this.val("重新发送").removeAttr("disabled").removeAttr("style"); 
					clearInterval(ctime); 
				} 
			}, 1000); 
	})
	if($(".switch").length>0)
	{
		$(".switch").each(function(){
			$(this).click(function(){
				if($(this).hasClass("addswitch"))
				{
					$(this).removeClass("addswitch");
					$(this).parent().next(".switchtap").hide();
				}else{
					$(this).addClass("addswitch");
					$(this).parent().next(".switchtap").show();
				}
			})
		})
		
	}
	//弹窗关闭
	if($(".delog-colse").length>0)
	{
		$(".delog-colse").click(function(){
			$('.delog').hide();
			$("body,html").css({
				"overflow":"auto",
				"height":"auto"
				})
		})
	}
	//弹窗关闭
	if($(".hopwrap").length>0)
	{
		$(".hopwrap").click(function(e){
			e.stopPropagation();
		})
	}
	
	if($(".delog").length>0)
	{
		$(".delog").click(function(){
			$(this).hide();
			$("body,html").css({
				"overflow":"auto",
				"height":"auto"
				})
		})
	}
	//
	if($(".evaltab").length>0)
	{
		$(".evaltab").find("i").click(function(){
			var index=$(this).index();
			$(".evaltab").find("i").removeClass("cur")
			for(var i=0;i<index+1;i++)
			{
				$(".evaltab").find("i").eq(i).addClass("cur")
			}
		})
	}
	//editorbnt
	if($(".editorbnt").length>0)
	{	var ieditor=0;
		$(".editorbnt").click(function(){
			if(ieditor%2==0)
			{
				$(this).html("完成");
			}else
			{
				$(this).html("编辑");
			}
			editordelog(ieditor);
			ieditor++;
		})
	}
	//删除
	if($(".delsubmit").length>0)
	{	var ieditor=0;
		$(".delsubmit").click(function(){
			
			editordelog(ieditor);
			ieditor++;
		})
	}
	if($('.tab-nav').length>0){
		tabcard($('.tab-nav').children(),$('.tab-cont'));
	}
	//定位
	if($(".locatap").length>0)
	{
		var oLen=$(".loacont>li").length,arr=[];
		for(i=0;i<oLen;i++)
		{
			arr[i]=$(".loacont>li").eq(i).offset().top-$(".l-header").height();
			
		}
		$(".locatap li").each(function(){
			$(this).click(function(){
				var oIndex=$(this).index();
				$(window).scrollTop(arr[oIndex]);
			})
		})
	}
	//销售
	if($(".sortap").length>0)
	{
		$(".sortap").each(function(){
			var _that=$(this);
			_that.click(function(){
				var datanum=$(this).attr("data-title");
				if(datanum==0)
				{
					datanum++;
					$(this).addClass("sortone");
					$(this).attr({"data-title":datanum})
				}else
				if(datanum==1)
				{
					datanum++;
					$(this).removeClass("sortone").addClass("sortwo");
					$(this).attr({"data-title":datanum})
				}else
				if(datanum==2)
				{
					datanum=0;
					$(this).removeClass("sortwo");
					$(this).attr({"data-title":datanum})
				}
			})
		})
	}
	//请选择资源
	if($(".sel-meter").length>0)
	{
		$(".sel-meter").each(function(index){
			var _that=$(this);
			_that.find("a").click(function(){				
				$(this).addClass("cur").siblings().removeClass("cur")
				$(".cartsel").find("em").eq(index).html($(this).html())
			})
		})
	}
	//分红可抵扣
	if($(".bonustap").length>0)
	{
		$(".bonustap").each(function(index){
			var _that=$(this);
			_that.click(function(){
				if($(this).hasClass("bonustapcolor"))
				{
					$(this).removeClass("bonustapcolor")
				}else{
					$(this).addClass("bonustapcolor")
				}
			})
		})
	}
	//收藏
	if($(".keepbnt").length>0)
	{
		$(".keepbnt").each(function(index){
			var _that=$(this);
			_that.click(function(){
				if($(this).hasClass("keepcolor"))
				{
					$(this).removeClass("keepcolor")
					$(this).find("em").html("收藏")
					alert("已取消收藏")
				}else{
					$(this).addClass("keepcolor")
					$(this).find("em").html("已收藏")
					alert("收藏成功")
				}
			})
		})
	}
	if($(".screen-ul").length>0)
	{
		$(".screen-ul").each(function(index){
			var _that=$(this);
			_that.find("li").click(function(){
				if($(this).hasClass("cur"))
				{
					$(this).removeClass("cur");
					$(this).find("input").attr({"checked":""})
				}else{
					$(this).addClass("cur")
					$(this).find("input").attr({"checked":"checked"})
				}
			})
		})
	}
	window.alert = function(msg){
		var body = $('body'),
			boxttext = $("<div class='alertmsg'>"+msg+"</div>");
			boxttext.appendTo($("body"));
			setTimeout(function(){
				boxttext.remove();
			},1000)
	}
	if($(".lookbigpic").length>0)
	{
		var boxttext = $("<div class='lookbigdelog disnone'></div>"),
			boxclose=$("<div class='lookclose iconfont f28'>&#xe600;</div>"),
			boxwrap=$("<ul class='lookbigdiv'></ul>"),
			boxpage=$("<div class='lookbigpage cf f28'><em ></em>/<em></em></div>");
			boxclose.appendTo(boxttext);
			boxwrap.appendTo(boxttext);
			boxpage.appendTo(boxttext);
			boxttext.appendTo($("body"));
		$(".lookclose").click(function(){
			$(".lookbigdelog").hide();
			$(".lookbigdiv").html("").removeAttr("style");
			$("body,html").css({
				"overflow":"auto",
				"height":"auto"
			})
		})
		$(".lookbigpic").each(function(){
			var _that=$(this),
				obj=$(".lookbigdelog"),
				oIndex,oLen,
				win=$(window).width(),
				oPic=_that.children();
				oPic.unbind();
				oPic.click(function(){
					
					obj.show();
					oLen=_that.find("img").length;
					oIndex=$(this).index();
			
					$(".lookbigpage em").eq(0).html(oIndex+1);
					$(".lookbigpage em").eq(1).html(oLen);

					for(var i=0; i<oLen;i++)
					{
						$("<li style=width:"+win+"px><img src="+oPic.eq(i).find("img").attr("src")+" /></li>").appendTo($(".lookbigdiv"))
					}
					$(".lookbigdiv").css({
						"-webkit-transform":"translateX(-"+oIndex*win+"px)",
						"transform":"translateX(-"+oIndex*win+"px)",
						"-moz-transform":"translateX(-"+oIndex*win+"px)"
					})
					$("body,html").css({
						"overflow":"hidden",
						"height":"100%"
					})
					obj.unbind();
					obj.bind("swipeLeft",function(){
						oIndex++
						if(oIndex>oLen-1)
						{
							oIndex=oLen-1;
							alert("最后一张了")
						}
						
						$(".lookbigpage em").eq(0).html(oIndex+1);
						$(".lookbigdiv").css({
							"-webkit-transform":"translateX(-"+oIndex*win+"px)",
							"transform":"translateX(-"+oIndex*win+"px)",
							"-moz-transform":"translateX(-"+oIndex*win+"px)",
							"transition": "all .3s",
							"-moz-transition": "all .3s",
							"-webkit-transition": "all .3s"
						})
					})
					obj.bind("swipeRight",function(){
						oIndex--
						if(oIndex<0)
						{
							oIndex=0;
							alert("最前一张了")
						}
						$(".lookbigpage em").eq(0).html(oIndex+1);
						$(".lookbigdiv").css({
							"-webkit-transform":"translateX(-"+oIndex*win+"px)",
							"transform":"translateX(-"+oIndex*win+"px)",
							"-moz-transform":"translateX(-"+oIndex*win+"px)",
							"transition": "all .3s",
							"-moz-transition": "all .3s",
							"-webkit-transition": "all .3s"
						})
					})
				})
			
		})
	}
	if($('.placeholder').length>0){
		$('.placeholder').each(function(){
			var self = $(this),
				label = $('<label class="placeholdertxt f24"></label>'),
				paddingLeft = self.css('padding-left');
			self.wrap('<span class="input-wrap"></span>');
			label.text(self.attr('placeholder'));
			label.insertAfter(self);
			label.css({
				'top': '50%',
				'line-height': self.height() +'px',
				'margin-top': -self.height()/2,
				'left': paddingLeft
			})
			self.attr({'placeholder':""})
			label.click(function(){
				self.focus();
			});
			self.focus(function(){
				label.hide();
			}).blur(function(){
				if(self.val() == ''){
					label.show();
				}
			});
			if(self.val() != ''){
					label.hide();
			}
		});
	}
})
function mimedelog(obj)
{
	$("."+obj).show();
	$("body,html").css({
		"overflow":"hidden",
		"height":"100%"
	})
	if($(".tranY").length>0)
	{
		tranY();
	}
}
function addresstab(obj)
{
	$("."+obj).show();
	var win=$(window).height(),
		oTlt=$(".screen-tlt").outerHeight(),
		_self=$(".address-cont"),
		
		oRess=$(".addresstlt").outerHeight(),
		oBox=$(".address-box"),
		oAdd=$(".sel-address");
		setTimeout(function(){
			$("."+obj).find(".address-cont").addClass("address-tap")
		},100)
		_self.css({
			"height":win-oTlt,
			"margin-top":oTlt
		})
		oBox.css({
			"height":win-oTlt-oRess,
		})
		$("body,html").css({
			"overflow":"hidden",
			"height":"100%"
		})
		oBox.find("ul").hide().eq(0).show();
		oBox.find("ul").find("li").unbind("click");
		oBox.find("ul").eq(0).find("li").click(function(){
			$(this).addClass("cur").siblings().removeClass("cur");
			oBox.find("ul").hide().eq(1).show();
			oAdd.find("em").eq(0).html($(this).html())
		});
		oBox.find("ul").eq(1).find("li").click(function(){
			$(this).addClass("cur").siblings().removeClass("cur");
			oBox.find("ul").hide().eq(2).show();
			oAdd.find("em").eq(1).html($(this).html())
		});
		
		oBox.find("ul").eq(2).find("li").click(function(){
			$(this).addClass("cur").siblings().removeClass("cur");
		
			setTimeout(function(){
			$("."+obj).find(".address-cont").removeClass("address-tap")
			$("."+obj).hide();
			},100)
			
			oAdd.find("em").eq(2).html($(this).html());
			$("body,html").css({
				"overflow":"auto",
				"height":"auto"
			})
		});
	
	if($(".tranY").length>0)
	{
		tranY();
	}
}
//筛选
function screentap(obj)
{
	$("."+obj).show();
	setTimeout(function(){
		$("."+obj).find(".screen-cont").addClass("screen-tap")
	},100)
	
}
//订单详情
function ordertab(that,obj)
{
	$("."+obj).show();
	$("body,html").css({
		"overflow":"hidden",
		"height":"100%"
	})

	$('.ordernavul').find("li").each(function(){
		$(this).unbind();
		$(this).click(function(){
			$(that).children("em").html($(this).html());
	
			$('.delog').hide();
			$("body,html").css({
				"overflow":"auto",
				"height":"auto"
			})
		})
	})
	if($(".tranY").length>0)
	{
		tranY();
	}
}
function selinbtab(that,obj)
{
	$("."+obj).show();
	$("body,html").css({
		"overflow":"hidden",
		"height":"100%"
	})
	$(that).next().show();
	$('.ordernavul').find("li").each(function(){
		$(this).unbind();
		$(this).click(function(){
			$(that).children("em").html($(this).html());
			$(that).next().hide();
			$('.delog').hide();
			$("body,html").css({
				"overflow":"auto",
				"height":"auto"
			})
		})
	})
	$('.delog').click(function(){
		$('.ordernavul').hide();
	})
	
}
//订单详情
function selintab(that,obj)
{
	$("."+obj).show();
	$("body,html").css({
		"overflow":"hidden",
		"height":"100%"
	})
	$(that).addClass("rotatetap");
	$(that).find('.selinul').show()
	$(that).find('.selinul').find("li").each(function(){
		$(this).unbind();
		$(this).click(function(e){
			$(that).children("em").html($(this).html());
			$("."+obj).hide();
			$(that).find('.selinul').hide();
			$(that).removeClass("rotatetap");
			$("body,html").css({
				"overflow":"auto",
				"height":"auto"
			})
			e.stopPropagation();
		})
	})
	$("."+obj).click(function(){
		
		$("."+obj).hide();
		$(that).find('.selinul').hide();
	})
	
}

function editordelog(oNum)
{
	if(oNum%2==0)
	{
		$(".l-clicleicon").show()
	
	}else
	{
		$(".l-clicleicon").hide()
	}
	//$("input[name=checkbox]").onchange(function(){
	$("input[name=checkbox]").click(function(){
		$(".tapdelsub").show();
		var len = $("input[name=checkbox]:checked").length; 
		if (len==0)
		{
			$(".tapdelsub").addClass("curtab")
		}else{
			$(".tapdelsub").removeClass("curtab")
		}
	})
}
function banktab(that,obj)
{
	$("."+obj).show();
	$("body,html").css({
		"overflow":"hidden",
		"height":"100%"
	})
	$("."+obj).find("li").click(function(){
		$(that).find('em').html($(this).html())
		$(this).addClass("cur").siblings().removeClass("cur");
		
	})
	if($(".tranY").length>0)
	{
		tranY();
	}
}
/*-----------上下滚动  up-down------------*/
function tranY(){
	
		$(".tranY").each(function(index){
			var _that=$(this),
				oChil=_that.find("li").eq(0).height(),
				oLen=_that.find("li").length,
				oChilren=oLen*oChil,
				oPar=_that.parent().height(),
				_this=document.querySelectorAll(".tranY"),
	   			startY,topY=0,endY,moveY,speed;
	   			if(oLen==0)
	   			{
	   				oChilren=_that.outerHeight();
	   			}
	   			_that.css({
						"-webkit-transform":"translateY("+0+"px)",
						"transform":"translateY("+0+"px)",
						"-moz-transform":"translateY("+0+"px)"
					})
			document.addEventListener("touchstart", function (e){
				startY = e.touches[0].pageY;
			});
			
			document.addEventListener("touchend", function(e){
				endY=topY;
			});	
			if(oChilren>oPar){
				_this[index].addEventListener('touchmove', function (event) {
					moveY=event.touches[0].pageY;
					speed=moveY-startY;
					if(endY!=null)
					{
						topY=speed+endY;
					}else{
						topY=speed;
					}
					if(topY>0){
						topY=0;
					}
					if(topY<-oChilren+oPar)
					{
						topY=-oChilren+oPar;
					}
					_that.css({
						"-webkit-transform":"translateY("+topY+"px)",
						"transform":"translateY("+topY+"px)",
						"-moz-transform":"translateY("+topY+"px)"
					})
					 event.preventDefault(); 
				})
			}
			
		})
	
}
function tabcard(menu,cont){
	menu.eq(0).addClass('cur');
	cont.hide().eq(0).show();
	menu.click(function(event){
		var index = $(this).index();
		$(this).addClass('cur').siblings().removeClass('cur');
		cont.hide().eq(index).show();
		event.stopPropagation(); 
	});
}
/*------------2017.8.10---------*/
$(function(){
	if($(".wishtap").length>0)
	{
		var 
		min=$(window).width()*94/100,
		
		win=min/2,
		oIndex=0,
		len=$(".wishtap li").length,
		max=win*len,
		startX,
		_this=document.querySelector(".wishtap");
		$(".wishtap li").css({"width":min/2});
		_this.addEventListener("touchstart", function (e){
				startX = e.touches[0].pageX;
			});
			
		_this.addEventListener("touchend", function(e){
				if(moveX-startX<-30)
				{
					oIndex=oIndex+2;
					if(len-2<oIndex)
					{
						oIndex=len-2;
					
					}
					console.log(oIndex,len)
					wishleft(oIndex,"wishtap",win)
				}
				if(moveX-startX>30)
				{
					oIndex=oIndex-2;
					if(oIndex<0){
						oIndex=0;	
					}
					wishleft(oIndex,"wishtap",win)
				}
				
		});	
		_this.addEventListener('touchmove', function (event) {
					moveX=event.touches[0].pageX;
					
		})
	
	}
})
function wishleft(onum,obj,owin){
	

		$("."+obj).css({
			"-webkit-transform":"translateX(-"+onum*owin+"px)",
			"transform":"translateX(-"+onum*owin+"px)",
			"-moz-transform":"translateX(-"+onum*owin+"px)",
		})

}
/*------2017.8.11----*/
$(function(){
	if($(".l-bannerclose").length>0)
	{
		$(".l-bannerclose").click(function(e){
			$(this).parent().hide();
			e.stopPropagation()
		})
	}
	if($(".waybntap").length>0)
	{
		$(".waybntap").each(function(indext){
			$(this).find("a").click(function(){
				var index=$(this).index();
				$(this).addClass("cur").siblings().removeClass('cur');
				
				if(index==1)
				{
					$(".l-waywrap").eq(indext).show();
				}else{
					$(".l-waywrap").eq(indext).hide();
				}
			})
		})
	}
	
})
/*----2017.7.18----*/
$(function(){
	if($(".l-paylist").length>0)
	{
		$(".l-paylist li").click(function(){
			$(this).addClass("cur").siblings().removeClass("cur")
			$(this).find("input").attr({"checked":true})
		})
	}
})
/*----2017.9.
 * 2----*/
$(function(){
	if($(".headerfixd").length>0)
	{
		var top=$(".headerbox").height();
		$(window).scroll(function(){
			var stop=$(window).scrollTop();
			if(top<stop){
				$(".topheader").addClass("flext")
			}else{
				$(".topheader").removeClass("flext")
			}
		})
	}
})
/*----2017.9.
 * 5----*/
$(function(){
	if($(".navmall").length>0)
	{
		var 
		min=$(window).width(),

		oIndex=0,
		len=$(".navmall>li").length,
		max=min*len,
		startX,
		_this=document.querySelector(".navmall");
		$(".navmall").css({"width":max});
		$(".navmall>li").css({"width":min});
		_this.addEventListener("touchstart", function (e){
				startX = e.touches[0].pageX;
			});
			
		_this.addEventListener("touchend", function(e){
				if(moveX-startX<-30)
				{
					oIndex=oIndex+1;
					if(len-1<oIndex)
					{
						oIndex=len-1;
					
					}
					console.log(oIndex,len)
					mallleft(oIndex,"navmall",min)
				}
				if(moveX-startX>30)
				{
					oIndex=oIndex-1;
					if(oIndex<0){
						oIndex=0;	
					}
					mallleft(oIndex,"navmall",min)
				}
				
		});	
		_this.addEventListener('touchmove', function (event) {
					moveX=event.touches[0].pageX;
					
		})
	
	}
})
function mallleft(onum,obj,owin){
	

		$("."+obj).css({
			"-webkit-transform":"translateX(-"+onum*owin+"px)",
			"transform":"translateX(-"+onum*owin+"px)",
			"-moz-transform":"translateX(-"+onum*owin+"px)",
		})

}
/*-----------上下滚动  up-down------------*/
function tranX(){
	
		$(".tranX").each(function(index){
			var _that=$(this),
				oChil=_that.find("li").eq(0).width(),
				oLen=_that.find("li").length,
				oChilren=oLen*oChil,
				oPar=_that.parent().width(),
				_this=document.querySelectorAll(".tranX"),
	   			startX,topX=0,endX,moveX,speed;

	   			_that.css({
						"-webkit-transform":"translateX("+0+"px)",
						"transform":"translateX("+0+"px)",
						"-moz-transform":"translateX("+0+"px)"
					})
			document.addEventListener("touchstart", function (e){
				startX = e.touches[0].pageX;
			});
			
			document.addEventListener("touchend", function(e){
				endX=topX;
			});	
			if(oChilren>oPar){
				_this[index].addEventListener('touchmove', function (event) {
					moveX=event.touches[0].pageX;
					speed=moveX-startX;
					if(endX!=null)
					{
						topX=speed+endX;
					}else{
						topX=speed;
					}
					if(topX>0){
						topX=0;
					}
					if(topX<-oChilren+oPar)
					{
						topX=-oChilren+oPar;
					}
					_that.css({
						"-webkit-transform":"translateX("+topX+"px)",
						"transform":"translateX("+topX+"px)",
						"-moz-transform":"translateX("+topX+"px)"
					})
					 event.preventDefault(); 
				})
			}
			
		})
	
}