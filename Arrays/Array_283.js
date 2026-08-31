// LeetCode 283
// Move Zeroes
// Difficulty: Easy
// Tags: Array, Two Pointers, In-Place

/*

Pattern:
Two Pointers + In-Place Swapping

Approach:
1. Use two pointers:
   - i -> scans every element of the array.
   - j -> keeps track of the position where the next
          non-zero element should be placed.
2. If `nums[i]` is not 0:
   - Swap `nums[i]` with `nums[j]`.
   - Move both `i` and `j` forward.
3. If `nums[i]` is 0:
   - Only move `i` forward.
4. Continue until `i` reaches the end of the array.
5. This automatically moves all zeroes to the end while
   maintaining the relative order of non-zero elements.

Example:
[0,1,0,3,12] -> [1,3,12,0,0]
[0,0,1] -> [1,0,0]

Time Complexity: O(n)
Space Complexity: O(1)

My Approach:
I used two pointers. `i` traverses the entire array, while
`j` tracks the position where the next non-zero element
should be placed.

Whenever I find a non-zero element, I swap it with the
element at index `j` and move both pointers forward.

Zeroes are skipped by moving only `i`, so they gradually
move toward the end of the array.
*/

// Solution

var moveZeroes = function(nums) {

    let j = 0
    let i = 0

    while(i < nums.length){

        // If current element is non-zero
        if(nums[i] !== 0){
            [nums[i], nums[j]] = [nums[j], nums[i]]

            i++
            j++
        }

        // If current element is zero
        else{
            i++
        }
    }

    return nums
};


// Test Cases

console.log(moveZeroes([0,1,0,3,12]))
// Output: [1,3,12,0,0]

console.log(moveZeroes([0,0,1]))
// Output: [1,0,0]

console.log(moveZeroes([1,2,3,0,0]))
// Output: [1,2,3,0,0]

console.log(moveZeroes([0]))
// Output: [0]