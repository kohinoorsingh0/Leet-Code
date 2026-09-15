// LeetCode 389
// Find the Difference
// Difficulty: Easy
// Tags: String, Array, Math, Character Encoding

/*

Pattern:
Character Code Sum + Difference

Approach:
1. Initialize two variables:
   - sSum -> sum of character codes in string `s`.
   - tSum -> sum of character codes in string `t`.
2. Traverse string `s` and calculate the sum of its character
   codes using `charCodeAt(i)`.
3. Traverse string `t` and calculate the sum of its character
   codes.
4. Subtract the sum of `s` from the sum of `t`.
5. Convert the resulting character code back into a character
   using `String.fromCharCode()`.
6. Return the extra character.

Example:
s = "abcd"
t = "abcde"

Character codes:
a = 97
b = 98
c = 99
d = 100
e = 101

tSum - sSum = 495 - 394 = 101

Output:
"e"

Time Complexity: O(n + m)
Space Complexity: O(1)

My Approach:
I calculated the sum of the character codes of both strings.
Since string `t` contains all the characters of `s` plus one
extra character, subtracting the two sums gives the character
code of the extra character.

Finally, I converted that character code back into a character
using `String.fromCharCode()`.
*/

// Solution

var findTheDifference = function(s, t) {

    let sSum = 0
    let tSum = 0

    for(let i = 0; i < s.length; i++){
        sSum += s.charCodeAt(i)
    }

    for(let i = 0; i < t.length; i++){
        tSum += t.charCodeAt(i)
    }

    return String.fromCharCode(tSum - sSum)
};


// Test Cases

console.log(findTheDifference("abcd", "abcde"))
// Output: "e"

console.log(findTheDifference("", "y"))
// Output: "y"

console.log(findTheDifference("a", "aa"))
// Output: "a"

console.log(findTheDifference("ae", "aea"))
// Output: "a"

console.log(findTheDifference("hello", "helloo"))
// Output: "o"