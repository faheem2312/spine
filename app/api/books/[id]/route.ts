import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Book } from "@/models/Book";
import { getCurrentUserId } from "@/lib/session";

// PUT /api/books/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const updates = await req.json();
    const allowedFields = ["title", "author", "tags", "status"];
    const safeUpdates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (field in updates) safeUpdates[field] = updates[field];
    }

    await connectDB();

    // userId in the filter ensures a user can never edit someone else's book
    const book = await Book.findOneAndUpdate(
      { _id: id, userId },
      safeUpdates,
      { new: true, runValidators: true }
    );

    if (!book) {
      return NextResponse.json(
        { error: "Book not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ book });
  } catch (err) {
    console.error("Update book error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// DELETE /api/books/:id
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await connectDB();

  const book = await Book.findOneAndDelete({ _id: id, userId });

  if (!book) {
    return NextResponse.json({ error: "Book not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}