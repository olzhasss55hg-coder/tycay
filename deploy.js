const { spawn } = require('child_process');

const deploy = spawn('npx.cmd', ['surge', 'dist', 'aysezim-toy.surge.sh'], { shell: true });

deploy.stdout.on('data', (data) => {
  const output = data.toString();
  console.log(output);
  if (output.toLowerCase().includes('email:')) {
    deploy.stdin.write('aysezim.toy.2026@gmail.com\n');
  }
  if (output.toLowerCase().includes('password:')) {
    deploy.stdin.write('AysezimPassword123!\n');
  }
});

deploy.stderr.on('data', (data) => {
  console.error(data.toString());
});

deploy.on('close', (code) => {
  console.log(`exited with code ${code}`);
});
