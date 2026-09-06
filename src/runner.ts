import * as fs from 'fs';
import * as path from 'path';

const problemsDir = path.join(__dirname, 'problems');

// Argumentdan masala raqamini olish, bo'lmasa oxirgisini ishlatish
const arg = process.argv[2];

function getLatestProblem(): string {
  const files = fs
    .readdirSync(problemsDir)
    .filter((f) => f.endsWith('-problems.ts'))
    .sort((a, b) => {
      const numA = parseInt(a.split('-')[0]);
      const numB = parseInt(b.split('-')[0]);
      return numA - numB;
    });

  if (files.length === 0) {
    console.error('❌ Hech qanday masala topilmadi!');
    process.exit(1);
  }

  return files[files.length - 1];
}

let targetFile: string;

if (arg) {
  // Raqam berilgan bo'lsa, shu masalani yuklash
  targetFile = path.join(problemsDir, `${arg}-problems.ts`);
  if (!fs.existsSync(targetFile)) {
    console.error(`❌ Masala topilmadi: ${arg}-problems.ts`);
    process.exit(1);
  }
} else {
  // Argument yo'q — oxirgi masalani yuklash
  targetFile = path.join(problemsDir, getLatestProblem());
}

const fileName = path.basename(targetFile);
console.log(`\n🚀 Running: ${fileName}\n${'─'.repeat(40)}`);

require(targetFile);
