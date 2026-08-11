from flask import Blueprint

from utils.response import success_response

health_bp = Blueprint("health", __name__)


@health_bp.route("/api/health", methods=["GET"])
def health():
    return success_response(
        message="EduPilot Backend is Healthy",
        data={
            "service": "Backend API",
            "version": "1.0.0"
        }
    )