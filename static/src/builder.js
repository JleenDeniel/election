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


document.getElementById('file').addEventListener('change', FileSelect, false);
// $('.description_photo').change(function(event){
//   FileSelect;
// });

// document.getElementsByClassName('description_photo')[0].addEventListener('click', FileSelect);

function FileSelect(evt){
  var file = evt.target.files; 
  var f = file[0];
  if (!f.type.match('image.*')) {
      alert("Image only please....");
  }
  var reader = new FileReader();
  reader.onload = (function(theFile) {
    return function(e) {
      $('.description_photo').css('background-image', 'url(' +e.target.result+ ')');
    };
  })(f);
  reader.readAsDataURL(f);
}
