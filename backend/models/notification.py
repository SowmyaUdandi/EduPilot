from database.database import db
from datetime import datetime


class Notification(db.Model):

    __tablename__ = "notifications"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(100), nullable=False)

    description = db.Column(db.String(300), nullable=False)

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )