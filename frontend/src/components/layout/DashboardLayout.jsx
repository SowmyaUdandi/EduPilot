import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 min-w-0">

        <Navbar />

        <main className="p-5 md:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;
