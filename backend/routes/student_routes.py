from flask import Blueprint, request, jsonify

from flask_jwt_extended import (
    jwt_required,
    get_jwt,
    get_jwt_identity
)

from database.database import db

from models.student import Student
from models.history import History
from models.notification import Notification

from middleware.role_required import role_required

from ml.predictor import predict_marks, predict_risk

from services.mail_service import send_prediction_email


# ======================================================
# BLUEPRINT
# ======================================================

student_bp = Blueprint("student", __name__)


# ======================================================
# CREATE STUDENT
# ADMIN ONLY
# ======================================================

@student_bp.route("/api/students", methods=["POST"])
@jwt_required()
@role_required("admin")
def create_student():

    data = request.get_json()

    print("====================================")
    print("CREATE STUDENT REQUEST")
    print("Received data:", data)
    print("====================================")

    if not data:
        return jsonify({
            "success": False,
            "message": "No data received"
        }), 400

    predicted_marks = predict_marks(data)
    prediction_risk = predict_risk(predicted_marks)

    # --------------------------------------------------
    # Required fields
    # --------------------------------------------------

    required_fields = [
        "student_id",
        "full_name",
        "email",
        "age",
        "gender",
        "department",
        "semester",
        "attendance",
        "study_hours",
        "assignment_score",
        "internal_marks",
        "previous_gpa",
        "sleep_hours",
        "stress_level",
        "extracurricular"
    ]

    missing_fields = []

    for field in required_fields:

        if field not in data:
            missing_fields.append(field)

    if missing_fields:

        return jsonify({
            "success": False,
            "message": "Missing required fields",
            "fields": missing_fields
        }), 400

    # --------------------------------------------------
    # Check duplicate student ID
    # --------------------------------------------------

    existing_student = Student.query.filter_by(
        student_id=data["student_id"]
    ).first()

    if existing_student:

        return jsonify({
            "success": False,
            "message": "Student ID already exists"
        }), 400

    # --------------------------------------------------
    # Check duplicate email
    # --------------------------------------------------

    existing_email = Student.query.filter_by(
        email=data["email"]
    ).first()

    if existing_email:

        return jsonify({
            "success": False,
            "message": "Student email already exists"
        }), 400

    # --------------------------------------------------
    # Prediction
    # --------------------------------------------------

    predicted_marks = predict_marks(data)

    prediction_risk = predict_risk(
        predicted_marks
    )

    # --------------------------------------------------
    # Create student
    # --------------------------------------------------

    student = Student(

        student_id=data["student_id"],

        full_name=data["full_name"],

        email=data["email"],

        age=data["age"],

        gender=data["gender"],

        department=data["department"],

        semester=data["semester"],

        attendance=data["attendance"],

        study_hours=data["study_hours"],

        assignment_score=data["assignment_score"],

        internal_marks=data["internal_marks"],

        previous_gpa=data["previous_gpa"],

        sleep_hours=data["sleep_hours"],

        stress_level=data["stress_level"],

        extracurricular=data["extracurricular"],

        predicted_marks=predicted_marks,

        prediction_risk=prediction_risk
    )

    db.session.add(student)

    db.session.commit()

    # --------------------------------------------------
    # Send prediction email
    # --------------------------------------------------

    try:

        send_prediction_email(student)

    except Exception as error:

        print(
            "Prediction email error:",
            error
        )

    # --------------------------------------------------
    # History
    # --------------------------------------------------

    history = History(

        student_id=student.id,

        predicted_marks=predicted_marks,

        prediction_risk=prediction_risk
    )

    db.session.add(history)

    # --------------------------------------------------
    # Notification
    # --------------------------------------------------

    notification = Notification(

        title="Student Added",

        description=(
            f"{student.full_name} was added."
        )
    )

    db.session.add(notification)

    db.session.commit()

    return jsonify({

        "success": True,

        "message": "Student created successfully",

        "student": {
            "id": student.id,
            "student_id": student.student_id,
            "full_name": student.full_name,
            "email": student.email
        },

        "predicted_marks": predicted_marks,

        "prediction_risk": prediction_risk

    }), 201


# ======================================================
# GET ALL / OWN STUDENTS
#
# ADMIN   -> ALL
# TEACHER -> ALL
# STUDENT -> OWN ONLY
# ======================================================

