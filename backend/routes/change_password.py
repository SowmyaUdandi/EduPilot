from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import bcrypt

from database.database import db
from models.user import User

change_password_bp = Blueprint("change_password", __name__)


@change_password_bp.route("/change-password", methods=["POST"])
@jwt_required()
def change_password():

    user_id = int(get_jwt_identity())

    user = User.query.get(user_id)

    if not user:
        return {
            "success": False,
            "message": "User not found"
        }, 404

    data = request.get_json()

    current_password = data.get("current_password")
    new_password = data.get("new_password")

    if not current_password or not new_password:
        return {
            "success": False,
            "message": "All fields are required"
        }, 400

    # Verify current password
    password_match = bcrypt.checkpw(
        current_password.encode("utf-8"),
        user.password.encode("utf-8")
    )

    if not password_match:
        return {
            "success": False,
            "message": "Current password is incorrect"
        }, 400

    # Hash new password
    hashed_password = bcrypt.hashpw(
        new_password.encode("utf-8"),
        bcrypt.gensalt()
    )

    user.password = hashed_password.decode("utf-8")

    db.session.commit()

    return {
        "success": True,
        "message": "Password changed successfully"
    }, 200