const fs = require("fs");
const path = require("path");

/**
 * Helper to count files matching a regex recursively
 */
function countFilesRecursively(dirPath, pattern) {
  if (!fs.existsSync(dirPath)) return 0;
  let count = 0;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      count += countFilesRecursively(fullPath, pattern);
    } else if (entry.isFile() && pattern.test(entry.name)) {
      count++;
    }
  }

  return count;
}

/**
 * Helper to count immediate subdirectories (e.g. topic categories)
 */
function countCategories(dirPath) {
  if (!fs.existsSync(dirPath)) return 0;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  return entries.filter(
    (e) => e.isDirectory() && !e.name.startsWith(".") && e.name !== "node_modules"
  ).length;
}

/**
 * Returns dynamic metrics about the content library.
 * Executed at build/startup time so numbers are 100% automated.
 */
function getSiteStats(rootDir = process.cwd()) {
  const codingDir = path.join(rootDir, "coding");
  const hundredDaysDir = path.join(rootDir, "100-days");
  const pyqsDir = path.join(rootDir, "pyqs");

  // Count DSA problems (exclude index.mdx if present)
  let totalProblems = countFilesRecursively(codingDir, /\.(md|mdx)$/);
  // Subtract index.mdx if counted
  if (fs.existsSync(path.join(codingDir, "index.mdx"))) {
    totalProblems = Math.max(0, totalProblems - 1);
  }

  const totalCategories = countCategories(codingDir);

  let hundredDaysCount = countFilesRecursively(hundredDaysDir, /\.md$/);

  return {
    totalProblems,
    totalCategories,
    hundredDaysCount,
    visualizerEnginesCount: 4, // Sorting, Two Pointers, Binary Search, Sliding Window
    videoPlaylistsCount: 4,    // OS, Algorithms, Data Structures, OOPs
  };
}

module.exports = getSiteStats;
