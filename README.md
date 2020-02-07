
$.get(
  'http://localhost:5000/login',
  function(data) {              
   	console.log(data);
   	let login_value = data.username;
   	if (data.bool){
			$("#enter_link").html(data.username);
			$("#close_btn_logined").css('display', 'block');
		} else {
			show_login_field();
			$('#email_input').val(login_value); //заполняем поле с username, если пользователя нет в базе (то что ввел пользователь)
		}
  }
);
