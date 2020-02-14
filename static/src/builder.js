window.onload = function(){
  $('.remove_description').css('display', 'none');
}

$('.add_description').click(function(){
  $('.description_textarea_photo').css('display', 'block');
  $('.remove_description').css('display', 'block');
  $('.add_description').css('display', 'none');
});

$('.remove_description').click(function(){
  $('.description_textarea_photo').css('display', 'none');
  $('.add_description').css('display', 'block');
  $('.remove_description').css('display', 'none');
});
