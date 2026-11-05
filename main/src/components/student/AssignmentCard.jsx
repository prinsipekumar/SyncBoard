export default function AssignmentCard({
  task,
  currentUserId,
  onSubmitTrigger,
}) {
  const targetKey = Object.keys(task?.submissions || {}).find(
    (k) => k.toLowerCase() === currentUserId?.toLowerCase(),
  );

  const log = targetKey ? task.submissions[targetKey] : null;
  const isDone = log?.status === "Submitted";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-200">
      <div>
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-bold text-lg text-slate-900 tracking-tight">
            {task.title}
          </h3>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
              isDone
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}
          >
            {isDone ? "● Submitted" : "○ Pending"}
          </span>
        </div>
        <p className="text-slate-600 text-sm mt-3 leading-relaxed">
          {task.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-slate-400">
          <span>
            📅 Due: <b className="text-slate-600">{task.dueDate}</b>
          </span>
          {isDone && log?.submittedAt && (
            <span>
              ✅ Turned In:{" "}
              <b className="text-emerald-600">
                {Array.isArray(log.submittedAt)
                  ? log.submittedAt[0]
                  : log.submittedAt}
              </b>
            </span>
          )}
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
        <a
          href={task.driveLink}
          target="_blank"
          rel="noreferrer"
          className="text-indigo-600 hover:text-indigo-700 font-bold text-sm"
        >
          🔗 Resource Link
        </a>
        {!isDone && (
          <button
            onClick={() => onSubmitTrigger(task.id)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all"
          >
            Submit Task
          </button>
        )}
      </div>
    </div>
  );
}
