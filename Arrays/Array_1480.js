// LeetCode 1480
// Running Sum of 1d Array
// Difficulty: Easy
// Tags: Array, Prefix Sum

/*

Pattern:
Prefix Sum + In-Place Array Modification

Approach:
1. Store the first element of the array as the initial sum.
2. Start traversing the array from index 1.
3. Add the current element to `sum`.
4. Replace the current element with the running sum.
5. Continue until the end of the array.
6. Return the modified array.

Example:
[1,2,3,4] -> [1,3,6,10]
[1,1,1,1,1] -> [1,2,3,4,5]

Time Complexity: O(n)
Space Complexity: O(1)

My Approach:
I used a `sum` variable to keep track of the running total.
Instead of creating a new array, I directly replaced each
element with its running sum.

This makes the solution efficient because the array is modified
in-place.
*/

// Solution

var runningSum = function(nums) {

    let sum = nums[0]

    for(let i = 1; i < nums.length; i++){
        sum = sum + nums[i]
        nums[i] = sum
    }

    return nums
};


// Test Cases

console.log(runningSum([1,2,3,4]))
// Output: [1,3,6,10]

console.log(runningSum([1,1,1,1,1]))
// Output: [1,2,3,4,5]

console.log(runningSum([3,1,2,10,1]))
// Output: [3,4,6,16,17]

console.log(runningSum([5]))
// Output: [5]