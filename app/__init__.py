from flask import Flask, request, render_template, make_response, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)
db = SQLAlchemy(app)

app.config.update(dict(
    SECRET_KEY="powerful secret_key",
    WTF_CSRF_SECRET_KEY="a csrf secret key"
))
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1T0bms93g5gK@localhost/election'


@app.route('/')
def home():
    return render_template('index.html')


res_login = {'bool': 'false', 'username': ''}


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('userName')
        password = generate_password_hash(request.form.get('userPassword'))
        print(username)
        if '@' in username:
            user = User.query.filter_by(email=username, password=password).first()
        else:
            user = User.query.filter_by(login=username, password=password).first()
        if user:
            res_login['bool'] = 'true'
            res_login['username'] = user.login
        else:
            res_login['bool'] = 'false'
        return render_template('index.html')
    else:
        return jsonify(res_login)


# обработка формы регистрации, если введенный логин или почта уже существуют в бд, то в поле status
# будет написано что именно
res_register = {'bool': 'false', 'username': '', 'status': ''}


@app.route('/register', methods=['GET', 'POST'])
def registration():
    if request.method == 'POST':
        login_reg = request.form.get('userName')
        email = request.form.get('userEmail')
        password = generate_password_hash(request.form.get('userPassword'))
        if User.query.filter_by(login=login_reg).first():
            res_register['bool'] = 'false'
            res_register['status'] = 'login_exists'
        elif User.query.filter_by(email=email).first():
            res_register['bool'] = 'false'
            res_register['status'] = 'email_exists'
        else:
            user = User(login=login_reg, email=email, password=password)
            db.session.add(user)
            db.session.commit()
            res_register['bool'] = 'true'
            res_register['username'] = login_reg

        return render_template('index.html')
    else:
        return jsonify(res_register)


class User(db.Model):
    __tablename__ = 'users'
    id_user = db.Column(db.Integer(), primary_key=True)
    login = db.Column(db.String(30))
    password = db.Column(db.String(255))
    email = db.Column(db.String(30))


if __name__ == "__main__":
    app.run()
