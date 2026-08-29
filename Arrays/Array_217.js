// LeetCode 217
// Contains Duplicate
// Difficulty: Easy
// Tags: Array, Sorting

/*
LeetCode 217 - Contains Duplicate

Pattern:
Sorting + Adjacent Comparison

Approach:
1. Sort the array in ascending order.
2. Start comparing each element with the next element.
3. If two adjacent elements are equal:
   - A duplicate exists.
   - Return true.
4. If no adjacent elements are equal:
   - Return false.

Example:
[1,2,3,1] -> [1,1,2,3] -> true
[1,2,3,4] -> [1,2,3,4] -> false

Time Complexity: O(n log n)
Space Complexity: O(1)

My Approach:
I used a count variable to check whether a duplicate was found.
*/

// Solution

var containsDuplicate = function(nums) {

    let count = 0

    // Sort the array
    nums.sort((a,b) => {
        return a - b
    })

    // Compare adjacent elements
    for(let i = 0; i < nums.length - 1; i++) {

        // If two adjacent elements are equal
        if(nums[i] === nums[i+1]) {
            count++
            break
        }
    }

    // If duplicate was found
    if(count > 0) {
        return true
    }

    // If no duplicate was found
    else {
        return false
    }
};


// Test Cases

console.log(containsDuplicate([1,2,3,4,4]))
// Output: true

console.log(containsDuplicate([1,2,3,4]))
// Output: false

console.log(containsDuplicate([1,2,3,1]))
// Output: true

console.log(containsDuplicate([1,2,3,5,6]))
// Output: false