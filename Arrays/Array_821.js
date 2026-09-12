// LeetCode 821
// Shortest Distance to a Character
// Difficulty: Easy
// Tags: String, Array, Two Pass, Dynamic Programming

/*

Pattern:
Two Pass + Nearest Character Distance

Approach:
1. Create an answer array of the same length as the string.
2. Traverse the string from left to right.
3. Keep track of the distance from the most recent occurrence
   of character `c`.
4. Store this left-side distance in `ans[i]`.
5. Reset `count` to Infinity.
6. Traverse the string from right to left.
7. Again calculate the distance from the most recent occurrence
   of character `c` from the right side.
8. Take the minimum of the left-side and right-side distances.
9. Return the answer array.

Example:
s = "loveleetcode"
c = "e"

Left to Right:
[3,2,1,0,1,2,3,4,0,1,0,1]

Right to Left:
[3,2,1,0,1,2,3,4,0,1,0,1]

Output:
[3,2,1,0,1,2,3,4,0,1,0,1]

Time Complexity: O(n)
Space Complexity: O(n)

My Approach:
I used two passes through the string.

In the first pass, I calculated the distance to the nearest
`c` on the left side.

In the second pass, I calculated the distance to the nearest
`c` on the right side and used `Math.min()` to keep whichever
distance was smaller.

Using two passes ensures that every position gets the distance
to its closest occurrence of the target character.
*/

// Solution

var shortestToChar = function(s, c) {

    let n = s.length
    let ans = new Array(n)
    let count = Infinity

    // Left to Right
    for(let i = 0; i < n; i++){

        if(c === s[i]){
            count = 0
            ans[i] = count
        }
        else{
            count++
            ans[i] = count
        }
    }

    count = Infinity

    // Right to Left
    for(let i = n - 1; i >= 0; i--){

        if(c === s[i]){
            count = 0
            ans[i] = count
        }
        else{
            count++
            ans[i] = Math.min(ans[i], count)
        }
    }

    return ans
};


// Test Cases

console.log(shortestToChar("loveleetcode", "e"))
// Output: [3,2,1,0,1,2,3,4,0,1,0,1]

console.log(shortestToChar("aaab", "b"))
// Output: [3,2,1,0]

console.log(shortestToChar("aaba", "b"))
// Output: [2,1,0,1]

console.log(shortestToChar("abcde", "a"))
// Output: [0,1,2,3,4]