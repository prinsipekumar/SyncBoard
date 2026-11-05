import { useApp } from "../../context/AppContext";

export default function Navbar() {
  const { currentUser, logout } = useApp();

  return (
    <nav className="bg-white border-b border-slate-200 px-4 py-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-3 sticky top-0 z-40 shadow-xs">
      <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
        <span className="text-xl font-extrabold text-indigo-600 tracking-tight whitespace-nowrap">
          SyncBoard
        </span>
        <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide whitespace-nowrap">
          {currentUser?.role} Workspace
        </span>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 border-slate-100 pt-2.5 sm:pt-0">
        <div className="text-left sm:hidden">
          <p className="text-xs font-bold text-slate-800 truncate max-w-[150px]">
            {currentUser?.name}
          </p>
        </div>

        <div className="text-right hidden sm:block border-r border-slate-100 pr-4">
          <p className="text-sm font-bold text-slate-800 whitespace-nowrap">
            {currentUser?.role === "admin" ? "💼" : "🎓"} {currentUser?.name}
          </p>
          <p className="text-xs text-slate-400 font-medium whitespace-nowrap">
            {currentUser?.email}
          </p>
        </div>

        <button
          onClick={logout}
          style={{ cursor: "pointer" }}
          className="bg-slate-50 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-600 px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-slate-200 shadow-xs whitespace-nowrap shrink-0"
        >
          Exit Session
        </button>
      </div>
    </nav>
  );
}
