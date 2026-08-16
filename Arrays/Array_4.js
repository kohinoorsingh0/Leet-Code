/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

// LeetCode 4
// Median of Two Sorted Arrays
// Difficulty: Hard
// Tags: Array, Two Pointers, Binary Search

/*
Approach:
1. Merge nums1 and nums2 into a new sorted array.
2. Use two pointers:
   - i -> nums1
   - j -> nums2
   - k -> merged array
3. Compare nums1[i] and nums2[j] and insert the smaller value.
4. Add remaining elements after one array is exhausted.
5. Find the median:
   - Odd length  -> middle element
   - Even length -> average of two middle elements

Time Complexity: O(m + n)
Space Complexity: O(m + n)
*/

var findMedianSortedArrays = function (nums1, nums2) {

    let m = nums1.length;
    let n = nums2.length;

    let merged = new Array(m + n);

    let i = 0;
    let j = 0;
    let k = 0;

    // Merge both sorted arrays
    while (i < m && j < n) {

        if (nums1[i] > nums2[j]) {
            merged[k] = nums2[j];
            k++;
            j++;
        }

        else if (nums1[i] < nums2[j]) {
            merged[k] = nums1[i];
            k++;
            i++;
        }

        else {
            merged[k] = nums1[i];
            k++;
            i++;
        }
    }

    // Add remaining elements from nums1
    while (i < m) {
        merged[k] = nums1[i];
        k++;
        i++;
    }

    // Add remaining elements from nums2
    while (j < n) {
        merged[k] = nums2[j];
        k++;
        j++;
    }

    let total = m + n;

    // Odd length
    let odd = merged[Math.floor(total / 2)];

    // Even length
    let even =
        (merged[total / 2 - 1] + merged[total / 2]) / 2;

    if (total % 2 === 0) {
        return even;
    }

    return odd;
};

console.log(findMedianSortedArrays([1, 2], [3, 4]));