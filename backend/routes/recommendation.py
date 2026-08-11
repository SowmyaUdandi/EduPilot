from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from models.student import Student

recommendation_bp = Blueprint(
    "recommendation",
    __name__
)


@recommendation_bp.route(
    "/api/recommendation/<int:id>",
    methods=["GET"]
)
@jwt_required()
def recommendation(id):

    print("===================================")
    print("Recommendation API Called")
    print("Student ID:", id)
    print("===================================")

    student = Student.query.get(id)

    if student is None:
        return jsonify({
            "success": False,
            "message": "Student not found"
        }), 404

    # -----------------------------
    # Convert values
    # -----------------------------
    attendance = float(student.attendance or 0)
    study_hours = float(student.study_hours or 0)
    assignment_score = float(student.assignment_score or 0)
    internal_marks = float(student.internal_marks or 0)
    previous_gpa = float(student.previous_gpa or 0)
    sleep_hours = float(student.sleep_hours or 0)
    predicted_marks = float(student.predicted_marks or 0)

    stress_level = str(student.stress_level).strip().lower()

    recommendations = []

    # Attendance
    if attendance < 75:
        recommendations.append(
            "Increase attendance above 85% to improve academic performance."
        )

    # Study Hours
    if study_hours < 3:
        recommendations.append(
            "Increase study time to at least 3-4 hours every day."
        )

    # Assignment Score
    if assignment_score < 70:
        recommendations.append(
            "Submit assignments on time and improve assignment quality."
        )

    # Internal Marks
    if internal_marks < 70:
        recommendations.append(
            "Practice regularly for internal examinations."
        )

    # Previous GPA
    if previous_gpa < 7:
        recommendations.append(
            "Revise previous semester subjects to improve CGPA."
        )

    # Sleep Hours
    if sleep_hours < 6:
        recommendations.append(
            "Sleep 7-8 hours every day for better concentration."
        )

    # Stress Level
    if stress_level == "high":
        recommendations.append(
            "Reduce stress through exercise, meditation, yoga and short breaks."
        )

    elif stress_level == "medium":
        recommendations.append(
            "Maintain a balanced study schedule and take regular breaks."
        )

    # Extracurricular
    if not student.extracurricular:
        recommendations.append(
            "Participate in extracurricular activities to improve soft skills."
        )

    # Performance Based Advice
    if predicted_marks >= 85:

        recommendations.append(
            "Excellent performance. Maintain your current study routine."
        )

        recommendations.append(
            "Participate in hackathons, coding contests and AI competitions."
        )

    elif predicted_marks >= 70:

        recommendations.append(
            "Good performance. Focus on weak subjects to reach 90+."
        )

    elif predicted_marks >= 50:

        recommendations.append(
            "Practice previous year question papers regularly."
        )

        recommendations.append(
            "Increase revision time before examinations."
        )

    else:

        recommendations.append(
            "Meet your faculty mentor every week."
        )

        recommendations.append(
            "Prepare and follow a daily study schedule."
        )

    print("Recommendation Generated Successfully")

    return jsonify({
        "success": True,
        "student": {
            "id": student.id,
            "name": student.full_name,
            "predicted_marks": predicted_marks,
            "risk": student.prediction_risk
        },
        "recommendations": recommendations
    }), 200