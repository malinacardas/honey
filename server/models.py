import os

from sqlalchemy import ForeignKey
from flask import jsonify

import datetime

from server.db import db

class User(db.Model):
    __tablename__='user'

    id=db.Column(db.Integer,primary_key=True, autoincrement=True)
    name=db.Column(db.String)
    password=db.Column(db.String)
    email=db.Column(db.String)

    def __init__(self,name,password,email,id=None):
        self.id=id
        self.name=name
        self.password=password
        self.email=email
    
    def __repr__(self):
        return str('name: '+ str(self.name) + 
                ', password: ' + str(self.password) +
                ', email: ' + str(self.email))
    
    @property
    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'password': self.password,
            'email': self.email,
        }

class Password(db.Model):
    __tablename__='password'

    id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    account=db.Column(db.String)
    username=db.Column(db.String)
    password=db.Column(db.String)
    idUser=db.Column(db.Integer,ForeignKey('user.id'))

    def __init__(self,account,username,password,idUser, id=None):
        self.id=id
        self.account=account
        self.username=username
        self.password=password
        self.idUser=idUser

    def __repr__(self):
        return str('account: ' + str(self.account) + 
                    ', username: ' + str(self.username) +
                    ', password: ' + str(self.password) + 
                    ', idUser: ' + str(self.idUser))
    
    @property
    def json(self):
        return {
            'id': self.id,
            'account': self.account,
            'username': self.username,
            'password': self.password,
            'idUser': self.idUser,
        }