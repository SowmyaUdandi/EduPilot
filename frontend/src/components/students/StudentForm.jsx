import { useState, useEffect } from "react";

function StudentForm({ onSubmit, editingStudent }) {
  const [student, setStudent] = useState({
    full_name: "",
    email: "",
    department: "",
    attendance: "",
  });

  useEffect(() => {
    if (editingStudent) {
      setStudent(editingStudent);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(student);

    if (!editingStudent) {
      setStudent({
        full_name: "",
        email: "",
        department: "",
        attendance: "",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg mb-6"
    >
      <h2 className="text-2xl font-bold mb-5">
        {editingStudent ? "Edit Student" : "Add Student"}
      </h2>

      <input
        type="text"
        name="full_name"
        placeholder="Full Name"
        value={student.full_name}
        onChange={handleChange}
        className="w-full border rounded-lg p-3 mb-3"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={student.email}
        onChange={handleChange}
        className="w-full border rounded-lg p-3 mb-3"
        required
      />

      <input
        type="text"
        name="department"
        placeholder="Department"
        value={student.department}
        onChange={handleChange}
        className="w-full border rounded-lg p-3 mb-3"
        required
      />

      <input
        type="number"
        name="attendance"
        placeholder="Attendance"
        value={student.attendance}
        onChange={handleChange}
        className="w-full border rounded-lg p-3 mb-5"
        required
      />

      <button
        type="submit"
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg"
      >
        {editingStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}

export default StudentForm;
