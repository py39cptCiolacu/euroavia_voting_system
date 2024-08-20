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
    votting_app_id = db.Column(db.Integer, db.ForeignKey("voting_app.id"), nullable = False)
    owner = db.relationship("VotingApp", back_populates = "voting_sessions")


class PasswordsLot(db.Model): 
    id = db.Column(db.Integer, primary_key = True)
    passwords_count= db.Column(db.Integer, nullable = False)
    votting_app_id = db.Column(db.Integer, db.ForeignKey("voting_app.id"), nullable = False)
    owner = db.relationship("VotingApp", back_populates = "passwords_lot")
    password = db.relationship("Password", back_populates = "owner")
    
    def __init__(self, passsword_count, votting_app_id) -> None:
        self.passwords_count = passsword_count
        self.votting_app_id = votting_app_id

class Password(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    password_text = db.Column(db.String(20))
    password_lot_id = db.Column(db.Integer, db.ForeignKey("passwords_lot.id"), nullable = False)
    owner = db.relationship("PasswordsLot", back_populates="password")

    def __init__(self, password_text, password_lot_id) -> None:
        self.password_text = password_text
        self.password_lot_id = password_lot_id