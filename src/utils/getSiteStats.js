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

  // Dynamic CoreDose Subject and Topic Discovery
  const coredoseDir = path.join(rootDir, "coredose");
  const coredoseStats = {};
  let totalCoredoseTopics = 0;
  let totalCoredoseModules = 0;
  let activeCoursesCount = 0;

  if (fs.existsSync(coredoseDir)) {
    const subjects = fs.readdirSync(coredoseDir, { withFileTypes: true });
    for (const sub of subjects) {
      if (sub.isDirectory() && !sub.name.startsWith(".") && sub.name !== "node_modules") {
        const subDir = path.join(coredoseDir, sub.name);
        const subEntries = fs.readdirSync(subDir, { withFileTypes: true });
        const modules = subEntries.filter(
          (e) => e.isDirectory() && (e.name.startsWith("chapter-") || e.name.startsWith("module-"))
        ).length;

        let topics = countFilesRecursively(subDir, /\.(md|mdx)$/);
        if (fs.existsSync(path.join(subDir, "index.mdx"))) {
          topics = Math.max(0, topics - 1);
        }
        if (fs.existsSync(path.join(subDir, "index.md"))) {
          topics = Math.max(0, topics - 1);
        }

        if (topics > 0) {
          activeCoursesCount++;
          totalCoredoseTopics += topics;
          totalCoredoseModules += modules;
        }

        coredoseStats[sub.name] = {
          modules,
          topics,
        };
      }
    }
  }

  const stats = {
    totalProblems,
    totalCategories,
    hundredDaysCount,
    visualizerEnginesCount: 4, // Sorting, Two Pointers, Binary Search, Sliding Window
    videoPlaylistsCount: 4,    // OS, Algorithms, Data Structures, OOPs
    coredose: {
      activeCoursesCount,
      totalTopics: totalCoredoseTopics,
      totalModules: totalCoredoseModules,
      subjects: coredoseStats,
    },
  };

  // Persist to src/data/siteStats.json so frontend components can import synchronously
  try {
    const dataDir = path.join(rootDir, "src", "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(dataDir, "siteStats.json"),
      JSON.stringify(stats, null, 2)
    );
  } catch (err) {
    // Non-fatal if filesystem is restricted
  }

  return stats;
}

module.exports = getSiteStats;
