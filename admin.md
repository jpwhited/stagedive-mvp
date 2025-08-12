# Admin Notes

This document contains notes for administrators of the StageDive platform.

- The admin role is granted by setting the `role` column of a user to `ADMIN` in the database. The seed script creates the first user (`user0@example.com`) as an administrator.
- The admin dashboard (`/admin`) lists all users with their roles. Further moderation features such as banning, hiding tracks or listings, and responding to reports can be implemented by extending this page and adding corresponding API routes.
- Reports are stored in the `Report` table. When a report is resolved, set `resolved` to `true` and take appropriate action (e.g. delete content).
- Use Supabase Storage policies to control access to uploads. Only the uploader or an admin should be able to delete files.
- Use the rate‑limiting middleware to protect against abuse. Adjust the `points` and `duration` values in `middleware.ts` as necessary for production.