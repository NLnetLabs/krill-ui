import * as fs from 'fs';

export async function addRoutes(page: any) {

  await page.route(/api\/v1/, route => {
    const url = route.request().url();
    const fileName = `./tests/mockResponses/${url.substring(url.indexOf('api/v1/'))}.json`;

    if (!fs.existsSync(fileName)) {
      route.fulfill({
        status: 404,
      });
      return;
    }

    route.fulfill({
      status: 200,
      body: fs.readFileSync(fileName),
    });
  });

  await page.route('**/stats/info', route => route.fulfill({
    status: 200,
    body: JSON.stringify({
      version: '0.10.0-rc3',
      started: 1664865700,
    })
  }));

  // GET
  await page.route('**/auth/login', route => route.fulfill({
    status: 200,
    body: '/login',
  }));

  // POST
  await page.route('**/auth/login', route => {
    if (route.request().method() !== 'POST') {
      route.fallback();
      return;
    }
    route.fulfill({
      status: 200,
      body: JSON.stringify({
        token: '123456',
        id: 'admin_token',
        attributes: {
          role: 'admin'
        }
      })
    });
  });
}