from flask import Flask, send_from_directory
import os
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config.config import Config
from database.database import db

# ==============================
# Models
# ==============================

from models.user import User
from models.student import Student
from models.history import History
from models.notification import Notification
from models.password_reset import PasswordReset
from models.email_verification import EmailVerification

# ==============================
# Services
# ==============================

from services.mail_service import mail

# ==============================
# Routes
# ==============================

from routes.health import health_bp
from routes.auth import auth_bp
from routes.student_routes import student_bp
from routes.prediction import prediction_bp
from routes.dashboard import dashboard_bp
from routes.analytics import analytics_bp
from routes.recommendation import recommendation_bp
from routes.history import history_bp
from routes.export import export_bp
from routes.notification import notification_bp
from routes.chatbot import chatbot_bp
from routes.profile import profile_bp
from routes.change_password import change_password_bp

import bcrypt


# ==============================
# Create Flask App
# ==============================

app = Flask(__name__)

CORS(app)

@app.route("/verify-admin")
def verify_admin():

    admin = User.query.filter_by(email="admin@gmail.com").first()

    if not admin:
        return "Admin not found"

    admin.is_verified = True
    db.session.commit()

    return "Admin verified successfully"

# ==============================
# Load Configuration
# ==============================

app.config.from_object(Config)

print("Database URI:", app.config["SQLALCHEMY_DATABASE_URI"])

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# ==============================
# Initialize Extensions
# ==============================

db.init_app(app)
mail.init_app(app)
jwt = JWTManager(app)
# ==============================
# JWT Error Handlers
# ==============================

@jwt.unauthorized_loader
def unauthorized_callback(error):
    print("========== JWT ERROR ==========")
    print(error)
    print("===============================")
    return {"message": error}, 401


@jwt.invalid_token_loader
def invalid_token_callback(error):
    print("JWT Invalid:", error)
    return {"message": error}, 401


@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    print("JWT Expired")
    return {"message": "Token has expired"}, 401


# ==============================
# Register Blueprints
# ==============================

app.register_blueprint(health_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(student_bp)
app.register_blueprint(prediction_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(analytics_bp)
app.register_blueprint(recommendation_bp)
app.register_blueprint(history_bp)
app.register_blueprint(export_bp)
app.register_blueprint(notification_bp)
app.register_blueprint(chatbot_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(change_password_bp)


# ==============================
# Create Database Tables
# ==============================
# ==============================
# Create Database Tables
# ==============================

with app.app_context():

    db.create_all()

    # ==============================
    # CREATE / RESET DEMO TEACHER
    # ==============================

    demo_email = "teacher@gmail.com"
    demo_password = "123456"

    demo_user = User.query.filter_by(
        email=demo_email
    ).first()

    if not demo_user:

        hashed_password = bcrypt.hashpw(
            demo_password.encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

        demo_user = User(
            full_name="Teacher",
            email=demo_email,
            password=hashed_password,
            role="teacher",
            is_verified=True
        )

        db.session.add(demo_user)
        db.session.commit()

        print("===================================")
        print("DEMO TEACHER CREATED")
        print("Email:", demo_email)
        print("Password:", demo_password)
        print("===================================")

    else:

        demo_user.password = bcrypt.hashpw(
            demo_password.encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

        demo_user.role = "teacher"
        demo_user.is_verified = True

        db.session.commit()

        print("===================================")
        print("DEMO TEACHER READY")
        print("Email:", demo_email)
        print("Password:", demo_password)
        print("===================================")

    print("\n========== USERS ==========")

    users = User.query.all()

    if users:
        for user in users:
            print(
                f"ID: {user.id} | "
                f"Email: {user.email} | "
                f"Verified: {user.is_verified}"
            )
    else:
        print("No users found")

    print("\n========== STUDENTS ==========")

    students = Student.query.all()

    if students:
        for student in students:
            print(
                f"ID: {student.id} | "
                f"Email: {student.email}"
            )
    else:
        print("No students found")

    print("==============================\n")
    # ==============================
# Home Route
# ==============================

@app.route("/")
def home():
    return {
        "project": "EduPilot",
        "message": "Backend Running Successfully 🚀",
        "version": "1.0.0"
    }

@app.route("/make-admin")
def make_admin():

    admin = User.query.filter_by(email="admin@gmail.com").first()

    if not admin:
        return "Admin not found"

    admin.role = "admin"
    db.session.commit()

    return f"Success! Role is now: {admin.role}"
# ==============================
# Temporary Delete User
# ==============================

def delete_user():

    user = User.query.filter_by(email="rahul@gmail.com").first()

    if user:
        db.session.delete(user)
        db.session.commit()
        return "User Deleted Successfully"

    return "User Not Found"


# ==============================
# Check Password Route
# ==============================

@app.route("/check-password")
def check_password():

    user = User.query.filter_by(email="rahul@gmail.com").first()

    if not user:
        return {
            "success": False,
            "message": "User not found"
        }

    result = bcrypt.checkpw(
        "123456".encode("utf-8"),
        user.password.encode("utf-8")
    )

    return {
        "email": user.email,
        "password_matches": result,
        "password_hash": user.password
    }
    # ==============================
# Run Flask App
# ==============================

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=app.config["DEBUG"]
    )