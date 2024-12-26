from __future__ import annotations

from flask import Blueprint

views = Blueprint("views", __name__)

@views.route("/hello_world")
def hello_world():

    return "<h1> Hello World </h1>"


