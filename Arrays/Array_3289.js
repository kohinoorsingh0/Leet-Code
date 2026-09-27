// LeetCode 3289
// The Two Sneaky Numbers of Digitville
// Difficulty: Easy
// Tags: Array, Sorting, Duplicate

/*

Pattern:
Sorting + Finding Duplicates

Approach:
1. Create an array `ans` of size 2 because there are exactly
   two sneaky numbers.
2. Sort the `nums` array in ascending order.
3. Traverse the sorted array.
4. If `nums[i]` is equal to `nums[i + 1]`, then the number
   appears twice and is one of the sneaky numbers.
5. Store the duplicate number in `ans`.
6. Return `ans`.

Example:
nums = [7, 1, 5, 4, 3, 4, 6, 0, 9, 5, 8, 2]

After sorting:
[0, 1, 2, 3, 4, 4, 5, 5, 6, 7, 8, 9]

Duplicates:
4 and 5

Output:
[4, 5]

Time Complexity: O(n log n)
Space Complexity: O(1) auxiliary space

My Approach:
I first sorted the array in ascending order.

After sorting, duplicate numbers become adjacent. I traversed
the array and compared every element with the next element.

If both elements were equal, I stored the duplicate number in
the answer array.

*/

// Solution

var getSneakyNumbers = function(nums) {

    let ans = new Array(2)
    let k = 0

    nums.sort((a, b) => {
        return a - b
    })

    for(let i = 0; i < nums.length; i++){

        if(nums[i] === nums[i + 1]){
            ans[k++] = nums[i + 1]
        }

    }

    return ans
};

// Test Cases

console.log(getSneakyNumbers([7, 1, 5, 4, 3, 4, 6, 0, 9, 5, 8, 2]))
// Output: [4, 5]

console.log(getSneakyNumbers([0, 1, 1, 0]))
// Output: [0, 1]

console.log(getSneakyNumbers([1, 2, 3, 3, 2, 1]))
// Output: [1, 2]

console.log(getSneakyNumbers([0, 3, 2, 1, 0, 3]))
// Output: [0, 3]