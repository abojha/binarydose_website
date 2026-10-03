# Contributing to CodeDose (Data Structures & Algorithms) ⚡

CodeDose is Binary Dose's curated DSA sheet. It organizes high-yield algorithmic patterns across 16 categories (Arrays, Two Pointers, Binary Search, Linked Lists, Trees, DP, Graphs, etc.) with clean, optimal implementations in C++ and Python.

This guide explains how to add new problem walkthroughs and patterns to CodeDose.

---

## 📁 Directory Structure & AutoIndex Discovery

CodeDose relies on a dynamic, file-driven structure. When you add a new markdown problem file in the proper folder, the category index page automatically discovers it, indexes it, and assigns it an interactive `<NumberBadge />` pill!

```text
coding/
├── arrays/                             # Category folder
│   ├── index.mdx                       # Category hub using <AutoIndex />
│   ├── easy/                           # Difficulty subfolder
│   │   └── two-sum.md                  # Problem solution file
│   ├── med/
│   │   └── 3sum.md
│   └── hard/
│       └── trapping-rain-water.md
├── two-pointers-sliding-window-problems/
├── binary-search/
└── dynamic-programming/
```

### Folder Conventions:
* Difficulty subfolders MUST be named strictly: `easy`, `med`, or `hard`.
* Problem filenames MUST be clean, lowercase kebab-case (e.g., `container-with-most-water.md`).

---

## 📑 Required Frontmatter Schema

Every problem file must include this frontmatter at the very top:

```yaml
---
title: "Container With Most Water"
description: "Optimal two-pointer approach to find the maximum water area between vertical lines in O(N) time and O(1) space."
difficulty: "Medium"
leetcode_id: 11
tags: ["Arrays", "Two Pointers", "Greedy"]
companies: ["Google", "Amazon", "Meta", "Apple"]
hide_table_of_contents: false
---
```

---

## 📐 Required Problem Document Structure

Every problem walkthrough must follow this clean, structured outline:

1. **Problem Statement & Constraints**
2. **Examples (with input, output, and visual explanation)**
3. **Core Intuition & Algorithmic Pattern**
4. **Visual Walkthrough** (Use `<FlowPipeline />`, `<MemoryGrid />` from [`DIAGRAMS.md`](./DIAGRAMS.md), or clean pointer diagrams)
5. **Multi-Language Solutions** (C++ and Python using Docusaurus `<Tabs>`)
6. **Complexity Analysis** (Time & Space)
7. **Edge Cases & Common Traps**

---

## 📋 Copy-Paste DSA Solution Template

```markdown
---
title: "Two Sum"
description: "Find two numbers in an array that add up to a target sum using a hash map in O(N) time."
difficulty: "Easy"
leetcode_id: 1
tags: ["Arrays", "Hash Table"]
companies: ["Google", "Amazon", "Microsoft", "Apple"]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Two Sum

## 📝 Problem Statement
Given an array of integers `nums` and an integer `target`, return the *indices of the two numbers such that they add up to `target`*.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice. You can return the answer in any order.

### Constraints
* $2 \le \text{nums.length} \le 10^4$
* $-10^9 \le \text{nums}[i] \le 10^9$
* $-10^9 \le \text{target} \le 10^9$
* Only one valid answer exists.

---

## 💡 Core Intuition
Instead of using a brute-force $O(N^2)$ nested loop comparing every pair:
1. For each number `x`, its complement is `target - x`.
2. Check if the complement already exists in a **Hash Map**.
3. If it exists, we immediately have our pair indices.
4. If not, insert the current number `nums[i]` and its index `i` into the map and proceed.

This reduces the search time from $O(N)$ per lookup to **$O(1)$ average time**, yielding a total runtime of **$O(N)$**.

---

## 💻 Clean Implementations

<Tabs>
<TabItem value="cpp" label="C++" default>

```cpp
#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(const std::vector<int>& nums, int target) {
        // Map value -> index
        std::unordered_map<int, int> seen;
        
        for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
            int complement = target - nums[i];
            
            // If complement was previously seen, return the pair
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            
            seen[nums[i]] = i;
        }
        
        return {}; // Fallback (problem guarantees 1 solution)
    }
};
```

</TabItem>
<TabItem value="python" label="Python">

```python
from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}  # value -> index
        
        for index, num in enumerate(nums):
            complement = target - num
            
            if complement in seen:
                return [seen[complement], index]
                
            seen[num] = index
            
        return []
```

</TabItem>
</Tabs>

---

## ⏱️ Complexity Analysis

| Metric | Complexity | Explanation |
| :--- | :---: | :--- |
| **Time Complexity** | $O(N)$ | Single pass over the array with $O(1)$ hash map lookups. |
| **Space Complexity** | $O(N)$ | Hash map stores at most $N$ elements in the worst case. |

---

## ⚠️ Corner Cases & Traps
* **Duplicate Values**: Numbers can repeat (e.g., `nums = [3, 3]`, `target = 6`). The hash map approach naturally handles this because the first `3` is stored before the second `3` triggers the match.
* **Negative Numbers**: The algorithm works seamlessly with negative numbers and negative targets.
```

---

## ✅ Pre-Submission Verification Checklist

Before opening a Pull Request for a CodeDose solution, verify:

- [ ] File is placed in the correct `coding/<category>/<difficulty>/` subfolder with a clean kebab-case name.
- [ ] Frontmatter includes `title`, `description`, `difficulty`, `leetcode_id`, `tags`, and `companies`.
- [ ] Provides **both** idiomatic modern C++ (C++17/20, `const` references) and typed Python (`from typing import List, Optional`) using `<Tabs>`.
- [ ] Includes a clear **Core Intuition** section explaining the algorithmic pattern, not just code.
- [ ] **Complexity Analysis** table is present with both Time and Space complexity.
- [ ] Lists **Corner Cases & Traps** with at least 2 edge cases.
- [ ] Code comments explain algorithmic transitions (e.g., why a pointer moves, why a key is inserted).
- [ ] Full constraints are documented (`$2 \le N \le 10^5$` etc.).
- [ ] Runs cleanly on `npm run start` with zero console errors.

