import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/app/');
  await page.getByRole('checkbox', { name: 'PENDING Example Task 2 This' }).getByRole('checkbox').check();
  await page.goto('http://localhost:5173/app/?sel=2');
  await page.getByRole('button', { name: 'DELETE' }).click();
  await expect(page.getByRole('heading', { name: 'WARNING' })).toBeVisible();
  await page.getByRole('button', { name: 'OK' }).click();
});