from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.user import User
from models.student import Student

profile_bp = Blueprint("profile", __name__)


@profile_bp.route("/api/profile", methods=["GET"])
@jwt_required()
def get_profile():

    user_id = int(get_jwt_identity())

    user = User.query.get(user_id)

    if not user:
        return {
            "success": False,
            "message": "User not found"
        }, 404

    # ==========================
    # Admin / Teacher
    # ==========================

    if user.role.lower() != "student":
        return {
            "success": True,
            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "role": user.role
            }
        }, 200

    # ==========================
    # Student
    # ==========================

    student = Student.query.filter_by(email=user.email).first()

    if not student:
        return {
            "success": False,
            "message": "Student profile not found"
        }, 404

    return {
        "success": True,
        "student": {
            "id": student.id,
            "student_id": student.student_id,
            "full_name": student.full_name,
            "email": student.email,
            "department": student.department,
            "semester": student.semester,
            "attendance": student.attendance,
            "study_hours": student.study_hours,
            "assignment_score": student.assignment_score,
            "internal_marks": student.internal_marks,
            "previous_gpa": student.previous_gpa,
            "sleep_hours": student.sleep_hours,
            "stress_level": student.stress_level,
            "predicted_marks": student.predicted_marks,
            "prediction_risk": student.prediction_risk,
        }
    }, 200