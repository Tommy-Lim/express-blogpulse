$(document).ready(function() {

  $('#new-author-link').on('click',function(e){
    e.preventDefault();
    console.log('clicked new author link');
    $('#new-author-well').toggle();
  });

  $('#close-new-author-form').on('click',function(e){
    $('#new-author-well').toggle();
  });



});
