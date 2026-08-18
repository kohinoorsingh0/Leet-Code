// LeetCode 53
// Maximum Subarray
// Difficulty: Medium
// Tags: Array, Dynamic Programming, Kadane's Algorithm

/*
LeetCode 53 - Maximum Subarray

Pattern:
Kadane's Algorithm

Approach:
1. Keep a variable `sum` for the maximum subarray sum
   ending at the current index.
2. At every element, decide:
   - Start a new subarray from the current element.
   - OR extend the previous subarray.
3. Use Math.max() to make that decision.
4. Keep another variable `max` to store the overall
   maximum subarray sum found so far.

Formula:
sum = Math.max(current, sum + current)

Example:
nums = [-2,1,-3,4,-1,2,1,-5,4]

Maximum subarray:
[4,-1,2,1]

Sum:
4 + (-1) + 2 + 1 = 6

Answer:
6

Time Complexity:
O(n)

Space Complexity:
O(1)
*/

var maxSubArray = function(nums) {
  let sum = 0;
  let max = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    let current = nums[i];

    sum = Math.max(current, sum + current);

    max = Math.max(max, sum);
  }

  return max;
};