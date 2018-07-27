$(function(){
	if($('.datetime').length>0)
	{
		var htmlinner='<div class="delog datedelog">';			
			htmlinner+='<div class="l-timewrap dataTimeCont">';	
			htmlinner+='<div class="l-timetop">';	
			htmlinner+='<span class="tc disblock l-timetlt">';	
			htmlinner+='<i class="iconfont leftprev f24 btn-anchor">&#xe675;</i>';	
			htmlinner+='<em class="f24 current-day">2017年十二月</em>';	
			htmlinner+='<i class="iconfont rightprev f24 btn-anchor">&#xe617;</i>';	
			htmlinner+='</span>';	
			htmlinner+='<span class="flex l-timecont">';	
			htmlinner+='<i>日</i>';	
			htmlinner+='<i>一</i>';	
			htmlinner+='<i>二</i>';	
			htmlinner+='<i>三</i>';	
			htmlinner+='<i>四</i>';	
			htmlinner+='<i>五</i>';	
			htmlinner+='<i>六</i>';	
			htmlinner+='</span>';	
			htmlinner+='</div>';	
			htmlinner+='<table width="100%" class="l-datatable f28 calendarid"></table></div></div>	';	
		$('body').append(htmlinner);
	var oDate=new Date(),startX,moveX,up,startY,moveY,down,oflase=false,oleft,otop,min,max,objstr=$('.datetime'),endY
		arr=['20171218','20171220','20171227','20171230','20171231','20180105','20180108']
		oYear=oDate.getFullYear(),
		oMonth=oDate.getMonth(),
		oDay=oDate.getDate(),
		oWeek=oDate.getDay(),
		daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31,30, 31, 30, 31],
		moutharr=['一','二','三','四','五','六','七','八','九','十','十一','十二'],//月显示
		otitle=$('.current-day'),
		_self=document.querySelector(".dataTimeCont"),
		oMonthclick=$('.btn-anchor');
		otitle.html(oYear+'年'+moutharr[oMonth]+'月');//自动计算系统年月
		Calendar();
		_self.addEventListener("touchstart", function (e){
				startY = e.touches[0].pageY;
				startX = e.touches[0].pageX;
		});
		_self.addEventListener("touchend", function(e){
		
			up=moveX-startX;
			down=moveY-startY;
			oleft=up<0?-up:up;
			otop=down<0?-down:down;
			
			if(max!=otop && min!=oleft && moveY!=null && moveY!=undefined)
			{
				oflase=true;
			}
			if(endY==moveY)
			{
				oflase=false;
			}
			if(oflase){
				if(oleft<otop )
				{
					if(down<0)
					{
						oYear++;
					}else{
						oYear--;
					}
					min=oleft;
				}else{
					if(up>0)
					{
						oMonth--;
						if(oMonth<0){
							oMonth=11;
							oYear--;
						}
					}else{
						oMonth++;
						if(oMonth>11){
							oMonth=0;
							oYear++;
						}
					}
					max=otop;
				}
				endY=moveY;
				Calendar();
			}	
			
		});	
		_self.addEventListener('touchmove', function (event) {
				moveY=event.touches[0].pageY;
				moveX=event.touches[0].pageX;	
		})
		oMonthclick.each(function(){
			$(this).click(function(e){
				oflase=false;
				
				if($(this).hasClass('leftprev'))
				{
					oMonth--;
					if(oMonth<0){
						oMonth=11;
						oYear--;
					}
				}else{
					oMonth++;
					if(oMonth>11){
						oMonth=0;
						oYear++;
					}
				}
				Calendar();
				e.stopPropagation();
			})
		})
		function getDays(year,month)
		{
			if (1== month) 
			{
				//运年计算
				return ((0 == year % 4) && (0 != (year % 100))) ||(0 == year % 400) ? 29 : 28;
			}
  			else 
  			{
  				return daysInMonth[month];
  			}
		}
		function getToday() {
		  this.now = new Date();
		  this.year = this.now.getFullYear();
		  this.month = this.now.getMonth();
		  this.day = this.now.getDate();
		 }
		function Calendar()
		{
			//加载新增	
			var month=oMonth==12?0:oMonth,row,nextday,caltable = $('.calendarid'),sumtab=0,montemp,daytemp,
				newcal = new Date(oYear,month),
			 	than = new getToday(),
			 	day = -1,
				startday = newcal.getDay(),//星期日0
				enday=getDays(oYear,month),
				daily = 0;

				if(startday==-1)
				{
					startday=6;
				}
				
				nextday=getDays(oYear,month);
				if ((than.year == newcal.getFullYear()) &&(than.month == newcal.getMonth()))
				{
				   day = than.day;
				}
				row=parseInt((startday+enday)/7);
				if((startday+enday)%7>0)
				{
					row++;
				}
				//清空链表
				cellrule='';
				//清空日历
				caltable.html('');
				//重新渲染日历
			  	for (var i = 0; i < row;i++)
			   	{	
		    		cellrule+='<tr"> '
		    			for(var j=0;j<7;j++)
		    			{
		    				
		    				if ((j == startday) && (0 == daily)){ daily = 1;}
			    				if ((daily > 0) && (daily <= enday))
							    {
							    		var tin=parseInt(month)+1;
							    		var montab=tin<10?	'0'+tin:tin;
							    		var timedy=daily<10?'0'+daily:daily;
							    		var timestr=oYear+''+montab+''+timedy,tabclass='';
							    		for(var k=0;k<arr.length;k++)
							    		{
							    			if(timestr==arr[k]){
							    				tabclass="opencurrent"
							    			}
								    		
							    		}
							    		cellrule+='<td data-title='+oYear+'-'+montab+'-'+timedy+' class='+tabclass+' > ';
							     		cellrule+='<em>'+daily+'</em> ';
							     	
							     	daily++;
							     	
							    }else{
							    	cellrule+='<td> '	
							    	
							    }

							
							cellrule+='</td> '
		    			}
		    		cellrule+='</tr> '
			   	}
			   	
			caltable.html(cellrule);
			//移除加载
		
			otitle.html(oYear+'年'+moutharr[month]+'月'); 
			//点击弹窗
			
			$('.opencurrent').unbind();

			$('.opencurrent').bind('click',function(e){				
				var that=$(this).attr('data-title');
				objstr.val(that)
				$('.datedelog').fadeOut()
				//调用选择
				
				e.stopPropagation();
			})
		}
	
		//去掉线
		function Trim(str)
        { 
             return str.replace(/-/g, ""); 
     	}
	}
})

