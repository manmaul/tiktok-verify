import { chromium } from "playwright";

export async function getTikTokTop30() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.tiktok.com/tag/funny");

  await page.waitForTimeout(5000);

  // Scrollea para cargar más elementos
  for (let i = 0; i < 5; i++) {
    await page.mouse.wheel(0, 5000);
    await page.waitForTimeout(1000);
  }

  const videos = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll("a[href*='/video/']"));
    return items.slice(0, 30).map(a => ({
      url: a.href
    }));
  });

  await browser.close();
  return videos;
}

