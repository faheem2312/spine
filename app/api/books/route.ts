import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Book } from "@/models/Book";
import { getCurrentUserId } from "@/lib/session";

// GET /api/books?status=reading&tag=fiction
export async function GET(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const tag = searchParams.get("tag");

  const query: Record<string, unknown> = { userId };
  if (status) query.status = status;
  if (tag) query.tags = tag;

  const books = await Book.find(query).sort({ createdAt: -1 });

  return NextResponse.json({ books });
}

// POST /api/books
export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, author, tags, status } = await req.json();

    if (!title || !author) {
      return NextResponse.json(
        { error: "Title and author are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const book = await Book.create({
      userId,
      title,
      author,
      tags: Array.isArray(tags) ? tags : [],
      status: status || "want-to-read",
    });

    return NextResponse.json({ book }, { status: 201 });
  } catch (err) {
    console.error("Create book error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}