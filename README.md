from pathlib import Path

readme = r"""# EduPilot 🎓

## AI-Powered Student Performance Prediction and Academic Assistance Platform

EduPilot is an AI/ML-based student performance management platform designed to help educational institutions monitor student performance, predict academic outcomes, identify performance risks, and provide personalized recommendations.

The platform provides role-based capabilities for **Administrators, Teachers, and Students**.

---

## 🎯 Problem Statement

Educational institutions collect large amounts of academic and behavioral information, including:

- Attendance
- Study hours
- Assignment scores
- Internal marks
- Previous GPA
- Sleep hours
- Stress level
- Extracurricular activities

Reviewing these factors manually can make it difficult to identify students who may be at academic risk early.

EduPilot addresses this problem by combining machine learning prediction, academic analytics, prediction history, and personalized recommendations in a single platform.

---

## 💡 Proposed Solution

EduPilot combines:

- Student performance data
- Machine learning prediction
- Academic risk classification
- Personalized recommendations
- Academic analytics
- Prediction history
- Role-based access control
- Student management
- AI chatbot assistance
- Report export

The system predicts student performance and classifies the predicted result into a risk level so that educators can identify students who may need additional academic support.

---

## 🚀 Key Features

### 👨‍🎓 Student

Students can:

- View their dashboard
- View their profile
- Check predicted marks
- View prediction risk
- Receive recommendations
- View prediction history
- Monitor academic progress
- Use the AI chatbot
- Manage profile/settings

### 👨‍🏫 Teacher

Teachers can:

- View student records
- Search and filter students
- View student details
- Edit student information
- Compare student performance
- Run predictions
- View recommendations
- Monitor prediction history
- Identify students requiring attention

### 👨‍💼 Administrator

Administrators can:

- Manage students
- Add student records
- Edit student records
- Delete student records
- View analytics
- Monitor performance statistics
- Generate/export reports
- Access administrative features

---

## 🤖 Machine Learning

EduPilot uses a **Random Forest Regressor** to predict student marks.

### Input Features

The trained model uses these eight features:

1. Attendance
2. Study hours
3. Assignment score
4. Internal marks
5. Previous GPA
6. Sleep hours
7. Stress level
8. Extracurricular activity

### Prediction Output

The model produces:

- Predicted marks
- Academic risk level

### Risk Classification

| Predicted Marks | Risk Level |
|---:|---|
| 80–100 | Low |
| 50–79.99 | Medium |
| Below 50 | High |

---

## 📊 Model Evaluation

The trained model was evaluated using a train/test split with a fixed random state.

| Metric | Result |
|---|---:|
| MAE | **0.89** |
| RMSE | **1.07** |
| R² | **0.94** |

These results indicate that the current trained model performs well on the available test data.

### Feature Importance

The Random Forest feature importance values obtained during evaluation were:

| Feature | Importance |
|---|---:|
| Previous GPA | 0.201459 |
| Assignment Score | 0.196599 |
| Attendance | 0.161292 |
| Internal Marks | 0.152676 |
| Study Hours | 0.149674 |
| Stress Level | 0.064769 |
| Sleep Hours | 0.047463 |
| Extracurricular | 0.026069 |

---

## 📈 Analytics

EduPilot provides analytics for monitoring student performance, including:

- Overall student performance
- Department-wise performance
- Monthly performance
- Risk distribution
- Top-performing students
- Performance comparisons

These analytics help educators understand academic trends and identify students who may require attention.

---

## 💡 Recommendation System

The recommendation module transforms prediction and academic information into actionable guidance.

Recommendations can focus on:

- Study habits
- Attendance
- Assignments
- Academic performance
- Time management
- Overall improvement

---

## 🤖 AI Chatbot

EduPilot includes an AI chatbot interface that provides an additional academic-assistance interaction layer for users.

---

## 🔐 Authentication and Security

The backend uses:

- JWT-based authentication
- Role-based access control
- Password management
- Email verification support
- Password reset support
- Protected routes

---

## 🏗️ System Architecture

```text
+-----------------------+
|       User            |
| Student / Teacher /   |
| Administrator         |
+-----------+-----------+
            |
            v
+-----------------------+
| React Frontend        |
| Dashboard, Forms,     |
| Analytics, History,   |
| Prediction, Chatbot   |
+-----------+-----------+
            |
            | HTTP / REST API
            v
+-----------------------+
| Flask Backend         |
| Authentication       |
| Student Management   |
| Prediction           |
| Recommendation       |
| Analytics            |
| History / Export     |
| Chatbot              |
+-----------+-----------+
            |
      +-----+------+
      |            |
      v            v
+-----------+  +----------------+
| Database  |  | ML Model       |
| SQLite /  |  | Random Forest  |
| SQLAlchemy|  | Regressor      |
+-----------+  +----------------+