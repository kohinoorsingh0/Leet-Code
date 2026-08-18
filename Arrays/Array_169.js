// LeetCode 169
// Majority Element
// Difficulty: Easy
// Tags: Array, Sorting, Counting

/*
LeetCode 169 - Majority Element

Pattern:
Sorting + Counting

Approach:
1. Sort the array in ascending order.
2. Traverse the sorted array and count consecutive equal elements.
3. If the count becomes greater than n / 2,
   return that element.
4. Reset count to 1 whenever the current element
   is different from the next element.

Example:
nums = [2, 2, 1, 1, 1, 2, 2]

After sorting:
[1, 1, 1, 2, 2, 2, 2]

2 appears 4 times.
n = 7
n / 2 = 3.5

4 > 3.5 → 2 is the majority element.

Time Complexity:
O(n log n)  // sorting

Space Complexity:
O(log n)     // depends on JavaScript's sort implementation
*/

var majorityElement = function (nums) {
  nums.sort((a, b) => {
    return a - b;
  });

  let n = nums.length;
  let count = 1;

  if (n === 1) {
    return nums[0];
  }

  for (let i = 0; i < n - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      count++;

      if (count > n / 2) {
        return nums[i];
      }
    } else {
      count = 1;
    }
  }
};