from flask import Flask, request, render_template, url_for, make_response, jsonify
# from app.db import ConnectionToDB
# import pymysql
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy(app)

app.config.update(dict(
    SECRET_KEY="powerful secret_key",
    WTF_CSRF_SECRET_KEY="a csrf secret key"
))
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1T0bms93g5gK@localhost/election'


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    res = {'action': 'login'}
    if request.method == 'POST':
        username = request.form.get('userName')
        password = request.form.get('userPassword')
        # result = get_user(username, password)
        user = User.query.filter_by(email=username).first()
        res['status'] = user.login
        return jsonify(res)
    else:
        res['status'] = 'get'
        # return render_template('index.html')
        return jsonify(res)


# todo обработка формы регистрации
@app.route('/register', methods=['GET', 'POST'])
def registration():
    if request.method == 'POST':
        login = request.form.get('userName')
        email = request.form.get('userEmail')
        password = generate_password_hash(request.form.get('userPassword'))
        print(request.form)
        res = reg_user(login, password, email)
        return make_response(jsonify(result=res))
    else:
        return render_template('index.html')


# connection = pymysql.connect('localhost', 'root', '1T0bms93g5gK', 'election')

class User(db.Model):
    __tablename__ = 'users'
    id_user = db.Column(db.Integer(), primary_key=True)
    login = db.Column(db.String(30))
    password = db.Column(db.String(255))
    email = db.Column(db.String(30))

#
# def get_user(username, password):
#     login = ""
#     with connection:
#         cur = connection.cursor()
#         cur.execute("Select login from users where email = %s and password = %s;", (username, password))
#         print(cur.fetchone())
#
#         return login
#
#
# def reg_user(username, password, email):
#     with connection:
#         cursor = connection.cursor()
#         sql = "Insert into users(login, password, email) values(%s, %s, %s);"
#         query = cursor.execute(sql, (username, password, email))
#         connection.commit()
#
#         if query > 0:
#             return "registered"
#         else:
#             return "not registered"


if __name__ == "__main__":
    app.run(Debug=True)
