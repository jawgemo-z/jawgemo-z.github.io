const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const root = path.join(__dirname, '..');
const postsDir = path.join(root, 'source', '_posts');

function pad(n) {
  return String(n).padStart(2, '0');
}

function stamp(d) {
  return (
    d.getFullYear() +
    '-' + pad(d.getMonth() + 1) +
    '-' + pad(d.getDate()) +
    ' ' + pad(d.getHours()) +
    ':' + pad(d.getMinutes()) +
    ':00'
  );
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question('今天想写点什么？（输入标题，回车确认）：', (answer) => {
  rl.close();

  const title = (answer || '').trim();
  if (!title) {
    console.log('\n没有输入标题，已取消。');
    process.exit(0);
  }

  const safe = title.replace(/[\\/:*?"<>|]/g, ' ').replace(/\s+/g, ' ').trim();
  const file = path.join(postsDir, safe + '.md');

  if (fs.existsSync(file)) {
    console.log('\n已经有一篇叫《' + safe + '》的文章了，换个标题或者直接去改那一篇。');
    process.exit(0);
  }

  fs.mkdirSync(postsDir, { recursive: true });
  fs.mkdirSync(path.join(postsDir, safe), { recursive: true });

  const body = [
    '---',
    'title: ' + safe,
    'date: ' + stamp(new Date()),
    'tags:',
    '---',
    '',
    ''
  ].join('\n');

  fs.writeFileSync(file, body, 'utf8');

  console.log('\n已创建：' + file);
  console.log('现在用默认编辑器打开，写完保存就好。\n');

  execFile('cmd', ['/c', 'start', '', file], () => {});
});
