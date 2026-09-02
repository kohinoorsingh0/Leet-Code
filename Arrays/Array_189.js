// LeetCode 189
// Rotate Array
// Difficulty: Medium
// Tags: Array, Two Pointers, Reversal Algorithm

/*

Pattern:
Array Reversal + In-Place Modification

Approach:
1. Calculate `k % nums.length` because rotating by the
   array length brings the array back to its original state.
2. Create a `reverse()` function to reverse any portion
   of the array in-place.
3. Reverse the entire array.
4. Reverse the first `k` elements.
5. Reverse the remaining elements from index `k` to the end.
6. The array is now rotated to the right by `k` positions.

Example:
[1,2,3,4,5,6,7], k = 3

Reverse entire array:
[7,6,5,4,3,2,1]

Reverse first 3:
[5,6,7,4,3,2,1]

Reverse remaining:
[5,6,7,1,2,3,4]

Output:
[5,6,7,1,2,3,4]

Time Complexity: O(n)
Space Complexity: O(1)

My Approach:
I used the reversal algorithm to rotate the array in-place.

First, I reversed the complete array. Then I reversed the
first `k` elements and finally reversed the remaining elements.

Using `k % nums.length` also handles cases where `k` is greater
than the length of the array.
*/

// Solution

var rotate = function (nums, k) {

    k = k % nums.length

    function reverse(start, end){
        while(start < end){
            [nums[start], nums[end]] = [nums[end], nums[start]]
            start++
            end--
        }
    }

    reverse(0, nums.length - 1)
    reverse(0, k - 1)
    reverse(k, nums.length - 1)
};


// Test Cases

let nums1 = [1,2,3,4,5,6,7]
rotate(nums1, 3)
console.log(nums1)
// Output: [5,6,7,1,2,3,4]

let nums2 = [-1,-100,3,99]
rotate(nums2, 2)
console.log(nums2)
// Output: [3,99,-1,-100]

let nums3 = [1,2,3,4,5]
rotate(nums3, 2)
console.log(nums3)
// Output: [4,5,1,2,3]

let nums4 = [1,2]
rotate(nums4, 3)
console.log(nums4)
// Output: [2,1]