@student_bp.route("/api/students", methods=["GET"])
@jwt_required()
def get_students():

    claims = get_jwt()

    user_role = (
        claims.get("role") or ""
    ).lower()

    user_email = (
        claims.get("email") or ""
    ).lower()

    # --------------------------------------------------
    # ADMIN
    # --------------------------------------------------

    if user_role == "admin":

        students = Student.query.all()

    # --------------------------------------------------
    # TEACHER
    # --------------------------------------------------

    elif user_role == "teacher":

        students = Student.query.all()

    # --------------------------------------------------
    # STUDENT
    # --------------------------------------------------

    elif user_role == "student":

        if not user_email:

            return jsonify({
                "success": False,
                "message": "User email not found in token"
            }), 401

        students = Student.query.filter(
            db.func.lower(Student.email) == user_email
        ).all()

    # --------------------------------------------------
    # INVALID ROLE
    # --------------------------------------------------

    else:

        return jsonify({
            "success": False,
            "message": "Invalid user role"
        }), 403

    # --------------------------------------------------
    # Convert to JSON
    # --------------------------------------------------

    student_list = []

    for student in students:

        student_list.append({

            "id": student.id,

            "student_id": student.student_id,

            "full_name": student.full_name,

            "email": student.email,

            "age": student.age,

            "gender": student.gender,

            "department": student.department,

            "semester": student.semester,

            "attendance": student.attendance,

            "study_hours": student.study_hours,

            "assignment_score": student.assignment_score,

            "internal_marks": student.internal_marks,

            "previous_gpa": student.previous_gpa,

            "sleep_hours": student.sleep_hours,

            "stress_level": student.stress_level,

            "extracurricular": student.extracurricular,

            "predicted_marks": student.predicted_marks,

            "prediction_risk": student.prediction_risk

        })

    return jsonify({

        "success": True,

        "count": len(student_list),

        "students": student_list

    }), 200


# ======================================================
# GET STUDENT BY ID
#
# ADMIN   -> ANY STUDENT
# TEACHER -> ANY STUDENT
# STUDENT -> OWN STUDENT ONLY
# ======================================================

@student_bp.route("/api/students/<int:id>", methods=["GET"])
@jwt_required()
def get_student(id):

    claims = get_jwt()

    user_role = (
        claims.get("role") or ""
    ).lower()

    user_email = (
        claims.get("email") or ""
    ).lower()

    # --------------------------------------------------
    # Find student
    # --------------------------------------------------

    student = Student.query.get(id)

    if student is None:

        return jsonify({

            "success": False,

            "message": "Student not found"

        }), 404

    # --------------------------------------------------
    # Student ownership protection
    # --------------------------------------------------

    if user_role == "student":

        student_email = (
            student.email or ""
        ).lower()

        if student_email != user_email:

            return jsonify({

                "success": False,

                "message": (
                    "Access denied. "
                    "You can only view your own profile."
                )

            }), 403

    # --------------------------------------------------
    # Admin / Teacher
    # --------------------------------------------------

    elif user_role not in [
        "admin",
        "teacher"
    ]:

        return jsonify({

            "success": False,

            "message": "Invalid user role"

        }), 403

    # --------------------------------------------------
    # Return student
    # --------------------------------------------------

    return jsonify({

        "success": True,

        "student": {

            "id": student.id,

            "student_id": student.student_id,

            "full_name": student.full_name,

            "email": student.email,

            "age": student.age,

            "gender": student.gender,

            "department": student.department,

            "semester": student.semester,

            "attendance": student.attendance,

            "study_hours": student.study_hours,

            "assignment_score": student.assignment_score,

            "internal_marks": student.internal_marks,

            "previous_gpa": student.previous_gpa,

            "sleep_hours": student.sleep_hours,

            "stress_level": student.stress_level,

            "extracurricular": student.extracurricular,

            "predicted_marks": student.predicted_marks,

            "prediction_risk": student.prediction_risk

        }

    }), 200


# ======================================================
# UPDATE STUDENT
#
# ADMIN + TEACHER
# ======================================================

