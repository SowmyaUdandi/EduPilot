from flask import Blueprint, request, jsonify
import bcrypt
import random
import secrets

from datetime import datetime, timedelta

from flask_mail import Message
from flask_jwt_extended import create_access_token

from database.database import db

from models.user import User
from models.password_reset import PasswordReset
from models.email_verification import EmailVerification

from services.mail_service import mail

auth_bp = Blueprint("auth", __name__)


# ======================================================
# REGISTER USER
# POST /api/register
# ======================================================

@auth_bp.route("/api/register", methods=["POST"])
def register():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No data received"
        }), 400

    existing_user = User.query.filter_by(
        email=data.get("email")
    ).first()

    if existing_user:
        return jsonify({
            "success": False,
            "message": "Email already registered"
        }), 400

    hashed_password = bcrypt.hashpw(
        data["password"].encode("utf-8"),
        bcrypt.gensalt()
    )

    user = User(
    full_name=data["full_name"],
    email=data["email"],
    password=hashed_password.decode("utf-8"),
    role="student",
    is_verified=False
)

    db.session.add(user)
    db.session.commit()

    # Remove old verification token if exists
    EmailVerification.query.filter_by(
        email=user.email
    ).delete()

    token = secrets.token_urlsafe(32)

    verification = EmailVerification(
        email=user.email,
        token=token
    )

    db.session.add(verification)
    db.session.commit()

    verification_link = (
        f"http://localhost:5173/verify-email/{token}"
    )

    msg = Message(
        subject="Verify Your EduPilot Account",
        recipients=[user.email]
    )

    msg.body = f"""
Hello {user.full_name},

Welcome to EduPilot!

Please verify your email by clicking the link below:

{verification_link}

If you did not create this account, simply ignore this email.

EduPilot Team
"""

    mail.send(msg)

    return jsonify({
        "success": True,
        "message": "Registration successful. Please verify your email."
    }), 201


# ======================================================
# VERIFY EMAIL
# ======================================================

@auth_bp.route("/api/verify-email/<token>", methods=["GET"])
def verify_email(token):

    verification = EmailVerification.query.filter_by(
        token=token
    ).first()

    if verification is None:
        return jsonify({
            "success": False,
            "message": "Invalid verification link"
        }), 400

    user = User.query.filter_by(
        email=verification.email
    ).first()

    if user is None:
        return jsonify({
            "success": False,
            "message": "User not found"
        }), 404

    # Already verified
    if user.is_verified:
        return jsonify({
            "success": True,
            "message": "Email already verified."
        }), 200

    user.is_verified = True

    db.session.delete(verification)

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Email verified successfully. You can login now."
    }), 200
    # ======================================================
# FORGOT PASSWORD
# POST /api/forgot-password
# ======================================================

@auth_bp.route("/api/forgot-password", methods=["POST"])
def forgot_password():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No data received"
        }), 400

    email = data.get("email")

    if not email:
        return jsonify({
            "success": False,
            "message": "Email is required"
        }), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({
            "success": False,
            "message": "Email not registered"
        }), 404

    otp = str(random.randint(100000, 999999))

    # Delete old OTP if exists
    PasswordReset.query.filter_by(email=email).delete()

    reset = PasswordReset(
        email=email,
        otp=otp
    )

    db.session.add(reset)
    db.session.commit()

    msg = Message(
        subject="EduPilot Password Reset OTP",
        recipients=[email]
    )

    msg.body = f"""
Hello,

Your EduPilot Password Reset OTP is:

{otp}

This OTP is valid for 10 minutes.

Do not share this OTP with anyone.

EduPilot Team
"""

    mail.send(msg)

    return jsonify({
        "success": True,
        "message": "OTP sent successfully"
    }), 200


# ======================================================
# RESET PASSWORD
# POST /api/reset-password
# ======================================================

@auth_bp.route("/api/reset-password", methods=["POST"])
def reset_password():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No data received"
        }), 400

    email = data.get("email")
    otp = data.get("otp")
    new_password = data.get("new_password")

    if not email or not otp or not new_password:
        return jsonify({
            "success": False,
            "message": "All fields are required"
        }), 400

    reset = PasswordReset.query.filter_by(
        email=email,
        otp=otp
    ).first()

    if not reset:
        return jsonify({
            "success": False,
            "message": "Invalid OTP"
        }), 400

    if datetime.utcnow() - reset.created_at > timedelta(minutes=10):

        db.session.delete(reset)
        db.session.commit()

        return jsonify({
            "success": False,
            "message": "OTP has expired"
        }), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found"
        }), 404

    hashed_password = bcrypt.hashpw(
        new_password.encode("utf-8"),
        bcrypt.gensalt()
    )

    user.password = hashed_password.decode("utf-8")

    db.session.delete(reset)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Password reset successfully"
    }), 200

    # ======================================================
# LOGIN USER
# POST /api/login
# ======================================================

@auth_bp.route("/api/login", methods=["POST"])
def login():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No data received"
        }), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Email and Password are required"
        }), 400

    # -----------------------------------
    # Find User
    # -----------------------------------

    user = User.query.filter_by(email=email).first()

    print("===================================")
    print("Email received:", email)

    if not user:
        print("User NOT found")
        print("===================================")
        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        }), 401

    print("User found:", user.email)
    print("Verified:", user.is_verified)
    print("Stored Password:", user.password)

    # -----------------------------------
    # Check Email Verification
    # -----------------------------------

    if not user.is_verified:
        print("Email NOT verified")
        print("===================================")

        return jsonify({
            "success": False,
            "message": "Please verify your email before logging in."
        }), 403

    # -----------------------------------
    # Verify Password
    # -----------------------------------

    password_match = bcrypt.checkpw(
        password.encode("utf-8"),
        user.password.encode("utf-8")
    )

    print("Password Match:", password_match)

    if not password_match:
        print("Wrong Password")
        print("===================================")

        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        }), 401

    # -----------------------------------
    # Generate JWT Token
    # -----------------------------------

    access_token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "email": user.email,
            "role": user.role
        }
    )

    print("Login Successful")
    print("===================================")

    return jsonify({
        "success": True,
        "message": "Login successful",
        "access_token": access_token,
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role
        }
    }), 200