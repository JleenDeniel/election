import pymysql


class ConnectionToDB(object):
    connection = pymysql.connect('localhost', 'root', '1T0bms93g5gK', 'election')

    def get_user(self, username, password):
        login = ""
        with self.connection:
            cur = self.connection.cursor()
            cur.execute("Select login from users where email = %s and password = %s;", (username, password))
            print(cur.fetchone())

            return login

    def reg_user(self, username, password, email):
        with connection:
            cursor = connection.cursor()
            sql = "Insert into users(login, password, email) values(%s, %s, %s);"
            query = cursor.execute(sql, (username, password, email))
            connection.commit()

            if query > 0:
                return "registered"
            else:
                return "not registered"
