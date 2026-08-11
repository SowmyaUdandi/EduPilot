from app import app
from database.database import db
from models.user import User
import bcrypt

with app.app_context():

    email = "teacher@gmail.com"

    existing = User.query.filter_by(email=email).first()

    if existing:
        print("Teacher already exists.")
    else:

        hashed_password = bcrypt.hashpw(
            "123456".encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

        teacher = User(
            full_name="Teacher",
            email=email,
            password=hashed_password,
            role="teacher",
            is_verified=True
        )

        db.session.add(teacher)
        db.session.commit()

        print("Teacher account created successfully!")
        print("----------------------------------")
        print("Email    : teacher@gmail.com")
        print("Password : 123456")
        print("Role     : teacher")