from flask import jsonify


def error_message(message, code=400):
    return jsonify({"message": message}), code
