import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  webServer: {
    command: 'npm run build && npm run start',
    port: 3000,
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
  testDir: 'tests',
  timeout: 30 * 1000,
  use: {
    headless: true,
    baseURL: 'http://localhost:3000',
  },
};

export default config;