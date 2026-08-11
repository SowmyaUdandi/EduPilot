import os
from dotenv import load_dotenv
from datetime import timedelta

# Load backend/.env specifically
BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..")
)

load_dotenv(
    os.path.join(BASE_DIR, ".env")
)

class Config:

    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "edupilot-secret-key"
    )

    DEBUG = os.getenv("DEBUG") == "True"

    # ==========================================
    # DATABASE
    # ==========================================

    DATABASE_PATH = os.path.abspath(
        os.path.join(
            BASE_DIR,
            "..",
            "instance",
            "edupilot.db"
        )
    )

    SQLALCHEMY_DATABASE_URI = (
        "sqlite:///" +
        DATABASE_PATH.replace("\\", "/")
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # ==========================================
    # JWT
    # ==========================================

    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY",
        "edupilot-jwt-secret"
    )

    JWT_ACCESS_TOKEN_EXPIRES = timedelta(
        hours=8
    )

    # ==========================================
    # ML MODEL
    # ==========================================

    MODEL_PATH = os.getenv(
        "MODEL_PATH",
        "ml/saved_models/model.pkl"
    )

    # ==========================================
    # MAIL
    # ==========================================

    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False

    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")

    MAIL_DEFAULT_SENDER = MAIL_USERNAME