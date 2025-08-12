import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 space-y-8">
      <h1 className="text-4xl font-bold">Welcome to StageDive</h1>
      <p className="text-center max-w-xl">
        StageDive is a music‑centric social platform where artists and fans connect.
        Upload tracks, follow your favorite artists, buy or sell merch and level up!
      </p>
      {session ? (
        <Link
          href="/dashboard"
          className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark"
        >
          Go to Dashboard
        </Link>
      ) : (
        <Link
          href="/login"
          className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark"
        >
          Get Started
        </Link>
      )}
    </main>
  );
}