"use client";

import { Book, BookStatus } from "@/lib/types";
import StatusBadge from "./StatusBadge";

interface BookCardProps {
  book: Book;
  onStatusChange: (id: string, status: BookStatus) => void;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export default function BookCard({
  book,
  onStatusChange,
  onEdit,
  onDelete,
}: BookCardProps) {
  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-stone-50 font-medium truncate">{book.title}</h3>
          <p className="text-stone-400 text-sm truncate">{book.author}</p>
        </div>
        <StatusBadge status={book.status} />
      </div>

      {book.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {book.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-stone-400 bg-stone-800 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-stone-800">
        <select
          value={book.status}
          onChange={(e) =>
            onStatusChange(book._id, e.target.value as BookStatus)
          }
          className="text-xs bg-stone-950 border border-stone-700 text-stone-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-stone-500"
        >
          <option value="want-to-read">📖 Want to Read</option>
          <option value="reading">📘 Reading</option>
          <option value="completed">✅ Completed</option>
        </select>

        <div className="flex gap-3 text-xs">
          <button
            onClick={() => onEdit(book)}
            className="text-stone-400 hover:text-stone-50"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(book._id)}
            className="text-red-400 hover:text-red-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}