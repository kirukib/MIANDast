import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function shot(page, url, file) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: file, fullPage: false });
  console.log("wrote", file);
}

const out = path.join(__dirname, "..", "docs", "screenshots");
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await shot(page, "https://dast.askmian.com/", path.join(out, "before-home.png"));
await page.goto("https://dast.askmian.com/#pricing", { waitUntil: "domcontentloaded", timeout: 90000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: path.join(out, "before-pricing.png"), fullPage: false });
console.log("wrote before-pricing.png");

const afterBase = process.env.AFTER_URL || "http://127.0.0.1:3000";
await shot(page, afterBase + "/", path.join(out, "after-home.png"));
await page.goto(afterBase + "/#pricing", { waitUntil: "domcontentloaded", timeout: 90000 });
await page.waitForTimeout(800);
await page.locator("#pricing").scrollIntoViewIfNeeded().catch(() => {});
await page.waitForTimeout(1200);
await page.screenshot({ path: path.join(out, "after-pricing.png"), fullPage: false });
console.log("wrote after-pricing.png");
await shot(page, afterBase + "/dash", path.join(out, "after-dashboard.png"));
await shot(page, afterBase + "/dash/settings", path.join(out, "after-settings-toggle.png"));

await browser.close();
