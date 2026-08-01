"use client";

import { useEffect, useState, useCallback } from "react";
import { Book, BookStatus } from "@/lib/types";
import BookCard from "@/components/BookCard";
import BookForm from "@/components/BookForm";
import FilterBar from "@/components/FilterBar";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState<BookStatus | "all">("all");
  const [tagFilter, setTagFilter] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (tagFilter) params.set("tag", tagFilter);

      const res = await fetch(`/api/books?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to load books.");
        return;
      }

      setBooks(data.books);
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, tagFilter]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const availableTags = Array.from(
    new Set(books.flatMap((b) => b.tags))
  ).sort();

  async function handleAddBook(data: {
    title: string;
    author: string;
    tags: string[];
    status: BookStatus;
  }) {
    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to add book");
    setShowForm(false);
    fetchBooks();
  }

  async function handleEditBook(data: {
    title: string;
    author: string;
    tags: string[];
    status: BookStatus;
  }) {
    if (!editingBook) return;
    const res = await fetch(`/api/books/${editingBook._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update book");
    setEditingBook(undefined);
    fetchBooks();
  }

  async function handleStatusChange(id: string, status: BookStatus) {
    // Optimistic update — reflect the change instantly, no waiting on the network
    setBooks((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status } : b))
    );
    await fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this book from your collection?")) return;
    setBooks((prev) => prev.filter((b) => b._id !== id));
    await fetch(`/api/books/${id}`, { method: "DELETE" });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-50">My Books</h1>
        {!showForm && !editingBook && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-stone-50 text-stone-950 rounded-md px-4 py-2 text-sm font-medium hover:bg-stone-200 transition"
          >
            + Add book
          </button>
        )}
      </div>

      {showForm && (
        <BookForm onSubmit={handleAddBook} onCancel={() => setShowForm(false)} />
      )}

      {editingBook && (
        <BookForm
          initialBook={editingBook}
          onSubmit={handleEditBook}
          onCancel={() => setEditingBook(undefined)}
        />
      )}

      {!showForm && !editingBook && (
        <FilterBar
          statusFilter={statusFilter}
          tagFilter={tagFilter}
          availableTags={availableTags}
          onStatusChange={setStatusFilter}
          onTagChange={setTagFilter}
        />
      )}

      {error && (
        <div className="text-sm text-red-400 bg-red-950 border border-red-900 rounded-md px-3 py-2">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-stone-500 text-sm">Loading your shelf...</p>
      ) : books.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-stone-800 rounded-xl">
          <p className="text-stone-400">
            {statusFilter !== "all" || tagFilter
              ? "No books match these filters."
              : "Your shelf is empty. Add your first book to get started."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onStatusChange={handleStatusChange}
              onEdit={setEditingBook}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}