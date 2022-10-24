import {test, expect} from '@playwright/test';


test('sorting of ROA Table', async ({page}) => {
  const sessionStorage = process.env.SESSION_STORAGE;
  await page.addInitScript(storage => {
    const entries = JSON.parse(storage);
    for (const [key, value] of Object.entries(entries)) {
      window.sessionStorage.setItem(key, value as string);
    }
  }, sessionStorage);

  await page.goto('/cas/tg');

  const table = page.locator('table.roa-table');
  const tableBodyRow = table.locator('tbody tr');


  for (let rowIdx = 2; rowIdx <= 3; rowIdx++) {
    // TODO: The state row is not properly sorted yet, as it is sorted by the internal name instead of the displayed one
    { // desc order
      await table.locator(`thead tr th:nth-of-type(${rowIdx})`).click();

      let lastValue = await tableBodyRow.locator(`td:nth-of-type(${rowIdx})`).first().innerText();
      let lastValueInt = parseInt(lastValue);
      const column = await tableBodyRow.locator(`td:nth-of-type(${rowIdx})`);
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
      await table.locator(`thead tr th:nth-of-type(${rowIdx})`).click();

      let lastValue = await tableBodyRow.locator(`td:nth-of-type(${rowIdx})`).first().innerText();
      let lastValueInt = parseInt(lastValue);
      const column = await tableBodyRow.locator(`td:nth-of-type(${rowIdx})`);
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