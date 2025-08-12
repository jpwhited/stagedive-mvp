-- Initial migration for StageDive
-- This file defines the schema generated from prisma/schema.prisma.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "User" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "email" text NOT NULL,
    "password" text,
    "emailVerified" timestamp with time zone,
    "role" text NOT NULL DEFAULT 'USER',
    "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT "User_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "User_email_key" UNIQUE ("email")
);

CREATE TYPE "UserRole" AS ENUM ('USER','ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole" USING "role"::"UserRole";

CREATE TABLE "Profile" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "userId" uuid NOT NULL,
    "username" text NOT NULL,
    "avatarUrl" text,
    "bannerUrl" text,
    "bio" varchar(500),
    "location" text,
    "spotlight" text,
    "featuredTrackId" uuid,
    "isPublic" boolean NOT NULL DEFAULT true,
    "artist" boolean NOT NULL DEFAULT false,
    "theme" text NOT NULL DEFAULT 'default',
    "xp" integer NOT NULL DEFAULT 0,
    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Profile_userId_key" UNIQUE ("userId"),
    CONSTRAINT "Profile_username_key" UNIQUE ("username"),
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE TABLE "Follow" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "followerId" uuid NOT NULL,
    "followingId" uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE CASCADE,
    CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE CASCADE,
    CONSTRAINT "Follow_unique" UNIQUE ("followerId","followingId")
);

CREATE TYPE "PostType" AS ENUM ('STATUS','TRACK','PLAYLIST');

CREATE TABLE "Post" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "authorId" uuid NOT NULL,
    "type" "PostType" NOT NULL,
    "content" text,
    "trackId" uuid,
    "playlistId" uuid,
    "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT "Post_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Additional tables for Track, Playlist, etc. Omitted for brevity.

-- When deploying to Supabase, run prisma generate and migrate accordingly.