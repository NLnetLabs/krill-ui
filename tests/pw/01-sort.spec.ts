import {test, expect} from '@playwright/test';
// @ts-ignore
import {preparePage} from './utils.ts';


test('sorting of ROA Table', async ({page}) => {
  await preparePage(page);

  await page.goto('/');

  const table = page.locator('table.roa-table');
  const tableBodyRow = table.locator('tbody tr');


  for (let columnIdx = 2; columnIdx <= 3; columnIdx++) {
    // TODO: The state column is not properly sorted yet, as it is sorted by the internal name instead of the displayed one
    { // desc order
      await table.locator(`thead tr th:nth-of-type(${columnIdx})`).click();

      let lastValue = await tableBodyRow.locator(`td:nth-of-type(${columnIdx})`).first().innerText();
      let lastValueInt = parseInt(lastValue);
      const column = await tableBodyRow.locator(`td:nth-of-type(${columnIdx})`);
      for (let i = 0; i < await column.count(); i++) {
        const currentValue = await column.nth(i).innerText();
        const currentValueInt = parseInt(currentValue);
        if (!isNaN(currentValueInt) && !isNaN(lastValueInt)) {
          expect(currentValueInt <= lastValueInt).toBeTruthy();
        } else {
          expect(currentValue <= lastValue).toBeTruthy();
        }
        lastValue = currentValue;
        lastValueInt = currentValueInt;
      }
    }

    { // asc order
      await table.locator(`thead tr th:nth-of-type(${columnIdx})`).click();

      let lastValue = await tableBodyRow.locator(`td:nth-of-type(${columnIdx})`).first().innerText();
      let lastValueInt = parseInt(lastValue);
      const column = await tableBodyRow.locator(`td:nth-of-type(${columnIdx})`);
      for (let i = 0; i < await column.count(); i++) {
        const currentValue = await column.nth(i).innerText();
        const currentValueInt = parseInt(currentValue);
        if (!isNaN(currentValueInt) && !isNaN(lastValueInt)) {
          expect(currentValueInt >= lastValueInt).toBeTruthy();
        } else {
          expect(currentValue >= lastValue).toBeTruthy();
        }
        lastValue = currentValue;
        lastValueInt = currentValueInt;
      }
    }
  }
});