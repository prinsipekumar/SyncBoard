import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/common/Navbar";
import Login from "./components/common/Login";
import StudentDashboard from "./components/student/StudentDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";

function DashboardShell() {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentUser.role === "admin" ? (
          <AdminDashboard />
        ) : (
          <StudentDashboard />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <DashboardShell />
    </AppProvider>
  );
}
