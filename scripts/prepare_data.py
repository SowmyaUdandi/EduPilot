import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Load Dataset
df = pd.read_csv("datasets/student_performance_dataset.csv")

# Drop columns not useful for prediction
df = df.drop(columns=["student_id", "full_name"])

# Encode categorical columns
label_encoder = LabelEncoder()

df["gender"] = label_encoder.fit_transform(df["gender"])
df["department"] = label_encoder.fit_transform(df["department"])
df["extracurricular"] = label_encoder.fit_transform(df["extracurricular"])

# Features
X = df.drop("predicted_marks", axis=1)

# Target
y = df["predicted_marks"]

# Split Dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

print("=" * 60)
print("Training Data Shape")
print(X_train.shape)

print("=" * 60)
print("Testing Data Shape")
print(X_test.shape)

print("=" * 60)
print("Feature Columns")
print(list(X.columns))