// LeetCode 88
// Merge Sorted Array
// Difficulty: Easy
// Tags: Array, Two Pointers, Sorting

/*
LeetCode 88 - Merge Sorted Array

Pattern:
Two Pointers + Merge

Problem:
Given two sorted arrays nums1 and nums2, merge nums2 into nums1
so that nums1 becomes one sorted array.

Approach:
1. Create a temporary array of size m + n.
2. Use three pointers:
   - i → nums1
   - j → nums2
   - k → temp
3. Compare nums1[i] and nums2[j].
4. Put the smaller value into temp.
5. Move the corresponding pointer and k.
6. If both values are equal, take either one.
7. Copy remaining elements from nums1 or nums2.
8. Copy temp back into nums1.

Time Complexity:
O(m + n)

Space Complexity:
O(m + n)
*/

// Solution

var merge = function(nums1, m, nums2, n) {
    
    let temp = new Array(m + n)

    let i = 0
    let j = 0
    let k = 0

    // Merge while both arrays have elements
    while(i < m && j < n){

        if(nums1[i] > nums2[j]){
            temp[k] = nums2[j]
            j++
            k++
        }

        else if(nums1[i] < nums2[j]){
            temp[k] = nums1[i]
            i++
            k++
        }

        else{
            temp[k] = nums1[i]
            i++
            k++
        }
    }

    // Copy remaining elements from nums2
    while(j < n){
        temp[k] = nums2[j]
        j++
        k++
    }

    // Copy remaining elements from nums1
    while(i < m){
        temp[k] = nums1[i]
        i++
        k++
    }

    // Copy merged array back into nums1
    for(let i = 0; i < m + n; i++){
        nums1[i] = temp[i]
    }
}


// Test Case

merge(
    [1, 2, 3, 0, 0, 0],
    3,
    [2, 5, 6],
    3
)

// Output:
// [1, 2, 2, 3, 5, 6]