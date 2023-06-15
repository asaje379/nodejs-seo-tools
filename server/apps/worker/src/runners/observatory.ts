import { executeCommand } from '../utils/exec';
import { Http } from '../utils/http';

export class Observatory {
  async run(url: string) {
    const jsonResult = await executeCommand(
      `npx observatory ${Http.getDomain(url)} --rescan -z --format=json`,
    );

    const textResult = await executeCommand(
      `npx observatory ${Http.getDomain(url)} --format=report`,
    );

    console.log(jsonResult, 'result');

    return {
      ...this.getJson(jsonResult as string),
      score: this.getScore(textResult as string),
      grade: this.getGrade(textResult as string),
    };
  }

  getJson(report: string) {
    const startIndex = report.indexOf('{');
    const json = report.slice(startIndex);
    return JSON.parse(json);
  }

  getScore(report: string) {
    return report.split('Score: ')[1].split('\n')[0];
  }

  getGrade(report: string) {
    return report.split('Grade: ')[1].split('\n')[0];
  }
}
