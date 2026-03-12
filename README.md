# Students Table Management Application

A clean, production-ready React application for managing student records with full CRUD operations. Built with React, Vite, and Tailwind CSS.

## Features

- **Students Table** – Display students with Name, Email, Age, and Actions columns
- **Add Student** – Form with validation (required fields, valid email, numeric age)
- **Edit Student** – Update existing students with pre-filled form
- **Delete Student** – Confirmation dialog before removal
- **Loading State** – Simulated 1.5s loading on initial load
- **Excel Export** – Download all or filtered students as `.xlsx`
- **Search/Filter** – Filter by name, email, or age (export respects filter)

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 3
- xlsx (Excel export)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
npm run preview
```

## Deployment

The app is a static SPA and deploys easily to:

- **Vercel** – `vercel` or connect your repo
- **Netlify** – Build command: `npm run build`, Publish directory: `dist`

No backend required; all data is stored in React state.
