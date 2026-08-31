// LeetCode 1920
// Build Array from Permutation
// Difficulty: Easy
// Tags: Array, Permutation

/*

Pattern:
Array Index Mapping

Approach:
1. Create a new array `numsCopy` of the same length as `nums`.
2. Traverse the array using index `i`.
3. For every index, access `nums[i]`.
4. Use `nums[i]` as an index to access another element:
   `nums[nums[i]]`
5. Store that value at `numsCopy[i]`.
6. Return the new array.

Example:
[0,2,1,5,3,4] -> [0,1,2,4,5,3]
[5,0,1,2,3,4] -> [4,5,0,1,2,3]

Time Complexity: O(n)
Space Complexity: O(n)

My Approach:
I created a separate array and used the value at each index
as an index for the original array.

For example:
nums[1] = 2
so numsCopy[1] = nums[nums[1]]
               = nums[2]
               = 1

This directly follows the permutation formula:
ans[i] = nums[nums[i]]
*/

// Solution

var buildArray = function(nums) {

    let numsCopy = new Array(nums.length)

    for(let i = 0; i < nums.length; i++){
        numsCopy[i] = nums[nums[i]]
    }

    return numsCopy
};


// Test Cases

console.log(buildArray([0,2,1,5,3,4]))
// Output: [0,1,2,4,5,3]

console.log(buildArray([5,0,1,2,3,4]))
// Output: [4,5,0,1,2,3]

console.log(buildArray([0]))
// Output: [0]

console.log(buildArray([1,0]))
// Output: [0,1]