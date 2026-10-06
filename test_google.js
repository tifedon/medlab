const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/sign-in');
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err));

  console.log('Clicking Google Sign In...');
  const [request] = await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => null),
    page.click('button.page_googleButton__X4EwA, button:has-text("Sign in with Google")').catch(e => console.log('Click error:', e.message))
  ]);
  
  console.log('After click, URL is:', page.url());
  await browser.close();
})();
