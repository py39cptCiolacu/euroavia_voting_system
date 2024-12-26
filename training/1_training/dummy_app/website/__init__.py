
from __future__ import annotations

from os import path

from flask import Flask

def create_app() -> Flask:

    app = Flask(__name__)

    app.config["SECRET_KEY"] = "a random string"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    from .views import views

    app.register_blueprint(views, url_prefix='/')

    return app