// LeetCode 198
// House Robber
// Difficulty: Medium
// Tags: Array, Dynamic Programming, Space Optimization

/*

Pattern:
Dynamic Programming + Two Variables

Approach:
1. Use two variables:
   - prev1 -> maximum money that can be robbed up to the
              previous house.
   - prev2 -> maximum money that can be robbed up to the
              house before the previous house.
2. For every house, calculate:
   current = Math.max(prev1, prev2 + money)
3. There are two choices:
   - Don't rob the current house -> `prev1`
   - Rob the current house -> `prev2 + money`
4. Update the variables:
   - `prev2 = prev1`
   - `prev1 = current`
5. Return `prev1`.

Example:
[2,1,1,2]

House 2:
current = max(0, 0 + 2) = 2

House 1:
current = max(2, 0 + 1) = 2

House 1:
current = max(2, 2 + 1) = 3

House 2:
current = max(3, 2 + 2) = 4

Output:
4

Time Complexity: O(n)
Space Complexity: O(1)

My Approach:
I used Dynamic Programming with only two variables instead
of creating a DP array.

At every house, I decide whether it is better to rob the
current house or skip it.

If I rob it, I can only add its money to the maximum amount
from two houses before it.

If I skip it, I keep the maximum amount from the previous
house.

This reduces the usual O(n) DP array space to O(1).
*/

// Solution

var rob = function (nums) {

    let prev1 = 0
    let prev2 = 0

    for(let money of nums){

        let current = Math.max(prev1, prev2 + money)

        prev2 = prev1
        prev1 = current
    }

    return prev1
};


// Test Cases

console.log(rob([2,1,1,2]))
// Output: 4

console.log(rob([1,2,3,1]))
// Output: 4

console.log(rob([2,7,9,3,1]))
// Output: 12

console.log(rob([2]))
// Output: 2

console.log(rob([]))
// Output: 0