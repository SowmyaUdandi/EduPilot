import pandas as pd
import numpy as np
from faker import Faker

fake = Faker()

np.random.seed(42)

students = []

departments = ["AIML", "CSE", "ECE", "EEE", "MECH", "CIVIL"]

for i in range(1000):

    attendance = np.random.randint(50, 101)
    study_hours = round(np.random.uniform(1, 8), 1)
    assignment_score = np.random.randint(40, 101)
    internal_marks = np.random.randint(35, 100)
    previous_gpa = round(np.random.uniform(5.0, 10.0), 2)
    sleep_hours = round(np.random.uniform(4, 9), 1)
    stress_level = np.random.randint(1, 11)
    extracurricular = np.random.choice([True, False])
    internet_usage = round(np.random.uniform(1, 8), 1)
    class_participation = np.random.randint(1, 11)

    predicted_marks = (
        0.15 * attendance +
        4 * study_hours +
        0.20 * assignment_score +
        0.20 * internal_marks +
        5 * previous_gpa +
        2 * class_participation -
        1.5 * stress_level +
        0.8 * sleep_hours -
        0.5 * internet_usage +
        np.random.normal(0, 5)
    )

    predicted_marks = max(35, min(100, round(predicted_marks, 2)))

    students.append({
        "student_id": f"S{i+1:04}",
        "full_name": fake.name(),
        "age": np.random.randint(18, 24),
        "gender": np.random.choice(["Male", "Female"]),
        "department": np.random.choice(departments),
        "semester": np.random.randint(1, 9),
        "attendance": attendance,
        "study_hours": study_hours,
        "assignment_score": assignment_score,
        "internal_marks": internal_marks,
        "previous_gpa": previous_gpa,
        "sleep_hours": sleep_hours,
        "stress_level": stress_level,
        "extracurricular": extracurricular,
        "internet_usage": internet_usage,
        "class_participation": class_participation,
        "predicted_marks": predicted_marks
    })

df = pd.DataFrame(students)

df.to_csv("datasets/student_performance_dataset.csv", index=False)

print("✅ Dataset Generated Successfully!")
print(df.head())