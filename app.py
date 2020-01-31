from flask import Flask, render_template, flash, redirect
from forms import LoginForm

app = Flask(__name__)

app.config.update(dict(
    SECRET_KEY="powerful secretkey",
    WTF_CSRF_SECRET_KEY="a csrf secret key"
))


@app.route('/login', methods=['GET', 'POST'])
def login():
    form1 = LoginForm();
    return render_template('tmp.html', form=form1)


@app.route('/')
def start():
    return render_template('base.html')


@app.route('/index')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
