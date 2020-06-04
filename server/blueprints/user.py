from flask import Blueprint, request, jsonify

from server.models import User,Password
from server.base import error_message
from server.db import db


bp = Blueprint('user', __name__, url_prefix='/user')

@bp.route("/<int:id>",methods=["GET"])
def get_user(id):
    try:
        user=User.query.filter_by(id=id).first()
        if not user:
            return error_message('wrong id', code=405)
        return jsonify(user.json), 200
    except IndexError:
        return error_message("Not a valid id!", code=405)

@bp.route("/<string:name>",methods=["GET"])
def get_user_id(name):
    try:
        user=User.query.filter_by(name=name).first()
        if not user:
            return error_message('wrong id', code=405)
        return jsonify(user.json), 200
    except IndexError:
        return error_message("Not a valid id!", code=405)

@bp.route('',methods=["GET"])
def get_users():
    users=User.query.all()
    return jsonify([user.json for user in users])

@bp.route('',methods=["POST"])
def create_password():
    try:
        content = request.json
        account=content['account']
        username=content['username']
        password=content['password']
        idUser=content['idUser']
        passw=Password(account=account,username=username,password=password,idUser=idUser)
        db.session.add(passw)
        db.session.commit()
        return jsonify(passw.json),200
    except Exception as ex:
        return error_message('error in database insert'+' '+str(ex))

# @bp.route("/<int:id>/passwords", methods=["GET"])
# def get_passwords(id):
#     try:
#         passwords = Password.query.filter_by(idUser=id).all()
#         return jsonify([password.json for password in passwords])
#     except IndexError:
#         return error_message("Not a valid id!", code=405)

@bp.route("/<string:username>/passwords", methods=["GET"])
def get_passwords(username):
    try:
        idUser=User.query.filter_by(name=username).first()
        passwords = Password.query.filter_by(idUser=idUser.id).all()
        return jsonify([password.json for password in passwords])
    except IndexError:
        return error_message("Not a valid id!", code=405)

@bp.route('/<int:id>/edit', methods=["GET"])
def get_password(id):
    if not Password.query.filter_by(id=id).first():
        return error_message('wrong id', code=405)

    password = Password.query.filter_by(id=id).first()
    return jsonify(password.json), 200

@bp.route("/<int:id>", methods=["DELETE"])
def delete_password(id):
    try:
        password=Password.query.filter_by(id=id).first()
        db.session.delete(password)
        db.session.commit()
        # event = Event.query.filter_by(id=id).first()
        # participants = Participant.query.filter_by(idEvent=id).all()
        # for participant in participants:
        #     RaceResult.query.filter_by(idParticipant=participant.id).delete()
        #     db.session.delete(participant)
        # db.session.delete(event)
        # db.session.commit()
        return jsonify(id), 200
    except Exception:
        return error_message('No such id')

@bp.route("/<int:id>/edit", methods=["PUT"])
def update_password(id):
    try:
        content = request.json
        account = content['account']
        username = content['username']
        password = content['password']

        passw = Password.query.filter_by(id=id).first()
        if not passw:
            return error_message('bad id input', code=405)
        
        password = Event.query.filter_by(id=id).first()
        password.account = account
        password.username = username
        password.password = password
        db.session.commit()
        return jsonify([{"message": 'Event updated'}]), 200
    except Exception as ex:
        return error_message('error in database update' + str(ex))
