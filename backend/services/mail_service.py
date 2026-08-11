from flask_mail import Mail, Message

mail = Mail()


def send_prediction_email(student):
    """
    Send prediction result email to student.
    """

    try:
        msg = Message(
            subject="EduPilot - Student Performance Prediction",
            recipients=[student.email]
        )

        msg.body = f"""
Hello {student.full_name},

Your latest AI prediction is ready.

------------------------------------

Predicted Marks : {student.predicted_marks}

Risk Level : {student.prediction_risk}

Department : {student.department}

Semester : {student.semester}

------------------------------------

Please continue improving your attendance,
study hours and assignment performance.

Regards,
EduPilot AI
"""

        mail.send(msg)

        print("Prediction email sent successfully.")

    except Exception as e:
        print("Mail Error:", e)