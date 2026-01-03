---
title: Hands of Straight
description: ""
tags:
  - heaps
  - med
---

### Problem Statement:

Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size `groupSize`, and consists of `groupSize` consecutive cards.

Given an integer array `hand` where `hand[i]` is the value written on the `ith` card and an integer `groupSize`, return `true` if she can rearrange the cards, or `false` otherwise.

- Example:
    
    ```
    Example 1:
    
    Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
    Output: true
    Explanation: Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]
    Example 2:
    
    Input: hand = [1,2,3,4,5], groupSize = 4
    Output: false
    Explanation: Alice's hand can not be rearranged into groups of 4.
    ```
    

---

## ✅ Solution: Divide Cards into Group of Size k (Hand of Straights)

```cpp
class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        map<int, int> cardFreqMap;

        // Step 1: Count frequency of each card
        for (auto card : hand) {
            cardFreqMap[card]++;
        }

        // Step 2: Sort hand for ordered access
        sort(hand.begin(), hand.end());

        // Step 3: Try forming groups
        for (auto card : hand) {
            if (cardFreqMap.count(card)) {
                for (int nextCard = card; nextCard < card + groupSize; nextCard++) {
                    if (!cardFreqMap.count(nextCard)) {
                        return false;  // Cannot form required group
                    }
                    if (--cardFreqMap[nextCard] == 0) {
                        cardFreqMap.erase(nextCard);
                    }
                }
            }
        }
        return true;
    }
};

```

---

## ✅ Structured Revision Notes

---

## 📝 **How It Works**

- **Problem:** Given an array `hand` of integers representing cards and an integer `groupSize`, check if it’s possible to divide the array into groups of consecutive cards of size `groupSize`.
- **Steps:**
    1. Count the frequency of each card using a map.
    2. Sort the `hand` array to process in increasing order.
    3. For each card, attempt to build a group from `card` up to `card + groupSize - 1`.
    4. If any card in that range is missing, return `false`.
    5. Decrement counts in the map and erase keys when count reaches zero.

---

## 🧩 **Key Formula**

- For each `card`:
    - Check if `cardFreqMap[nextCard]` exists for `nextCard = card` to `card + groupSize - 1`.

---

## ⏱️ **Time & Space Complexity**

| Metric | Complexity |
| --- | --- |
| Time | O(N log N) |
| Space | O(N) |
- Sorting → O(N log N)
- Map operations → O(log N) per insert/delete.

---

## ⚠️ **Edge Cases**

- `groupSize == 1`: Always true if hand is not empty.
- Group size larger than hand size → Impossible.
- Cards with gaps that cannot form a consecutive sequence.

---

## 💡 **Other Approaches**

| Approach | Time Complexity |
| --- | --- |
| Min Heap + Frequency Map | O(N log N) |
| Sorting + Frequency Map | O(N log N) |

Both use similar logic; difference lies in priority queue or map-based access.

---

## 🔁 **Related Problems**

- LeetCode 846: Hand of Straights
- LeetCode 659: Split Array into Consecutive Subsequences
- LeetCode 2182: Construct String with Characters in Order

---