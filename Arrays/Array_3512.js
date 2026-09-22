// LeetCode 3065
// Minimum Operations to Exceed Threshold Value I
// Difficulty: Easy
// Tags: Array, Math, Modulo

/*

Pattern:
Array Sum + Modulo

Approach:
1. Initialize `sum` to 0.
2. Traverse the `nums` array and calculate the total sum.
3. Return `sum % k`.
4. The remainder represents the minimum number of operations
   needed when each operation decreases the total by `k`.

Example:
nums = [3, 2]
k = 6

Sum:
3 + 2 = 5

5 % 6 = 5

Output:
5

Time Complexity: O(n)
Space Complexity: O(1)

My Approach:
I calculated the sum of all elements in the array.

Then, I used the modulo operator `%` with `k`. The remainder
gives the required number of operations.

*/

// Solution

var minOperations = function(nums, k) {

    let sum = 0

    for(let i = 0; i < nums.length; i++){
        sum += nums[i]
    }

    return sum % k
};

// Test Cases

console.log(minOperations([3, 2], 6))
// Output: 5

console.log(minOperations([9, 7, 5], 4))
// Output: 1

console.log(minOperations([4, 8, 6], 4))
// Output: 2

console.log(minOperations([1, 2, 3], 10))
// Output: 6

console.log(minOperations([10, 10, 10], 5))
// Output: 0