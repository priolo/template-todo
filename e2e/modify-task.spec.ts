import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/app/');
  await page.getByRole('checkbox', { name: 'PENDING Example Task 1 This' }).click();
  await page.getByRole('textbox', { name: 'Write a short title' }).press('Home');
  await page.getByRole('textbox', { name: 'Write a short title' }).press('Shift+End');
  await page.getByRole('textbox', { name: 'Write a short title' }).fill('Test');
  await page.getByRole('button', { name: 'SAVE' }).click();
  await expect(page.locator('tbody')).toContainText('Test');
});