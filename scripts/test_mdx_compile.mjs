import { compile } from '@mdx-js/mdx';
import fs from 'fs';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const target = process.argv[2];
const content = fs.readFileSync(target, 'utf-8');

try {
  await compile(content, {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  });
  console.log('✅ MDX Compilation SUCCESS!');
} catch (err) {
  console.error('❌ MDX Compilation FAILED:');
  console.error(`Line: ${err.line}, Column: ${err.column}`);
  console.error(`Message: ${err.message}`);
  const lines = content.split('\n');
  if (err.line && lines[err.line - 1]) {
    console.error(`Context:`);
    for (let i = Math.max(0, err.line - 3); i < Math.min(lines.length, err.line + 2); i++) {
      console.error(`${i + 1 === err.line ? '👉' : '  '} ${i + 1}: ${lines[i]}`);
    }
  }
  process.exit(1);
}
