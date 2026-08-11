from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

notification_bp = Blueprint("notification", __name__)


@notification_bp.route("/api/notifications", methods=["GET"])
@jwt_required()
def get_notifications():

    notifications = [
        {
            "id": 1,
            "title": "Prediction Generated",
            "description": "Prediction completed successfully.",
            "time": "2 minutes ago"
        },
        {
            "id": 2,
            "title": "Student Added",
            "description": "A new student record was added.",
            "time": "10 minutes ago"
        },
        {
            "id": 3,
            "title": "Analytics Updated",
            "description": "Dashboard analytics refreshed.",
            "time": "20 minutes ago"
        },
        {
            "id": 4,
            "title": "Recommendation Generated",
            "description": "AI recommendations created.",
            "time": "30 minutes ago"
        }
    ]

    return jsonify({
        "success": True,
        "notifications": notifications
    }), 200