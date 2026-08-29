// LeetCode 268
// Missing Number
// Difficulty: Easy
// Tags: Array, Math, Summation

/*

Pattern:
Sum of Natural Numbers + Array Sum

Approach:
1. Find the length of the array and store it in `n`.
2. Calculate the sum of all numbers present in the array.
3. Calculate the expected sum of numbers from 0 to n.
4. Subtract the actual array sum from the expected sum.
5. The remaining value is the missing number.

Example:
[3,0,1] -> 2
[0,1] -> 2
[9,6,4,2,3,5,7,0,1] -> 8

Time Complexity: O(n)
Space Complexity: O(1)

My Approach:
I calculated the sum of all the numbers present in the array.
Then I calculated the expected sum of all numbers from 0 to n.

The difference between these two sums gives the missing number.
*/

// Solution

var missingNumber = function(nums) {

    let n = nums.length
    let total = 0
    let arrTotal = 0

    for(let i = 0; i < n; i++){
        arrTotal += nums[i]
    }

    for(let i = n; i > 0; i--){
        total += i
    }

    return total - arrTotal
};


// Test Cases

console.log(missingNumber([2,0,1]))
// Output: 3

console.log(missingNumber([3,0,1]))
// Output: 2

console.log(missingNumber([0,1]))
// Output: 2

console.log(missingNumber([9,6,4,2,3,5,7,0,1]))
// Output: 8