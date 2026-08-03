# 📚 Spine — Personal Bookshelf & Reading Tracker

Spine is a sleek, premium personal reading tracker and digital bookshelf. Built using **Next.js (App Router)**, **Tailwind CSS**, and **MongoDB**, it features a beautiful warm peach-accented dark theme, full responsiveness, and smooth micro-animations.

---

## ✨ Features

- **Personalized Shelf**: Manage your personal library with standard CRUD operations (Add, Edit, Delete books).
- **Categorization**: Group books using custom tags (e.g. `#Fiction`, `#Sci-Fi`, `#Self-Help`).
- **Reading Statuses**: Track your progress across three distinct states:
  - 📖 **Want to Read**
  - 📘 **Reading**
  - ✅ **Completed**
- **Dynamic Filtering**: Instantly search books by title or author, filter by reading status, or sort by tags.
- **Cozy Design System**: Features a custom-built warm peach accent color (`#e8b28b`) sitting on a cozy dark-chocolate charcoal background (`#0c0a09`) in dark mode, and an ivory cream background (`#fbfaf7`) in light mode.
- **High-Visibility Theme Switcher**: Modern sliding pill-shaped dark/light mode toggle with smooth sliding animations and interactive icons.
- **Seamless Auth Experience**: Custom split-screen login and signup pages featuring an atmospheric vertical graphic (hanging bulb glowing above an open book) on the right and absolute, clean branding on the left.
- **Responsive Layout**: Zero-scroll desktop layout locks with scrolling mobile fallbacks to ensure compatibility across all screen sizes.

---

## 🛠️ Tech Stack

- **Core**: [Next.js](https://nextjs.org/) (App Router, Turbopack) & [React](https://react.dev/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Security & Session**: JWT (stored in HTTP-Only cookies) & [Bcryptjs](https://github.com/dcodeIO/bcrypt.js) password hashing

---

## 📂 Project Structure

```text
├── app/
│   ├── (auth)/             # Login and signup page routes
│   ├── (dashboard)/        # Main application layout, books list, and dashboard
│   ├── api/                # Backend API endpoints (auth, book CRUD operations)
│   ├── globals.css         # Styling directives and custom color system variables
│   ├── layout.tsx          # Root app layout and theme loader script
│   └── icon.svg            # Custom browser tab logo (favicon)
├── components/
│   ├── SpineLogo.tsx       # Custom SVG branding logo (book spines on a shelf)
│   ├── ThemeToggle.tsx     # High-visibility sliding dark/light mode toggle
│   ├── FilterBar.tsx       # Dropdown sorting filters for statuses and tags
│   ├── BookCard.tsx        # Book display card component
│   └── BookForm.tsx        # Add/edit book modal form
├── lib/
│   ├── db.ts               # MongoDB Mongoose connection handler
│   ├── auth.ts             # JWT token signing and hashing utilities
│   └── session.ts          # Server-side cookie session helper
├── models/
│   ├── User.ts             # User account database schema
│   └── Book.ts             # Book item database schema
└── public/
    └── hanging_bulb_book.jpg  # Generated vertical branding asset
```

---

## 🚀 Getting Started

### 1. Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18+) and [npm](https://www.npmjs.com/) installed.

### 2. Installation

Clone this repository and restore all package dependencies:

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root of the project and specify your database connection details and session signing keys:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/spine?retryWrites=true&w=majority
JWT_SECRET=your_jwt_signing_key_here
```

### 4. Running the App

Start the Next.js development server locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## ☁️ Deployment (Vercel)

Spine is fully optimized for hosting on the **Vercel Platform**:

1. Push your codebase to a remote Git repository (GitHub, GitLab, or Bitbucket).
2. Connect your repository to **Vercel**.
3. Under **Project Settings** > **Environment Variables**, add the keys defined in your local `.env.local`:
   - `MONGODB_URI`
   - `JWT_SECRET`
4. Click **Deploy**. Vercel will build the pages and auto-deploy the site.
