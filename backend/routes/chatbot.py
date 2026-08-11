from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

chatbot_bp = Blueprint(
    "chatbot",
    __name__
)


@chatbot_bp.route(
    "/api/chatbot",
    methods=["POST"]
)
@jwt_required()
def chatbot():

    data = request.get_json()

    question = data.get("question", "").lower()

    answer = ""

    if "attendance" in question:
        answer = (
            "Maintain at least 85% attendance. Attend every class and avoid unnecessary absences."
        )

    elif "study" in question:
        answer = (
            "Study 3-4 hours daily with 50-minute focused sessions and short breaks."
        )

    elif "marks" in question:
        answer = (
            "Improve assignment scores, attendance, internal marks and revision to increase predicted marks."
        )

    elif "stress" in question:
        answer = (
            "Practice meditation, exercise regularly, and maintain a healthy sleep schedule."
        )

    elif "sleep" in question:
        answer = (
            "Sleep 7-8 hours every night for better concentration and memory."
        )

    elif "recommendation" in question:
        answer = (
            "Focus on weak subjects, solve previous papers, and revise daily."
        )

    else:
        answer = (
            "I'm EduPilot AI Assistant. Ask me about attendance, study hours, marks, stress, sleep, or recommendations."
        )

    return jsonify({
        "success": True,
        "answer": answer
    }), 200