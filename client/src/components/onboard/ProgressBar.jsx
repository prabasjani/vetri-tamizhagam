export default function ProgressBar({ step, total }) {
  const percentage = (step / total) * 100;

  return (
    <div>
      <div className="w-full h-1 bg-surface rounded">
        <div
          className="h-1 bg-secondary rounded transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
