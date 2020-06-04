from flask import Blueprint, request, jsonify

from server.models import User
from server.base import error_message
from server.db import db


bp = Blueprint('registrations', __name__, url_prefix='/registrations')

@bp.route("", methods=["POST"])
def create_user():
    try:
        content = request.json
        name = content["name"]
        password=content["password"]
        email = content["email"]

       
        # if "@" not in email or "." not in email:
        #     return error_message('bad email input', code=400)


        user = User(name=name, password=password, email=email)
        db.session.add(user)
        db.session.commit()
        return jsonify(user.json), 200

    except Exception as ex:
        return error_message('Error: '+str(ex))