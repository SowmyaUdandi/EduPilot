import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  exportExcel,
  exportPDF,
} from "../../services/dashboardService";

function Export() {

  return (

    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">

        Export Reports

      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-white shadow-lg rounded-xl p-8">

          <h2 className="text-2xl font-bold mb-4">

            Excel Report

          </h2>

          <p className="mb-6 text-gray-600">

            Download complete prediction history in Excel format.

          </p>

          <button

            onClick={exportExcel}

            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"

          >

            Download Excel

          </button>

        </div>

        <div className="bg-white shadow-lg rounded-xl p-8">

          <h2 className="text-2xl font-bold mb-4">

            PDF Report

          </h2>

          <p className="mb-6 text-gray-600">

            Download prediction history as a professional PDF report.

          </p>

          <button

            onClick={exportPDF}

            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"

          >

            Download PDF

          </button>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default Export;
