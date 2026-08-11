import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)

# Load Dataset
df = pd.read_csv("datasets/student_performance_dataset.csv")

# Drop unnecessary columns
df = df.drop(columns=["student_id", "full_name"])

# Encode categorical columns
encoder = LabelEncoder()

df["gender"] = encoder.fit_transform(df["gender"])
df["department"] = encoder.fit_transform(df["department"])
df["extracurricular"] = encoder.fit_transform(df["extracurricular"])

# Features and Target
X = df.drop("predicted_marks", axis=1)
y = df["predicted_marks"]

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42
)

# Train Random Forest
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

# Prediction
y_pred = model.predict(X_test)

# Evaluation
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = mse ** 0.5
r2 = r2_score(y_test, y_pred)

print("=" * 60)
print("RANDOM FOREST RESULTS")
print("=" * 60)

print(f"MAE  : {mae:.2f}")
print(f"MSE  : {mse:.2f}")
print(f"RMSE : {rmse:.2f}")
print(f"R2 Score : {r2:.4f}")