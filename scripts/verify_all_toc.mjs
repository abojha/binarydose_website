import fs from 'fs';
import path from 'path';
import katex from 'katex';

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else if (file.endsWith('.mdx')) {
      results.push(file);
    }
  });
  return results;
}

const allFiles = getFiles('binary_dose/coredose/toc');
console.log(`Found ${allFiles.length} TOC MDX files to verify.\n`);

let totalErrors = 0;
const errorSummary = [];

for (const file of allFiles) {
  const relPath = path.relative(process.cwd(), file);
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  let fileErrors = 0;

  // 1. Check for raw mermaid
  if (/```mermaid[\s\S]*?```/.test(content)) {
    console.log(`❌ [MERMAID ERROR] in ${relPath}: Raw mermaid block detected!`);
    fileErrors++;
  }

  // 2. Check for ASCII art in code blocks
  const codeBlockRegex = /```[\s\S]*?```/g;
  let blockMatch;
  while ((blockMatch = codeBlockRegex.exec(content)) !== null) {
    const b = blockMatch[0];
    if (/\+[-=]{2,}\+/.test(b) || /[-=]{2,}>/.test(b) || (/\|[\s\S]{5,}\|/.test(b) && /\+[-=]{2,}/.test(b))) {
      console.log(`❌ [ASCII ERROR] in ${relPath}: ASCII diagram detected in code block:\n${b.slice(0, 100)}...`);
      fileErrors++;
    }
  }

  // 3. KaTeX display math formatting ($$\begin and \end$$ on same line)
  lines.forEach((line, i) => {
    if (line.includes('$$\\begin')) {
      console.log(`❌ [KaTeX DISPLAY ERROR] in ${relPath}:${i+1}: "$$\\begin" on same line`);
      fileErrors++;
    }
    if (line.includes('\\end') && line.trim().endsWith('$$') && !line.trim().startsWith('$$')) {
      console.log(`❌ [KaTeX DISPLAY ERROR] in ${relPath}:${i+1}: "\\end" with "$$" on same line`);
      fileErrors++;
    }
  });

  // 4. Rigid H2/H3 numbering check
  lines.forEach((line, i) => {
    if (/^##\s+\d+\./.test(line)) {
      console.log(`❌ [HEADING NUMBERING ERROR] in ${relPath}:${i+1}: Rigid H2 numbering: "${line}"`);
      fileErrors++;
    }
    if (/^###\s+\d+\./.test(line)) {
      console.log(`❌ [HEADING NUMBERING ERROR] in ${relPath}:${i+1}: Rigid H3 numbering: "${line}"`);
      fileErrors++;
    }
  });

  // 5. Raw LaTeX leak in headings
  lines.forEach((line, i) => {
    if (/^#{2,4}\s+.*(\\[a-zA-Z]+|\$)/.test(line)) {
      console.log(`❌ [HEADING LATEX LEAK] in ${relPath}:${i+1}: LaTeX in heading: "${line}"`);
      fileErrors++;
    }
  });

  // 6. Exam tokens
  const banned = [/\b(GATE|ISRO|NET|BARC|TIFR)\s*[-–]?\s*\d{4}\b/i, /\b\d+\s*Marks?\b/i, /\bGATE\s+Exam\b/i];
  for (const b of banned) {
    const match = content.match(b);
    if (match) {
      console.log(`❌ [EXAM TOKEN ERROR] in ${relPath}: Found "${match[0]}"`);
      fileErrors++;
    }
  }

  // 7. Multiple choice format
  lines.forEach((line, i) => {
    if (/^\s*\(?[A-D]\)\s+[A-Za-z0-9]/.test(line)) {
      console.log(`❌ [MCQ ERROR] in ${relPath}:${i+1}: MCQ format: "${line}"`);
      fileErrors++;
    }
  });

  // 8. CoreDoseTOC checks (lessons only)
  if (!file.endsWith('index.mdx')) {
    if (content.includes('<CoreDoseTOC items=')) {
      console.log(`❌ [TOC ERROR] in ${relPath}: Hardcoded items in CoreDoseTOC`);
      fileErrors++;
    }
    if (!content.includes('<CoreDoseTOC toc={toc} />')) {
      console.log(`❌ [TOC ERROR] in ${relPath}: Missing dynamic <CoreDoseTOC toc={toc} />`);
      fileErrors++;
    }
  }

  // 9. Full KaTeX render test
  // Extract math blocks
  const displayMathRegex = /\$\$([\s\S]*?)\$\$/g;
  let dMatch;
  while ((dMatch = displayMathRegex.exec(content)) !== null) {
    const math = dMatch[1];
    try {
      katex.renderToString(math, { displayMode: true, throwOnError: true });
    } catch (err) {
      console.log(`❌ [KaTeX PARSE ERROR] in ${relPath} (Display Math): ${err.message}`);
      fileErrors++;
    }
  }

  const inlineMathRegex = /(?<!\$)\$(?!\$)(.*?)(?<!\$)\$(?!\$)/g;
  let iMatch;
  while ((iMatch = inlineMathRegex.exec(content)) !== null) {
    const math = iMatch[1];
    if (!math.trim()) continue;
    try {
      katex.renderToString(math, { displayMode: false, throwOnError: true });
    } catch (err) {
      console.log(`❌ [KaTeX PARSE ERROR] in ${relPath} (Inline Math): ${err.message}`);
      fileErrors++;
    }
  }

  if (fileErrors > 0) {
    totalErrors += fileErrors;
    errorSummary.push({ file: relPath, count: fileErrors });
  }
}

console.log('\n==============================================');
if (totalErrors === 0) {
  console.log('🎉 ALL 31 TOC MDX FILES PASSED 100% OF VERIFICATION CHECKS!');
} else {
  console.log(`⚠️ FOUND ${totalErrors} TOTAL ERRORS ACROSS ${errorSummary.length} FILES.`);
  console.log(JSON.stringify(errorSummary, null, 2));
}
console.log('==============================================\n');
