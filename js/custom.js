"use strict";

window.addEventListener('load', function() {
//------------------------------------------------------------------------
//						TOOGLE BUTTON SCRIPT
//------------------------------------------------------------------------

$(".toogle-btn").on('click', function (e) {
    e.preventDefault();
    var href = $(this).attr('href');
    $(href).toggleClass("show");
});

$(".toogle-btn.close").on('click', function (e) {
    e.preventDefault();
    $(this).parent().toggleClass("show");
});

//------------------------------------------------------------------------
//						MENU TAP ON MOBILE DEVICES
//------------------------------------------------------------------------

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $("nav.navbar").addClass("touchmenu");
    $(".sub-menu-link").on('click', function (e) {
        e.preventDefault();
        $(this).parent().toggleClass("tap");
    });
}


//------------------------------------------------------------------------
//						SHOW NAVIGATION ON SCROLL DOWN
//------------------------------------------------------------------------

var $window = $(window);
$window.on('scroll', function () {
    var $nav = $('nav.show-on-scroll');
    var height = $nav.outerHeight();
    var scrollTop = $window.scrollTop();
    if (scrollTop > height*2) {
        $nav.addClass('show');
    } else {
        $nav.removeClass('show');
    }

});


//------------------------------------------------------------------------
//						HIDE NAVIGATION ON SCROLL DOWN
//------------------------------------------------------------------------

var prev = 0;
var $window = $(window);
$window.on('scroll', function () {
    var nav = $('nav.hide-on-scroll');
    var scrollTop = $window.scrollTop();
    nav.toggleClass('hide', scrollTop > prev);
    prev = scrollTop;
});



//------------------------------------------------------------------------
//						STICKY NAVIGATION
//------------------------------------------------------------------------

// Custom
window.stickyToggle = function (sticky, stickyWrapper, scrollElement) {
    var stickyHeight = sticky.outerHeight();
    var stickyWrapperHeight = stickyWrapper.outerHeight();
    var stickyTop = stickyWrapper.offset().top - stickyHeight + stickyWrapperHeight;
    if (scrollElement.scrollTop() >= stickyTop) {
        stickyWrapper.height(stickyHeight);
        sticky.addClass("fixed-top");
    } else {
        sticky.removeClass("fixed-top");
        stickyWrapper.height('auto');
    }
};

// Find all data-toggle="sticky-onscroll" elements
$('.sticky-top').each(function () {
    var sticky = $(this);
    var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
    if (!sticky.next().hasClass('sticky-wrapper')) {
        sticky.after(stickyWrapper);
    } else {
        stickyWrapper = sticky.next();
    }

    window.stickyTB = window.stickyToggle.bind(window, sticky, stickyWrapper, $(window));
    // Scroll & resize events
    $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', window.stickyTB);

    // On page load
    window.stickyToggle(sticky, stickyWrapper, $(window));
});


});
var pAgree = '1';
window.addEventListener('load', function() {
	$('a.smooth').smoothScroll({speed: 800});
});
