import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np


# ==========================================
# Load Dataset
# ==========================================

df = pd.read_csv("dataset.csv")

print("Dataset loaded successfully.")
print("Dataset shape:", df.shape)


# ==========================================
# Convert extracurricular
# ==========================================

df["extracurricular"] = df["extracurricular"].astype(int)


# ==========================================
# Features
# ==========================================

features = [
    "attendance",
    "study_hours",
    "assignment_score",
    "internal_marks",
    "previous_gpa",
    "sleep_hours",
    "stress_level",
    "extracurricular"
]

X = df[features]

# Target
y = df["predicted_marks"]


# ==========================================
# Train/Test Split
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


print("------------------------------------")
print("Training samples:", len(X_train))
print("Testing samples :", len(X_test))
print("------------------------------------")


# ==========================================
# Train Random Forest Model
# ==========================================

model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)


# ==========================================
# Model Evaluation
# ==========================================

y_pred = model.predict(X_test)

mae = mean_absolute_error(y_test, y_pred)

rmse = np.sqrt(mean_squared_error(y_test, y_pred))

r2 = r2_score(y_test, y_pred)


print("\n====================================")
print("MODEL EVALUATION")
print("====================================")

print(f"MAE  : {mae:.2f}")
print(f"RMSE : {rmse:.2f}")
print(f"R²   : {r2:.2f}")


# ==========================================
# Feature Importance
# ==========================================

print("\n====================================")
print("FEATURE IMPORTANCE")
print("====================================")

feature_importance = pd.DataFrame({
    "Feature": features,
    "Importance": model.feature_importances_
})

feature_importance = feature_importance.sort_values(
    by="Importance",
    ascending=False
)

print(feature_importance.to_string(index=False))


# ==========================================
# Save Model
# ==========================================

joblib.dump(
    model,
    "saved_models/model.pkl"
)


print("\n====================================")
print("Model trained successfully.")
print("Model saved to saved_models/model.pkl")
print("====================================")