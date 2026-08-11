from flask import Blueprint, jsonify

from models.student import Student


dashboard_bp = Blueprint(
    "dashboard",
    __name__
)


# ======================================================
# DASHBOARD
# GET /api/dashboard
# ======================================================

@dashboard_bp.route("/api/dashboard", methods=["GET"])
def dashboard():

    try:

        # ==========================================
        # Get all students
        # ==========================================

        students = Student.query.all()

        total_students = len(students)


        # ==========================================
        # No students
        # ==========================================

        if total_students == 0:

            return jsonify({
                "success": True,

                "total_students": 0,

                "low_risk": 0,
                "medium_risk": 0,
                "high_risk": 0,

                "average_marks": 0,

                "high_performers": 0,
                "at_risk": 0
            }), 200


        # ==========================================
        # Predicted Marks
        # ==========================================

        marks = [
            student.predicted_marks
            for student in students
            if student.predicted_marks is not None
        ]


        # ==========================================
        # Average Marks
        # ==========================================

        if marks:

            average_marks = round(
                sum(marks) / len(marks),
                2
            )

        else:

            average_marks = 0


        # ==========================================
        # Risk Statistics
        # ==========================================

        low_risk = len([
            student
            for student in students
            if student.prediction_risk == "Low"
        ])


        medium_risk = len([
            student
            for student in students
            if student.prediction_risk == "Medium"
        ])


        high_risk = len([
            student
            for student in students
            if student.prediction_risk == "High"
        ])


        # ==========================================
        # High Performers
        # Predicted marks >= 80
        # ==========================================

        high_performers = len([
            student
            for student in students
            if (
                student.predicted_marks is not None
                and student.predicted_marks >= 80
            )
        ])


        # ==========================================
        # At Risk Students
        # Predicted marks < 50
        # ==========================================

        at_risk = len([
            student
            for student in students
            if (
                student.predicted_marks is not None
                and student.predicted_marks < 50
            )
        ])


        # ==========================================
        # Response
        # ==========================================

        return jsonify({

            "success": True,

            "total_students": total_students,

            "low_risk": low_risk,

            "medium_risk": medium_risk,

            "high_risk": high_risk,

            "average_marks": average_marks,

            "high_performers": high_performers,

            "at_risk": at_risk

        }), 200


    # ==============================================
    # Error Handling
    # ==============================================

    except Exception as e:

        print("Dashboard Error:", str(e))

        return jsonify({

            "success": False,

            "message": "Failed to load dashboard statistics",

            "error": str(e)

        }), 500