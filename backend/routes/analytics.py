from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from sqlalchemy import func

from database.database import db
from models.student import Student

analytics_bp = Blueprint("analytics", __name__)


@analytics_bp.route("/api/analytics", methods=["GET"])
@jwt_required()
def get_analytics():

    students = Student.query.all()

    total_students = len(students)

    if total_students == 0:
        return jsonify({
            "success": True,
            "total_students": 0,
            "average_marks": 0,
            "high_performers": 0,
            "at_risk": 0,
            "low_risk": 0,
            "medium_risk": 0,
            "high_risk": 0,
            "department_marks": [],
            "department_distribution": []
        })

    average_marks = round(
        sum(s.predicted_marks or 0 for s in students) /
        total_students,
        2
    )

    high_performers = len(
        [s for s in students if (s.predicted_marks or 0) >= 80]
    )

    at_risk = len(
        [s for s in students if (s.predicted_marks or 0) < 50]
    )

    low_risk = len(
        [s for s in students if s.prediction_risk == "Low"]
    )

    medium_risk = len(
        [s for s in students if s.prediction_risk == "Medium"]
    )

    high_risk = len(
        [s for s in students if s.prediction_risk == "High"]
    )

    dept_marks = (
        db.session.query(
            Student.department,
            func.avg(Student.predicted_marks)
        )
        .group_by(Student.department)
        .all()
    )

    department_marks = [
        {
            "department": dept,
            "marks": round(avg or 0, 2)
        }
        for dept, avg in dept_marks
    ]

    dept_count = (
        db.session.query(
            Student.department,
            func.count(Student.id)
        )
        .group_by(Student.department)
        .all()
    )

    department_distribution = [
        {
            "name": dept,
            "value": count
        }
        for dept, count in dept_count
    ]

    return jsonify({
        "success": True,
        "total_students": total_students,
        "average_marks": average_marks,
        "high_performers": high_performers,
        "at_risk": at_risk,
        "low_risk": low_risk,
        "medium_risk": medium_risk,
        "high_risk": high_risk,
        "department_marks": department_marks,
        "department_distribution": department_distribution
    }), 200