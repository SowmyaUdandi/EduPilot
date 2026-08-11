function HighRiskStudents({ highRiskStudents }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-red-600 mb-4">
        High Risk Students
      </h2>

      {highRiskStudents.length === 0 ? (
        <p className="text-gray-500">
          No High Risk Students
        </p>
      ) : (
        highRiskStudents.map((student) => (
          <div
            key={student.id}
            className="flex justify-between border-b py-2"
          >
            <span>{student.full_name}</span>

            <span className="font-bold text-red-600">
              {student.predicted_marks}
            </span>
          </div>
        ))
      )}

    </div>
  );
}

export default HighRiskStudents;
