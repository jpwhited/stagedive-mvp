import { test, expect } from '@playwright/test';

test('sign up, edit profile, upload track, create listing and send message', async ({ page }) => {
  const random = Math.random().toString(36).substring(2, 8);
  const email = `e2e${random}@test.com`;
  // Sign up
  await page.goto('/signup');
  await page.fill('input#email', email);
  await page.fill('input#password', 'password123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/login/);
  // Login
  await page.fill('input#email', email);
  await page.fill('input#password', 'password123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/dashboard/);
  // Edit profile
  await page.goto('/profile/edit');
  await page.fill('input', `user_${random}`);
  await page.click('text=Save');
  // Upload track
  await page.goto('/tracks/upload');
  const filePath = 'package.json';
  await page.setInputFiles('input[type="file"]', filePath);
  await page.fill('input#title', `Test Track ${random}`);
  await page.click('button:has-text("Upload")');
  // Create listing
  await page.goto('/listings/new');
  await page.fill('input', `Listing ${random}`);
  await page.fill('textarea', 'A description');
  await page.fill('input[type="number"]', '10');
  await page.click('button:has-text("Create Listing")');
});