import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import { Eyes } from '@applitools/eyes-playwright'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

require('dotenv').config();

import { IUserData } from "./src/config/users";
dotenv.config({ path: './env/.env' });

export interface TestOptions {
  targetUser: IUserData;
}
//Below two commands are needed to generate and open allure report

//allure generate allure-results -o allure-report --clean
//allure open allure-report

//setting up the applitools eyes api key in the config globally
const eyes = new Eyes();
eyes.setApiKey(process.env.APPLITOOLS_API_KEY!);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  timeout: 240000,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['@butchmayhew/playwright-json-summary-reporter'],
    ["line"], ['@estruyf/github-actions-reporter'], [
      "allure-playwright",
      {
        detail: true,
        outputFolder: "allure-results",
        suiteTitle: false,
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: '**/*setup.ts'
    },
    {
      name: 'Logged in Teacher Flow',
      testDir: './tests/teacher-flow-logged-in',
      testMatch: '**/*.@(spec|test).?(c|m)[jt]s?(x)',
      dependencies: ['setup'],
      use: {
        storageState: `${process.env.AUTH_FILE_PATH}/TEACHER.state.json`,
      }
    },
    {
      name: 'Student Gameshow flow',
      testDir: './tests/student-gameshow-flow',
      testMatch: '**/*.@(spec|test).?(c|m)[jt]s?(x)',
      dependencies: ['setup'],
      use: {
        storageState: `${process.env.AUTH_FILE_PATH}/TEACHER.state.json`,
      }
    },
    {
      name: 'Localization',
      testDir: './tests/teacher-localization',
      testMatch: '**/*.@(spec|test).?(c|m)[jt]s?(x)',
      dependencies: ['setup'],
      use: {
        storageState: `${process.env.AUTH_FILE_PATH}/TEACHER.state.json`,
      }
    },
    {
      name: 'Invalid Login Flow',
      testDir: './tests/teacher-flow-invalid-login',
      testMatch: '**/*.@(spec|test).?(c|m)[jt]s?(x)',
    },
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
