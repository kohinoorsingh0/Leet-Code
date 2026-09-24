// LeetCode 3925
// Concatenate Array With Reverse
// Difficulty: Easy
// Tags: Array, Simulation

/*

Pattern:
Array Copy + Reverse + Concatenation

Approach:
1. Create an answer array of size `2 * nums.length`.
2. Traverse the `nums` array.
3. Store the original element at index `i`.
4. Store the corresponding reverse element at index `i + n`.
5. Return the answer array.

Example:
nums = [1, 2, 3]

First half:
[1, 2, 3]

Reverse:
[3, 2, 1]

Output:
[1, 2, 3, 3, 2, 1]

Time Complexity: O(n)
Space Complexity: O(n)

My Approach:
I created an answer array with twice the size of `nums`.

For every element at index `i`, I stored:
- `nums[i]` in the first half.
- `nums[n - i - 1]` in the second half.

This allows me to construct the original array and its
reverse in a single loop.

Finally, I returned `ans`.
*/

// Solution

var concatWithReverse = function(nums) {

    let n = nums.length
    let ans = new Array(n * 2)

    for(let i = 0; i < n; i++) {

        ans[i] = nums[i]
        ans[i + n] = nums[n - i - 1]

    }

    return ans
};

// Test Cases

console.log(concatWithReverse([1, 2, 3]))
// Output: [1, 2, 3, 3, 2, 1]

console.log(concatWithReverse([1]))
// Output: [1, 1]

console.log(concatWithReverse([1, 2]))
// Output: [1, 2, 2, 1]

console.log(concatWithReverse([5, 6, 7, 8]))
// Output: [5, 6, 7, 8, 8, 7, 6, 5]