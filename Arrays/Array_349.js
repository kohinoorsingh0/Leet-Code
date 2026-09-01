// LeetCode 349
// Intersection of Two Arrays
// Difficulty: Easy
// Tags: Array, Hash Set, Two Pointers

/*

Pattern:
Brute Force Comparison + Set for Removing Duplicates

Approach:
1. Create an empty `result` array.
2. Use two nested loops to compare every element of `nums1`
   with every element of `nums2`.
3. If `nums1[i]` is equal to `nums2[j]`, add it to `result`.
4. Since the same value can be found multiple times, create
   a `Set` from `result` to remove duplicates.
5. Convert the Set back into an array and return it.

Example:
nums1 = [4,9,5]
nums2 = [9,4,9,8,4]

Common elements:
[4,9]

Output:
[4,9]

Time Complexity: O(n * m)
Space Complexity: O(n + m)

My Approach:
I used two nested loops to find matching elements between
the two arrays.

Since duplicate values can be added multiple times, I used
a `Set` at the end to remove all duplicates.

Finally, I converted the Set back into an array using the
spread operator.
*/

// Solution

var intersection = function(nums1, nums2) {

    let result = new Array()
    let k = 0

    for(let i = 0; i < nums1.length; i++){

        for(let j = 0; j < nums2.length; j++){

            if(nums1[i] === nums2[j]){
                result[k] = nums1[i]
                k++
            }
        }
    }

    const unique = new Set(result)

    return [...unique]
};


// Test Cases

console.log(intersection([4,9,5], [9,4,9,8,4]))
// Output: [4,9]

console.log(intersection([1,2,2,1], [2,2]))
// Output: [2]

console.log(intersection([1,2,3], [4,5,6]))
// Output: []

console.log(intersection([1,1,1], [1,1]))
// Output: [1]