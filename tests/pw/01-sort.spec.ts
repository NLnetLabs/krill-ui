import { test, expect } from '@playwright/test';
// @ts-ignore
import { preparePage } from './utils.ts';

test('sorting of ROA Table', async ({ page }) => {
  await preparePage(page);

  await page.goto('/ui');

  const table = page.locator('table.roa-table');
  const tableBodyRow = table.locator('tbody tr');

  for (let columnIdx = 2; columnIdx <= 2; columnIdx++) {
    {
      // desc order
      await table.locator(`thead tr th:nth-of-type(${columnIdx})`).click();

      let lastValue = await tableBodyRow
        .locator(`td:nth-of-type(${columnIdx})`)
        .first()
        .innerText();
      let lastValueInt = parseInt(lastValue, 10);
      const column = await tableBodyRow.locator(`td:nth-of-type(${columnIdx})`);
      for (let i = 0; i < (await column.count()); i++) {
        const currentValue = await column.nth(i).innerText();
        const currentValueInt = parseInt(currentValue, 10);
        if (columnIdx === 2) {
          expect(currentValueInt).toBeLessThanOrEqual(lastValueInt);
        }
        lastValue = currentValue;
        lastValueInt = currentValueInt;
      }
    }

    {
      // asc order
      await table.locator(`thead tr th:nth-of-type(${columnIdx})`).click();

      let lastValue = await tableBodyRow
        .locator(`td:nth-of-type(${columnIdx})`)
        .first()
        .innerText();
      let lastValueInt = parseInt(lastValue, 10);
      const column = await tableBodyRow.locator(`td:nth-of-type(${columnIdx})`);
      for (let i = 0; i < (await column.count()); i++) {
        const currentValue = await column.nth(i).innerText();
        const currentValueInt = parseInt(currentValue, 10);
        if (columnIdx === 2) {
          expect(currentValueInt).toBeGreaterThanOrEqual(lastValueInt);
        }
        lastValue = currentValue;
        lastValueInt = currentValueInt;
      }
    }
  }
});
