/* eslint-disable */
$(function() {
	$('[data-toggle="tooltip"]').tooltip();
});

const SRSettings = {
    reset: true,
    useDelay: 'onload',
	// * Disabeled for horizontal scroll on mobile clients
	mobile: false,
};

const SrClassOptions = {
    duration: 4600,
    scale: 0.85,
    easing: 'ease-in-out',
}

const RightOptions = {
	duration: 3400,
    origin: 'right',
    easing: 'ease-in-out',
    distance: '10%'
};

const LeftOptions = {
	duration: 3400,
    origin: 'left',
    easing: 'ease-in-out',
    distance: '10%'
};

const TopOptions = {
	duration: 3400,
    origin: 'top',
    easing: 'ease-in-out',
    distance: '10%'
};

const BottomOptions = {
	duration: 3400,
    origin: 'bottom',
    easing: 'ease-in-out',
    distance: '10%'
};

const LogoOptions = {
    duration: 2700,
    origin: 'top',
    distance: '10%'
};

document.addEventListener('DOMContentLoaded', function(event) {
    ScrollReveal(SRSettings);
    ScrollReveal().reveal('.reveal-logo', LogoOptions);
	ScrollReveal().reveal('.right-reveal', RightOptions);
	ScrollReveal().reveal('.left-reveal', LeftOptions);
	ScrollReveal().reveal('.top-reveal', TopOptions);
	ScrollReveal().reveal('.bot-reveal', BottomOptions);
	
    $(".badges").hover(function(){
        $(this).toggleClass('animated bounce');
	});
	
	$('a[data-toggle="list"]').on('shown.bs.tab', function (e) {
		$(e.relatedTarget).children().removeClass('animated bounceInRight');
		$(e.target).children().addClass('animated bounceInRight');
	})

	tippy('.tip', {
		delay: 150,
		arrow: true,
		arrowType: 'round',
		size: 'large',
		duration: 400,
		animation: 'scale',
		touch: false
	  })
});
