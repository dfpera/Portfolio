hljs.initHighlightingOnLoad();

var $grid = $('.grid').isotope({
  itemSelector: '.grid-item',
  layoutMode: 'fitRows'
});

$('.filter-button-group').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});
