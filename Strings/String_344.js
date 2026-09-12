// LeetCode 344
// Reverse String
// Difficulty: Easy
// Tags: Array, Two Pointers, In-Place

/*

Pattern:
Two Pointers + In-Place Reversal

Approach:
1. Use the built-in `reverse()` method to reverse the array.
2. The method modifies the original array in-place.
3. Return the reversed array for testing purposes.
4. On LeetCode, the function should not return anything
   because the array is modified in-place.

Example:
["h","e","l","l","o"] -> ["o","l","l","e","h"]
["H","a","n","n","a","h"] -> ["h","a","n","n","a","H"]

Time Complexity: O(n)
Space Complexity: O(1)

My Approach:
I used the built-in `reverse()` method to reverse the
character array in-place.

The method changes the original array directly, so no
additional array is required.
*/

// Solution

var reverseString = function(s) {

    s.reverse()

    return s
};


// Test Cases

console.log(reverseString(["h","e","l","l","o"]))
// Output: ["o","l","l","e","h"]

console.log(reverseString(["H","a","n","n","a","h"]))
// Output: ["h","a","n","n","a","H"]

console.log(reverseString(["a"]))
// Output: ["a"]

console.log(reverseString([]))
// Output: []