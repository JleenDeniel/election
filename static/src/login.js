//поле входа
let field_login = document.getElementById('field_login');

//поле регистрации
let registration_field = document.getElementById('registration_field');

//показать окно входа при нажатии в меню на сылку "Войти"
document.getElementById('enter_link').addEventListener('click', show_login_field);
function show_login_field(){
	$('#email_input').val(''); //чистит поле с username
	$('#password_input').val(''); //чистим поле с паролем
	do_disable();
	field_login.style.display = 'block';
}

//показать окно регистрации при нажатии на ссылку "регистрация"
//в поле входа 
let flag_reg_open = false; //отслеживание нажата ли ссылку "регистрация" 
document.getElementById('registration').addEventListener('click', show_reg_field);
function show_reg_field(){
	flag_reg_open = true;
	do_disable();
	registration_field.style.display = 'block';
	close_login_btn();
}

//закрытие окна входа при нажатии вне области окна
field_login.addEventListener('click', close_login);
function close_login(e){
	if ($(e.target).is("#field_login")){
		field_login.style.display = 'none';
		do_able();
	}
}

//закрытие окна регистрации при клике вне области окна
registration_field.addEventListener('click', close_reg);
function close_reg(e){
	if ($(e.target).is("#registration_field")){
		registration_field.style.display = 'none';
		flag_reg_open = false;
		do_able();
	}
}

//закрытие окна входа при нажатии на кнопку закрытия
document.getElementById('close_btn').addEventListener('click', close_login_btn);
function close_login_btn(){
	if (!flag_reg_open) do_able();
	field_login.style.display = 'none';
}

//закрытие окна регистрации при нажатии на кнопку закрытия
document.getElementById('close_btn_reg').addEventListener('click', close_reg_btn);
function close_reg_btn(){
	flag_reg_open = false;
	do_able();
	registration_field.style.display = 'none';
}

//массив ссылок меню
let nav_link_arr = document.getElementsByClassName('nav-link');

//делает ссылки неактиными (nav-link)
//делвет поле поиска неактивным вместе с кнопкой
function do_disable(){
	for (let i = 0; i < nav_link_arr.length; i++){
		nav_link_arr[i].classList.add('disabled');
	}
	document.getElementById('search_input').disabled = true;
	document.getElementById('btn_search').disabled = true;
}

//делает ссылки активными (nav-link)
//делает поле поиска активным вместе с кнопкой
function do_able() {
	for (let i = 0; i < nav_link_arr.length; i++){
		nav_link_arr[i].classList.remove('disabled');
	} 
	document.getElementById('search_input').disabled = false;
	document.getElementById('btn_search').disabled = false;
}

//отправка get запроса за данными login с сервера
//существует ли такой пользователь в базе или нет
$.get(
  '/login',
  function(data) {             
   	console.log(data);
   	let login_value = data.username;
   	if (data.bool){
			$("#enter_link").html(data.username);
			$("#close_btn_logined").css('display', 'block');
		 } else {
			$('#email_input').val(login_value); //заполняем поле с username, если пользователя нет в базе (то что ввел пользователь)
		}
		//прячем кнопку выхода из профиля, чистим данные
		$('#close_btn_logined').click(function(){
			$("#enter_link").html('Войти');
			$('#close_btn_logined').css('display', 'none');;
			data.bool = false;
			data.username = '';
			console.log(data);
		});
  }
);

//отправка get запроса за данными Register c сервера
//существует ли такой пользователь в базе или нет

$('#register_data').submit(function(){
	$.get(
  	'http://localhost:5000/register',
  	function(data) {              
   		console.log(data);
   		alert('jj');
  	}
	);
});
