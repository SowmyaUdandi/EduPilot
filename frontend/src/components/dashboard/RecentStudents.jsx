function RecentStudents({ students }) {

  const recentStudents = [...students]
    .reverse()
    .slice(0, 5);


  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-xl font-bold text-emerald-600 mb-5">
        👨‍🎓 Recent Students
      </h2>


      {recentStudents.length === 0 ? (

        <p className="text-gray-500">
          No students available
        </p>

      ) : (

        <div className="space-y-4">

          {recentStudents.map((student) => (

            <div
              key={student.id}
              className="flex justify-between items-center border-b pb-3 hover:bg-gray-50 px-2"
            >

              <div>

                <h3 className="font-bold">
                  {student.full_name}
                </h3>

                <p className="text-sm text-gray-500">
                  {student.department} • Semester {student.semester}
                </p>

              </div>


              <div className="text-right">

                <p className="font-bold text-emerald-600">
                  {student.predicted_marks ?? "N/A"}
                </p>

                <span
                  className={`text-xs font-bold ${
                    student.prediction_risk === "High"
                      ? "text-red-600"
                      : student.prediction_risk === "Medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {student.prediction_risk ?? "N/A"}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default RecentStudents;