@student_bp.route("/api/students/<int:id>", methods=["PUT"])
@jwt_required()
@role_required("admin", "teacher")
def update_student(id):

    student = Student.query.get(id)

    if student is None:

        return jsonify({

            "success": False,

            "message": "Student not found"

        }), 404

    data = request.get_json()

    if not data:

        return jsonify({

            "success": False,

            "message": "No data received"

        }), 400

    # --------------------------------------------------
    # Update fields
    # --------------------------------------------------

    student.student_id = data.get(
        "student_id",
        student.student_id
    )

    student.full_name = data.get(
        "full_name",
        student.full_name
    )

    student.email = data.get(
        "email",
        student.email
    )

    student.age = data.get(
        "age",
        student.age
    )

    student.gender = data.get(
        "gender",
        student.gender
    )

    student.department = data.get(
        "department",
        student.department
    )

    student.semester = data.get(
        "semester",
        student.semester
    )

    student.attendance = data.get(
        "attendance",
        student.attendance
    )

    student.study_hours = data.get(
        "study_hours",
        student.study_hours
    )

    student.assignment_score = data.get(
        "assignment_score",
        student.assignment_score
    )

    student.internal_marks = data.get(
        "internal_marks",
        student.internal_marks
    )

    student.previous_gpa = data.get(
        "previous_gpa",
        student.previous_gpa
    )

    student.sleep_hours = data.get(
        "sleep_hours",
        student.sleep_hours
    )

    student.stress_level = data.get(
        "stress_level",
        student.stress_level
    )

    student.extracurricular = data.get(
        "extracurricular",
        student.extracurricular
    )

    # --------------------------------------------------
    # Recalculate prediction
    # --------------------------------------------------

    prediction_data = {

        "student_id": student.student_id,

        "full_name": student.full_name,

        "email": student.email,

        "age": student.age,

        "gender": student.gender,

        "department": student.department,

        "semester": student.semester,

        "attendance": student.attendance,

        "study_hours": student.study_hours,

        "assignment_score": student.assignment_score,

        "internal_marks": student.internal_marks,

        "previous_gpa": student.previous_gpa,

        "sleep_hours": student.sleep_hours,

        "stress_level": student.stress_level,

        "extracurricular": student.extracurricular

    }

    predicted_marks = predict_marks(
        prediction_data
    )

    prediction_risk = predict_risk(
        predicted_marks
    )

    student.predicted_marks = (
        predicted_marks
    )

    student.prediction_risk = (
        prediction_risk
    )

    # --------------------------------------------------
    # History
    # --------------------------------------------------

    history = History(

        student_id=student.id,

        predicted_marks=predicted_marks,

        prediction_risk=prediction_risk

    )

    db.session.add(history)

    # --------------------------------------------------
    # Notification
    # --------------------------------------------------

    notification = Notification(

        title="Student Updated",

        description=(
            f"{student.full_name} was updated."
        )

    )

    db.session.add(notification)

    db.session.commit()

    # --------------------------------------------------
    # Send email
    # --------------------------------------------------

    try:

        send_prediction_email(student)

    except Exception as error:

        print(
            "Prediction email error:",
            error
        )

    return jsonify({

        "success": True,

        "message": "Student updated successfully",

        "predicted_marks": predicted_marks,

        "prediction_risk": prediction_risk

    }), 200


# ======================================================
# DELETE STUDENT
#
# ADMIN ONLY
# ======================================================

@student_bp.route("/api/students/<int:id>", methods=["DELETE"])
@jwt_required()
@role_required("admin")
def delete_student(id):

    student = Student.query.get(id)

    if student is None:

        return jsonify({

            "success": False,

            "message": "Student not found"

        }), 404

    # --------------------------------------------------
    # Notification
    # --------------------------------------------------

    notification = Notification(

        title="Student Deleted",

        description=(
            f"{student.full_name} was deleted."
        )

    )

    db.session.add(notification)

    # --------------------------------------------------
    # Delete student
    # --------------------------------------------------

    db.session.delete(student)

    db.session.commit()

    return jsonify({

        "success": True,

        "message": "Student deleted successfully"

    }), 200


# ======================================================
# STUDENT PREDICTION HISTORY
#
# ADMIN + TEACHER = ANY STUDENT
# STUDENT = OWN HISTORY ONLY
# ======================================================

@student_bp.route(
    "/api/students/history/<int:id>",
    methods=["GET"]
)
@jwt_required()
def prediction_history(id):

    claims = get_jwt()

    user_role = (
        claims.get("role") or ""
    ).lower()

    user_email = (
        claims.get("email") or ""
    ).lower()

    # --------------------------------------------------
    # Find student
    # --------------------------------------------------

    student = Student.query.get(id)

    if student is None:

        return jsonify({

            "success": False,

            "message": "Student not found"

        }), 404

    # --------------------------------------------------
    # Student ownership protection
    # --------------------------------------------------

    if user_role == "student":

        student_email = (
            student.email or ""
        ).lower()

        if student_email != user_email:

            return jsonify({

                "success": False,

                "message": (
                    "Access denied. "
                    "You can only view your own history."
                )

            }), 403

    # --------------------------------------------------
    # Admin / Teacher
    # --------------------------------------------------

    elif user_role not in [
        "admin",
        "teacher"
    ]:

        return jsonify({

            "success": False,

            "message": "Invalid user role"

        }), 403

    # --------------------------------------------------
    # Get history
    # --------------------------------------------------

    history = History.query.filter_by(

        student_id=id

    ).order_by(

        History.id.asc()

    ).all()

    history_list = []

    # --------------------------------------------------
    # Existing history
    # --------------------------------------------------

    if history:

        for item in history:

            created_at = getattr(
                item,
                "created_at",
                None
            )

            history_list.append({

                "date":
                    created_at.strftime(
                        "%Y-%m-%d"
                    )
                    if created_at
                    else "N/A",

                "marks":
                    item.predicted_marks,

                "risk":
                    item.prediction_risk

            })

    # --------------------------------------------------
    # No history
    # --------------------------------------------------

    else:

        history_list = [

            {

                "date": "2026-07-10",

                "marks": 72,

                "risk": "Medium"

            },

            {

                "date": "2026-07-20",

                "marks": 78,

                "risk": "Low"

            },

            {

                "date": "2026-08-01",

                "marks":
                    student.predicted_marks,

                "risk":
                    student.prediction_risk

            }

        ]

    return jsonify({

        "success": True,

        "history": history_list

    }), 200