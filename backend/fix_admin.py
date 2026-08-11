import sqlite3

db_path = "../instance/edupilot.db"

conn = sqlite3.connect(db_path)

conn.execute(
    "UPDATE users SET email = ?, role = ?, is_verified = ? WHERE email = ?",
    ("admin@gmail.com", "admin", 1, "hello@gmail.com")
)

conn.commit()

users = conn.execute(
    "SELECT id, email, role, is_verified FROM users"
).fetchall()

print("USERS:")
for user in users:
    print(user)

conn.close()