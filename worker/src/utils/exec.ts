import { exec } from 'child_process';

export async function executeCommand(cmd: string) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout) => {
      if (err) reject(err);
      resolve(stdout);
    });
  });
}
