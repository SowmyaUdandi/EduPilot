from models.student import Student
from database.database import db
from utils.response import success_response, error_response


def add_student(request_data):

    try:
        student = Student(
            student_id=request_data["student_id"],
            full_name=request_data["full_name"],
            email=request_data.get("email"),

            age=request_data.get("age"),
            gender=request_data.get("gender"),

            department=request_data.get("department"),
            semester=request_data.get("semester"),

            attendance=request_data.get("attendance"),
            study_hours=request_data.get("study_hours"),

            assignment_score=request_data.get("assignment_score"),
            internal_marks=request_data.get("internal_marks"),

            previous_gpa=request_data.get("previous_gpa"),

            sleep_hours=request_data.get("sleep_hours"),
            stress_level=request_data.get("stress_level"),

            extracurricular=request_data.get("extracurricular")
        )

        db.session.add(student)
        db.session.commit()

        return success_response(
            message="Student added successfully",
            data={
                "student_id": student.student_id,
                "name": student.full_name
            }
        )

    except Exception as e:

        db.session.rollback()

        return error_response(
            message=str(e)
        )