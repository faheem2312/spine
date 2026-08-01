import { BookStatus } from "@/lib/types";

function getStatusConfig(status: BookStatus) {
  if (status === "reading") {
    return { label: "Reading", icon: "📘", className: "bg-blue-950 text-blue-300 border-blue-800" };
  }
  if (status === "completed") {
    return { label: "Completed", icon: "✅", className: "bg-emerald-950 text-emerald-300 border-emerald-800" };
  }
  return { label: "Want to Read", icon: "📖", className: "bg-stone-800 text-stone-300 border-stone-700" };
}

export default function StatusBadge({ status }: { status: BookStatus }) {
  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border ${config.className}`}>
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
}