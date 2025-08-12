# API Routes

This document outlines the main API routes exposed by the StageDive MVP and their authentication requirements.

## Auth

| Route | Method | Description | Auth |
|------|--------|-------------|------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handler for sign in/out and session | Public |
| `/api/auth/register` | POST | Create a new user account with email/password | Public |

## Profile

| Route | Method | Description | Auth |
|------|--------|-------------|------|
| `/api/profile/:userId` | GET | Fetch profile by user ID | Public |
| `/api/profile/update` | POST | Update profile fields (username, bio, location, visibility) | Requires session user matches profile |

## Tracks

| Route | Method | Description | Auth |
|------|--------|-------------|------|
| `/api/tracks/upload` | POST | Upload an audio file. Expects multipart/form-data with `file`, `title`, `userId` | Authenticated |
| `/api/tracks/{id}/stream` | GET | Returns a signed Supabase URL and increments play counter | Public |

## Playlists

*Not implemented in detail for MVP.*

## Marketplace

| Route | Method | Description | Auth |
|------|--------|-------------|------|
| `/api/listings/create` | POST | Create a listing with title, description, price and category | Authenticated |
| `/api/listings/{id}/checkout` | POST | Create Stripe checkout session for listing purchase | Authenticated |

## Messaging

| Route | Method | Description | Auth |
|------|--------|-------------|------|
| `/api/messages/send` | POST | Send a message in a conversation. Requires `conversationId`, `senderId`, `content` | Authenticated |

## Stripe Webhooks

| Route | Method | Description | Auth |
|------|--------|-------------|------|
| `/api/stripe/webhook` | POST | Stripe webhook endpoint for payment events. Secured via signature verification | Stripe only |

## Admin

| Route | Method | Description | Auth |
|------|--------|-------------|------|
| `/admin` | GET | Admin dashboard listing users and moderation actions | Admin only |
