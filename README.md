# Code Of Digital Website

A premium, 3D-enabled digital marketing agency website built with Next.js 15, Supabase, and Tailwind CSS.

## Features

- **3D Hero Scene**: Interactive React Three Fiber (Three.js) elements.
- **Premium Design**: Shadcn/UI, Tailwind CSS, Dark/Light mode (Light default).
- **Admin Panel**: Full CMS for Pages, Blog, SEO, and Media managed via Supabase.
- **SEO Optimized**: Next.js Metadata API, Dynamic Sitemaps, JSON-LD.
- **Authentication**: Secure Admin access via Supabase Auth.
- **Database**: Supabase Postgres with RLS security.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Shadcn/UI
- **Animations**: Framer Motion, GSAP (ready)
- **3D**: @react-three/fiber, @react-three/drei
- **Backend**: Supabase (Auth, Database, Storage)
- **Forms**: React Hook Form + Zod

## Setup Instructions

### 1. Prerequisites

- Node.js 18+
- Supabase Account

### 2. Installation

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_(for_scripts_only)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Database Setup (Supabase)

1. Go to your Supabase Project -> **SQL Editor**.
2. Open `supabase_schema.sql` from this repository.
3. Copy and Paste the content into the SQL Editor and run it. 
   - This creates tables: `profiles`, `pages`, `blog_posts`, `seo_meta`, etc.
   - Sets up RLS Policies (Row Level Security).
   - Creates the `media` storage bucket (if permission allows) or create it manually in Storage -> New Bucket -> "media" (Public).

### 5. Create Admin User

1. Sign up a new user via the Supabase Dashboard (Authentication -> Users -> Add User) or implemented signup page.
2. In Supabase **Table Editor**, go to `profiles` table.
3. Find your user row and change `role` from `viewer` to `admin`.
4. You can now access `/admin`.

### 6. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Deployment

Deploy to Vercel:

1. Push to GitHub.
2. Import project in Vercel.
3. Add Environment Variables in Vercel Project Settings.
4. Deploy.

## Project Structure

- `src/app/(public)`: Public facing pages (Home, Services, etc.)
- `src/app/(admin)`: Protected Admin Dashboard.
- `src/components/3d`: Three.js scenes.
- `src/components/ui`: Reusable UI components.
- `src/lib/supabase`: Database clients and middleware.
# code-of-digital
