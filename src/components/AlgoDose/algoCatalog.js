export const ENGINES_CATALOG = [
  // 1. Ready Engines
  {
    id: "two_pointers",
    name: "Two Pointers",
    icon: "↔️",
    badge: "O(N)",
    status: "ready",
    description: "Opposing and directional pointers converging inward on sorted arrays and linear collections",
    codeDoseLink: "/coding/two-pointers-sliding-window-problems",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    plannedPatterns: [
      "Opposing Pointers (Two Sum)",
      "Fast & Slow Pointers (Remove Duplicates)",
      "Three Sum (Sorted Boundary)",
      "Container With Most Water",
    ],
  },
  {
    id: "sliding_window",
    name: "Sliding Window",
    icon: "🪟",
    badge: "O(N)",
    status: "ready",
    description: "Bounded subarray window sliding across sequential elements to track aggregate metrics",
    codeDoseLink: "/coding/two-pointers-sliding-window-problems",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    plannedPatterns: [
      "Fixed Window (Max Subarray Sum)",
      "Dynamic Window (Minimum Size Subarray Sum)",
      "Longest Substring Without Repeating Characters",
      "Permutation in String",
    ],
  },
  {
    id: "binary_search",
    name: "Binary Search",
    icon: "🔍",
    badge: "O(log N)",
    status: "ready",
    description: "Divide-and-conquer logarithmic search space reduction and boundary pointer convergence",
    codeDoseLink: "/coding/binary-search",
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    plannedPatterns: [
      "Exact Target Search",
      "Lower Bound (First Occurrence)",
      "Upper Bound (Last Occurrence)",
      "Rotated Sorted Array Search",
      "Find Peak Element",
    ],
  },
  {
    id: "sorting",
    name: "Sorting",
    icon: "📊",
    badge: "O(N²)",
    status: "ready",
    description: "Visual element comparisons, adjacent swaps, and sorted boundary partitions",
    codeDoseLink: "/coding/sorting",
    timeComplexity: "O(N²)",
    spaceComplexity: "O(1)",
    plannedPatterns: [
      "Bubble Sort (Adjacent Swaps)",
      "Selection Sort (Min Boundary Placement)",
      "Insertion Sort (Sorted Partition Shift)",
      "QuickSort (Lomuto Partition)",
      "Merge Sort (Divide & Conquer)",
    ],
  },

  // 2. Upcoming Engines (Coming Soon)
  {
    id: "linked_list",
    name: "Linked List",
    icon: "🔗",
    badge: "Coming Soon",
    status: "coming_soon",
    description: "Node structures, pointer rewiring, in-place reversal, and Floyd's cycle detection",
    codeDoseLink: "/coding/linked-list",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    plannedPatterns: [
      "In-Place Reversal (Iterative)",
      "Node Splicing & Insertion",
      "Node Deletion (Target / Nth From End)",
      "Fast & Slow Pointer (Middle / Cycle Detection)",
      "Merge Two Sorted Lists",
    ],
  },
  {
    id: "stack",
    name: "Stack",
    icon: "📚",
    badge: "Coming Soon",
    status: "coming_soon",
    description: "Last-In First-Out (LIFO) vertical chamber, parentheses validation, and monotonic tracking",
    codeDoseLink: "/coding/stack-queue",
    timeComplexity: "O(1)",
    spaceComplexity: "O(N)",
    plannedPatterns: [
      "LIFO Operations (Push / Pop / Peek)",
      "Valid Parentheses Matching",
      "Monotonic Decreasing Stack (Next Greater Element)",
      "Evaluate Reverse Polish Notation",
    ],
  },
  {
    id: "queue",
    name: "Queue & Deque",
    icon: "🚶",
    badge: "Coming Soon",
    status: "coming_soon",
    description: "First-In First-Out (FIFO) linear buffer, circular array queues, and sliding window maximum",
    codeDoseLink: "/coding/stack-queue",
    timeComplexity: "O(1)",
    spaceComplexity: "O(N)",
    plannedPatterns: [
      "FIFO Operations (Enqueue / Dequeue / Front)",
      "Circular Buffer Queue",
      "Monotonic Deque (Sliding Window Maximum)",
    ],
  },
  {
    id: "tree",
    name: "Binary Tree & BST",
    icon: "🌳",
    badge: "Coming Soon",
    status: "coming_soon",
    description: "Hierarchical branching structures, recursive traversals, and level-order BFS exploration",
    codeDoseLink: "/coding/binary-trees",
    timeComplexity: "O(N)",
    spaceComplexity: "O(H)",
    plannedPatterns: [
      "DFS Traversals (Inorder / Preorder / Postorder)",
      "BFS Level-Order Ring Traversal",
      "BST Search & Insert",
      "Maximum Depth of Binary Tree",
      "Lowest Common Ancestor (LCA)",
    ],
  },
  {
    id: "graph",
    name: "Graph & 2D Grid",
    icon: "🕸️",
    badge: "Coming Soon",
    status: "coming_soon",
    description: "Node adjacency networks, 2D matrix exploration, and shortest path algorithms",
    codeDoseLink: "/coding/graphs",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    plannedPatterns: [
      "Matrix Grid Flood Fill (Number of Islands)",
      "Breadth-First Search (Shortest Path)",
      "Depth-First Search (Connected Components)",
      "Dijkstra's Algorithm",
    ],
  },
  {
    id: "dp",
    name: "Dynamic Programming",
    icon: "📋",
    badge: "Coming Soon",
    status: "coming_soon",
    description: "Optimal substructure transitions, memoization caches, and 2D tabulation matrices",
    codeDoseLink: "/coding/dynamic-programming",
    timeComplexity: "O(N × M)",
    spaceComplexity: "O(N × M)",
    plannedPatterns: [
      "1D State Array (Climbing Stairs / Fibonacci)",
      "2D Grid Tabulation (Unique Paths)",
      "0/1 Knapsack Decision Table",
      "Longest Common Subsequence (LCS)",
    ],
  },
];

export function findEngineById(engineId) {
  if (!engineId) return ENGINES_CATALOG[0];
  // Backwards compatibility mappings for previously bookmarked URLs
  if (engineId === "two_sum") return ENGINES_CATALOG.find((e) => e.id === "two_pointers") || ENGINES_CATALOG[0];
  if (engineId === "sliding_window_sum") return ENGINES_CATALOG.find((e) => e.id === "sliding_window") || ENGINES_CATALOG[1];
  if (engineId === "bubble_sort" || engineId === "selection_sort") return ENGINES_CATALOG.find((e) => e.id === "sorting") || ENGINES_CATALOG[3];

  const found = ENGINES_CATALOG.find((e) => e.id === engineId);
  return found || ENGINES_CATALOG[0];
}

// Backwards compatibility aliases
export const ALGO_CATALOG = ENGINES_CATALOG;
export const findAlgorithmById = findEngineById;
