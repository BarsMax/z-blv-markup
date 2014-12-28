(function ($) {

	var today,klichko,monthsFull,weekdaysFull,weekdaysShort;

	monthsFull    = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
	weekdaysFull  = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ,'Воскресенье'];
	weekdaysShort = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ,'Вс'];
	
	function formatDate(dateArg,format,splat){
       var dateArg,format,splat,y,m,d;
       format = format || ',';
       splat  = splat  || 'd:m:y';
       arrArg = dateArg.split(format);
       arrSplat = splat.split(':');

       y = arrSplat[0]=='y' ? 0 : arrSplat[1]=='y' ? 1 : 2;
       m = arrSplat[0]=='m' ? 0 : arrSplat[1]=='m' ? 1 : 2;
       d = arrSplat[0]=='d' ? 0 : arrSplat[1]=='d' ? 1 : 2;
       
       return new Date(arrArg[y],arrArg[m]-1,arrArg[d])

	}
 
	function getToday(d,m,y){
		    var y,m,d,def,temp;
			def = new Date(); 
		    y = y   || def.getFullYear();
			m = m-1 || def.getMonth();
			d = d   || def.getDate();

			temp = ( d.length > 4 || d > 3000 ) ? new Date(d) : new Date(y,m,d);
         
			return {
				'now'      : temp,
				'ms'       : +temp,
				'day'      : temp.getDate(),
				'week'     : temp.getDay() == 0 ? 7 : temp.getDay(),
				'mon'      : temp.getMonth()+1,
				'year'     : temp.getFullYear(),
				'weekShort': function(){ return weekdaysShort[this.week-1] },
				'weekFull' : function(){ return weekdaysFull[this.week-1] },
				'monFull'  : function(){ return monthsFull[this.mon-1] },
				'addDay'   : function(day){ return new Date(temp.setDate(temp.getDate() + day));  },
				'addMon'   : function(mon){ return new Date(temp.setMonth(temp.getMonth()+ 1 + mon));  },
				'remDay'   : function(day){ return new Date(temp.setDate(temp.getDate() - day));  },
				'remMon'   : function(mon){ return new Date(temp.setMonth(temp.getMonth()+ 1 - mon));  }
			};

	};

	var klichko = (function() {
		var def,addDay,d,m,y,thisNow,thisDay,temp,nowY,nowM,nowD;
		
		return function(addDay,d,m,y){

		addDay  = addDay || 1;
		vitalya = 24*60*60*1000;
		zemlya = vitalya*addDay;

		def = new Date(); 
	    y = y   || def.getFullYear();
		m = m-1 || def.getMonth();
		d = d   || def.getDate();

		thisNow = ( d.length > 4 || d > 3000 ) ? new Date(+d+zemlya) : new Date(y,m,d+addDay);
		
		thisNow = thisNow || temp;

		nowY = thisNow.getFullYear();
		nowM = thisNow.getMonth();
		nowD = thisNow.getDate();

		thisDay = new Date(nowY,nowM,nowD);

        return getToday(thisDay);
		}

	})();


	       today    = getToday();

	window.today    = today; 
	window.getToday = getToday;

	window.klichko  = klichko;

	window.formatDate  = formatDate; 
 
})(jQuery);

var action_box = $('.action_box'),
    current_immediate = 0,
    current_prev = 5,
    current_next = 7;
if (typeof(home_page_flag) != "undefined" && home_page_flag) {
current_immediate = 0;
} else {
current_immediate = 2;
}


$.each(action_box, function(){

	var box_data = $(this).find('.box_data'),
        box_data_text = box_data.text(),
        box_day = $(this).find('.box_day');

        box_data_text = box_data_text.slice(0,10);
		var newDateIn = formatDate(box_data_text,'-','y:m:d');
		var thisDay = getToday(newDateIn);
		box_data.text(thisDay.day + ' ' + thisDay.monFull() )
		box_day.text( thisDay.weekFull() );


		current_immediate++;
		
		if(3 <= current_immediate && current_immediate <= 3) {
		$(this).addClass('immediate');
		$(this).next().addClass('immediate');
		}
		if(today.now > thisDay.now ) {
			//$(this).addClass('past');
		} else {
			
		}

})


    // action_box.addClass('hide');

$.each(action_box, function(){ 

var self = $(this);

var box_data = $(this).find('.box_data'),
        box_data_text = box_data.text(),
        box_day = $(this).find('.box_day');

        box_data_text = box_data_text.slice(0,10);
		var newDateIn = formatDate(box_data_text,'-','y:m:d');
		var thisDay = getToday(newDateIn);

	if(  +thisDay.now  >  +today.now) {

		for(var i = 0; current_prev > i; i++ ){
			self.prev().addClass('boshnik');
		} 

		return false;
			
	} 

	

})

// Сортируем прошедшие мероприятия

   if(0 && $('body').hasClass('home') ) {


    var past_box = $('.action_box.past');
    var len_past = past_box.length;
    var differ = len_past - current_prev;

    for(var i = 0; differ > i; i++) {
    	past_box[i].remove();
    }

    // Сортируем активные мероприятия
 

    var active_box =  $(".action_box:not(.past)"),
        len_active_box = active_box.length;

    for(var j = current_next; len_active_box > j ; j++) {
    	active_box[j].remove();
    }

}