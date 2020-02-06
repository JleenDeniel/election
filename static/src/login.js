//поле входа
let field_login = document.getElementById('field_login');

//поле регистрации
let registration_field = document.getElementById('registration_field');

//показать окно входа при нажатии в меню на сылку "Войти"
document.getElementById('enter_link').addEventListener('click', show_login_field);
function show_login_field(){
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
//делвет поле поиска активным вместе с кнопкой
function do_able() {
	for (let i = 0; i < nav_link_arr.length; i++){
		nav_link_arr[i].classList.remove('disabled');
	} 
	document.getElementById('search_input').disabled = false;
	document.getElementById('btn_search').disabled = false;
}

//проверка на валидность username и password
$("#submit_btn").hover(function(){
	// если строка состоит более чем из пяти символов и 
	//не содержит пробелов и (состоит из английских букв и может содержать цифры)
	if (($("#email_input").val().length > 5) && 
			($("#email_input").val().split(' ').length - 1 == 0) &&
			((/^[a-zA-Z]+$/.test($("#email_input").val())) || ($("#email_input").val().match(/^\d/))) && 
			(!$("#email_input").val().match(/^\d+$/))) {

		document.getElementById("submit_btn").disabled = false;
		$("#email_input").css('border', '0.9px solid #007BFF');


	} else {
		//блокируем submit кнопку пока данные не пройдут легит чек
		document.getElementById("submit_btn").disabled = true;
		$("#email_input").css('border', '0.9px solid firebrick');
	}
	
});

//отправка get запроса за данными с сервера
//существует ли такой пользователь в базе или нет
//если да, то меняем вид страницы
//если данные не сошлись, то проверяем на валидность или предлагаем зарегистрироваться
var xhr = new XMLHttpRequest();
xhr.open(
	'GET', 
	'http://localhost:5000/login', 
	true
);
xhr.send();

xhr.onreadystatechange = function(){
	if (xhr.readyState !== 4) return;
	if (xhr.status === 200){
		console.log('result: ', JSON.parse(xhr.responseText));

		if (JSON.parse(xhr.responseText).bool){
			$("#enter_link").html(JSON.parse(xhr.responseText).username);
		} 

	} else {
		console.log('err', xhr.responseText);
	}
}

