from flask import Flask, request, render_template, make_response, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, current_user

app = Flask(__name__)
CORS(app)
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)

app.config.update(dict(
    SECRET_KEY="powerful secret_key",
    WTF_CSRF_SECRET_KEY="a csrf secret key"
))
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/election'


@app.route('/')
def home():
    return render_template('index.html')


bool = False
res_login = {'bool': bool, 'username': ''}


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('userName')
        password = request.form.get('userPassword')

        if '@' in username:
            user = User.query.filter_by(email=username).first()
            if check_password_hash(user.password, password):
                bool = True
                res_login['bool'] = bool
                res_login['username'] = user.login
            else:
                bool = False
                res_login['bool'] = bool
        else:
            user = User.query.filter_by(login=username).first()
            if check_password_hash(user.password, password):
                bool = True
                res_login['bool'] = bool
                res_login['username'] = user.login
            else:
                bool = False
                res_login['bool'] = bool
        print(user)
        return render_template('index.html')
    else:
        return jsonify(res_login)


# обработка формы регистрации, если введенный логин или почта уже существуют в бд, то в поле status
# будет написано что именно
res_register = {'bool': False, 'username': '', 'status': ''}


@app.route('/register', methods=['GET', 'POST'])
def registration():
    if request.method == 'POST':
        login_reg = request.form.get('userNameReg')
        email = request.form.get('userEmailReg')
        password = generate_password_hash(request.form.get('userPasswordReg'))
        if User.query.filter_by(login=login_reg).first():
            res_register['bool'] = False
            res_register['status'] = 'username_exists'
        elif User.query.filter_by(email=email).first():
            res_register['bool'] = False
            res_register['status'] = 'email_exists'
        else:
            user = User(login_reg, email, password)
            res_register['bool'] = user.create_user()
            res_register['username'] = login_reg

        return render_template('index.html')
    else:
        return jsonify(res_register)


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id_user = db.Column(db.Integer(), primary_key=True)
    login = db.Column(db.String(30))
    password = db.Column(db.String(255))
    email = db.Column(db.String(30))







if __name__ == "__main__":
    app.run()
