// LeetCode 3512
// Minimum Operations to Make Array Sum Divisible by K
// Difficulty: Easy
// Tags: Array, Math, Modulo

/*

Pattern:
Array Sum + Modulo

Approach:
1. Initialize `sum` to 0.
2. Traverse the `nums` array and calculate the total sum.
3. Calculate `sum % k`.
4. The remainder represents the minimum number of operations
   needed because each operation decreases one element by 1,
   which decreases the total sum by 1.
5. Return the remainder.

Example:
nums = [3, 2]
k = 6

Sum:
3 + 2 = 5

5 % 6 = 5

We need to decrease the total sum by 5:
5 -> 4 -> 3 -> 2 -> 1 -> 0

Number of operations = 5

Output:
5

Time Complexity: O(n)
Space Complexity: O(1)

My Approach:
I calculated the sum of all elements in the array.

Then, I used the modulo operator `%` with `k`.

The remainder tells us how much the total sum needs to
be decreased to become divisible by `k`.

Since every operation decreases the total sum by exactly 1,
the remainder is the minimum number of operations.

Finally, I returned `sum % k`.
*/

// Solution

var minOperations = function(nums, k) {

    let sum = 0

    for(let i = 0; i < nums.length; i++) {
        sum += nums[i]
    }

    return sum % k
};

// Test Cases

console.log(minOperations([3, 9, 7], 5))
// Output: 4

console.log(minOperations([4, 1, 3], 4))
// Output: 0

console.log(minOperations([3, 2], 6))
// Output: 5

console.log(minOperations([1, 2, 3], 10))
// Output: 6

console.log(minOperations([10, 10, 10], 5))
// Output: 0