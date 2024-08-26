from __future__ import annotations

from . import db

class SuperAdmin(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(30), nullable = False)
    password = db.Column(db.String(30), nullable = False)

    def __init__(self, username, password) -> None:
        super().__init__()
        self.username = username
        self.password = password

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(30), nullable = False)
    email = db.Column(db.String(50), nullable = False)
    password = db.Column(db.String(30), nullable = False)
    active = db.Column(db.Integer)
    voting_apps = db.relationship("VotingApp", back_populates="owner", lazy = True)

    def __init__(self, username, email, password) -> None:
        # super().__init__()
        self.username = username
        self.email = email
        self.password = password
        self.active = 0

class VotingApp(db.Model): 
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50), nullable = False)
    color = db.Column(db.String(6), nullable=False)
    admin_id = db.Column(db.Integer, db.ForeignKey("admin.id"), nullable = False)
    owner = db.relationship("Admin", back_populates="voting_apps")
    voting_sessions = db.relationship("VotingSession", back_populates = "owner")
    passwords_lot = db.relationship("PasswordsLot", back_populates = "owner")

    def __init__(self, name, color, admin_id) -> None:
        self.name = name
        self.color = color
        self.admin_id =  admin_id

class VotingSession(db.Model): 
    id = db.Column(db.Integer, primary_key = True)
    motion = db.Column(db.String(), nullable = False)
    status = db.Column(db.String(), nullable = False)
    voting_app_id = db.Column(db.Integer, db.ForeignKey("voting_app.id"), nullable = False)
    owner = db.relationship("VotingApp", back_populates = "voting_sessions")
    result = db.relationship("Result", back_populates = "owner")    
    

    def __init__(self, motion, voting_app_id) -> None:
        self.motion = motion
        self.voting_app_id = voting_app_id
        self.status = "STOP"

    def set_status(self, new_status: str) -> list[bool, str]:
        ACCEPTED_STATUS = ["STOP", "START", "VALID", "INVALID"]

        if new_status not in ACCEPTED_STATUS:
            return [False, f"This is not a valid status. Please chose one from this list {ACCEPTED_STATUS}"]
        
        if self.status in ["VALID", "INVALID"]:
            return [False, "A close voting Sessuion could not be opened again"]

        if self.status != "STOP" and new_status in ["VALID", "INVALID"]:
            return [False, "You could close a voting Session onfy if is in STOP status. Please stop it befofe close it"]
    
        self.status = new_status
    
        return [True, f"Status set to {self.status}"]
    

class PasswordsLot(db.Model): 
    id = db.Column(db.Integer, primary_key = True)
    passwords_count= db.Column(db.Integer, nullable = False)
    voting_app_id = db.Column(db.Integer, db.ForeignKey("voting_app.id"), nullable = False)
    owner = db.relationship("VotingApp", back_populates = "passwords_lot")
    password = db.relationship("Password", back_populates = "owner")
    
    def __init__(self, passsword_count, voting_app_id) -> None:
        self.passwords_count = passsword_count
        self.voting_app_id = voting_app_id


class Password(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    password_text = db.Column(db.String(20))
    password_lot_id = db.Column(db.Integer, db.ForeignKey("passwords_lot.id"), nullable = False)
    owner = db.relationship("PasswordsLot", back_populates="password")

    def __init__(self, password_text, password_lot_id) -> None:
        self.password_text = password_text
        self.password_lot_id = password_lot_id


class Result(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    yes_count = db.Column(db.Integer)
    no_count = db.Column(db.Integer)
    procentage = db.Column(db.Integer)
    abstention_count = db.Column(db.Integer)
    voting_session_id= db.Column(db.Integer, db.ForeignKey("voting_session.id"), nullable = False)
    owner = db.relationship("VotingSession", back_populates = "result")

    def __init__(self, voting_session_id, procentage) -> None:
        self.yes_count = 0
        self.no_count = 0
        self.abstention_count = 0
        self.voting_session_id = voting_session_id
        self.procentaege = procentage

    def add_yes(self) -> None:
        self.yes_count += 1

    def add_no(self) -> None:
        self.no_count += 1

    def add_abstention_count(self) -> None:
        self.abstention_count += 1

    def get_final_results(self) -> dict:
        
        final_results = {"YES": self.yes_count, 
                         "NO" : self.no_count, 
                         "ABSTENTION": self.abstention_count}

        return final_results

    def get_final_status(self) -> str:
        
        total_votes = self.yes_count + self.no_count + self.abstention_count

        yes_procentage = self.yes_count / total_votes

        if yes_procentage >= self.procentage:
            return "PASSED"

        else:
            return "DIDN'T PASS"
        


