"use client";

import { BookStatus } from "@/lib/types";

interface FilterBarProps {
  statusFilter: BookStatus | "all";
  tagFilter: string;
  availableTags: string[];
  onStatusChange: (status: BookStatus | "all") => void;
  onTagChange: (tag: string) => void;
}

export default function FilterBar({
  statusFilter,
  tagFilter,
  availableTags,
  onStatusChange,
  onTagChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value as BookStatus | "all")}
        className="text-sm bg-stone-900 border border-stone-700 text-stone-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-stone-500"
      >
        <option value="all">📚 Entire Shelf</option>
        <option value="want-to-read">📖 Want to Read</option>
        <option value="reading">📘 Reading</option>
        <option value="completed">✅ Completed</option>
      </select>

      {availableTags.length > 0 && (
        <select
          value={tagFilter}
          onChange={(e) => onTagChange(e.target.value)}
          className="text-sm bg-stone-900 border border-stone-700 text-stone-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-stone-500"
        >
          <option value="">All tags</option>
          {availableTags.map((tag) => (
            <option key={tag} value={tag}>
              #{tag}
            </option>
          ))}
        </select>
      )}

      {(statusFilter !== "all" || tagFilter) && (
        <button
          onClick={() => {
            onStatusChange("all");
            onTagChange("");
          }}
          className="text-sm text-stone-500 hover:text-stone-300"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}