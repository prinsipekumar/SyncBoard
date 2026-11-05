export default function ProgressBar({ percentage, subtitle }) {
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-black text-slate-900">
          {percentage}%
        </span>
        {subtitle && (
          <span className="text-xs text-slate-400 font-bold">{subtitle}</span>
        )}
      </div>
      <div className="w-full bg-slate-100 h-2.5 rounded-full mt-2 overflow-hidden border border-slate-200/40">
        <div
          className="bg-indigo-600 h-2.5 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
