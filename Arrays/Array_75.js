// LeetCode 75
// Sort Colors
// Difficulty: Medium
// Tags: Array, Two Pointers, Sorting

/*

Pattern:
Dutch National Flag Algorithm + Three Pointers

Approach:
1. Use three pointers:
   - j -> position where the next 0 should go.
   - i -> current element being checked.
   - k -> position where the next 2 should go.
2. If nums[i] is 0:
   - Swap nums[i] with nums[j].
   - Move both i and j forward.
3. If nums[i] is 1:
   - Just move i forward.
4. If nums[i] is 2:
   - Swap nums[i] with nums[k].
   - Move k backward.
   - Do NOT move i because the new element at nums[i]
     still needs to be checked.
5. Continue until i crosses k.

Example:
[2,0,1] -> [0,1,2]
[2,2,0,1,1] -> [0,1,1,2,2]

Time Complexity: O(n)
Space Complexity: O(1)

My Approach:
I used three pointers (i, j, k) to divide the array
into three sections:
0s on the left, 1s in the middle, and 2s on the right.
*/

// Solution

var sortColors = function(nums) {

    let i = 0
    let j = 0
    let k = nums.length - 1

    while(i <= k) {

        // If current element is 0
        if(nums[i] === 0) {
            [nums[j], nums[i]] = [nums[i], nums[j]]
            i++
            j++
        }

        // If current element is 2
        else if(nums[i] === 2) {
            [nums[k], nums[i]] = [nums[i], nums[k]]
            k--
        }

        // If current element is 1
        else {
            i++
        }
    }

    return nums
};


// Test Cases

console.log(sortColors([2,0,1]))
// Output: [0,1,2]

console.log(sortColors([2,0,2,1,1,0]))
// Output: [0,0,1,1,2,2]

console.log(sortColors([0,1,2]))
// Output: [0,1,2]

console.log(sortColors([2,2,1,1,0,0]))
// Output: [0,0,1,1,2,2]