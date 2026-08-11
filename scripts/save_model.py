import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor

# -----------------------------
# Load Dataset
# -----------------------------
df = pd.read_csv("datasets/student_performance_dataset.csv")

# Remove unnecessary columns
df = df.drop(columns=["student_id", "full_name"])

# -----------------------------
# Encode Categorical Columns
# -----------------------------
gender_encoder = LabelEncoder()
department_encoder = LabelEncoder()
extra_encoder = LabelEncoder()

df["gender"] = gender_encoder.fit_transform(df["gender"])
df["department"] = department_encoder.fit_transform(df["department"])
df["extracurricular"] = extra_encoder.fit_transform(df["extracurricular"])

# -----------------------------
# Features & Target
# -----------------------------
X = df.drop("predicted_marks", axis=1)
y = df["predicted_marks"]

# -----------------------------
# Train-Test Split
# -----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42
)

# -----------------------------
# Train Random Forest
# -----------------------------
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

# -----------------------------
# Create Folder
# -----------------------------
os.makedirs("ml/saved_models", exist_ok=True)

# -----------------------------
# Save Model
# -----------------------------
joblib.dump(
    model,
    "ml/saved_models/random_forest_model.pkl"
)

# -----------------------------
# Save Label Encoders
# -----------------------------
joblib.dump(
    {
        "gender": gender_encoder,
        "department": department_encoder,
        "extracurricular": extra_encoder
    },
    "ml/saved_models/label_encoders.pkl"
)

print("✅ Random Forest Model Saved Successfully!")
print("✅ Label Encoders Saved Successfully!")