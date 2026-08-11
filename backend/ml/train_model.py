import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

# ==========================
# Load Dataset
# ==========================

df = pd.read_csv("dataset.csv")

# ==========================
# Convert extracurricular
# ==========================

df["extracurricular"] = df["extracurricular"].astype(int)

# ==========================
# Features
# ==========================

X = df[
    [
        "attendance",
        "study_hours",
        "assignment_score",
        "internal_marks",
        "previous_gpa",
        "sleep_hours",
        "stress_level",
        "extracurricular",
    ]
]

# Target

y = df["predicted_marks"]

# ==========================
# Train/Test Split
# ==========================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# ==========================
# Train Model
# ==========================

model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

# ==========================
# Save Model
# ==========================

joblib.dump(
    model,
    "saved_models/model.pkl"
)

print("====================================")
print("Model trained successfully.")
print("Model saved to saved_models/model.pkl")
print("====================================")