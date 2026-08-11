function TopPerformers({ topPerformers }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Top Performers
      </h2>

      {topPerformers.length === 0 ? (
        <p className="text-gray-500">
          No Top Performers
        </p>
      ) : (
        topPerformers.map((student) => (
          <div
            key={student.id}
            className="flex justify-between border-b py-2"
          >
            <span>{student.full_name}</span>

            <span className="font-bold text-green-600">
              {student.predicted_marks}
            </span>
          </div>
        ))
      )}

    </div>
  );
}

export default TopPerformers;
