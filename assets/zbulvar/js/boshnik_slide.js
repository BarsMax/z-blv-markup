/**
* @author Aleksandr Boshnik <-- https://www.fl.ru/users/Boshnik/ -->
* @name   carouselBoshnik 
* version 0.1 02.12.2014 
*/
(function ($) { 


//* методы для плагина carouselBoshnik *
var methods = {
    init : function( options ) { 
	      var options = $.extend({ 
		      'box'  : 'box',                // блоки каресули
          'link' : 'box_link',           // ссылка назад и вперед
          'widthBox': '0',               // ширина блока, переделать в функцию.!!!
          'count': '1',                  // кол-во сдвигов
          'visible': '1',                // кол-во видимых блоков
          'defaultBox': '0',             // с какого блока начинать показывать блоки
          'classAnimate': 'slideAnimate' // класс анимации
          	      }, options);

	  var self           = this, // контейнер карусели
        class_box      = '.' + options.box, // класс бокса
        fisrt_box      = $(class_box)[0], // первый блок
        curent_box     = options.defaultBox * options.widthBox, // сдвигаем блоки
        carousel_link  = '.' + options.link  // класс ссылок

	  var make = function(){

 /**
  * Добавдяем блокам класс анимации.
  */
 $(class_box).addClass(options.classAnimate)

 /**
  * Выставляем мероприятие по умолчанию:
  */
 $(fisrt_box).css({ 'margin-left': '-' + curent_box + 'px' });

 /**
  * Кликаем по ссылкам карусели
  */
 $(carousel_link).on('click', sliderAnimation); 

    function sliderAnimation(e){
          e.preventDefault();
          e.stopPropagation();
          var marginLeft = $(this).hasClass('prev') ? counter.getPrev() 
                                                    : counter.getNext();
      
          $(fisrt_box).css({ 'margin-left': marginLeft + 'px' })
     };

     var counter = methods.makeCounter(options, self, class_box, curent_box);

    }
    return this.each(make); // возвращает this для цепочки 
    },
    makeCounter : function( options, self, class_box, curent_box ) {

    var count_box      = $(class_box).length,                // кол-во блоков
        width_count    = options.widthBox * options.count,   // ширина сдвига
        carousel_width = options.widthBox * count_box,       // ширина всей карусели 
        visible_width  = options.widthBox * options.visible, // видимая ширина
        currentCount   = -curent_box;                        // сдвиг

    self.css({'width': carousel_width}) // устанавливаем ширину карусели

    return {
      getPrev: function() {   
        if(-currentCount <= width_count ){
          return currentCount = 0;
        } 
        return currentCount += width_count;
      },
      getNext: function() { 
              var difference = carousel_width - (-currentCount  + visible_width )
             if (difference == 0 ) {
              return currentCount;
             } 
               var result = (difference >= width_count) ? width_count : difference;
             return currentCount -= result;
      },
      set: function(value) {  
        currentCount = value;
      },
      reset: function() {
        currentCount = 0;
      }
    };
  
    },
    
  }; // methods

$.fn.carouselBoshnik = function(method){
  // логика вызова метода
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Метод с именем ' +  method + ' не существует для jQuery.tooltip' );
    }
}; // fn carouselBoshnik

})(jQuery);

(function ($) { 
/**
 * Карусель для главной
 */

/*var container_box = $('.container_box');

container_box.carouselBoshnik({
  'box': 'action_box',
  'link': 'carousel_link',
  'widthBox': '150',
  'count': '2',
  'visible' :'6',
  'defaultBox':'3'
})*/


return false;
alert();
/**
 * Карусель для меню
 */

var menu_list_body = $('.menu_list_body');

var menu_item = $('.menu_item');
var arr_menu = []; //  массив меню

/**
 * Добавляем в массив меню
 */
     $.each(menu_item, function(i,ind){
        var thisText = $(this).find('.menu_name').text();
        arr_menu.push(thisText);
      })
/**
 * Узнаем по какому меню кликнули
 * вызываем функцию sliderMenu
 * передаваемый параметр = позиция меню в массиве.
 */

     menu_item.on('click', function(){
      var thisText = $(this).find('.menu_name').text();

        $.each(arr_menu, function(i){
          if( arr_menu[i] == thisText ){
            var defCount = i;
            sliderMenu(defCount); // запускаем функцию карусели
            nameMenu(defCount); // запускаем функцию замена имени
          }
        })

     });

/**
 * Функция запуска меню со списком
 */
function sliderMenu(defCount) {

    menu_list_body.carouselBoshnik({
    'box': 'menu_list_animate',
    'link': 'menu_list_link',
    'widthBox': '670',
    'count': '1',
    'visible' :'1',
    'defaultBox': defCount
  })

};

/**
 * Функция назначения текущего имени
 */
var menu_list_animate = $('.menu_list_animate'),
    home_h1 = $('.home_h1'),
    menu_list_link_prev = $('.menu_list_link.prev').children('.name_prev');
    menu_list_link_next = $('.menu_list_link.next').children('.name_next');

function nameMenu(defCount) {
    var thisListMenu = menu_list_animate[defCount];
    var thisTextMenu = $(thisListMenu).find('.hide_name_menu').text();
    home_h1.text(thisTextMenu);

    // имя предыдущей меню
    var thisListMenu_prev = menu_list_animate[defCount-1];
    var thisTextMenu_prev = $(thisListMenu_prev).find('.hide_name_menu').text();
    menu_list_link_prev.text(thisTextMenu_prev)

    // имя следующего меню
    var thisListMenu_next = menu_list_animate[defCount+1];
    var thisTextMenu_next = $(thisListMenu_next).find('.hide_name_menu').text();
    menu_list_link_next.text(thisTextMenu_next)
}



/**
   * [makeCounter description]
   * @return Object
   */
  function makeCounter() {
      var currentCount = 0;
    return {
      getPrev: function() { 
        if(currentCount == 0){
          return currentCount = 0;
        } 
        return --currentCount;
      },
      getNext: function() { 
        if(currentCount == menu_list_animate.length-1){
          return currentCount = menu_list_animate.length-1;
        } 
        return ++currentCount;
      }
    };
  }
    var counter = makeCounter();


    var menu_list_link = $('.menu_list_link');

    menu_list_link.on('click', function(){
        var thisNum = $(this).hasClass('prev') ? counter.getPrev()
                                               : counter.getNext();
        nameMenu(thisNum); // запускаем функцию замена имени                                       
    })






})(jQuery);

