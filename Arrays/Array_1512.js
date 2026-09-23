// LeetCode 1512
// Number of Good Pairs
// Difficulty: Easy
// Tags: Array, Nested Loop, Counting

/*

Pattern:
Nested Loop + Pair Counting

Approach:
1. Initialize `count` to 0.
2. Traverse the array using two loops.
3. Check if `nums[i]` and `nums[j]` are equal.
4. Also check `i < j` so that:
   - The same element is not paired with itself.
   - The same pair is not counted twice.
5. Increment `count` whenever a valid pair is found.
6. Return `count`.

Example:
nums = [1, 2, 3, 1, 1, 3]

Good pairs:
(0, 3) -> 1 == 1
(0, 4) -> 1 == 1
(3, 4) -> 1 == 1
(2, 5) -> 3 == 3

Output:
4

Time Complexity: O(n²)
Space Complexity: O(1)

My Approach:
I used two nested loops to compare every pair of elements.

Whenever `nums[i]` was equal to `nums[j]` and `i < j`, I
increased the count.

The `i < j` condition ensures that every pair is counted
exactly once.

*/

// Solution

var numIdenticalPairs = function(nums) {

    let count = 0

    for(let i = 0; i < nums.length; i++){

        for(let j = 0; j < nums.length; j++){

            if(nums[i] === nums[j] && i < j){
                count++
            }

        }

    }

    return count
};

// Test Cases

console.log(numIdenticalPairs([1, 2, 3, 1, 1, 3]))
// Output: 4

console.log(numIdenticalPairs([1, 1, 1, 1]))
// Output: 6

console.log(numIdenticalPairs([1, 2, 3]))
// Output: 0

console.log(numIdenticalPairs([1, 1, 2, 2]))
// Output: 2

console.log(numIdenticalPairs([5, 5]))
// Output: 1