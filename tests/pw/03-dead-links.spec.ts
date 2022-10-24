import {test, expect} from '@playwright/test';


test('Check for potentially dead links', async ({page,request}) => {
  await page.goto('/login');

  const links = await page.getByRole('link');

  for (let i = 0; i < await links.count(); i++) {
    const link = await links.nth(i).getAttribute('href') || '';
    const response = await request.get(link);
    expect(response.status()).not.toBe(404);
  }
});