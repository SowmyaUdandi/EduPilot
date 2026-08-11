from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from database.database import db
from models.student import Student
from models.history import History
from ml.predictor import predict_marks

prediction_bp = Blueprint("prediction", __name__)


@prediction_bp.route("/api/prediction", methods=["POST"])
@jwt_required()
def prediction():

    try:

        data = request.get_json()

        # ------------------------------------
        # Find Student
        # ------------------------------------

        student = Student.query.filter_by(
            full_name=data["full_name"]
        ).first()

        if student is None:
            return jsonify({
                "success": False,
                "message": "Student not found"
            }), 404

        # ------------------------------------
        # Prepare Complete Data for AI Model
        # ------------------------------------

        prediction_data = {
            "attendance": student.attendance,
            "study_hours": student.study_hours,
            "assignment_score": student.assignment_score,
            "internal_marks": student.internal_marks,
            "previous_gpa": student.previous_gpa,
            "sleep_hours": student.sleep_hours,
            "stress_level": student.stress_level,
            "extracurricular": student.extracurricular
        }

        # ------------------------------------
        # Predict Marks
        # ------------------------------------

        predicted_marks = predict_marks(prediction_data)

        # ------------------------------------
        # Calculate Risk Level
        # ------------------------------------

        if predicted_marks >= 80:
            prediction_risk = "Low"

        elif predicted_marks >= 50:
            prediction_risk = "Medium"

        else:
            prediction_risk = "High"

        # ------------------------------------
        # Update Student Record
        # ------------------------------------

        student.predicted_marks = predicted_marks
        student.prediction_risk = prediction_risk

        # ------------------------------------
        # Save Prediction History
        # ------------------------------------

        history = History(
            student_id=student.id,
            predicted_marks=predicted_marks,
            prediction_risk=prediction_risk
        )

        db.session.add(history)
        db.session.commit()

        # ------------------------------------
        # Success Response
        # ------------------------------------

        return jsonify({
            "success": True,
            "message": "Prediction completed successfully",
            "predicted_marks": predicted_marks,
            "risk_level": prediction_risk,
            "student": {
                "id": student.id,
                "student_id": student.student_id,
                "full_name": student.full_name
            }
        }), 200

    except Exception as e:

        import traceback

        traceback.print_exc()

        db.session.rollback()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500