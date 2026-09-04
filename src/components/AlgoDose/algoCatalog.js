export const ALGO_CATALOG = [
  {
    categoryId: "searching",
    categoryName: "Searching",
    categoryIcon: "🔍",
    algorithms: [
      {
        id: "binary_search",
        name: "Binary Search",
        badge: "O(log N)",
        description: "Divide-and-conquer search space halving and pointer convergence",
        codeDoseLink: "/coding/binary-search",
        timeComplexity: "O(log N)",
        spaceComplexity: "O(1)",
      },
    ],
  },
  {
    categoryId: "two_pointers",
    categoryName: "Two Pointers & Sliding Window",
    categoryIcon: "↔️",
    algorithms: [
      {
        id: "two_sum",
        name: "Two Sum (Sorted Array)",
        badge: "O(N)",
        description: "Converging left and right pointers to find target sum",
        codeDoseLink: "/coding/arrays/med/two-sum",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
      },
      {
        id: "sliding_window_sum",
        name: "Sliding Window (Max Subarray Sum)",
        badge: "O(N)",
        description: "Moving bounded subarray window across the array",
        codeDoseLink: "/coding/two-pointers-sliding-window-problems",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
      },
    ],
  },
  {
    categoryId: "sorting",
    categoryName: "Sorting Algorithms",
    categoryIcon: "📊",
    algorithms: [
      {
        id: "bubble_sort",
        name: "Bubble Sort",
        badge: "O(N²)",
        description: "Repeatedly swap adjacent out-of-order elements until sorted",
        codeDoseLink: "/coding/sorting/easy/bubble-sort",
        timeComplexity: "O(N²)",
        spaceComplexity: "O(1)",
      },
      {
        id: "selection_sort",
        name: "Selection Sort",
        badge: "O(N²)",
        description: "Find minimum element and place it at sorted boundary",
        codeDoseLink: "/coding/sorting/easy/selection-sort",
        timeComplexity: "O(N²)",
        spaceComplexity: "O(1)",
      },
    ],
  },
];

export function findAlgorithmById(algoId) {
  for (const cat of ALGO_CATALOG) {
    const found = cat.algorithms.find((a) => a.id === algoId);
    if (found) {
      return { category: cat, algorithm: found };
    }
  }
  return { category: ALGO_CATALOG[0], algorithm: ALGO_CATALOG[0].algorithms[0] };
}
