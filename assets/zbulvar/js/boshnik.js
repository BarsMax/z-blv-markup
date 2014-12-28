(function ($) { 

var past = $('.past'); // прошедшая акция
/**
 * При клике по прошедшей акции ничего не должно происходить
 */

// past.on('click', function(){
// 	return false;
// })




// футер 

var foohei = $('.footer').offset().top;
var widhei = $(window).height();

if ( widhei > foohei ) {
    $('.footer').addClass('fixed');
}


})(jQuery);



