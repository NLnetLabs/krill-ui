import {chromium, expect} from '@playwright/test';

async function globalSetup(config: any) {
  // TODO config param should be of type 'FullConfig', but for some reason playwright does not know this type
  const token = '123456';

  const browser = await chromium.launch();
  const context = await browser.newContext(config.projects[0].use);

  const page = await context.newPage();

  await page.goto('/login');

  await page.locator('input').fill(token);
  await page.locator('button:text("Sign in")').click();

  const regEx = new RegExp('cas/[a-zA-Z0-9@:%._+~#=]{1,256}$');
  await expect(page).toHaveURL(regEx);

  const sessionStorage: string = await page.evaluate(() => JSON.stringify(sessionStorage));
  process.env.SESSION_STORAGE = sessionStorage;

  await browser.close();
}

export default globalSetup;
