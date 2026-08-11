import { useEffect, useState } from "react";
import { getRecommendations } from "../../services/dashboardService";

function StudentRecommendations({
  studentId,
  onRecommendationsLoaded,
}) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, [studentId]);

  const loadRecommendations = async () => {
    try {
      setLoading(true);

      const response = await getRecommendations(studentId);

      if (response.success) {
        setRecommendations(response.recommendations);

        // Send recommendations to parent component
        if (onRecommendationsLoaded) {
          onRecommendationsLoaded(response.recommendations);
        }
      } else {
        setRecommendations([]);
      }
    } catch (error) {
      console.error("Recommendation Error:", error);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-emerald-600">
          AI Recommendations
        </h2>

        <p className="text-gray-500">
          Loading recommendations...
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-4 text-emerald-600">
        AI Recommendations
      </h2>

      {recommendations.length === 0 ? (
        <p className="text-gray-500">
          No recommendations available.
        </p>
      ) : (
        <ul className="space-y-3">
          {recommendations.map((item, index) => (
            <li
              key={index}
              className="bg-emerald-50 border-l-4 border-emerald-600 p-3 rounded"
            >
              ✅ {item}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default StudentRecommendations;

