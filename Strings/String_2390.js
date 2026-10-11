// LeetCode 2390
// Removing Stars From a String
// Difficulty: Medium
// Tags: String, Stack, Simulation

/*

Pattern:
Stack + Character Processing

Approach:
1. Create an empty array `arr` to use as a stack.
2. Traverse every character of the string `s`.
3. If the current character is `"*"`, remove the last
   character from `arr` using `pop()`.
4. Otherwise, push the current character into `arr`.
5. After processing all characters, join `arr` into a string.
6. Return the resulting string.

Example:
s = "leet**cod*e"

Process:
- "leet" -> arr = ["l", "e", "e", "t"]
- "*" removes "t"
- "*" removes "e"
- "cod" is added
- "*" removes "d"
- "e" is added

Output:
"lecoe"

Time Complexity: O(n)
Space Complexity: O(n)

My Approach:
I used an array as a stack to process the string.

Whenever I encountered a normal character, I pushed it into
the array. Whenever I encountered `"*"`, I removed the most
recently added character using `pop()`.

Finally, I joined the remaining characters into a string
and returned it.
*/

// Solution

var removeStars = function(s) {

    let arr = []

    for(let i = 0; i < s.length; i++){

        if(s[i] === "*"){
            arr.pop()
        }
        else{
            arr.push(s[i])
        }

    }

    return arr.join("")
};

// Test Cases

console.log(removeStars("leet**cod*e"))
// Output: "lecoe"

console.log(removeStars("erase*****"))
// Output: ""

console.log(removeStars("abc*d"))
// Output: "abd"

console.log(removeStars("a*b*c*"))
// Output: ""

console.log(removeStars("abc"))
// Output: "abc"