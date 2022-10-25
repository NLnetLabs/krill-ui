import {test, expect} from '@playwright/test';
// @ts-ignore
import {preparePage} from './utils.ts';


test('Expanding the details of a ROA', async ({page}) => {
  await preparePage(page);

  await page.goto('/cas/tg', { waitUntil: 'networkidle' });

  const numOfRoas = await page.locator('table tbody tr td button.expand').count();

  for (let idx = 0; idx < numOfRoas; idx++) {
    await page.locator('table tbody tr td button.expand').nth(idx).click();

    await expect(page.locator('table tbody tr.announcements td div.row')).toHaveCount(1);

    const inspectedRow = await page.locator('table tbody tr', {has: page.locator('button.expand.open')});

    {  // Check whether the numbers of authorized BGP announcements is correct
      const badgeSuccess = await inspectedRow.locator('.badge.success');

      let badgeNumberAuthorized = 0;
      if (await badgeSuccess.count() === 1) {
        badgeNumberAuthorized = parseInt(await badgeSuccess.innerText());
      }

      const authorizesDiv = await page.locator('tr div.row div', {hasText: /Authorizes \d* announcements/});
      const headingAuthorized = await authorizesDiv.locator('h3').innerText();
      const numberAuthorized = parseInt(headingAuthorized.substring(10, headingAuthorized.length - 13));

      expect(badgeNumberAuthorized).toBe(numberAuthorized);

      if (badgeNumberAuthorized === 0) {
        expect(await authorizesDiv.locator('table tbody tr').innerText()).toBe('No data');
      } else {
        const numberOfDisallowedRows = await authorizesDiv.locator('table tbody tr').count();
        expect(badgeNumberAuthorized).toBe(numberOfDisallowedRows);
      }
    }

    { // Check whether the numbers of disallowed BGP announcements is correct
      const badgeDisallowed = await inspectedRow.locator('.badge.warning');

      let badgeNumberDisallowed = 0;
      if (await badgeDisallowed.count() === 1) {
        badgeNumberDisallowed = parseInt(await badgeDisallowed.innerText());
      }

      const disallowDiv = await page.locator('tr div.row div', {hasText: /Disallows \d announcements/});
      const headingDisallowed = await disallowDiv.locator('h3').innerText();
      const numberDisallowed = parseInt(headingDisallowed.substring(9, headingDisallowed.length - 13));

      expect(badgeNumberDisallowed).toBe(numberDisallowed);

      if (badgeNumberDisallowed === 0) {
        expect(await disallowDiv.locator('table tbody tr').innerText()).toBe('No data');
      } else {
        const numberOfDisallowedRows = await disallowDiv.locator('table tbody tr').count();
        expect(badgeNumberDisallowed).toBe(numberOfDisallowedRows);
      }
    }
    await page.locator('table tbody tr td button.expand.open').click();
  }
});