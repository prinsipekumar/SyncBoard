import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";

export default function AssignmentForm({ task, onClose }) {
  const { users, addAssignment, editAssignment } = useApp();

  const cohort = users.filter((u) => u.role === "student");
  const cohortIdsStr = cohort.map((s) => s.id).join(",");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("https://google.com");
  const [mode, setMode] = useState("all");
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDesc(task.description);
      setDate(task.dueDate);
      setLink(task.driveLink);
      setSelected(task.assignedTo || []);
      setMode(task.assignedTo?.length === cohort.length ? "all" : "custom");
    } else {
      setTitle("");
      setDesc("");
      setDate("");
      setLink("https://google.com");
      setSelected(cohort.map((s) => s.id));
      setMode("all");
    }
  }, [task, cohortIdsStr]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title,
      description: desc,
      dueDate: date,
      driveLink: link,
      assignedTo: mode === "all" ? cohort.map((s) => s.id) : selected,
    };
    if (task) editAssignment(task.id, payload);
    else addAssignment(payload);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 overflow-y-auto flex-1 pr-1"
    >
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
          Title Header
        </label>
        <input
          required
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
          Guidelines Description
        </label>
        <textarea
          required
          rows={3}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
            Deadline Target
          </label>
          <input
            required
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
            Drive Target Link
          </label>
          <input
            required
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
          Cohort Allocation Rules
        </label>
        <div className="flex gap-4 mb-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="radio"
              name="allocationMode"
              checked={mode === "all"}
              onChange={() => {
                setMode("all");
                setSelected(cohort.map((s) => s.id));
              }}
            />{" "}
            All Students
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="radio"
              name="allocationMode"
              checked={mode === "custom"}
              onChange={() => setMode("custom")}
            />{" "}
            Custom Selection
          </label>
        </div>
        {mode === "custom" && (
          <div className="border border-slate-200 rounded-xl p-3 max-h-32 overflow-y-auto space-y-2 bg-slate-50">
            {cohort.map((s) => (
              <label
                key={s.id}
                className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(s.id)}
                  onChange={() =>
                    setSelected((prev) =>
                      prev.includes(s.id)
                        ? prev.filter((id) => id !== s.id)
                        : [...prev, s.id],
                    )
                  }
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
                {s.name}
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="pt-4 border-t flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 transition-colors"
        >
          Discard
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-indigo-700 transition-all"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
