import { redirect } from "next/navigation";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { getCurrentUserId } from "@/lib/session";
import LogoutButton from "@/components/LogoutButton";
import ThemeToggle from "@/components/ThemeToggle";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect("/login");
  }

  await connectDB();
  const user = await User.findById(userId).select("name");

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-stone-950">
      <header className="border-b border-stone-800 bg-stone-900">
        <div className="relative max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-lg font-semibold text-stone-50">
            Spine
          </Link>
          <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6 text-sm">
            <Link href="/dashboard" className="text-stone-400 hover:text-stone-50">
              Dashboard
            </Link>
            <Link href="/books" className="text-stone-400 hover:text-stone-50">
              My Books
            </Link>
          </nav>
          <div className="flex items-center gap-4 text-sm">
            <ThemeToggle />
            <span className="text-stone-400">Hi, {user.name.split(" ")[0]}</span>
            <span className="text-stone-700">|</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}