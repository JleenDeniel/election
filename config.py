from app import app


class Config(object):
    app.config.update(dict(
        SECRET_KEY="powerful secretkey",
        WTF_CSRF_SECRET_KEY="a csrf secret key"
    ))

    app.config['MYSQL_HOST'] = 'localhost'
    app.config['MYSQL_USER'] = 'root'
    app.config['MYSQL_PASSWORD'] = '1T0bms93g5gK'
    app.config['MYSQL_DB'] = 'election'

    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1T0bms93g5gK@localhost/election'