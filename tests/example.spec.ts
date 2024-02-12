import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter/dist/playwright';
import { faker } from '@faker-js/faker';

test(qase(1 , 'test - signup'), async ({ page }) => {
  const password = faker.internet.password();
  await page.goto('');
  await page.getByRole('link', { name: 'Signup' }).click();
  await page.getByTestId('first-name').fill(faker.person.firstName());
  await page.getByTestId('last-name').fill(faker.person.lastName());
  await page.getByTestId('email').fill(faker.internet.email());
  await page.getByTestId('password').fill(password);
  await page.getByTestId('confirm-password').fill(password);
  await page.getByTestId('submit').click();
  await expect(page).toHaveURL('/todo');
});
