// LeetCode 3146
// Permutation Difference between Two Strings
// Difficulty: Easy
// Tags: String, Nested Loop, Math

/*

Pattern:
Character Position Difference

Approach:
1. Initialize `sum` to 0.
2. Traverse every character of string `s`.
3. For each character in `s`, traverse string `t` to find the
   same character.
4. When the character is found, calculate the absolute
   difference between its positions using `Math.abs(i - j)`.
5. Add this difference to `sum`.
6. Return the final sum.

Example:
s = "abcde"
t = "edbac"

Positions:

a -> s: 0, t: 2 -> |0 - 2| = 2
b -> s: 1, t: 3 -> |1 - 3| = 2
c -> s: 2, t: 4 -> |2 - 4| = 2
d -> s: 3, t: 1 -> |3 - 1| = 2
e -> s: 4, t: 0 -> |4 - 0| = 4

Total:
2 + 2 + 2 + 2 + 4 = 12

Output:
12

Time Complexity: O(n²)
Space Complexity: O(1)

My Approach:
I used two nested loops.

The outer loop traverses every character of `s`, while the
inner loop searches for the same character in `t`.

Whenever a matching character is found, I calculated the
absolute difference between its positions and added it to
`sum`.

Finally, I returned the total permutation difference.
*/

// Solution

var findPermutationDifference = function(s, t) {

    let sum = 0

    for(let i = 0; i < s.length; i++){

        for(let j = 0; j < t.length; j++){

            if(s[i] === t[j]){
                sum = sum + Math.abs(i - j)
            }

        }

    }

    return sum
};

// Test Cases

console.log(findPermutationDifference("abcde", "edbac"))
// Output: 12

console.log(findPermutationDifference("abc", "abc"))
// Output: 0

console.log(findPermutationDifference("abc", "cba"))
// Output: 4

console.log(findPermutationDifference("abc", "bac"))
// Output: 2

console.log(findPermutationDifference("a", "a"))
// Output: 0