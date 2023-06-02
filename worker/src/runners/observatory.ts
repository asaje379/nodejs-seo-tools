import { executeCommand } from 'src/utils/exec';
import { Http } from 'src/utils/http';

export class Observatory {
  async run(url: string) {
    console.log('Domain:', Http.getDomain(url));
    const result = await executeCommand(
      `npx observatory ${Http.getDomain(url)}`,
    );
    console.log(result);
    return result;
  }
}
