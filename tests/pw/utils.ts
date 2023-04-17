// @ts-ignore
import { addRoutes } from './mockAPI.ts';

export async function preparePage(page: any) {
  await page.addInitScript(() => {
    window.sessionStorage.setItem('krillToken', '123456');
  });
  await addRoutes(page);
}
