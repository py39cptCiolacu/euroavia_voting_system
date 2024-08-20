import random
import string

from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required

from .models import Admin, VotingApp, PasswordsLot, Password
from . import db


admin = Blueprint("admin", __name__)

def super_admin_home():
    pass

def super_admin_check_admins():
    pass

def super_admin_check_apps():
    pass

def admin_home():
    pass

@admin.route('/api/v1/create_app', methods = ["POST"])
@jwt_required()
def admin_create_app():
    data = request.json
    current_admin_id = get_jwt_identity()

    current_admin = Admin.query.filter_by(id = current_admin_id).first()
    app_name = data.get("appName")
    print(f"-------------{app_name}")
    password_count = int(data.get("passwordCount"))
    print(f"-------------{password_count}")
    color = data.get("colorHex")[1:]
    print(f"-------------{color}")
    
    is_valid_app = check_is_valid_app(app_name=app_name, 
                                      password_count=password_count, 
                                      color=color, 
                                      current_admin=current_admin)

    if not is_valid_app[0]:
        return jsonify({"message" : f"{is_valid_app[1]}"}), 401
    else:
        create_voting_app(app_name=app_name,
                          color=color,
                          password_count=password_count,
                          admin=current_admin)
        return jsonify({"message" : "App created"}), 200        

def admin_manage_app():
    pass


def check_is_valid_app(app_name: str, password_count: int, color: str, current_admin: Admin) -> list[bool, str]:

    if current_admin.voting_apps:
        return [False, "You already have an voting app"]
    
    if len(app_name) < 5:
        return [False, "App name should be at least 5 characters long"]
    
    if password_count < 10:
        return [False, "You should have at least 10 passwords"]
    
    accepted_hex_chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'A', 'B', 'C', 'D', 'E', 'F']

    for color_char in color:
        if color_char not in accepted_hex_chars:
            return [False, "Color should be in HEX format"]
        
    return [True, "All good"]    
        

def create_voting_app(app_name: str, color: str, password_count: int, admin: Admin) -> None:

    votting_app = VotingApp(name = app_name, color=color, admin_id=admin.id)
    db.session.add(votting_app)
    db.session.commit()
    
    password_lot = PasswordsLot(passsword_count=password_count, votting_app_id=votting_app.id)

    db.session.add(password_lot)
    db.session.commit()
    
    i = 0
    already_used = []

    while i < password_count:
        new_password_text = generate_password_text()
        if new_password_text in already_used:
            continue

        new_password = Password(password_text=new_password_text, password_lot_id=password_lot.id)
        already_used.append(new_password_text)
        db.session.add(new_password)
        i += 1

    db.session.commit()


def generate_password_text() -> str:
    chars = string.ascii_letters + string.digits + "!@#$%&*"
    random_string = ''.join(random.choice(chars) for _ in range(6))

    return random_string