from __future__ import annotations

from flask import Blueprint, request, jsonify

views = Blueprint("views", __name__)

from . import db
from .models import VotingApp, PasswordsLot, Password

@views.route("/api/v1/<app_name>/home")
def home(app_name):
    voting_app = VotingApp.query.filter_by(name = app_name).first()

    if not voting_app:
        return jsonify({"message" : "This app does not exists"}), 404
    
    # return jsonify({"message" : "Hello"}), 200

    return jsonify({"message": "salut"}), 200


@views.route("/api/v1/<app_name>/password_check", methods=["POST", "GET"])
def password_check(app_name):
        
    voting_app = VotingApp.query.filter_by(name = app_name).first()

    if request.method == "GET":
        if not voting_app: 
            return jsonify({"message" : "This app does not exists"}), 404

        return jsonify({"message": "All good"}), 200

    if request.method == "POST":
        data = request.json
        recived_password = data.get("password")

        print(recived_password)
        password_lot = PasswordsLot.query.filter_by(voting_app_id = voting_app.id).first()
        valid_passwords = Password.query.filter_by(password_lot_id=password_lot.id).all()

        valid_passwords_text = []

        for valid_password in valid_passwords:
            valid_passwords_text.append(valid_password.password_text)

        if recived_password not in valid_passwords_text:
            return jsonify({"message": "Invalid password"}), 401
        else:
            return jsonify({"message" : "All good"}), 200