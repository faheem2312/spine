"use client";

import { useState } from "react";
import { Book, BookStatus } from "@/lib/types";

interface BookFormProps {
  initialBook?: Book;
  onSubmit: (data: {
    title: string;
    author: string;
    tags: string[];
    status: BookStatus;
  }) => Promise<void>;
  onCancel: () => void;
}

export default function BookForm({
  initialBook,
  onSubmit,
  onCancel,
}: BookFormProps) {
  const [title, setTitle] = useState(initialBook?.title ?? "");
  const [author, setAuthor] = useState(initialBook?.author ?? "");
  const [tagsInput, setTagsInput] = useState(
    initialBook?.tags.join(", ") ?? ""
  );
  const [status, setStatus] = useState<BookStatus>(
    initialBook?.status ?? "want-to-read"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !author.trim()) {
      setError("Title and author are required.");
      return;
    }

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    setLoading(true);
    try {
      await onSubmit({ title: title.trim(), author: author.trim(), tags, status });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-4"
    >
      {error && (
        <div className="text-sm text-red-400 bg-red-950 border border-red-900 rounded-md px-3 py-2">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-300 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-stone-700 bg-stone-950 text-stone-50 placeholder-stone-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-500"
            placeholder="The Great Gatsby"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-300 mb-1">
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full rounded-md border border-stone-700 bg-stone-950 text-stone-50 placeholder-stone-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-500"
            placeholder="F. Scott Fitzgerald"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-300 mb-1">
          Tags <span className="text-stone-500">(comma-separated)</span>
        </label>
        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          className="w-full rounded-md border border-stone-700 bg-stone-950 text-stone-50 placeholder-stone-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-500"
          placeholder="fiction, classic, favorites"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-300 mb-1">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as BookStatus)}
          className="w-full rounded-md border border-stone-700 bg-stone-950 text-stone-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-500"
        >
          <option value="want-to-read">📖 Want to Read</option>
          <option value="reading">📘 Reading</option>
          <option value="completed">✅ Completed</option>
        </select>
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={loading}
          className="bg-stone-50 text-stone-950 rounded-md px-4 py-2 text-sm font-medium hover:bg-stone-200 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : initialBook ? "Save changes" : "Add book"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-stone-400 hover:text-stone-50 text-sm px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}