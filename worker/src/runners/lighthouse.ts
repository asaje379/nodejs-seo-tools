import { OutputMode } from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { writeFileSync } from 'fs';

export const importDynamic = new Function(
  'modulePath',
  'return import(modulePath)',
);

type Loglevel = 'info' | 'silent' | 'error' | 'warn' | 'verbose';
export class Lighthouse {
  async run(url: string) {
    const lighthouse = (await importDynamic('lighthouse')).default;

    console.log(lighthouse, chromeLauncher);

    const chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless'],
    });
    const options = {
      logLevel: 'info' as Loglevel,
      output: 'json' as OutputMode,
      onlyCategories: ['performance'],
      port: chrome.port,
    };
    const runnerResult = await lighthouse(url, options);
    writeFileSync('report.txt', JSON.stringify(runnerResult.lhr.audits));

    return runnerResult.lhr.audits;
  }
}
