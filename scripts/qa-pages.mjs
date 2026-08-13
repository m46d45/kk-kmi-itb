import { chromium } from "playwright";
const browser = await chromium.launch({ args: ["--no-sandbox"] });

async function shot(url, path, size) {
  const page = await browser.newPage({ viewport: size });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(400);
  const text = (await page.locator("body").innerText()).slice(0, 220).replace(/\s+/g, " ");
  await page.screenshot({ path, fullPage: false });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
  console.log(JSON.stringify({ url, path, overflow, errors, text }));
  await page.close();
}

await shot("http://127.0.0.1:8080/", "/workspace/screenshots/home-mobile.png", { width: 390, height: 844 });
await shot("http://127.0.0.1:8080/berita", "/workspace/screenshots/berita-full.png", { width: 1280, height: 900 });
await shot("http://127.0.0.1:8080/widget", "/workspace/screenshots/widget-full.png", { width: 1280, height: 900 });
await shot("http://127.0.0.1:8080/embed", "/workspace/screenshots/embed2.png", { width: 1100, height: 900 });
await shot("http://127.0.0.1:8080/tentang", "/workspace/screenshots/tentang.png", { width: 1280, height: 800 });
await shot("http://127.0.0.1:8080/login", "/workspace/screenshots/login.png", { width: 390, height: 844 });
await browser.close();
