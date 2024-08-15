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
    email = db.column(db.String(50), nullable = False)
    password = db.Column(db.String(30), nullable = False)
    voting_apps = db.relationship("VotingApp", back_populates="owner")

    def __init__(self, username, email, password) -> None:
        super().__init__()
        self.username = username
        self.email = email
        self.password = password

class VotingApp(db.Model): 
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50), nullable = False)
    owner = db.relationship("Admin", back_populates="voting_apps")
    voting_sessions = db.relationship("VotingSession", back_populates = "owner")

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
    owner = db.relationship("VotingApp", back_populates = "voting_sessions")


class PasswordLot(db.Model): 
    id = db.Column(db.Integer, primary_key = True)
    passwords_number = db.Column(db.Integer, nullable = False)


class Password(db.Model): ...