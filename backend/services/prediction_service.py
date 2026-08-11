import joblib
import pandas as pd
import os

# Load trained model
MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "..",
    "ml",
    "saved_models",
    "model.pkl"
)

model = joblib.load(MODEL_PATH)


def predict_marks(student_data):

    df = pd.DataFrame([student_data])

    prediction = model.predict(df)

    return round(float(prediction[0]), 2)