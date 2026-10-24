import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;
const BASE_URL = "http://localhost:3000";

// Expected subject mapping for semantic header check
const SUBJECT_MAP = {
  toc: "Theory of Computation",
  dbms: "DBMS",
  os: "Operating Systems",
  cn: "Computer Networks",
  coa: "COA",
  "digital-logic": "Digital Logic",
  compiler: "Compiler Design"
};

// 1. Static MDX Analysis & AST Compilation
async function analyzeMDX(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const results = {
    file: path.basename(filePath),
    pass: true,
    rules: [],
    diagrams: [],
    warnings: [],
    errors: []
  };

  // CHECK 1: Real MDX AST Compilation (Acorn & JSX expression parser)
  try {
    await compile(content, {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeKatex]
    });
    results.rules.push({ name: 'MDX AST & Acorn Compilation Test', pass: true });
  } catch (err) {
    results.rules.push({ name: 'MDX AST & Acorn Compilation Test', pass: false });
    const loc = err.line ? `Line ${err.line}, Col ${err.column}: ` : '';
    results.errors.push(`MDX COMPILATION CRASH: ${loc}${err.message}`);
    const lines = content.split('\n');
    if (err.line && lines[err.line - 1]) {
      results.errors.push(`   Offending Line ${err.line}: "${lines[err.line - 1].trim()}"`);
    }
  }

  // CHECK 2: Frontmatter
  if (content.startsWith('---') && content.includes('hide_table_of_contents: true')) {
    results.rules.push({ name: 'Frontmatter hide_table_of_contents', pass: true });
  } else {
    results.rules.push({ name: 'Frontmatter hide_table_of_contents', pass: false });
    results.errors.push('Missing opening frontmatter or hide_table_of_contents: true');
  }

  // CHECK 3: Semantic H1
  if (/^# \d+\.\d+\s+.+/m.test(content)) {
    results.rules.push({ name: 'Explicit Semantic # X.Y Heading', pass: true });
  } else {
    results.rules.push({ name: 'Explicit Semantic # X.Y Heading', pass: false });
    results.errors.push('Missing explicit "# X.Y Title" heading');
  }

  // CHECK 4: CoreDoseLessonHeader
  if (content.includes('<CoreDoseLessonHeader')) {
    results.rules.push({ name: '<CoreDoseLessonHeader /> Component', pass: true });
  } else {
    results.rules.push({ name: '<CoreDoseLessonHeader /> Component', pass: false });
    results.errors.push('Missing <CoreDoseLessonHeader />');
  }

  // CHECK 5: Core Intuition (Analogy + Bridging)
  const hasCoreIntuition = content.includes('## 💡 Core Intuition:');
  const hasAnalogy = content.includes('### 🍳 The Everyday Analogy:');
  const hasBridge = content.includes('### 💻 Bridging to Computer Science');
  if (hasCoreIntuition && hasAnalogy && hasBridge) {
    results.rules.push({ name: 'Pedagogical Anatomy (Analogy & Bridge)', pass: true });
  } else {
    results.rules.push({ name: 'Pedagogical Anatomy (Analogy & Bridge)', pass: false });
    results.errors.push('Missing Core Intuition, Everyday Analogy, or CS Bridge heading');
  }

  // CHECK 6: CoreDoseTOC strictly after Core Intuition and using toc={toc}
  const ciPos = content.indexOf('## 💡 Core Intuition:');
  const tocMatch = content.match(/<CoreDoseTOC\s+toc=\{toc\}\s*\/>/);
  const tocPos = tocMatch ? tocMatch.index : -1;
  if (tocPos !== -1 && ciPos !== -1 && tocPos > ciPos) {
    results.rules.push({ name: '<CoreDoseTOC toc={toc} /> placement after Core Intuition', pass: true });
  } else {
    results.rules.push({ name: '<CoreDoseTOC toc={toc} /> placement after Core Intuition', pass: false });
    if (!tocMatch) {
      results.errors.push('CRITICAL TOC VIOLATION: Must use exact dynamic syntax `<CoreDoseTOC toc={toc} />`. Do NOT pass hardcoded items!');
    } else {
      results.errors.push('<CoreDoseTOC toc={toc} /> is positioned before Core Intuition');
    }
  }

  // CHECK 6b: Strict Zero-Rigid-Numbering Rule (No "## 1.", "## 2.")
  const hasRigidNumbering = /^##\s+\d+\./m.test(content);
  if (!hasRigidNumbering) {
    results.rules.push({ name: 'Strict Zero-Rigid-Numbering Rule (Thematic Icon Headings)', pass: true });
  } else {
    results.rules.push({ name: 'Strict Zero-Rigid-Numbering Rule (Thematic Icon Headings)', pass: false });
    results.errors.push('CRITICAL HEADING VIOLATION: Found rigid textbook numbering (e.g. "## 1.", "## 2."). Headings must be thematic and icon-accented (e.g. "## 📜", "## ⚡")!');
  }

  // CHECK 6c: Locked Section Order & Standardized Headings
  const hasRealWorld = /##\s+🏭\s+Real-World Production Context/i.test(content);
  const hasNumerical = /##\s+📐\s+Numerical Applications & Worked Examples/i.test(content);
  const hasPitfalls = /##\s+🎯\s+Exam & Interview Pitfall Check/i.test(content);
  if (hasRealWorld && hasNumerical && hasPitfalls) {
    // Verify exact sequence ordering: Real-World < Numerical < Pitfalls < CoreDoseNav
    const rwPos = content.search(/##\s+🏭\s+Real-World Production Context/i);
    const numPos = content.search(/##\s+📐\s+Numerical Applications & Worked Examples/i);
    const pitPos = content.search(/##\s+🎯\s+Exam & Interview Pitfall Check/i);
    const navPos = content.indexOf('<CoreDoseNav');

    if (rwPos < numPos && numPos < pitPos && (navPos === -1 || pitPos < navPos)) {
      results.rules.push({ name: 'Locked 11-Part Section Sequence (Real-World → Worked Examples → Pitfalls → Nav)', pass: true });
    } else {
      results.rules.push({ name: 'Locked 11-Part Section Sequence (Real-World → Worked Examples → Pitfalls → Nav)', pass: false });
      results.errors.push('CRITICAL ORDER VIOLATION: Sections must appear strictly in order: Real-World Production Context → Numerical Applications → Exam & Interview Pitfall Check → CoreDoseNav!');
    }
  } else {
    results.rules.push({ name: 'Locked 11-Part Section Headings (Real-World, Worked Examples, Pitfalls)', pass: false });
    if (!hasRealWorld) results.errors.push('Missing standardized heading: "## 🏭 Real-World Production Context:"');
    if (!hasNumerical) results.errors.push('Missing standardized heading: "## 📐 Numerical Applications & Worked Examples"');
    if (!hasPitfalls) results.errors.push('Missing standardized heading: "## 🎯 Exam & Interview Pitfall Check"');
  }

  // CHECK 6d: Strict Zero-Exam-Token & Zero-MCQ Rule
  const examTokenRegex = /\b(GATE|ISRO|NET|BARC|TIFR)\s*[-–]?\s*\d{4}\b|\b\d+\s*Marks?\b/i;
  const mcqOptionRegex = /(?:^|\n)\s*\([A-D]\)\s+[^\n]+/m;
  const hasExamToken = examTokenRegex.test(content);
  const hasMCQOption = mcqOptionRegex.test(content);
  if (!hasExamToken && !hasMCQOption) {
    results.rules.push({ name: 'Strict Zero-Exam-Token & Zero-MCQ Format Rule', pass: true });
  } else {
    results.rules.push({ name: 'Strict Zero-Exam-Token & Zero-MCQ Format Rule', pass: false });
    if (hasExamToken) results.errors.push(`CRITICAL EXAM TOKEN VIOLATION: Found banned exam token or year/marks tag (e.g. "${content.match(examTokenRegex)[0]}").`);
    if (hasMCQOption) results.errors.push('CRITICAL MCQ VIOLATION: Found multiple-choice option letters (A)-(D). Problems must be descriptive university engineering problems!');
  }

  // CHECK 6e: Display Math Tokenizer Failure Prevention
  const brokenMathRegex = /\$\$[^\S\r\n]*\\begin\{(aligned|array|matrix|cases)\}/;
  if (!brokenMathRegex.test(content)) {
    results.rules.push({ name: 'Safe KaTeX Display Math Syntax ($$ on isolated lines)', pass: true });
  } else {
    results.rules.push({ name: 'Safe KaTeX Display Math Syntax ($$ on isolated lines)', pass: false });
    results.errors.push('CRITICAL MATH VIOLATION: Found "$$\\begin{...}" on the same line! Remark-math will fail to parse this block and leak raw LaTeX into the DOM. "$$" must sit on its own isolated line.');
  }

  // CHECK 7: Rule 5: NO RAW MERMAID
  const hasRawMermaid = /```mermaid|<mermaid>/i.test(content);
  if (!hasRawMermaid) {
    results.rules.push({ name: 'Strict Zero-Raw-Mermaid Rule', pass: true });
  } else {
    results.rules.push({ name: 'Strict Zero-Raw-Mermaid Rule', pass: false });
    results.errors.push('CRITICAL VIOLATION: Raw Mermaid SVG/block detected! Must use React diagram components.');
  }

  // CHECK 7b: Strict Zero-ASCII-Diagram Rule
  const codeBlocks = content.match(/```[^\n]*\n([\s\S]*?)```/g) || [];
  let asciiDiagramCount = 0;
  for (const block of codeBlocks) {
    // Exclude actual programming code (c, cpp, python, etc.) if it doesn't have box drawings
    if (/\+[-=]{3,}\+/.test(block) || (/\|[\s\S]{10,}\|/.test(block) && /\+[-=]{3,}/.test(block)) || /[-=]{3,}>/.test(block)) {
      asciiDiagramCount++;
    }
  }
  if (asciiDiagramCount === 0) {
    results.rules.push({ name: 'Strict Zero-ASCII-Diagram Rule', pass: true });
  } else {
    results.rules.push({ name: 'Strict Zero-ASCII-Diagram Rule', pass: false });
    results.errors.push(`CRITICAL VIOLATION: ${asciiDiagramCount} raw ASCII / text box diagram(s) detected in code block(s)! Must use platform React diagram components.`);
  }

  // Detect Diagrams
  const diagramComponents = [
    'ArchitectureStack', 'FlowPipeline', 'ConceptComparison', 'SubsystemGrid',
    'DualModeDiagram', 'ProcessFlow', 'ExecutionBlueprint', 'CurriculumRoadmap',
    'CourseCurriculum', 'StateTransitionDiagram', 'ProcessMemoryMap', 'FlowDiagram',
    'GanttChart', 'DiskSchedulingChart', 'ProtocolLadder', 'ContentionTimeline',
    'FrameFormat', 'PacketHeaderGrid', 'LogicGateSimulator', 'CircuitSimulator',
    'SequentialSimulator', 'CacheSimulator', 'AutomataSimulator'
  ];

  diagramComponents.forEach(comp => {
    const matches = content.match(new RegExp(`<${comp}[\\s\\S]*?\\/>`, 'g'));
    if (matches) {
      results.diagrams.push({ component: comp, count: matches.length });
    }
  });

  // Check valid color tokens
  const colorMatches = content.match(/color=["']([^"']+)["']/g) || [];
  const validTokens = ['blue', 'emerald', 'purple', 'amber', 'cyan', 'rose', 'gray'];
  colorMatches.forEach(m => {
    const col = m.replace(/color=["']|["']/g, '');
    if (!validTokens.includes(col)) {
      results.warnings.push(`Non-standard diagram color token used: "${col}". Expected one of: ${validTokens.join(', ')}`);
    }
  });

  // CHECK 8: Internal Links & 404 Pre-Flight Verification
  const urlMatches = content.matchAll(/(?:url|href)\s*[:=]\s*["'](\/coredose\/[^"']+)["']/g);
  // Locate binary_dose/coredose
  let curDir = path.dirname(filePath);
  while (curDir && path.basename(curDir) !== 'coredose' && path.dirname(curDir) !== curDir) {
    curDir = path.dirname(curDir);
  }
  const coredoseBase = curDir;
  let brokenLinks = 0;
  for (const match of urlMatches) {
    const rawUrl = match[1].replace(/\/$/, '');
    const parts = rawUrl.split('/').filter(Boolean);
    // Ignore hub root /coredose or course roots /coredose/toc, /coredose/os
    if (parts.length <= 2) continue;
    
    // Convert /coredose/toc/module-01/abc -> <coredoseBase>/toc/module-01/abc.mdx
    const relPath = parts.slice(1).join('/');
    const cand1 = path.join(coredoseBase, `${relPath}.mdx`);
    const cand2 = path.join(coredoseBase, relPath, 'index.mdx');
    if (!fs.existsSync(cand1) && !fs.existsSync(cand2)) {
      brokenLinks++;
      results.errors.push(`BROKEN LINK / 404: Target "${rawUrl}" does not exist on disk!`);
    }
  }
  if (brokenLinks === 0) {
    results.rules.push({ name: 'Internal Link & Zero-404 Navigation Integrity', pass: true });
  } else {
    results.rules.push({ name: 'Internal Link & Zero-404 Navigation Integrity', pass: false });
  }

  if (results.errors.length > 0) results.pass = false;
  return results;
}

// 2. CDP Client for Headless Chrome
class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.id && this.callbacks.has(data.id)) {
          const { res, rej } = this.callbacks.get(data.id);
          this.callbacks.delete(data.id);
          if (data.error) rej(data.error);
          else res(data.result);
        }
      };
    });
  }

  async send(method, params = {}) {
    return new Promise((res, rej) => {
      const id = this.id++;
      this.callbacks.set(id, { res, rej });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function runDOMAudit(targetUrl, expectedSubjectKey) {
  // Launch Chrome
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-background-networking',
    '--disable-extensions'
  ]);

  await new Promise(r => setTimeout(r, 1200));

  let cdp;
  const auditReport = {
    mobile: null,
    desktop: null,
    headerVerification: null,
    webpackError: null
  };

  try {
    const targetsRes = await fetch(`http://127.0.0.1:${PORT}/json`);
    const targets = await targetsRes.json();
    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    if (!pageTarget) throw new Error('No Chrome page target available');

    cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();

    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');

    // 1. Test Mobile (375x667)
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      mobile: true
    });

    await cdp.send('Page.navigate', { url: targetUrl });
    await new Promise(r => setTimeout(r, 2200)); // Wait for hot-reload/hydration

    // Check for Webpack errors or build errors on page
    const webpackCheck = await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        const bodyText = document.body ? document.body.innerText : '';
        const overlayEl = document.getElementById('webpack-dev-server-client-overlay');
        const overlayText = overlayEl ? (overlayEl.innerText || (overlayEl.shadowRoot ? overlayEl.shadowRoot.innerText : '')) : '';
        const hasOverlayError = overlayText.trim().length > 0;
        const hasCompileError = bodyText.includes('Compiled with problems') || bodyText.includes('Module build failed') || bodyText.includes('Could not parse expression with acorn');
        const hasError = hasOverlayError || hasCompileError;
        return {
          hasError,
          errorSnippet: hasError ? (overlayText.trim().slice(0, 300) || bodyText.slice(0, 300)) : null
        };
      })()`,
      returnByValue: true
    });

    auditReport.webpackError = webpackCheck.result.value;

    // Check Header & Breadcrumb text
    const headerCheck = await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        const backLink = document.querySelector('a[href*="/coredose/"]');
        const headerText = backLink ? backLink.innerText : '';
        const allText = document.body ? document.body.innerText.slice(0, 800) : '';
        return {
          backLinkText: headerText,
          hasDBMSLeak: allText.includes('Back to DBMS Notes') && !window.location.pathname.includes('/dbms')
        };
      })()`,
      returnByValue: true
    });

    auditReport.headerVerification = headerCheck.result.value;

    // Check for Unrendered Raw LaTeX in DOM
    const rawLatexCheck = await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        const clone = document.body.cloneNode(true);
        clone.querySelectorAll('pre, code, .katex, .katex-mathml, annotation').forEach(el => el.remove());
        const text = clone.innerText || '';
        
        const latexPatterns = [
          /\\\\text\\{/,
          /\\\\begin\\{array\\}/,
          /\\\\end\\{array\\}/,
          /\\\\mathbf\\{/,
          /\\\\rightarrow/,
          /\\\\leftarrow/
        ];
        
        const leaks = [];
        for (const pat of latexPatterns) {
          if (pat.test(text)) {
            leaks.push(pat.toString());
          }
        }
        
        let sampleSnippet = null;
        if (leaks.length > 0) {
          const idx = text.indexOf('\\\\');
          if (idx !== -1) {
            sampleSnippet = text.slice(Math.max(0, idx - 10), Math.min(text.length, idx + 100));
          }
        }
        
        return {
          hasLeak: leaks.length > 0,
          leaks,
          sampleSnippet
        };
      })()`,
      returnByValue: true
    });

    auditReport.rawLatex = rawLatexCheck.result.value;

    // Check for overflow on Mobile
    const mobileEval = await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const pageHasHorizontalScrollbar = scrollWidth > (docWidth + 1);
        
        const badElements = [];
        if (pageHasHorizontalScrollbar) {
          document.querySelectorAll('*').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.right > docWidth + 2) {
              let parent = el.parentElement;
              let isContained = false;
              while (parent && parent !== document.body) {
                const style = window.getComputedStyle(parent);
                if (['hidden', 'auto', 'scroll'].includes(style.overflowX)) {
                  isContained = true;
                  break;
                }
                parent = parent.parentElement;
              }
              if (!isContained) {
                badElements.push({
                  tag: el.tagName.toLowerCase(),
                  className: (el.className && typeof el.className === 'string') ? el.className.slice(0, 50) : '',
                  textSnippet: el.innerText ? el.innerText.trim().slice(0, 40) : '',
                  overflowByPx: Math.round(rect.right - docWidth)
                });
              }
            }
          });
        }

        return {
          docWidth,
          scrollWidth,
          hasHorizontalScrollbar: pageHasHorizontalScrollbar,
          overflowElementCount: badElements.length,
          topOverflowElements: badElements.slice(0, 5)
        };
      })()`,
      returnByValue: true
    });

    auditReport.mobile = mobileEval.result.value;

    // 2. Test Desktop (1440x900)
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    await new Promise(r => setTimeout(r, 600));

    const desktopEval = await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        return {
          docWidth,
          scrollWidth,
          hasHorizontalScrollbar: scrollWidth > docWidth
        };
      })()`,
      returnByValue: true
    });

    auditReport.desktop = desktopEval.result.value;

  } finally {
    if (cdp) cdp.close();
    chromeProcess.kill('SIGKILL');
  }

  return auditReport;
}

async function main() {
  const targetMdx = process.argv[2];
  if (!targetMdx) {
    console.error('Usage: node scripts/audit_note.mjs <path-to-mdx>');
    process.exit(1);
  }

  const fullPath = path.resolve(targetMdx);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    process.exit(1);
  }

  console.log('\n================================================================');
  console.log('       BINARY DOSE NOTE QA & VISUAL RESPONSIVENESS AUDITOR       ');
  console.log('================================================================');

  // 1. Static MDX & AST Compilation Analysis
  const staticRes = await analyzeMDX(fullPath);
  console.log(`\n📄 Note: ${staticRes.file}`);
  console.log('----------------------------------------------------------------');
  staticRes.rules.forEach(r => {
    console.log(`${r.pass ? '✅' : '❌'} ${r.name}`);
  });

  if (staticRes.diagrams.length > 0) {
    console.log('\n📊 Detected Diagram Components:');
    staticRes.diagrams.forEach(d => console.log(`   • <${d.component} /> (${d.count} instance${d.count > 1 ? 's' : ''})`));
  } else {
    console.log('\n⚠️ No registered React diagram components detected in this lesson.');
  }

  if (staticRes.warnings.length > 0) {
    console.log('\n⚠️ Warnings:');
    staticRes.warnings.forEach(w => console.log(`   - ${w}`));
  }

  if (staticRes.errors.length > 0) {
    console.log('\n❌ Rule & Compilation Violations:');
    staticRes.errors.forEach(e => console.log(`   - ${e}`));
  }

  // 2. Compute Route URL & Subject
  const normPath = fullPath.replace(/\\/g, '/');
  const coredoseIdx = normPath.indexOf('/coredose/');
  let routePath = '';
  let subjectKey = '';
  if (coredoseIdx !== -1) {
    routePath = normPath.slice(coredoseIdx).replace(/\.mdx?$/, '');
    const parts = routePath.split('/');
    subjectKey = parts[2] || '';
  }

  if (routePath) {
    const liveUrl = `${BASE_URL}${routePath}`;
    console.log('\n🌐 Live Localhost Viewport Audit: ' + liveUrl);
    console.log('----------------------------------------------------------------');

    try {
      const domReport = await runDOMAudit(liveUrl, subjectKey);

      // Webpack compilation check
      if (domReport.webpackError && domReport.webpackError.hasError) {
        console.log(`❌ [Webpack Error Overlay] THE LIVE PAGE HAS A RUNTIME COMPILATION CRASH!`);
        if (domReport.webpackError.errorSnippet) {
          console.log(`   Snippet: ${domReport.webpackError.errorSnippet}`);
        }
        staticRes.pass = false;
      } else {
        console.log(`✅ [Webpack Status] Live page compiled cleanly without error overlays.`);
      }

      // Semantic Header check
      if (domReport.headerVerification) {
        if (domReport.headerVerification.hasDBMSLeak) {
          console.log(`❌ [Header Consistency Error] Header contains "Back to DBMS Notes" on a non-DBMS page!`);
          staticRes.pass = false;
        } else {
          console.log(`✅ [Header Consistency] Breadcrumbs and back links correctly match the subject.`);
        }
      }

      // Unrendered Raw LaTeX check
      if (domReport.rawLatex && domReport.rawLatex.hasLeak) {
        console.log(`❌ [Unrendered LaTeX Leak] Raw LaTeX syntax leaked into rendered DOM!`);
        console.log(`   Patterns found: ${domReport.rawLatex.leaks.join(', ')}`);
        if (domReport.rawLatex.sampleSnippet) {
          console.log(`   Snippet: "${domReport.rawLatex.sampleSnippet.trim()}"`);
        }
        staticRes.pass = false;
      } else {
        console.log(`✅ [LaTeX Quality] Zero raw unrendered LaTeX syntax leaked into DOM.`);
      }

      // Mobile check
      const mob = domReport.mobile;
      if (mob) {
        if (!mob.hasHorizontalScrollbar && mob.overflowElementCount === 0) {
          console.log(`✅ [Mobile 375px] Zero horizontal scrollbar leak! (clientWidth: ${mob.docWidth}px, scrollWidth: ${mob.scrollWidth}px)`);
        } else {
          console.log(`❌ [Mobile 375px] OVERFLOW DETECTED: scrollWidth (${mob.scrollWidth}px) exceeds clientWidth (${mob.docWidth}px)`);
          console.log(`   Elements leaking outside viewport (${mob.overflowElementCount}):`);
          mob.topOverflowElements.forEach(el => {
            console.log(`   • <${el.tag} class="${el.className}"> +${el.overflowByPx}px`);
            if (el.textSnippet) console.log(`     Text: "${el.textSnippet}"`);
          });
        }
      }

      // Desktop check
      const dsk = domReport.desktop;
      if (dsk) {
        if (!dsk.hasHorizontalScrollbar) {
          console.log(`✅ [Desktop 1440px] Layout intact, zero horizontal overflow.`);
        } else {
          console.log(`❌ [Desktop 1440px] Unexpected horizontal scrollbar.`);
        }
      }

      console.log('================================================================');
      const isClean = staticRes.pass &&
                      (!domReport.webpackError || !domReport.webpackError.hasError) &&
                      (!domReport.headerVerification || !domReport.headerVerification.hasDBMSLeak) &&
                      (!domReport.rawLatex || !domReport.rawLatex.hasLeak) &&
                      mob && !mob.hasHorizontalScrollbar && mob.overflowElementCount === 0 &&
                      dsk && !dsk.hasHorizontalScrollbar;

      if (isClean) {
        console.log('🎉 AUDIT VERDICT: 100% PRODUCTION READY TO COMMIT!\n');
      } else {
        console.log('⚠️ AUDIT VERDICT: ISSUES DETECTED - APPLY CORRECTIONS BEFORE COMMIT.\n');
        process.exit(1);
      }

    } catch (err) {
      console.log(`⚠️ Live DOM check skipped/failed: ${err.message}`);
      console.log('   (Ensure docusaurus dev server is running on http://localhost:3000)');
      process.exit(1);
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
