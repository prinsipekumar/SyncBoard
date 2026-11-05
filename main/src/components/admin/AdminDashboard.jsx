import { useState } from "react";
import { useApp } from "../../context/AppContext";
import AssignmentForm from "./AssignmentForm";
import TrackProgress from "./TrackProgress";
import Modal from "../common/Modal";

export default function AdminDashboard() {
  const { assignments, currentUser, users, deleteAssignment, adminMappingId } =
    useApp();
  const [formOpen, setFormOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const [activeInspectorStudent, setActiveInspectorStudent] = useState(null);

  const allStudents = users.filter((u) => u.role === "student");

  const adminTasks = assignments.filter(
    (t) => t.createdBy === currentUser.id || t.createdBy === adminMappingId,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="w-full sm:w-auto min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-x-1">
            <span className="whitespace-nowrap">Admin Control Panel:</span>
            <span className="text-indigo-600 inline-flex flex-wrap gap-x-1">
              {currentUser?.name?.split(" ").map((part, index) => (
                <span key={index} className="inline-block whitespace-nowrap">
                  {part}
                </span>
              ))}
            </span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5 truncate">
            Course Coordinator Profile ({currentUser.email})
          </p>
        </div>
        <button
          onClick={() => {
            setEditTask(null);
            setFormOpen(true);
          }}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          ➕ Create New Assignment
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            👥 Cohort Progress Center
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            Click any student below to open their assignment log record sheets
            instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-3 w-full">
          {allStudents.map((student) => (
            <button
              key={student.id}
              type="button"
              onClick={() => setActiveInspectorStudent(student)}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold border transition-all text-left flex items-center gap-3 cursor-pointer shadow-xs ${
                activeInspectorStudent?.id === student.id
                  ? "bg-indigo-600 text-white border-indigo-600 scale-[1.02] sm:scale-105"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span className="text-sm shrink-0">🎓</span>
              <div className="truncate min-w-0 flex-1">
                <p className="font-bold leading-tight truncate">
                  {student.name}
                </p>
                <p
                  className={`${activeInspectorStudent?.id === student.id ? "text-indigo-200" : "text-slate-400"} text-[10px] font-medium truncate mt-0.5`}
                >
                  {student.id}
                </p>
              </div>
            </button>
          ))}
        </div>

        {activeInspectorStudent && (
          <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 animate-in fade-in duration-150">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                📄 Assignment Matrix Log:{" "}
                <span className="text-indigo-600 font-extrabold">
                  {activeInspectorStudent.name}
                </span>
              </h3>
              <button
                onClick={() => setActiveInspectorStudent(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
              >
                Clear View
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {adminTasks.map((task) => {
                const isAssigned = task.assignedTo?.includes(
                  activeInspectorStudent.id,
                );
                const sub = task.submissions?.[activeInspectorStudent.id];
                const isSubmitted =
                  sub && (sub === true || sub.status === "Submitted");

                return (
                  <div
                    key={task.id}
                    className="bg-white p-3 rounded-lg border border-slate-200 text-xs shadow-2xs flex flex-col justify-between gap-2"
                  >
                    <div>
                      <p className="font-bold text-slate-900 truncate">
                        {task.title}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Due: {task.dueDate}
                      </p>
                    </div>
                    <div>
                      {!isAssigned ? (
                        <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-400 rounded-md font-semibold">
                          Not Assigned
                        </span>
                      ) : isSubmitted ? (
                        <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md font-bold">
                          ✅ Submitted
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-md font-bold">
                          ⏳ Pending
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold text-slate-800 tracking-tight">
        📋 Deployed Task Boards
      </h2>
      {adminTasks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-400 font-medium">
          No active records deployed by your account profile.
        </div>
      ) : (
        <div className="space-y-6">
          {adminTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="space-y-2 flex-1">
                  <h3 className="font-bold text-lg text-slate-900 tracking-tight">
                    {task.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">
                    {task.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-400 pt-1">
                    <span>
                      📅 Due Target:{" "}
                      <b className="text-slate-700">{task.dueDate}</b>
                    </span>
                    <span>
                      🔗 Link:{" "}
                      <a
                        href={task.driveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 underline font-bold"
                      >
                        Workspace Storage
                      </a>
                    </span>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      👥 Distribution: {task.assignedTo?.length || 0} Students
                    </span>
                  </div>
                </div>

                <div className="flex lg:flex-col justify-end items-center lg:items-end gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setEditTask(task);
                      setFormOpen(true);
                    }}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Modify
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Delete this assignment?")) {
                        deleteAssignment(task.id);
                      }
                    }}
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <TrackProgress task={task} />
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        title={
          editTask
            ? "Modify Target Task Ruleset"
            : "Deploy Coursework Distribution"
        }
      >
        <AssignmentForm task={editTask} onClose={() => setFormOpen(false)} />
      </Modal>
    </div>
  );
}
