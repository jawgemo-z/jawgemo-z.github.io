const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '..');
const hexoBin = path.join(root, 'node_modules', 'hexo', 'bin', 'hexo');

if (!fs.existsSync(hexoBin)) {
  console.log('');
  console.log('  找不到 hexo，依赖可能没装好。');
  console.log('  在这个文件夹里执行一次 npm install 就好了。');
  console.log('');
  process.exit(1);
}

console.log('');
console.log('  正在启动本地预览，几秒后浏览器会自动打开 http://localhost:4000');
console.log('  看完后在这个窗口按 Ctrl+C 关闭。');
console.log('');

const server = spawn(process.execPath, [hexoBin, 'server'], {
  cwd: root,
  stdio: 'inherit'
});

setTimeout(() => {
  if (!process.env.NO_OPEN) exec('start "" http://localhost:4000');
}, 4000);

server.on('exit', (code) => {
  process.exit(code === null ? 0 : code);
});

process.on('SIGINT', () => {
  server.kill();
  process.exit(0);
});
