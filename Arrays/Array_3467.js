// LeetCode 3467
// Transform Array by Parity
// Difficulty: Easy
// Tags: Array, Sorting, Simulation

/*

Pattern:
Parity Checking + Sorting

Approach:
1. Traverse every element of the `nums` array.
2. Check whether the current element is even or odd.
3. If it is even, replace it with 0.
4. If it is odd, replace it with 1.
5. Sort the modified array in ascending order.
6. Return the transformed array.

Example:
nums = [4, 3, 2, 1]

After replacing even numbers with 0:
[0, 1, 0, 1]

After sorting:
[0, 0, 1, 1]

Output:
[0, 0, 1, 1]

Time Complexity: O(n log n)
Space Complexity: O(log n) auxiliary space

My Approach:
I traversed the array and checked the parity of every number
using the modulo operator `%`.

If a number was even, I replaced it with 0. Otherwise, I
replaced it with 1.

Finally, I sorted the modified array in ascending order so
that all zeros appeared before all ones, and returned it.
*/

// Solution

var transformArray = function(nums) {

    for(let i = 0; i < nums.length; i++){

        if(nums[i] % 2 === 0){
            // Even
            nums[i] = 0
        }
        else{
            // Odd
            nums[i] = 1
        }

    }

    return nums.sort((a, b) => {
        return a - b
    })

};

// Test Cases

console.log(transformArray([4, 3, 2, 1]))
// Output: [0, 0, 1, 1]

console.log(transformArray([1, 5, 3]))
// Output: [1, 1, 1]

console.log(transformArray([2, 4, 6]))
// Output: [0, 0, 0]

console.log(transformArray([7, 2, 9, 4, 6]))
// Output: [0, 0, 0, 1, 1]

console.log(transformArray([]))
// Output: []