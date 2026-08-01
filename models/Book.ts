import mongoose, { Schema, models, model } from "mongoose";

export type BookStatus = "want-to-read" | "reading" | "completed";

export interface IBook {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  author: string;
  tags: string[];
  status: BookStatus;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema<IBook>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["want-to-read", "reading", "completed"],
      default: "want-to-read",
    },
  },
  { timestamps: true } // auto-manages createdAt / updatedAt
);

// Speeds up "get my books, optionally filtered by status/tag" queries
BookSchema.index({ userId: 1, status: 1 });
BookSchema.index({ userId: 1, tags: 1 });

export const Book = models.Book || model<IBook>("Book", BookSchema);