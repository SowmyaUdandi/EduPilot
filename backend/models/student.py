from database.database import db

class Student(db.Model):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)

    student_id = db.Column(db.String(20), unique=True, nullable=False)

    full_name = db.Column(db.String(100), nullable=False)

    email = db.Column(db.String(100), unique=True)

    age = db.Column(db.Integer)

    gender = db.Column(db.String(20))

    department = db.Column(db.String(50))

    semester = db.Column(db.Integer)

    attendance = db.Column(db.Float)

    study_hours = db.Column(db.Float)

    assignment_score = db.Column(db.Float)

    internal_marks = db.Column(db.Float)

    previous_gpa = db.Column(db.Float)

    sleep_hours = db.Column(db.Float)

    stress_level = db.Column(db.String(20))

    extracurricular = db.Column(db.Boolean)

    predicted_marks = db.Column(db.Float)

    prediction_risk = db.Column(db.String(20))