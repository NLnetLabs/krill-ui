import { test, expect } from '@playwright/test';
// @ts-ignore
import { preparePage } from './utils.ts';

test('show user details and log out', async ({ page }) => {
  await preparePage(page);
  await page.goto('/ui', { waitUntil: 'domcontentloaded' });

  await expect(page).toHaveURL(/\/cas\//);

  const userButton = page.locator('button', {
    has: page.locator('img[src="/src/img/user.svg"]'),
  });
  await expect(userButton.locator('div')).not.toBeVisible();
  await userButton.hover();
  await expect(userButton.locator('div')).toBeVisible();

  await page.locator('img[src="/src/img/logout.svg"]').click();

  await expect(page).toHaveURL(/\/login$/);
});
