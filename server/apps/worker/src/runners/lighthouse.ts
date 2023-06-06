import { OutputMode } from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { importDynamic } from '../utils/exec';

type Loglevel = 'info' | 'silent' | 'error' | 'warn' | 'verbose';
export class Lighthouse {
  async run(url: string) {
    const lighthouse = (await importDynamic('lighthouse')).default;

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

    return runnerResult.lhr.audits;
  }
}
