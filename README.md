\# EduPilot 🎓



\## AI-Powered Student Performance Prediction and Academic Assistance Platform



EduPilot is an AI/ML-based student performance management platform designed to help educational institutions monitor student performance, predict academic outcomes, identify performance risks, and provide personalized recommendations.



The system provides different capabilities for \*\*Administrators, Teachers, and Students\*\*, allowing each role to access features according to their responsibilities.



\---



\## 🎯 Problem Statement



Educational institutions generate large amounts of student academic data such as:



\- Attendance

\- Study hours

\- Assignment scores

\- Internal marks

\- Previous GPA

\- Sleep hours

\- Stress level

\- Extracurricular activities



However, this information is often reviewed manually, making it difficult to identify students who may be at academic risk early.



EduPilot addresses this problem by using machine learning-based prediction and data-driven recommendations to help educators and students make better academic decisions.



\---



\## 💡 Proposed Solution



EduPilot combines:



\- Student performance data

\- Machine learning prediction

\- Risk classification

\- Personalized recommendations

\- Academic analytics

\- Student history

\- Role-based access control

\- AI chatbot assistance



into a single platform.



The system predicts student performance and categorizes academic risk so that teachers and administrators can identify students who may need additional support.



\---



\## 🚀 Key Features



\### 👨‍🎓 Student



Students can:



\- View their dashboard

\- View their profile

\- Check predicted marks

\- View prediction risk

\- Receive recommendations

\- View prediction history

\- Use the AI chatbot

\- Monitor academic progress



\### 👨‍🏫 Teacher



Teachers can:



\- View student records

\- Search and filter students

\- View student details

\- Edit student information

\- Compare student performance

\- Run predictions

\- View recommendations

\- Monitor prediction history

\- Identify students requiring attention



\### 👨‍💼 Administrator



Administrators can:



\- Manage students

\- Add students

\- Edit student records

\- Delete student records

\- View analytics

\- Monitor performance statistics

\- Generate/export reports

\- Access administrative features



\---



\## 🤖 Machine Learning



EduPilot uses machine learning to estimate student performance based on academic and behavioral attributes.



\### Input Features



The system can use information such as:



\- Age

\- Gender

\- Department

\- Semester

\- Attendance

\- Study hours

\- Assignment score

\- Internal marks

\- Previous GPA

\- Sleep hours

\- Stress level

\- Extracurricular activity



\### Prediction Output



The prediction system produces:



\- Predicted marks

\- Academic risk level



Risk levels include:



\- 🟢 Low

\- 🟡 Medium

\- 🔴 High



The prediction results can then be used by the recommendation system to provide appropriate academic guidance.



\---



\## 📊 Analytics



EduPilot provides analytics for monitoring student performance.



Analytics can include:



\- Overall student performance

\- Department-wise performance

\- Monthly performance

\- Risk distribution

\- Top-performing students

\- Performance comparisons



These analytics help administrators and teachers understand academic trends.



\---



\## 💡 Recommendation System



EduPilot provides personalized recommendations based on student performance and academic indicators.



Recommendations can focus on areas such as:



\- Study habits

\- Attendance

\- Assignments

\- Academic performance

\- Time management

\- Overall improvement



The objective is to transform prediction results into actionable academic guidance.



\---



\## 🤖 AI Chatbot



EduPilot includes an AI chatbot interface designed to provide students and users with academic assistance.



The chatbot can serve as an additional interaction layer within the platform.



\---



\## 🔐 Role-Based Access



EduPilot uses role-based access control.



| Feature | Admin | Teacher | Student |

|---|:---:|:---:|:---:|

| Dashboard | ✅ | ✅ | ✅ |

| Student Management | ✅ | ✅ | ❌ |

| Add Student | ✅ | ❌ | ❌ |

| Edit Student | ✅ | ✅ | ❌ |

| Delete Student | ✅ | ❌ | ❌ |

| Student Comparison | ✅ | ✅ | ❌ |

| Prediction | ✅ | ✅ | ✅ |

| Recommendations | ✅ | ✅ | ✅ |

| History | ✅ | ✅ | ✅ |

| Analytics | ✅ | ❌ | ❌ |

| Export Reports | ✅ | ❌ | ❌ |

| AI Chatbot | ✅ | ✅ | ✅ |



\---



\## 🏗️ System Architecture



```text

&#x20;                   ┌──────────────────────┐

&#x20;                   │       User           │

&#x20;                   │ Admin / Teacher /    │

&#x20;                   │       Student        │

&#x20;                   └──────────┬───────────┘

&#x20;                              │

&#x20;                              ▼

&#x20;                   ┌──────────────────────┐

&#x20;                   │   React Frontend     │

&#x20;                   │       + Vite         │

&#x20;                   └──────────┬───────────┘

&#x20;                              │

&#x20;                              │ REST API

&#x20;                              ▼

&#x20;                   ┌──────────────────────┐

&#x20;                   │   Flask Backend      │

&#x20;                   │   Authentication     │

&#x20;                   │   Role Management    │

&#x20;                   │   Business Logic     │

&#x20;                   └───────┬───────┬──────┘

&#x20;                           │       │

&#x20;             ┌─────────────┘       └─────────────┐

&#x20;             ▼                                   ▼

&#x20;   ┌──────────────────┐                ┌──────────────────┐

&#x20;   │     Database     │                │   ML Prediction  │

&#x20;   │      SQLite      │                │     System       │

&#x20;   └──────────────────┘                └────────┬─────────┘

&#x20;                                                │

&#x20;                                                ▼

&#x20;                                     ┌────────────────────┐

&#x20;                                     │ Recommendations    │

&#x20;                                     │ \& Risk Analysis    │

&#x20;                                     └────────────────────┘

