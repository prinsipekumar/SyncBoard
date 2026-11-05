import AssignmentCard from "./AssignmentCard";

export default function AssignmentList({
  assignments,
  currentUserId,
  onSubmitTrigger,
}) {
  if (assignments.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 font-medium">
        No assigned coursework records found.
      </div>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {assignments.map((task) => (
        <AssignmentCard
          key={task.id}
          task={task}
          currentUserId={currentUserId}
          onSubmitTrigger={onSubmitTrigger}
        />
      ))}
    </div>
  );
}
