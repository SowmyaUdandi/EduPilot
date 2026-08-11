import pandas as pd

# Load Dataset
df = pd.read_csv("datasets/student_performance_dataset.csv")

print("=" * 60)
print("DATASET SHAPE")
print("=" * 60)
print(df.shape)

print("\n")

print("=" * 60)
print("FIRST 5 ROWS")
print("=" * 60)
print(df.head())

print("\n")

print("=" * 60)
print("DATA TYPES")
print("=" * 60)
print(df.dtypes)

print("\n")

print("=" * 60)
print("MISSING VALUES")
print("=" * 60)
print(df.isnull().sum())

print("\n")

print("=" * 60)
print("STATISTICAL SUMMARY")
print("=" * 60)
print(df.describe())