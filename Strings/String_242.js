// LeetCode 242
// Valid Anagram
// Difficulty: Easy
// Tags: String, Sorting, Character Encoding

/*

Pattern:
Sorting + Character Code Comparison

Approach:
1. If the lengths of strings `s` and `t` are different, return false.
2. Create two arrays to store the character codes of both strings.
3. Traverse both strings and store their character codes in the arrays.
4. Sort both arrays in ascending order.
5. Convert both sorted arrays into strings using `join()`.
6. Compare the sorted strings:
   - If they are equal, return true.
   - Otherwise, return false.

Example:
s = "anagram"
t = "nagaram"

After sorting:
s = "aaagmnr"
t = "aaagmnr"

Output:
true

Time Complexity: O(n log n)
Space Complexity: O(n)

My Approach:
I converted every character of both strings into its character
code using `charCodeAt()`.

Then, I sorted both arrays numerically. If both sorted arrays
contain the same character codes in the same order, the strings
are anagrams.

Finally, I compared the joined arrays and returned the result.
*/

// Solution

var isAnagram = function(s, t) {

    let arr1 = new Array(s.length)
    let arr2 = new Array(t.length)

    if(s.length !== t.length){
        return false
    }

    for(let i = 0; i < s.length; i++){
        arr1[i] = s.charCodeAt(i)
        arr2[i] = t.charCodeAt(i)
    }

    arr1.sort((a, b) => {
        return a - b
    })

    arr2.sort((a, b) => {
        return a - b
    })

    if(arr1.join() === arr2.join()){
        return true
    }
    else{
        return false
    }
};


// Test Cases

console.log(isAnagram("anagram", "nagaram"))
// Output: true

console.log(isAnagram("rat", "car"))
// Output: false

console.log(isAnagram("listen", "silent"))
// Output: true

console.log(isAnagram("hello", "world"))
// Output: false

console.log(isAnagram("", ""))
// Output: true