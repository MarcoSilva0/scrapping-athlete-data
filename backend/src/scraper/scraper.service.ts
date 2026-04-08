import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

export interface AthleteResult {
  title: string;
  url: string;
}

const MAX_RESULTS = 10;

@Injectable()
export class ScraperService {
  async searchAthlete(name: string): Promise<AthleteResult[]> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const query = encodeURIComponent(`${name} triathlon resultados`);
    await page.goto(`https://www.google.com/search?q=${query}`, {
      waitUntil: 'domcontentloaded',
    });

    const results: AthleteResult[] = await page.evaluate((maxResults: number) => {
      const links = Array.from(document.querySelectorAll('div#search a[href]'));
      return links.slice(0, maxResults).map((link) => ({
        title: link.textContent?.trim() ?? '',
        url: (link as HTMLAnchorElement).href,
      }));
    }, MAX_RESULTS);

    await browser.close();
    return results.filter((r) => r.url.startsWith('http'));
  }
}
