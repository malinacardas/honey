from flask import Blueprint, request, jsonify

from server.models import Password
from server.base import error_message
from server.db import db


bp = Blueprint('password', __name__, url_prefix='/password')