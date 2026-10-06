// LeetCode 1662
// Check If Two String Arrays are Equivalent
// Difficulty: Easy
// Tags: Array, String, Join

/*

Pattern:
Array Concatenation + String Comparison

Approach:
1. Join all strings in `word1` into one string using `join("")`.
2. Join all strings in `word2` into one string using `join("")`.
3. Compare the two resulting strings.
4. If they are equal, return true.
5. Otherwise, return false.

Example:
word1 = ["ab", "c"]
word2 = ["a", "bc"]

After joining:
word1 -> "abc"
word2 -> "abc"

Since both strings are equal:

Output:
true

Time Complexity: O(n + m)
Space Complexity: O(n + m)

My Approach:
I used the `join("")` method to combine all the strings in
both arrays into a single string.

Then, I compared the two resulting strings using `===`.

If both strings were equal, I returned true; otherwise,
I returned false.
*/

// Solution

var arrayStringsAreEqual = function(word1, word2) {

    let first = word1.join("")
    let second = word2.join("")

    if(first === second){
        return true
    }
    else{
        return false
    }

};

// Test Cases

console.log(arrayStringsAreEqual(["ab", "c"], ["a", "bc"]))
// Output: true

console.log(arrayStringsAreEqual(["a", "cb"], ["ab", "c"]))
// Output: false

console.log(arrayStringsAreEqual(["abc", "d", "defg"], ["abcddefg"]))
// Output: true

console.log(arrayStringsAreEqual(["hello"], ["h", "e", "l", "l", "o"]))
// Output: true

console.log(arrayStringsAreEqual(["abc"], ["xyz"]))
// Output: false