// LeetCode 1
// Two Sum
// Difficulty: Easy
// Time: O(n)
// Space: O(n)
// Tags: Array, HashMap
// ==================================================

// Problem:
// Given an array of integers nums and an integer target,
// return the indices of the two numbers such that they
// add up to target.
//
// You may assume that each input has exactly one solution,
// and you may not use the same element twice.
//
// Example:
// Input:  nums = [2,7,11,15], target = 9
// Output: [0,1]
//
// Explanation:
// nums[0] + nums[1] = 2 + 7 = 9
// --------------------------------------------------

// Approach:
// Use two pointers/indices i and j with nested loops.
// For every element at index i, check the elements
// after it using j.
//
// If nums[i] + nums[j] equals the target,
// return [i, j].
//
// Start j from i + 1 so that:
// 1. The same element is not used twice.
// 2. Already checked pairs are not checked again.
// --------------------------------------------------

// Solution:

var twoSum = function(nums, target) {

    let i = 0;
    let j = 1;

    while (i < nums.length) {

        while (j < nums.length) {

            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
            else {
                j++;
            }
        }

        i++;
        j = i + 1;
    }
};

// Test:
console.log(twoSum([2, 7, 11, 15], 9));

// Output:
// [0, 1]

// --------------------------------------------------
// Time Complexity: O(n²)
// Space Complexity: O(1)
// --------------------------------------------------

// Key Learning:
// - Arrays use zero-based indexing.
// - Nested loops can be used to check every pair.
// - j should start from i + 1 to avoid using the same
//   element twice and checking duplicate pairs.
// - Return multiple values as an array: [i, j].
// - This is the brute-force approach.
// ==================================================