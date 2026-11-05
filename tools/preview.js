const { spawn, exec } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..');

console.log('');
console.log('  正在启动本地预览，几秒后浏览器会自动打开 http://localhost:4000');
console.log('  看完后在这个窗口按 Ctrl+C 关闭。');
console.log('');

const server = spawn('npx', ['hexo', 'server'], {
  cwd: root,
  stdio: 'inherit',
  shell: true
});

setTimeout(() => {
  exec('start http://localhost:4000');
}, 4000);

process.on('SIGINT', () => {
  server.kill();
  process.exit(0);
});
