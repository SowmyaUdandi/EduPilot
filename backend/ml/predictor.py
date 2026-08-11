import os
import joblib
import pandas as pd


# ==========================================
# Load trained ML model
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(
    BASE_DIR,
    "saved_models",
    "model.pkl"
)

model = joblib.load(MODEL_PATH)


# ==========================================
# Predict Student Marks
# ==========================================

def predict_marks(student_data):
    """
    Predict student marks using the trained model.
    """

    stress_map = {
        "Low": 1,
        "Medium": 2,
        "High": 3
    }

    stress = student_data.get("stress_level", "Medium")

    if isinstance(stress, str):
        stress = stress_map.get(stress, 2)

    input_data = pd.DataFrame([
        {
            "attendance": float(student_data["attendance"]),
            "study_hours": float(student_data["study_hours"]),
            "assignment_score": float(
                student_data["assignment_score"]
            ),
            "internal_marks": float(
                student_data["internal_marks"]
            ),
            "previous_gpa": float(
                student_data["previous_gpa"]
            ),
            "sleep_hours": float(
                student_data["sleep_hours"]
            ),
            "stress_level": float(stress),
            "extracurricular": int(
                student_data["extracurricular"]
            ),
        }
    ])

    prediction = model.predict(input_data)[0]

    return round(float(prediction), 2)


# ==========================================
# Predict Risk
# ==========================================

def predict_risk(predicted_marks):
    """
    Calculate student risk level
    from predicted marks.
    """

    if predicted_marks >= 80:
        return "Low"

    elif predicted_marks >= 50:
        return "Medium"

    else:
        return "High"