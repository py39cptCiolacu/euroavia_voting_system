from __future__ import annotations

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash, generate_password_hash

from .models import SuperAdmin, Admin
from . import db
# from ..helpers.email_func import new_admin_email, new_super_admin_email

auth = Blueprint("auth", __name__)


@auth.route("/api/v1/super_login", methods = ["POST"])
def super_login():
    data = request.json

    username = data.get("email")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message" : "Username and passwords are required"}), 400
    
    super_admin = SuperAdmin.query.filter_by(username = username).first()

    if not super_admin:
        return jsonify({"message" : "Username not found"}), 401
    
    if not check_password_hash(super_admin.password, password):
        return jsonify({"message" : "Incorrect password"}), 401
    
    access_token = create_access_token(identity=super_admin.id)
    return jsonify({"access_token" : access_token}), 200


@auth.route("/api/v1/super_register", methods = ["GET", "POST"])
def super_register():
    data = request.json

    username = data.get("username")
    password = data.get("password")
    check_password = data.get("check_password")
    code = data.get("code")

    super_register_validity = super_register_validity_check(username=username, password=password, check_password=check_password, code = code)

    if super_register_validity[0] == False:
        return jsonify({"message" : f"{super_register_validity[1]}"}), 401
    else:
        new_super_admin = SuperAdmin(username=username, password=generate_password_hash(password))
        db.session.add(new_super_admin)
        db.session.commit()
        # new_super_admin_email()
        access_token = create_access_token(identity=new_super_admin.id)
        return jsonify({"access_token": access_token}), 200


@auth.route("/api/v1/admin_login", methods = ["POST"])
def admin_login():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message" : "Email and passwords are required"}), 400
    
    admin = Admin.query.filter_by(email = email).first()

    if not admin:
        return jsonify({"message" : "Email not found"}), 401
    
    if not check_password_hash(admin.password, password):
        return jsonify({"message" : "Incorrect password"}), 401
    
    access_token = create_access_token(identity=admin.id)
    return jsonify({"access_token" : access_token}), 200


@auth.route("/api/v1/admin_register", methods = ["GET", "POST"])
def admin_register():

    data = request.json

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    check_password = data.get("checkPassword")

    admin_register_validity = admin_register_validity_check(email=email, password=password, check_password=check_password)
    print(admin_register_validity)
    print(password, check_password)

    if admin_register_validity[0] == False:
        return jsonify({"message" : f"{admin_register_validity[1]}"}), 401
    else:
        print("I am here")
        new_super_admin = Admin(username=username, email = email, password=generate_password_hash(password))
        db.session.add(new_super_admin)
        db.session.commit()
        # new_admin_email()
        return jsonify({"message": "Account Created. Please check your email to activate your account"}), 200


def super_register_validity_check(username: str, password: str, check_password: str, code: str) -> list[bool, str]:

    super_admin = SuperAdmin.query.filter_by(username=username).first()

    if super_admin:
        return [False, "Username already taken"]

    if password != check_password:
        return [False, "Passwords are not matching"]
    
    if code != "aGreatCode":
        return [False, "The code is wrong"]
    
    return [True, "All good"]


def admin_register_validity_check(email: str, password: str, check_password: str) -> list[bool, str]:

    admin = Admin.query.filter_by(email=email).first()

    if admin: 
        return [False, "Username already taken"]

    # if email[-12:] != "@eurovia.eu":
    #     return [False, "Only EUROAVIA emails are allowed"]

    if password != check_password:
        return [False, "Passwords are not matching"]

    return [True, "All Good"]


   