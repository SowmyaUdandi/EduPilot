from flask import jsonify
from datetime import datetime


def success_response(message, data=None, status_code=200):
    return jsonify({
        "success": True,
        "message": message,
        "data": data,
        "timestamp": datetime.utcnow().isoformat()
    }), status_code


def error_response(message, status_code=400):
    return jsonify({
        "success": False,
        "message": message,
        "data": None,
        "timestamp": datetime.utcnow().isoformat()
    }), status_code