import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getHistory } from "../../services/dashboardService";

function History() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {

    try {

      const response = await getHistory();

      if (response.success) {
        setHistory(response.history);
      }

    } catch (error) {

      console.error("History Error:", error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">
        Prediction History
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Previous Predictions
          </h2>

          <span className="bg-emerald-600 text-white px-4 py-2 rounded-lg">
            Total Records: {history.length}
          </span>

        </div>

        {loading ? (

          <div className="text-center py-10 text-gray-500">
            Loading Prediction History...
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead className="bg-emerald-600 text-white">

                <tr>

                  <th className="p-3">Student ID</th>

                  <th className="p-3">Student Name</th>

                  <th className="p-3">Predicted Marks</th>

                  <th className="p-3">Risk Level</th>

                  <th className="p-3">Prediction Date</th>

                </tr>

              </thead>

              <tbody>

                {history.length > 0 ? (

                  history.map((item) => (

                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-100 text-center"
                    >

                      <td className="p-3">
                        {item.student_id}
                      </td>

                      <td className="p-3">
                        {item.student_name}
                      </td>

                      <td className="p-3 font-bold text-emerald-600">
                        {item.predicted_marks}
                      </td>

                      <td
                        className={`p-3 font-bold ${
                          item.prediction_risk === "Low"
                            ? "text-green-600"
                            : item.prediction_risk === "Medium"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.prediction_risk}
                      </td>

                      <td className="p-3">
                        {item.created_at}
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center p-8 text-gray-500"
                    >
                      No Prediction History Available
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </DashboardLayout>

  );

}

export default History;
