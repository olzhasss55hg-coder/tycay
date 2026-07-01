const { spawn } = require('child_process');

const domain = 'aysezim-tusaukeser-2026.surge.sh';
const deploy = spawn('npx.cmd', ['surge', 'dist', domain], { shell: true });

deploy.stdout.on('data', (data) => {
  const output = data.toString();
  console.log(output);
  if (output.toLowerCase().includes('email:')) {
    deploy.stdin.write('aysezim.toy.2026@gmail.com\n');
  }
  if (output.toLowerCase().includes('password:')) {
    deploy.stdin.write('AysezimPassword123!\n');
    
    // Automatically send an extra Enter key after a few seconds to confirm the domain
    setTimeout(() => {
      deploy.stdin.write('\n');
    }, 5000);
  }
});

deploy.stderr.on('data', (data) => {
  console.error(data.toString());
});

deploy.on('close', (code) => {
  console.log(`exited with code ${code}`);
});
