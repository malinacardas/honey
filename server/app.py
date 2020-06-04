import os
import logging

from flask import Flask
from flask_socketio import SocketIO, emit

from server.db import db
from server.blueprints import user,password,registration
# from server.wsocket import sio

# from server.models import create_mocks

import eventlet
eventlet.monkey_patch()

async_mode = "eventlet"

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
sio = SocketIO(async_mode=async_mode, cors_allowed_origins="*")


def create_app():

    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///{}".format(
        os.path.join('instance', 'honey.db'))
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'rebornracekey'

    db.init_app(app)
    db.create_all(app=app)

    sio.init_app(app)

    app.register_blueprint(user.bp)
    app.register_blueprint(password.bp)
    app.register_blueprint(registration.bp)


    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response

    return app


if __name__ == '__main__':
    logging.info("Starting the server.")

    app = create_app()
    # create_mocks(app)
    sio.run(app, debug=True, host="0.0.0.0")
