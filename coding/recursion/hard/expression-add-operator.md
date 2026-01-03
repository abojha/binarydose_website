---
title: Expression Add Operator
description: ""
tags:
  - hard
  - recursion
---

### Problem Statement:

Given a string `num` that contains only digits and an integer `target`, return ***all possibilities** to insert the binary operators* `'+'`*,* `'-'`*, and/or* `'*'` *between the digits of* `num` *so that the resultant expression evaluates to the* `target` *value*.

Note that operands in the returned expressions **should not** contain leading zeros.

- Example:
    
    ```
    Example 1:
    
    Input: num = "123", target = 6
    Output: ["1*2*3","1+2+3"]
    Explanation: Both "1*2*3" and "1+2+3" evaluate to 6.
    Example 2:
    
    Input: num = "232", target = 8
    Output: ["2*3+2","2+3*2"]
    Explanation: Both "2*3+2" and "2+3*2" evaluate to 8.
    Example 3:
    
    Input: num = "3456237490", target = 9191
    Output: []
    Explanation: There are no expressions that can be created from "3456237490" to evaluate to 9191.
    ```
    

---

---

## ✅ Solution: Backtracking with Evaluation Tracking

```cpp
class Solution {
public:
    void solve(string num, int target, int pos, long long currVal, long long prevOperand,
               string exp, vector<string> &result) {
        if(pos == num.size()) {
            if(currVal == target) {
                result.push_back(exp); // Found valid expression
            }
            return;
        }

        for(int i = pos; i < num.size(); i++) {
            // Skip numbers with leading zero
            if(i != pos && num[pos] == '0') break;

            string currStr = num.substr(pos, i - pos + 1);
            long long currNum = stoll(currStr);

            if(pos == 0) {
                // First number: no operator before it
                solve(num, target, i + 1, currNum, currNum, currStr, result);
            } else {
                // Try '+' operator
                solve(num, target, i + 1, currVal + currNum, currNum, exp + '+' + currStr, result);
                // Try '-' operator
                solve(num, target, i + 1, currVal - currNum, -currNum, exp + '-' + currStr, result);
                // Try '*' operator (handle precedence)
                solve(num, target, i + 1,
                      currVal - prevOperand + (prevOperand * currNum), // Remove prev effect, apply multiplication
                      prevOperand * currNum,
                      exp + '*' + currStr,
                      result);
            }
        }
    }

    vector<string> addOperators(string num, int target) {
        vector<string> result;
        solve(num, target, 0, 0, 0, "", result);
        return result;
    }
};

```

---

## 📝 How It Works

- This problem requires inserting `'+'`, `'-'`, and `'*'` between digits to evaluate to a **target value**.
- We generate all possible expressions recursively while maintaining:
    - `currVal`: current evaluated value of expression.
    - `prevOperand`: the last operand to correctly apply multiplication precedence.
- For each digit split, we recursively try adding operators and updating values accordingly.

---

## 🧩 Key Insight / Formula

- For multiplication `a + b * c`, we must rollback `b` and apply `b * c`.
    
    ```cpp
    newVal = currVal - prevOperand + (prevOperand * currNum)
    
    ```
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(4ⁿ) worst-case (try 3 operators at each split for ~n positions) |
| Space | O(n) recursion depth + O(#valid_expressions) |

---

## ⚠️ Edge Cases

- Leading zeros are skipped (`"05"` is invalid)
- `num = ""` → return empty result
- Single-digit string like `"1"` with target `1` → return `["1"]`

---

## 💡 Other Approaches

| Approach | Feasible? | Notes |
| --- | --- | --- |
| Brute force string generation | ❌ | Too slow for large strings |
| Backtracking with expression evaluation | ✅ | Preferred |
| Use of stacks to simulate expression | 🚫 | Not practical here due to dynamic operator placement |

---

## 🔁 Related Problems

- [Different Ways to Add Parentheses](https://leetcode.com/problems/different-ways-to-add-parentheses/)
- [Basic Calculator I, II, III](https://leetcode.com/problems/basic-calculator/)
- [Expression Evaluation](https://www.geeksforgeeks.org/expression-evaluation/)

---