// LeetCode 3110
// Score of a String
// Difficulty: Easy
// Tags: String, Character Encoding, Math

/*

Pattern:
Adjacent Character Difference

Approach:
1. Initialize `sum` to 0.
2. Traverse the string until the second-last character.
3. Calculate the difference between the character codes of two
   adjacent characters.
4. Use `Math.abs()` to get the absolute difference.
5. Add the difference to `sum`.
6. Return the total score.

Example:
s = "zaz"

Character codes:
z = 122
a = 97
z = 122

Score:
|122 - 97| + |97 - 122|
= 25 + 25
= 50

Output:
50

Time Complexity: O(n)
Space Complexity: O(1)

My Approach:
I traversed the string and compared every character with the
next character.

I calculated the difference between their character codes,
used `Math.abs()` to make the difference positive, and added
it to `sum`.

Finally, I returned the total score.
*/

// Solution

var scoreOfString = function(s) {

    let sum = 0

    for(let i = 0; i < s.length - 1; i++){

        let adj = s.charCodeAt(i) - s.charCodeAt(i + 1)

        sum += Math.abs(adj)

    }

    return sum

};


// Test Cases

console.log(scoreOfString("zaz"))
// Output: 50

console.log(scoreOfString("hello"))
// Output: 13

console.log(scoreOfString("abc"))
// Output: 2

console.log(scoreOfString("a"))
// Output: 0

console.log(scoreOfString("az"))
// Output: 25