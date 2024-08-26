import random
import string

from flask import Blueprint, request, jsonify, session
from flask_jwt_extended import get_jwt_identity, jwt_required

from sqlalchemy import select, and_, or_

from .models import Admin, VotingApp, VotingSession,  PasswordsLot, Password, Result
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

@admin.route("/api/v1/create_app", methods = ["POST"])
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

@admin.route("/api/v1/create_voting_session", methods = ["POST"])
@jwt_required()
def admin_create_voting_session():

    print("hello")
    data = request.json
    motion = data.get("motion")
    procentage = data.get("procentage")
    current_admin_id = get_jwt_identity()

    current_admin = Admin.query.filter_by(id= current_admin_id).first()
    voting_app = VotingApp.query.filter_by(admin_id = current_admin_id).first()
    
    if not voting_app:
        return jsonify({"message" : "There is not voting app started"}), 401
    

    voting_sessions = VotingSession.query.filter_by(voting_app_id = voting_app.id).all()

    for voting_session in voting_sessions:
        if voting_session.status == "STOP" or voting_session.status == "START":
            return jsonify({"message" : "There is already an active voting Session. Plese close that before create a new one"}), 401
    
    new_voting_session = VotingSession(motion = motion, voting_app_id=voting_app.id)
    db.session.add(new_voting_session)
    db.session.commit()
    new_results = Result(voting_session_id=new_voting_session.id, procentage=procentage)
    db.session.add(new_results)
    db.session.commit()

    return jsonify({"message": "New voting Session created"}), 200

@admin.route("/api/v1/visualize_voting_sessions", methods = ["GET"])
# @jwt_required()
def admin_visualize_voting_sessions():
    current_user_id = 1

    voting_app = VotingApp.query.filter_by(admin_id = current_user_id).first()

    if not voting_app:
       print("no active app")
       return jsonify({"message" : "There is no active voting app"}), 401
    
    voting_sessions = VotingSession.query.filter_by(voting_app_id = voting_app.id).all()

    voting_session_response = {
        "voting_session": [{"motion" : voting_session.motion, 
                            "status": voting_session.status,
                            "yes": "30",
                            "no": "10", 
                            "abstention": "20"} 
                            for voting_session in voting_sessions]
    }

    print(voting_session_response)

    return jsonify(voting_session_response), 200
 

@admin.route("/api/v1/current_session", methods = ["POST", "GET"])
# @jwt_required()
def admin_current_session():

    if request.method == "GET":
        current_user_id = 1

        voting_app = VotingApp.query.filter_by(admin_id = current_user_id).first()

        if not voting_app:
            print("no active app")
            return jsonify({"message" : "There is no active voting app"}), 401
    
        voting_session_response = get_active_session(current_admin_id=current_user_id)
        print(voting_session_response)
        voting_session = voting_session_response[0]

        if voting_session:
            voting_session_response = {
                "voting_session": [{"motion" : voting_session.motion, 
                                    "status": voting_session.status,
                                    "yes": "30",
                                    "no": "10", 
                                    "abstention": "20"}]
                                    } 
                                 
        else:
            voting_session_response = {
                "voting_session": [{"motion" : "", 
                                    "status": "",
                                    "yes": "0",
                                    "no": "0", 
                                    "abstention": "0"} 
                                    ]}

        print(voting_session_response)

        return jsonify(voting_session_response), 200
   

    if request.method == "POST":        
        data = request.json
        current_user_id = 1
        future_status = data.get("futureStatus")

        active_voting_app_id = VotingApp.query.filter_by(admin_id = current_user_id).first()

        if not active_voting_app_id:
            return jsonify({"message" : "There is not voting App on your side"}), 401
    
        active_session = get_active_session(current_admin_id=current_user_id)

        if not active_session[0]:
            return jsonify({"message" : f"{active_session[1]}"}), 401
    
        active_session[0].set_status(future_status)
        db.session.commit()

        return jsonify({"message": "All good"}), 200
    

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

    voting_app = VotingApp(name = app_name, color=color, admin_id=admin.id)
    db.session.add(voting_app)
    db.session.commit()
    
    password_lot = PasswordsLot(passsword_count=password_count, voting_app_id=voting_app.id)

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

def get_active_session(current_admin_id: int) -> list[VotingSession | None, str]:

    voting_app = VotingApp.query.filter_by(admin_id = current_admin_id).first()

    if not voting_app:
        return [None, "There is no active voting app on your side"]
    
    voting_sessions = VotingSession.query.filter_by(voting_app_id = voting_app.id).all()

    for voting_session in voting_sessions:
        if voting_session.status == "STOP" or voting_session.status == "START":
            return [voting_session, "All good"]
        

    return [None, "No active voting session"]
    