import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {

    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:[
    ['junit',{outputFile: 'junit.xml'}],
    ['html',{open: 'always'}],
    // ['allure-playwright'],
    ['list'],
    [
			'playwright-qase-reporter',
			{
				apiToken: process.env.QASE_TOKEN,
				projectCode: 'TODO',
				runComplete: true,
				basePath: 'https://api.qase.io/v1',
				logging: true,
				uploadAttachments: false,
			},
		],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: process.env.CI ?'on-first-retry':'on',
    screenshot: process.env.CI ? 'only-on-failure':'on',
    video: process.env.CI ? 'retain-on-failure' : 'on',
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://todo.qacart.com',

		/* Run browser in headless mode. */
		headless: process.env.HEADLESS_MODE === 'true',
    		/* Options used to launch the browser. */
		launchOptions: {
			logger: {
				isEnabled: (name, severity) => process.env.LOGGER_ENABLED === 'true',
				log: (name, severity, message, args) => console.log(name, severity, message),
			},
		},
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

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