"""
 Flask REST application

"""

from flask import Flask, request, jsonify, make_response, session, redirect, url_for
from models import Database
from markupsafe import escape
from datetime import datetime
# ==========
#  Settings
# ==========

app = Flask(__name__)
app.config['STATIC_URL_PATH'] = '/static'
app.config['DEBUG'] = True

app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

# ==========
#  Database
# ==========

# Creates an sqlite database in memory
db = Database(filename=':memory:', schema='schema.sql')
db.recreate()


# ===========
#  Web views
# ===========
@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/')
def user_home():
    if 'username' in session:
        user = db.execute_query(f'SELECT * FROM users WHERE id= ?', (session['id'],)).fetchone()
            
        return make_response(jsonify(user))
    return 'You are not logged in'
    # return app.send_static_file('index.html')


# ===========
#  API views
# ===========

@app.route('/api/user/register/', methods=['GET', 'POST'])
def user_register():
    """
    Registers a new user.
    Does not require authorization.

    """
    if request.method == 'POST':

        userId = db.execute_update(f'INSERT INTO users VALUES(null,?,?,?,?);', (
            request.form['name'],
            request.form['email'],
            request.form['username'],
            request.form['password'],
        ))
        user = db.execute_query(f'SELECT * FROM users WHERE id= ?', (userId,)).fetchone()
        print(user)

        if user is None:
            return make_response(jsonify(user), 400)
        else:
            return make_response(jsonify(user), 201)
    
    else:
        return '''
        <form method="post">
            <p><input type=text name=name>
            <p><input type=text name=email>
            <p><input type=text name=username>
            <p><input type=text name=password>
            <p><input type=submit value=Login>
        </form>
    '''


@app.route('/api/user/login', methods=['GET', 'POST'])
def user_login():
    # if request.method == 'POST':
    data = request.get_json()
    user = db.execute_query(f'SELECT * FROM users WHERE username=? AND password=?', (
        data['username'],
        data['password'],
    )).fetchone()

    print('user:', user)

    session['username'] = user['username']
    session['id'] = user['id']

    if user is None:
        return make_response(jsonify(user), 400)
    else:
        return make_response(jsonify(user), 200)
    return ''


@app.route('/api/user/logout', methods=['GET'])
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect(url_for('index'))


@app.route('/api/user/', methods=['GET', 'PUT'])
def user_detail():
    """
    Returns or updates current user.
    Requires authorization.

    """
    if request.method == 'GET':
        # Returns user data
        if 'username' in session and 'id' in session:
            user = db.execute_query(f'SELECT * FROM users WHERE id=?', (
                session['id'],
            )).fetchone()
        else:
            user = user = db.execute_query(f'SELECT * FROM users WHERE username=? AND password=?', (
                request.authorization['username'],
                request.authorization['password'],
            )).fetchone()

        if user is None:
            return make_response(jsonify(user), 403)
        else:
            return make_response(jsonify(user), 200)
    elif 'username' in session and 'id' in session:
        user = db.execute_query(f'SELECT * FROM users WHERE id=?', (
            session['id'],
        )).fetchone()

        data = request.get_json()

        user_updatedId = db.execute_update('UPDATE users SET name=?, email=?, password=? WHERE id=?', (
            data['name'],
            data['email'],
            data['password'],
            user['id'],
        ))

        user = db.execute_query(f'SELECT * FROM users WHERE id= ?', (user['id'],)).fetchone()

        return make_response(jsonify(user))

    return ''


@app.route('/api/projects/', methods=['GET', 'POST'])
def project_list():
    """
    Project list.
    Requires authorization.

    """
    if 'username' in session and 'id' in session:

        if request.method == 'GET':
            # Returns the list of projects of a user
            projects = db.execute_query('SELECT * FROM project  WHERE user_id=?', (session['id'], )).fetchall()
            return make_response(jsonify(projects))

        else:

            now = datetime.now()
            date = now.strftime("%Y-%m-%d")

            data = request.get_json()

            projectId = db.execute_update(f'INSERT INTO project VALUES(null,?,?,?,?);', (
                session['id'],
                data['title'],
                date,
                date,
            ))

            project = db.execute_query(f'SELECT * FROM project WHERE id= ?', (projectId,)).fetchone()

            if project is None:
                return make_response(jsonify(project), 400)
            else:
                return make_response(jsonify(project), 201)
    return redirect(url_for('index'))


@app.route('/api/projects/<int:pk>/', methods=['GET', 'PUT', 'DELETE'])
def project_detail(pk):
    """
    Project detail.
    Requires authorization.

    """
    if 'username' in session and 'id' in session:

        if request.method == 'GET':
            # Returns a project
            project = db.execute_query('SELECT * FROM project WHERE id=?', (pk, )).fetchone()
            return make_response(jsonify(project))

        elif request.method == 'PUT':
            # Updates a project
            data = request.get_json()

            now = datetime.now()
            date = now.strftime("%Y-%m-%d")

            project_id = db.execute_update('UPDATE project SET title=?, last_updated=? WHERE id=?', (
                data['title'],
                date,
                pk,
            ))

            project = db.execute_query(f'SELECT * FROM project WHERE id= ?', (project_id,)).fetchone()

            return make_response(jsonify(project))

        else:
            # Deletes a project
            project_id = db.execute_update('DELETE FROM project WHERE id=?', (
                pk,
            ))

            return make_response('200 Ok')
            
    return redirect(url_for('index'))


@app.route('/api/projects/<int:pk>/tasks/', methods=['GET', 'POST'])
def task_list(pk):
    """
    Task list.
    Requires authorization.

    """
    if 'username' in session and 'id' in session:
        if request.method == 'GET':
            # Returns the list of tasks of a project
            tasks = db.execute_query('SELECT * FROM task WHERE project_id=?', (pk,)).fetchall()
            return make_response(jsonify(tasks))
        else:
            # Adds a task to project
            now = datetime.now()
            date = now.strftime("%Y-%m-%d")

            data = request.get_json()

            taskId = db.execute_update(f'INSERT INTO task VALUES(null,?,?,?,?);', (
                pk,
                data['title'],
                date,
                0,
            ))

            task = db.execute_query(f'SELECT * FROM task WHERE id= ?', (taskId,)).fetchone()

            if task is None:
                return make_response(jsonify(task), 400)
            else:
                return make_response(jsonify(task), 201)

    return redirect(url_for('index'))


@app.route('/api/projects/<int:pk>/tasks/<int:task_pk>/', methods=['GET', 'PUT', 'DELETE'])
def task_detail(pk, task_pk):
    """
    Task detail.
    Requires authorization.

    """
    if 'username' in session and 'id' in session:
        if request.method == 'GET':
            # Returns a task
            task = db.execute_query('SELECT * FROM task WHERE project_id=? and id=?', (pk, task_pk)).fetchone()
            return make_response(jsonify(task))
        elif request.method == 'PUT':
            # Updates a task
            data = request.get_json()

            task_id = db.execute_update('UPDATE task SET title=?, completed=? WHERE id=?', (
                data['title'],
                data['completed'],
                task_pk,
            ))

            task = db.execute_query(f'SELECT * FROM task WHERE id= ?', (task_pk,)).fetchone()

            return make_response(jsonify(task))
        else:
            # Deletes a task
            project_id = db.execute_update('DELETE FROM task WHERE id=?', (
                task_pk,
            ))

            return make_response('200 Ok')

    return redirect(url_for('index'))


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
