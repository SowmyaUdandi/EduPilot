from app import app
from database.database import db

from models.user import User
from models.student import Student
from models.email_verification import EmailVerification


with app.app_context():

    print("\n========== USERS ==========")

    users = User.query.all()

    if users:
        for user in users:
            print(
                f"ID: {user.id} | "
                f"Name: {user.full_name} | "
                f"Email: {user.email} | "
                f"Role: {user.role} | "
                f"Verified: {user.is_verified}"
            )
    else:
        print("No users found.")

    print("\n========== STUDENTS ==========")

    students = Student.query.all()

    if students:
        for student in students:
            print(
                f"ID: {student.id} | "
                f"Name: {student.full_name} | "
                f"Email: {student.email}"
            )
    else:
        print("No students found.")

    print("\n==============================")

    # ---------------------------------------
    # OPTIONAL: Delete a user by email
    # ---------------------------------------

    email = input(
        "\nEnter email to delete (Press Enter to skip): "
    ).strip()

    if email:

        user = User.query.filter_by(email=email).first()

        if user:

            EmailVerification.query.filter_by(
                email=email
            ).delete()

            db.session.delete(user)

            db.session.commit()

            print(f"\n{email} deleted successfully.")

        else:
            print("\nUser not found.")

    else:
        print("\nNo user deleted.")