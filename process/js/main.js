// HighlightJS
hljs.initHighlightingOnLoad();

// IsotopeJS
var $grid = $('.projects').isotope({
  itemSelector: 'a',
  layoutMode: 'fitRows'
});
$grid.imagesLoaded().progress( function() {
  $grid.isotope('layout');
});
$('.filter-button-group').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});
$('.button-group > button').on('click', function() {
  $('.button-group > button').removeClass('active');
  $(this).addClass('active');
});

// Parallax Scrolling
$('.banner').addClass('parallax-window');
$('.parallax-window').parallax({imageSrc: 'img/Background.jpg'});

// Terminal Blinking
var cursor = $('.intro > p.cursor');
setInterval(function() {
    cursor.toggleClass("cursor");
}, 750);

// Fix Scroll breadcrumbs
if ($('article').attr("data-side") === "true") {
  var breadcrumb = $(".breadcrumbs");
  $(window).on("scroll", function(e) {
    if ($(window).scrollTop() > 284) {
      breadcrumb.addClass("fix-breadcrumb");
      $("article").addClass("col-offset-md-4").removeClass("col-offset-lg-1");
    } else {
      breadcrumb.removeClass("fix-breadcrumb");
      $("article").removeClass("col-offset-md-4").addClass("col-offset-lg-1");
    }
  });
}
