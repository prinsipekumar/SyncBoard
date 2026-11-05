import { useState } from "react";
import { useApp } from "../../context/AppContext";
import AssignmentList from "./AssignmentList";
import ProgressBar from "../common/ProgressBar";

export default function StudentDashboard() {
  const { assignments, currentUser, submitAssignment } = useApp();
  const [targetId, setTargetId] = useState(null);
  const [step, setStep] = useState(0);

  const myTasks = assignments.filter((t) =>
    t.assignedTo.includes(currentUser.id),
  );
  const doneCount = myTasks.filter(
    (t) => t.submissions[currentUser.id]?.status === "Submitted",
  ).length;
  const rate = myTasks.length
    ? Math.round((doneCount / myTasks.length) * 100)
    : 0;

  const handleFinalize = () => {
    submitAssignment(targetId);
    setTargetId(null);
    setStep(0);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome, {currentUser.name}
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">{currentUser.email}</p>
        </div>
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 w-full md:w-64">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
            Your Metrics Progress
          </span>
          <ProgressBar
            percentage={rate}
            subtitle={`${doneCount} of ${myTasks.length} tasks`}
          />
        </div>
      </div>

      <AssignmentList
        assignments={myTasks}
        currentUserId={currentUser.id}
        onSubmitTrigger={(id) => {
          setTargetId(id);
          setStep(1);
        }}
      />

      {step === 1 && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">
              Confirm Submission Action
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              Have you successfully verified your workspace deliverables at the
              provided cloud resource?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setStep(0)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
              >
                No, Cancel
              </button>
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Yes, I have submitted
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-amber-200 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-50 text-amber-600 mb-3 font-bold text-lg">
              ⚠️
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Final Validation Request
            </h3>
            <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
              This locks your assignment record status changes inside your
              professor's log immediately. Continue?
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={() => setStep(0)}
                className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl"
              >
                Abort
              </button>
              <button
                onClick={handleFinalize}
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Confirm & Lock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
