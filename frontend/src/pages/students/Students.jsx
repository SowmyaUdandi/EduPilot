import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getStudents,
  deleteStudent,
} from "../../services/dashboardService";

function Students() {
  const navigate = useNavigate();

  // ==================================================
  // Logged-in User
  // ==================================================

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const role = (
    user?.role || ""
  ).toLowerCase();

  // ==================================================
  // State
  // ==================================================

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==================================================
  // Search
  // ==================================================

  const [search, setSearch] = useState("");

  // ==================================================
  // Filters
  // ==================================================

  const [departmentFilter, setDepartmentFilter] =
    useState("");

  const [riskFilter, setRiskFilter] =
    useState("");

  const [semesterFilter, setSemesterFilter] =
    useState("");

  // ==================================================
  // Pagination
  // ==================================================

  const [currentPage, setCurrentPage] =
    useState(1);

  const studentsPerPage = 5;

  // ==================================================
  // Load Students
  // ==================================================

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);

      const response = await getStudents();

      if (response?.success) {
        setStudents(response.students || []);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error(
        "Students Load Error:",
        error
      );

      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // Delete Student
  // Admin Only
  // ==================================================

  const handleDelete = async (id) => {
    // Extra frontend protection
    if (role !== "admin") {
      alert(
        "Only administrators can delete students."
      );
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await deleteStudent(id);

      if (response?.success) {
        await loadStudents();
      } else {
        alert(
          response?.message ||
            "Unable to delete student."
        );
      }
    } catch (error) {
      console.error(
        "Delete Student Error:",
        error
      );

      if (
        error.response &&
        error.response.status === 403
      ) {
        alert(
          "You are not authorized to delete students."
        );
      } else {
        alert("Failed to delete student.");
      }
    }
  };

  // ==================================================
  // Search + Filters
  // ==================================================

  const filteredStudents = students.filter(
    (student) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        student.full_name
          ?.toLowerCase()
          .includes(keyword) ||
        student.student_id
          ?.toLowerCase()
          .includes(keyword) ||
        student.department
          ?.toLowerCase()
          .includes(keyword);

      const matchesDepartment =
        departmentFilter === "" ||
        student.department === departmentFilter;

      const matchesRisk =
        riskFilter === "" ||
        student.prediction_risk === riskFilter;

      const matchesSemester =
        semesterFilter === "" ||
        String(student.semester) ===
          semesterFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesRisk &&
        matchesSemester
      );
    }
  );

  // ==================================================
  // Pagination
  // ==================================================

  const indexOfLastStudent =
    currentPage * studentsPerPage;

  const indexOfFirstStudent =
    indexOfLastStudent - studentsPerPage;

  const currentStudents =
    filteredStudents.slice(
      indexOfFirstStudent,
      indexOfLastStudent
    );

  const totalPages = Math.ceil(
    filteredStudents.length /
      studentsPerPage
  );

  // ==================================================
  // Loading Screen
  // ==================================================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>

            <h1 className="text-xl font-semibold text-slate-700 mt-4">
              Loading Students...
            </h1>

            <p className="text-slate-400 text-sm mt-1">
              Please wait
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ==================================================
  // Main Page
  // ==================================================

  return (
    <DashboardLayout>

      {/* =================================================
          Header
      ================================================= */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

        <div>
          <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide">
            Student Management
          </p>

          <h1 className="text-3xl font-bold text-slate-800 mt-1">
            Students
          </h1>

          <p className="text-slate-500 mt-1">
            Manage and monitor student performance
          </p>
        </div>

        {/* ===============================================
            ADD STUDENT
            ADMIN ONLY
        =============================================== */}

        {role === "admin" && (
          <button
            onClick={() =>
              navigate("/students/add")
            }
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200"
          >
            + Add Student
          </button>
        )}

      </div>

      {/* =================================================
          Search & Filters
      ================================================= */}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-6">

        <div className="flex flex-wrap gap-3">

          {/* Search */}

          <input
            type="text"
            placeholder="Search by Name, Student ID or Department..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none rounded-xl px-4 py-2.5 w-full md:w-72 transition"
          />

          {/* Department */}

          <select
            value={departmentFilter}
            onChange={(e) => {
              setDepartmentFilter(
                e.target.value
              );
              setCurrentPage(1);
            }}
            className="border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none rounded-xl px-4 py-2.5 transition"
          >
            <option value="">
              All Departments
            </option>

            <option value="AIML">
              AIML
            </option>

            <option value="CSE">
              CSE
            </option>

            <option value="ECE">
              ECE
            </option>

            <option value="EEE">
              EEE
            </option>

            <option value="ME">
              ME
            </option>
          </select>

          {/* Risk */}

          <select
            value={riskFilter}
            onChange={(e) => {
              setRiskFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none rounded-xl px-4 py-2.5 transition"
          >
            <option value="">
              All Risk
            </option>

            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>
          </select>

          {/* Semester */}

          <select
            value={semesterFilter}
            onChange={(e) => {
              setSemesterFilter(
                e.target.value
              );
              setCurrentPage(1);
            }}
            className="border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none rounded-xl px-4 py-2.5 transition"
          >
            <option value="">
              All Semester
            </option>

            {[1, 2, 3, 4, 5, 6, 7, 8].map(
              (sem) => (
                <option
                  key={sem}
                  value={sem}
                >
                  Semester {sem}
                </option>
              )
            )}
          </select>

          {/* Reset */}

          <button
            onClick={() => {
              setSearch("");
              setDepartmentFilter("");
              setRiskFilter("");
              setSemesterFilter("");
              setCurrentPage(1);
            }}
            className="bg-slate-700 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-medium transition"
          >
            Reset
          </button>

        </div>

      </div>

      {/* =================================================
          Students Table
      ================================================= */}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            {/* =================================================
                Table Header
            ================================================= */}

            <thead className="bg-slate-800 text-white">

              <tr>

                <th className="p-4 text-left text-sm font-semibold">
                  Student ID
                </th>

                <th className="text-left text-sm font-semibold">
                  Name
                </th>

                <th className="text-left text-sm font-semibold">
                  Department
                </th>

                <th className="text-left text-sm font-semibold">
                  Semester
                </th>

                <th className="text-left text-sm font-semibold">
                  Attendance
                </th>

                <th className="text-left text-sm font-semibold">
                  Predicted Marks
                </th>

                <th className="text-left text-sm font-semibold">
                  Risk
                </th>

                <th className="text-center text-sm font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            {/* =================================================
                Table Body
            ================================================= */}

            <tbody>

              {currentStudents.length > 0 ? (
                currentStudents.map(
                  (student) => (
                    <tr
                      key={student.id}
                      className="border-b border-slate-100 text-center hover:bg-emerald-50/40 transition"
                    >

                      {/* Student ID */}

                      <td className="p-4 text-left font-medium text-slate-700">
                        {student.student_id}
                      </td>

                      {/* Name */}

                      <td className="text-left text-slate-700 font-medium">
                        {student.full_name}
                      </td>

                      {/* Department */}

                      <td className="text-left text-slate-600">
                        {student.department}
                      </td>

                      {/* Semester */}

                      <td className="text-left text-slate-600">
                        {student.semester}
                      </td>

                      {/* Attendance */}

                      <td className="text-left text-slate-600">
                        {student.attendance}%
                      </td>

                      {/* Predicted Marks */}

                      <td className="text-left text-slate-700 font-medium">
                        {student.predicted_marks ??
                          "N/A"}
                      </td>

                      {/* Risk */}

                      <td className="text-left">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            student.prediction_risk ===
                            "Low"
                              ? "bg-emerald-100 text-emerald-700"
                              : student.prediction_risk ===
                                "Medium"
                              ? "bg-amber-100 text-amber-700"
                              : student.prediction_risk ===
                                "High"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {student.prediction_risk ??
                            "N/A"}
                        </span>

                      </td>

                      {/* Actions */}

                      <td>

                        <div className="flex justify-center gap-2">

                          {/* VIEW */}

                          {(role === "admin" ||
                            role === "teacher") && (
                            <button
                              onClick={() =>
                                navigate(
                                  `/students/view/${student.id}`
                                )
                              }
                              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
                            >
                              View
                            </button>
                          )}

                          {/* EDIT */}

                          {(role === "admin" ||
                            role === "teacher") && (
                            <button
                              onClick={() =>
                                navigate(
                                  `/students/edit/${student.id}`
                                )
                              }
                              className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
                            >
                              Edit
                            </button>
                          )}

                          {/* DELETE */}

                          {role === "admin" && (
                            <button
                              onClick={() =>
                                handleDelete(
                                  student.id
                                )
                              }
                              className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
                            >
                              Delete
                            </button>
                          )}

                        </div>

                      </td>

                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-12 text-slate-500"
                  >
                    <div className="text-3xl mb-2">
                      🎓
                    </div>

                    <p className="font-medium text-slate-700">
                      No Students Found
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =================================================
          Pagination
      ================================================= */}

      <div className="flex justify-center items-center gap-4 mt-6">

        {/* Previous */}

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(
              (prev) => prev - 1
            )
          }
          className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {/* Page Number */}

        <span className="font-semibold text-slate-600">
          Page {currentPage} of{" "}
          {totalPages || 1}
        </span>

        {/* Next */}

        <button
          disabled={
            currentPage === totalPages ||
            totalPages === 0
          }
          onClick={() =>
            setCurrentPage(
              (prev) => prev + 1
            )
          }
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>

      </div>

    </DashboardLayout>
  );
}

export default Students;

