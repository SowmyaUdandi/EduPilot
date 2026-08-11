from database.database import db
from datetime import datetime


class History(db.Model):
    __tablename__ = "prediction_history"

    id = db.Column(db.Integer, primary_key=True)

    student_id = db.Column(
        db.Integer,
        db.ForeignKey("students.id")
    )

    predicted_marks = db.Column(db.Float)

    prediction_risk = db.Column(db.String(20))

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    # Relationship
    student = db.relationship(
        "Student",
        backref="history"
    )