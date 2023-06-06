import { executeCommand } from '../utils/exec';
import { Http } from '../utils/http';

export class Observatory {
  async run(url: string) {
    const result = await executeCommand(
      `npx observatory ${Http.getDomain(url)}`,
    );
    console.log(result);
    return result;
  }
}
