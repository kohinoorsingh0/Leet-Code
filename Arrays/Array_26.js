// LeetCode 26
// Remove Duplicates from Sorted Array
// Difficulty: Easy
// Tags: Array, Two Pointers

/*
LeetCode 26 - Remove Duplicates from Sorted Array

Problem:
Given a sorted array nums, remove the duplicates in-place
such that each unique element appears only once.

Return k, the number of unique elements.

Example:
Input:  [1, 1, 2, 2, 3]
Output: 3

The first 3 elements of nums should become:
[1, 2, 3]


Pattern:
Two Pointers


Approach:
1. Since the array is sorted, duplicates are next to each other.
2. Keep a pointer k at the position where the next unique
   element should be placed.
3. Start i from index 1.
4. Compare nums[i] with nums[i - 1].
5. If they are different:
   - nums[i] is a unique element.
   - Put it at nums[k].
   - Increase k.
6. Return k.


Why k starts from 1:
The first element is always unique.
So nums[0] is already correct.

Example:

nums = [1, 1, 2, 2, 3]

Initially:
k = 1

i = 1
nums[1] === nums[0]
1 === 1 → duplicate
Do nothing.

i = 2
nums[2] !== nums[1]
2 !== 1 → unique

nums[k] = nums[i]
nums[1] = nums[2]

Array:
[1, 2, 2, 2, 3]

k = 2

i = 3
2 === 2 → duplicate
Do nothing.

i = 4
3 !== 2 → unique

nums[2] = nums[4]

Array:
[1, 2, 3, 2, 3]

k = 3

Return 3.


Time Complexity:
O(n)

Space Complexity:
O(1)
*/

var removeDuplicates = function (nums) {
  let k = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
};