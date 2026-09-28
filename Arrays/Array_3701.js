// LeetCode 3701
// Compute Alternating Sum
// Difficulty: Easy
// Tags: Array, Math, Simulation

/*

Pattern:
Alternating Sum

Approach:
1. Initialize `i` to 0 and `sum` to 0.
2. Traverse the array using a `while` loop.
3. If the index is even, add the current element to `sum`.
4. If the index is odd, subtract the current element from `sum`.
5. Increment `i` after processing each element.
6. Return the final value of `sum`.

Example:
nums = [1, 2, 3, 4]

Alternating sum:
1 - 2 + 3 - 4
= -2

Output:
-2

Time Complexity: O(n)
Space Complexity: O(1)

My Approach:
I used a `while` loop to traverse the array.

For every even index, I added the element to `sum`.
For every odd index, I subtracted the element from `sum`.

Finally, I returned the alternating sum.
*/

// Solution

var alternatingSum = function(nums) {

    let i = 0
    let sum = 0

    while(i < nums.length){

        if(i % 2 === 0){
            sum += nums[i++]
        }
        else{
            sum -= nums[i++]
        }

    }

    return sum
};

// Test Cases

console.log(alternatingSum([100]))
// Output: 100

console.log(alternatingSum([1, 2, 3, 4]))
// Output: -2

console.log(alternatingSum([5, 6, 7]))
// Output: 6

console.log(alternatingSum([10, 20]))
// Output: -10

console.log(alternatingSum([1, 2, 3, 4, 5]))
// Output: 3