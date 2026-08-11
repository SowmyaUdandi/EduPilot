function ComparisonResult({ student1, student2 }) {
  if (!student1 || !student2) return null;

  const winner =
    student1.predicted_marks >= student2.predicted_marks
      ? student1
      : student2;

  const loser =
    student1.predicted_marks >= student2.predicted_marks
      ? student2
      : student1;

  return (
    <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 mt-8">

      <h2 className="text-2xl font-bold text-green-700 mb-4">
        AI Comparison Result
      </h2>

      <p className="text-lg">
        🏆 <b>{winner.full_name}</b> is performing better.
      </p>

      <br />

      <p>
        <b>Predicted Marks:</b>{" "}
        {winner.predicted_marks} vs {loser.predicted_marks}
      </p>

      <p>
        <b>Risk Level:</b>{" "}
        {winner.prediction_risk} vs {loser.prediction_risk}
      </p>

      <p className="mt-4 text-gray-700">
        AI Recommendation:
      </p>

      <ul className="list-disc ml-6 mt-2">
        <li>
          Continue the current learning strategy for {winner.full_name}.
        </li>

        <li>
          Increase study hours and attendance for {loser.full_name}.
        </li>

        <li>
          Provide extra mentoring if the risk level is High.
        </li>
      </ul>

    </div>
  );
}

export default ComparisonResult;

