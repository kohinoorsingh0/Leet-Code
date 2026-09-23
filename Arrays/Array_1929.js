// LeetCode 1929
// Concatenation of Array
// Difficulty: Easy
// Tags: Array, Concatenation

/*

Pattern:
Array Concatenation

Approach:
1. Use the `concat()` method to join `nums` with itself.
2. Return the resulting array.

Example:
nums = [1, 2, 1]

nums.concat(nums)

Output:
[1, 2, 1, 1, 2, 1]

Time Complexity: O(n)
Space Complexity: O(n)

My Approach:
I used the built-in `concat()` method to concatenate the
array `nums` with itself.

This directly creates the required array containing the
elements of `nums` twice.

*/

// Solution

var getConcatenation = function(nums) {

    return nums.concat(nums)

};

// Test Cases

console.log(getConcatenation([1, 2, 1]))
// Output: [1, 2, 1, 1, 2, 1]

console.log(getConcatenation([1, 2, 3]))
// Output: [1, 2, 3, 1, 2, 3]

console.log(getConcatenation([5]))
// Output: [5, 5]

console.log(getConcatenation([]))
// Output: []