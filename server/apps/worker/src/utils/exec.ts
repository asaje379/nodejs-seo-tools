import { exec } from 'child_process';

export const importDynamic = new Function(
  'modulePath',
  'return import(modulePath)',
);

export async function executeCommand(cmd: string) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout) => {
      console.log(stdout, 'stdout');
      if (err) reject(err);
      resolve(stdout);
    });
  });
}
