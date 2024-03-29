import { test, expect } from '@playwright/test';
// @ts-ignore
import { preparePage } from './utils.ts';

test('change CA', async ({ page }) => {
  await preparePage(page);

  await page.goto('/ui');

  const urlRegEx = new RegExp('cas/[a-zA-Z0-9@:%._+~#=]{1,256}$');
  await expect(page).toHaveURL(urlRegEx);

  const ca = page.url().substring(page.url().lastIndexOf('/') + 1);

  await expect(await page.locator('h2').innerText()).toBe(
    `Certificate Authority ${ca}`
  );

  const dropdown = page.locator('label[for="ca"]~div.select');

  await expect(await dropdown.locator('button').innerText()).toBe(ca);

  await expect(dropdown.locator('ul')).toHaveClass('hide');
  await dropdown.locator('button').click();
  // TODO delete hardcoded timeout when 'no-animation-mode' is introduced
  await page.waitForTimeout(500);

  const cas = dropdown.locator('ul li');

  // make sure to select any other CA that the one before
  let newCa = '';
  for (let i = 0; i < (await cas.count()); i++) {
    newCa = await cas.nth(i).innerText();
    if (newCa !== ca) {
      await cas.nth(i).click();
      break;
    }
  }
  await expect(newCa, 'This test needs at least two CAs to perform').not.toBe(
    ''
  );

  const regEx = new RegExp(`/ui/cas/${newCa}$`);
  await page.waitForURL(regEx);
  await expect(page).toHaveURL(regEx);

  await expect(await page.locator('h2').innerText()).toBe(
    `Certificate Authority ${newCa}`
  );
});
