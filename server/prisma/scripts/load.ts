import { execSync } from 'child_process';

function wait(n: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), n * 1000);
  });
}

async function run() {
  execSync('yarn migrate:gen && yarn migrate:prod');
  await wait(5);
}

run();
