---
title: Remove K Digits
description: ""
tags:
  - med
  - monotonic
  - queue
  - stack
  - stack-queue
---

### Problem Statement:

Given string num representing a non-negative integer `num`, and an integer `k`, return *the smallest possible integer after removing* `k` *digits from* `num`.

- Example:
    
    ```
    Example 1:
    
    Input: num = "1432219", k = 3
    Output: "1219"
    Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.
    Example 2:
    
    Input: num = "10200", k = 1
    Output: "200"
    Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.
    Example 3:
    
    Input: num = "10", k = 2
    Output: "0"
    Explanation: Remove all the digits from the number and it is left with nothing which is 0.
    ```
    

---

## ✅ Solution: Monotonic Stack — Remove K Digits

```cpp
class Solution {
public:
    string removeKdigits(string num, int k) {
        stack<char> st;

        for (int i = 0; i < num.size(); i++) {
            // Remove larger digits from the stack to make number smaller
            while (!st.empty() && k > 0 && st.top() > num[i]) {
                st.pop();
                k--;
            }
            st.push(num[i]);
        }

        // If k > 0, remove remaining digits from the end
        while (k > 0 && !st.empty()) {
            st.pop();
            k--;
        }

        // Build result from stack
        string result = "";
        while (!st.empty()) {
            result += st.top();
            st.pop();
        }
        reverse(result.begin(), result.end());

        // Remove leading zeros
        int start = 0;
        while (start < result.size() && result[start] == '0') {
            start++;
        }

        result = result.substr(start);

        return result.empty() ? "0" : result;
    }
};

```

---

## 📝 How It Works

- **Goal:** Remove exactly `k` digits to get the smallest possible number.
- **Approach:**
    1. Traverse the number from left to right.
    2. Use a stack to maintain a **monotonic increasing sequence** of digits.
    3. Whenever the current digit is smaller than the top of the stack, pop from the stack (and decrement `k`).
    4. If after processing all digits `k > 0`, remove remaining elements from the end of the stack.
    5. Build the result, reverse it, and remove any leading zeros.
- **Why It Works:**
    
    Removing larger digits from left increases number's minimality—this is essentially a **greedy algorithm** using a stack.
    

---

## 🧩 Key Formula / Recurrence

- No classical recurrence relation.
- Stack behavior:
    - Maintain smallest prefix while removing up to `k` largest previous elements.

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Monotonic Stack | O(N) | O(N) |
- Each character is pushed and popped at most once.

---

## ⚠️ Edge Cases

- `k == num.size()` → Should return `"0"`.
- Leading zeros after removing k digits (e.g., `"10200"`, `k = 1` → `"200"` → `"200"`).
- All digits in increasing order (e.g., `"123456"`, `k = 3`) → Remove from the end.

---

## 💡 Other Approaches

- Brute force: Generate all possible combinations of length `num.length() - k`.
    
    Not practical; O(N choose k).
    
- Using Deque instead of Stack: Conceptually similar.

---

## 🔁 Related Problems

- LeetCode 402: Remove K Digits (Exact Problem)
- LeetCode 316: Remove Duplicate Letters
- LeetCode 1081: Smallest Subsequence of Distinct Characters
- LeetCode 321: Create Maximum Number

---

## 🛠️ Other Notes

- ✅ Real-world analogy:
    
    Think of removing unnecessary or redundant entries in a list to minimize final cost or weight.
    
- ✅ Always clean up leading zeros when building numeric strings from stack results.
- ✅ This is a classic **greedy + stack** pattern seen in string manipulation and array reduction problems.