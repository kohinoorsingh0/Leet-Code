// LeetCode 3794
// Reverse String Prefix
// Difficulty: Easy
// Tags: String, Two Pointers, Array

/*

Pattern:
String Slicing + Two Pointers

Approach:
1. Use `slice(0, k)` to extract the first `k` characters.
2. Use `slice(k, s.length)` to extract the remaining characters.
3. Convert the prefix into an array using `split("")`.
4. Use two pointers to reverse the prefix.
5. Join the reversed prefix back into a string.
6. Concatenate the reversed prefix with the remaining part.
7. Return the final string.

Example:
s = "abcd"
k = 2

Prefix:
"ab"

Remaining:
"cd"

Reverse prefix:
"ba"

Output:
"bacd"

Time Complexity: O(n)
Space Complexity: O(n)

My Approach:
I divided the string into two parts using `slice()`.

The first part contains the first `k` characters, while the
second part contains the remaining characters.

I converted the first part into an array and used two pointers
to reverse it.

Finally, I joined the reversed prefix with the remaining part
and returned the result.
*/

// Solution

var reversePrefix = function(s, k) {

    let reverse = s.slice(0, k)
    let rest = s.slice(k, s.length)

    let i = 0
    let j = reverse.length - 1

    let reversed = reverse.split("")

    while(i < j){

        [reversed[i], reversed[j]] = [reversed[j], reversed[i]]

        i++
        j--
    }

    return reversed.join("").concat(rest)
};

// Test Cases

console.log(reversePrefix("abcd", 2))
// Output: "bacd"

console.log(reversePrefix("abcdef", 3))
// Output: "cbadef"

console.log(reversePrefix("hello", 4))
// Output: "olleh"

console.log(reversePrefix("abc", 1))
// Output: "abc"

console.log(reversePrefix("abcde", 5))
// Output: "edcba"