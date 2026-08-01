import { redirect } from "next/navigation";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { getCurrentUserId } from "@/lib/session";
import LogoutButton from "@/components/LogoutButton";

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
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-lg font-semibold text-stone-900">
            Spine
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/dashboard" className="text-stone-600 hover:text-stone-900">
              Dashboard
            </Link>
            <Link href="/books" className="text-stone-600 hover:text-stone-900">
              My Books
            </Link>
            <span className="text-stone-400">|</span>
            <span className="text-stone-600">Hi, {user.name.split(" ")[0]}</span>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}