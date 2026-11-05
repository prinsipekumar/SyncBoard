import { useState } from "react";
import { useApp } from "../../context/AppContext";
import ProgressBar from "../common/ProgressBar";

export default function TrackProgress({ task }) {
  const { users } = useApp();
  const [inspectedStudent, setInspectedStudent] = useState(null);

  const cohortStudents = users.filter((u) => u.role === "student");
  const assignedIds = task?.assignedTo || [];
  const submissionsMap = task?.submissions || {};
  const groupSize = assignedIds.length;

  const doneCount = assignedIds.filter((sid) => {
    const sub = submissionsMap[sid];
    return sub && (sub === true || sub.status === "Submitted");
  }).length;

  const rate = groupSize ? Math.round((doneCount / groupSize) * 100) : 0;

  const handleSelectChange = (e) => {
    const studentId = e.target.value;
    if (!studentId) {
      setInspectedStudent(null);
      return;
    }

    const student = cohortStudents.find((s) => s.id === studentId);
    if (student) {
      const matchingKey = Object.keys(submissionsMap).find(
        (k) => k.toLowerCase() === student.id.toLowerCase(),
      );
      const subRecord = matchingKey ? submissionsMap[matchingKey] : null;
      const isDone =
        subRecord && (subRecord === true || subRecord.status === "Submitted");

      setInspectedStudent({ ...student, subRecord, isDone });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start pt-2">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
          Metrics Compliance
        </span>
        <ProgressBar
          percentage={rate}
          subtitle={`(${doneCount}/${groupSize} entries)`}
        />
      </div>

      <div className="md:col-span-2 space-y-3">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Cohort Matrix Status (Select Student to Inspect Details)
          </label>
          <select
            onChange={handleSelectChange}
            value={inspectedStudent?.id || ""}
            className="w-full bg-slate-50 border border-slate-300 text-slate-700 text-xs rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          >
            <option value="">
              -- Choose a student from the cohort roster --
            </option>
            {cohortStudents.map((student) => {
              const isAssigned = assignedIds.some(
                (id) => id.toLowerCase() === student.id.toLowerCase(),
              );

              if (!isAssigned) return null;

              const matchingKey = Object.keys(submissionsMap).find(
                (k) => k.toLowerCase() === student.id.toLowerCase(),
              );
              const subRecord = matchingKey
                ? submissionsMap[matchingKey]
                : null;
              const isDone =
                subRecord &&
                (subRecord === true || subRecord.status === "Submitted");

              return (
                <option key={student.id} value={student.id}>
                  {isDone ? "✅" : "⏳"} {student.name} (
                  {isDone ? "Submitted" : "Pending"})
                </option>
              );
            })}
          </select>
        </div>

        {inspectedStudent && (
          <div className="bg-indigo-50/40 border border-indigo-100 rounded-xl p-4 space-y-2 animate-in fade-in duration-200">
            <div className="flex justify-between items-start border-b border-indigo-100 pb-2">
              <h4 className="text-xs font-bold text-indigo-900 uppercase">
                Inspection Logs
              </h4>
              <button
                type="button"
                onClick={() => setInspectedStudent(null)}
                className="text-xs font-bold text-indigo-400 hover:text-indigo-600 transition-colors"
              >
                Clear Log
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <p className="text-slate-600">
                <strong>Name:</strong>{" "}
                <span className="text-slate-900 font-semibold">
                  {inspectedStudent.name}
                </span>
              </p>
              <p className="text-slate-600">
                <strong>Email:</strong>{" "}
                <span className="text-slate-900">{inspectedStudent.email}</span>
              </p>
              <p className="text-slate-600">
                <strong>Status:</strong>{" "}
                <span
                  className={`font-bold ${inspectedStudent.isDone ? "text-emerald-700" : "text-rose-700"}`}
                >
                  {inspectedStudent.isDone ? "✅ Completed" : "❌ Missing Work"}
                </span>
              </p>
              {inspectedStudent.isDone && (
                <p className="text-slate-600">
                  <strong>Turned In On:</strong>{" "}
                  <span className="text-slate-900 font-medium">
                    {Array.isArray(inspectedStudent.subRecord?.submittedAt)
                      ? inspectedStudent.subRecord?.submittedAt[0]
                      : inspectedStudent.subRecord?.submittedAt || "N/A"}
                  </span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
