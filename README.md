# StageDive MVP

StageDive is a music‑centric social platform where artists and fans connect. This repository contains the minimum viable product (MVP) with authentication, track uploads, playlists, a basic marketplace, messaging, gamification and an admin dashboard.

## Features

* **Auth & Profiles** – Email/password and Google OAuth via NextAuth. Users have profiles with avatars, banners, bios and privacy settings.
* **Music Core** – Artists can upload MP3/WAV files to Supabase Storage. Tracks are streamed via signed URLs and counted.
* **Playlists** – Users can create public or private playlists and add tracks.
* **Marketplace** – List items for sale (physical, digital or services) and purchase with Stripe test checkout.
* **Messaging** – Realtime direct messages via Supabase Realtime.
* **Gamification** – XP events are recorded on actions. Levels are calculated from XP and can unlock themes.
* **Admin** – Dashboard for moderating users. Seed script creates an admin user.

## Getting Started

### Prerequisites

- **Node.js 18+** and **npm**.
- A **PostgreSQL** database (local or hosted). Supabase is recommended.
- A **Supabase** project for storage and realtime.
- **Stripe** account in test mode.

### One‑Command Setup

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

The app will be available at http://localhost:3000.

### Environment Variables

Copy `.env.example` to `.env` and fill in the values for your environment:

```env
NEXTAUTH_SECRET=your-random-secret
NEXTAUTH_URL=http://localhost:3000

DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

GOOGLE_CLIENT_ID=google-oauth-client-id
GOOGLE_CLIENT_SECRET=google-oauth-client-secret

STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

SMTP_HOST=optional
SMTP_PORT=optional
SMTP_USER=optional
SMTP_PASS=optional
```

### Database & Prisma

Generate the Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma migrate deploy
```

Alternatively, run the provided SQL in `prisma/migrations/000_init/migration.sql` against your database.

### Supabase Setup

1. Create buckets named **tracks**, **avatars**, **banners** and **listing-images** in Supabase Storage.
2. Run the SQL in `supabase/policies.sql` in the Supabase SQL editor to create storage buckets and basic RLS policies.
3. Enable Row Level Security for all public tables and add further policies as needed.

### Stripe Setup (Test Mode)

1. Create a Stripe account and obtain API keys.
2. Set `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in your `.env`.
3. Add a webhook endpoint in the Stripe dashboard pointing to `https://your-vercel-url/api/stripe/webhook` and copy the signing secret to `STRIPE_WEBHOOK_SECRET`.
4. To test a purchase, create a listing and click **Buy Now**; use Stripe’s test card `4242 4242 4242 4242` with any future expiry date and CVC.

### Seeding the Database

The seed script creates demo users, tracks, playlists, listings, follows and a conversation. To run:

```bash
npm run seed
```

This command will connect to your database and populate it with sample data. It uses `@faker-js/faker` to generate random content.

### Running Tests

Run Playwright smoke tests:

```bash
npx playwright install
npm run playwright:test
```

Run Jest unit tests:

```bash
npm test
```

### Deployment to Vercel

1. Push this repository to a Git provider (GitHub, GitLab or Bitbucket).
2. Import the project in [Vercel](https://vercel.com/new) and configure the environment variables from your `.env` file.
3. Set the build command to `npm run build` and the output directory to `.next`.
4. Add the `vercel.json` file if you need custom rewrites or edge functions (not provided here).
5. Deploy. Ensure your Supabase and Stripe credentials are also available in production.

### Chromebook & Drag‑and‑Drop Deploy

If you’re using a Chromebook or cannot use the command line, you can still deploy StageDive using only your browser:

1. **Create a Git repository**. On GitHub (or GitLab/Bitbucket), create a new private repository named `stagedive-mvp`. Do **not** initialize it with a README.
2. **Upload the files**. Open the repository’s web interface, click **Add file → Upload files** and drag the entire contents of this project’s folder into the upload area. GitHub will automatically preserve the folder structure. Commit the upload.
3. **Import in Vercel**. Go to [vercel.com/new](https://vercel.com/new) and select **Import Git Repository**, then choose the repository you just created. Vercel will detect that it’s a Next.js project.
4. **Set environment variables**. When prompted, add the variables from your `.env` (see `.env.example` for the full list) into Vercel’s Environment Variables. Make sure to include your Supabase, Stripe and NextAuth secrets.
5. **Deploy**. Click **Deploy**. Vercel will build and deploy your app. Once deployed, open your production URL (e.g. `https://stagedive-mvp.vercel.app`) and call `/api/migrate` and then `/api/seed` with the header `x-internal-seed: init-please` to set up the database and sample data.

These steps require no command‑line access and are ideal for Chromebook users.

### Deploying Supabase

Supabase hosts the Postgres database, storage and realtime for StageDive. If you choose Supabase:

1. Create a new project in Supabase.
2. Set the `DATABASE_URL` in your `.env` to the connection string found in the **Settings > Database** tab.
3. Execute the SQL scripts provided and apply migrations via Prisma.
4. Copy the `SUPABASE_URL`, `SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` from **Settings > API** into your `.env`.

## Accessibility

We made an initial pass at accessibility by using semantic HTML elements (`<button>`, `<input>`, `<label>`), associating labels with form controls, and ensuring focusable elements have visible focus states. Further audits should be performed with tools like Lighthouse or axe.

## License

This project is provided for educational purposes and comes with no warranty.