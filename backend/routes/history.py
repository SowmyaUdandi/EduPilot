from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from database.database import db
from models.history import History
from models.student import Student

history_bp = Blueprint("history", __name__)


@history_bp.route("/api/history", methods=["GET"])
@jwt_required()
def get_history():

    history_records = (
        db.session.query(History, Student)
        .join(Student, History.student_id == Student.id)
        .order_by(History.id.desc())
        .all()
    )

    history_list = []

    for history, student in history_records:

        history_list.append({
            "id": history.id,
            "student_name": student.full_name,
            "student_id": student.student_id,
            "predicted_marks": history.predicted_marks,
            "prediction_risk": history.prediction_risk,
            "created_at": history.created_at.strftime("%d-%m-%Y %H:%M")
            if history.created_at
            else ""
        })

    return jsonify({
        "success": True,
        "count": len(history_list),
        "history": history_list
    }), 200