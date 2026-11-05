import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function Login() {
  const { login, users } = useApp();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sign In Portal</h2>
          <p className="text-sm text-gray-500 mt-1">
            Access student and instructor dashboards
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. first@admin.com"
            />
          </div>

          {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-all shadow-sm"
          >
            Enter Dashboard
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            ⚡ Quick Walkthrough Switcher:
          </label>
          <select
            onChange={(e) => login(e.target.value)}
            defaultValue=""
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg p-2 outline-none cursor-pointer"
          >
            <option value="" disabled>
              Choose a role to sign in instantly...
            </option>
            {users.map((u) => (
              <option key={u.id} value={u.email}>
                {u.name} ({u.role})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
