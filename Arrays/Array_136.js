// LeetCode 136
// Single Number
// Difficulty: Easy
// Tags: Array, Sorting

/*
LeetCode 136 - Single Number

Problem:
Given an integer array nums where every element appears twice
except for one element, find and return the element that appears only once.

Pattern:
Sorting + Pair Checking

Approach:
1. Sort the array in ascending numerical order.
2. After sorting, duplicate numbers will be next to each other.
3. Start checking from index 0.
4. Compare nums[i] with nums[i + 1].
5. If they are equal:
   - They form a pair.
   - Move to the next pair using i += 2.
6. If they are not equal:
   - nums[i] is the single number.
   - Break the loop.
7. Return the single number.

Example:

[4,1,4,6,2,1,2]

After sorting:
[1,1,2,2,4,4,6]

Pairs:
[1,1] -> pair
[2,2] -> pair
[4,4] -> pair
[6]   -> single number

Answer:
6

Another Example:

[1,2,2,3,3]

After sorting:
[1,2,2,3,3]

First pair:
[1,2] -> not equal

Therefore:
1 is the single number.

Time Complexity:
O(n log n)

Reason:
Sorting takes O(n log n), and the pair-checking loop takes O(n).

Space Complexity:
O(1) extra space

My Approach:
I initially tried using nested loops to find duplicate numbers.
That approach became complicated because I had to track which numbers
were duplicated.

Then I realized that after sorting, every duplicate appears next to
its pair. So I only need to check the array in pairs using i += 2.

Important Observation:
If nums[i] === nums[i + 1], the pair is valid.
If nums[i] !== nums[i + 1], nums[i] is the single number.
*/


var singleNumber = function(nums) {

    let singleNum = nums[0]

    // Sort the array numerically
    nums.sort((a, b) => {
        return a - b
    })

    // Check the array in pairs
    for(let i = 0; i < nums.length; i += 2) {

        // If both elements form a pair
        if(nums[i] === nums[i + 1]) {
            continue
        }

        // If the pair breaks, current element is unique
        else {
            singleNum = nums[i]
            break
        }
    }

    return singleNum
}


// Test Cases

console.log(singleNumber([4,1,4,6,2,1,2]))
// Output: 6

console.log(singleNumber([2,2,3,3,5]))
// Output: 5

console.log(singleNumber([1,2,2,3,3]))
// Output: 1