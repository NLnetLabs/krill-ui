import { test, expect } from '@playwright/test';
// @ts-ignore
import { preparePage } from './utils.ts';

test('test pagination', async ({ page }) => {
  await preparePage(page);

  await page.goto('/ui');

  const pagination = page.locator('div.pagination');
  await pagination.locator('select').selectOption({ label: '10 / page' });
  await expect(page).toHaveURL(/\?limit=10/);

  const table = page.locator('table.roa-table');
  const tableBodyRow = table.locator('tbody tr');
  await expect(tableBodyRow).toHaveCount(10);

  await pagination.locator('button.arrow.next').click();
  await expect(page).toHaveURL(/\?limit=10&page=2/);
  await expect(await tableBodyRow.count()).toBeLessThanOrEqual(10);

  await pagination.locator('button', { hasText: '1' }).click();
  await expect(page).toHaveURL(/\?limit=10&page=1/);
});
