let field_login = document.getElementById('field_login');

document.getElementById('enter_link').addEventListener('click', show_login_field);
function show_login_field(){
	field_login.style.display = 'block'; 
}

field_login.addEventListener('click', close_login);
function close_login(e){
	if ($(e.target).is("#field_login")){
		field_login.style.display = 'none';
	}
}

document.getElementById('close_btn').addEventListener('click', close_login_btn);
function close_login_btn(){
	field_login.style.display = 'none';
}
