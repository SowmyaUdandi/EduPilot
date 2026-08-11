from database.database import db
from datetime import datetime


class EmailVerification(db.Model):
    __tablename__ = "email_verifications"

    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(
        db.String(120),
        nullable=False
    )

    token = db.Column(
        db.String(200),
        nullable=False,
        unique=True
    )

    verified = db.Column(
        db.Boolean,
        default=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )
