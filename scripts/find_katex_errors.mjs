import fs from 'fs';
import path from 'path';
import katex from 'katex';

const tocDir = 'binary_dose/coredose/toc';

function getMdxFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getMdxFiles(fullPath));
    } else if (file.endsWith('.mdx')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getMdxFiles(tocDir);
let totalErrors = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let fileErrors = 0;

  // 1. Remove code blocks (``` ... ```) so we don't parse markdown code as math
  content = content.replace(/```[\s\S]*?```/g, '');
  // Remove inline code (` ... `)
  content = content.replace(/`[^`\n]+`/g, '');

  // 2. Check Display Math: $$ ... $$
  const displayRegex = /\$\$([\s\S]*?)\$\$/g;
  let dMatch;
  let cleanContent = content;
  while ((dMatch = displayRegex.exec(content)) !== null) {
    const math = dMatch[1].trim();
    if (!math) continue;
    try {
      katex.renderToString(math, { displayMode: true, throwOnError: true });
    } catch (err) {
      const lineNum = content.slice(0, dMatch.index).split('\n').length;
      console.log(`❌ [DISPLAY KaTeX ERROR] ${file}:${lineNum}`);
      console.log(`   Math: "${math.slice(0, 80)}"`);
      console.log(`   Error: ${err.message}\n`);
      fileErrors++;
      totalErrors++;
    }
  }

  // Replace display math with spaces to avoid interfering with inline math
  cleanContent = content.replace(/\$\$[\s\S]*?\$\$/g, ' ');

  // 3. Check Inline Math: $ ... $ (non-empty, single-line)
  // Inline math regex: $ preceded by space/punctuation/start, followed by non-space, ending with non-space before $
  const inlineRegex = /(?<=\s|^|[([{,;])\$(?!\$)([^\$\n]+?)(?<!\\)\$/g;
  let iMatch;
  while ((iMatch = inlineRegex.exec(cleanContent)) !== null) {
    const math = iMatch[1].trim();
    if (!math) continue;
    try {
      katex.renderToString(math, { displayMode: false, throwOnError: true });
    } catch (err) {
      const lineNum = cleanContent.slice(0, iMatch.index).split('\n').length;
      console.log(`❌ [INLINE KaTeX ERROR] ${file}:${lineNum}`);
      console.log(`   Math: "${math}"`);
      console.log(`   Error: ${err.message}\n`);
      fileErrors++;
      totalErrors++;
    }
  }

  if (fileErrors > 0) {
    console.log(`⚠️ ${fileErrors} errors in ${file}`);
  }
}

console.log('==============================================');
if (totalErrors === 0) {
  console.log('🎉 ALL 31 FILES ARE 100% CLEAN OF KaTeX ERRORS!');
} else {
  console.log(`⚠️ DETECTED ${totalErrors} KaTeX ERRORS.`);
}
console.log('==============================================');
