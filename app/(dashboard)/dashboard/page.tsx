import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Book } from "@/models/Book";
import { getCurrentUserId } from "@/lib/session";
import StatusBadge from "@/components/StatusBadge";

export default async function DashboardPage() {
  const userId = await getCurrentUserId();

  await connectDB();
  const books = await Book.find({ userId }).sort({ createdAt: -1 }).lean();

  const total = books.length;
  const counts = {
    "want-to-read": books.filter((b) => b.status === "want-to-read").length,
    reading: books.filter((b) => b.status === "reading").length,
    completed: books.filter((b) => b.status === "completed").length,
  };

  // Extra-thought detail: books added in the last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const addedThisMonth = books.filter(
    (b) => new Date(b.createdAt) >= thirtyDaysAgo
  ).length;

  const currentlyReading = books.filter((b) => b.status === "reading");

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-stone-50">Dashboard</h1>

      {total === 0 ? (
        <div className="text-center py-16 border border-dashed border-stone-800 rounded-xl">
          <p className="text-stone-400 mb-4">
            Your shelf is empty. Add your first book to see your stats here.
          </p>
          <Link
            href="/books"
            className="inline-block bg-stone-50 text-stone-950 rounded-md px-4 py-2 text-sm font-medium hover:bg-stone-200 transition"
          >
            Go to My Books
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard label="Total Books" value={total} />
            <StatCard label="Want to Read" value={counts["want-to-read"]} icon="📖" />
            <StatCard label="Reading" value={counts.reading} icon="📘" />
            <StatCard label="Completed" value={counts.completed} icon="✅" />
          </div>

          {addedThisMonth > 0 && (
            <p className="text-sm text-stone-500">
              You&apos;ve added{" "}
              <span className="text-stone-300 font-medium">
                {addedThisMonth} book{addedThisMonth !== 1 ? "s" : ""}
              </span>{" "}
              in the last 30 days.
            </p>
          )}

          {currentlyReading.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-stone-400 mb-3">
                Currently reading
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentlyReading.map((book) => (
                  <div
                    key={book._id.toString()}
                    className="bg-stone-900 border border-stone-800 rounded-xl p-4 flex items-center justify-between"
                  >
                    <div className="min-w-0">
                      <p className="text-stone-50 font-medium truncate">
                        {book.title}
                      </p>
                      <p className="text-stone-500 text-sm truncate">
                        {book.author}
                      </p>
                    </div>
                    <StatusBadge status={book.status} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Link
              href="/books"
              className="text-sm text-stone-400 hover:text-stone-50 hover:underline"
            >
              View full collection →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon?: string;
}) {
  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl p-4">
      <p className="text-2xl font-semibold text-stone-50">
        {icon && <span className="mr-1">{icon}</span>}
        {value}
      </p>
      <p className="text-sm text-stone-500 mt-1">{label}</p>
    </div>
  );
}