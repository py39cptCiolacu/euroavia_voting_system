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
    admin_id = db.Column(db.Integer, db.ForeignKey("admin.id"), nullable = False)
    owner = db.relationship("Admin", back_populates="voting_apps")
    voting_sessions = db.relationship("VotingSession", back_populates = "owner")
    passwords_lot = db.relationship("PasswordsLot", back_populates = "owner")

    """
    here I need to add every attribute than we want to make configurable by the user
    
    * voters_number 
    * background color
    * background picture
    * 

    """

class VotingSession(db.Model): 
    id = db.Column(db.Integer, primary_key = True)
    motion = db.Column(db.String(), nullable = False)
    status = db.Column(db.String(), nullable = False)
    votting_app_id = db.Column(db.Integer, db.ForeignKey("voting_app.id"), nullable = False)
    owner = db.relationship("VotingApp", back_populates = "voting_sessions")


class PasswordsLot(db.Model): 
    id = db.Column(db.Integer, primary_key = True)
    passwords_number = db.Column(db.Integer, nullable = False)
    votting_app_id = db.Column(db.Integer, db.ForeignKey("voting_app.id"), nullable = False)
    owner = db.relationship("VotingApp", back_populates = "passwords_lot")

class Password(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    password_text = db.Column(db.String(20))