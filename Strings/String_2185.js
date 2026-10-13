// LeetCode 2185
// Counting Words With a Given Prefix
// Difficulty: Easy
// Tags: Array, String, Prefix

/*

Pattern:
Nested Loop + Prefix Matching

Approach:
1. Initialize `num` to 0 to count matching words.
2. Traverse every word in the `words` array.
3. Convert the current word into an array of characters.
4. Initialize `count` to 0 for the current word.
5. Traverse every character of `pref`.
6. If the current word's character matches the corresponding
   character in `pref`, increment `count`.
7. If `count` equals the length of `pref`, increment `num`.
8. Return `num`.

Example:
words = ["pay", "attention", "practice", "attend"]
pref = "at"

Matching words:
- "attention"
- "attend"

Output:
2

Time Complexity: O(n * m)
Space Complexity: O(w)

Where:
n = Number of words
m = Length of the prefix
w = Maximum word length

My Approach:
I traversed every word and converted it into an array of
characters.

Then, I compared each character of the prefix with the
corresponding character of the current word.

If all characters of the prefix matched, I increased `num`.

Finally, I returned the total number of matching words.
*/

// Solution

var prefixCount = function(words, pref) {

    let num = 0

    for(let i = 0; i < words.length; i++){

        let arr = words[i].split("")
        let count = 0

        for(let j = 0; j < pref.length; j++){

            if(arr[j] === pref[j]){
                count++
            }

        }

        if(count === pref.length){
            num++
        }

    }

    return num
};

// Test Cases

console.log(prefixCount(["pay", "attention", "practice", "attend"], "at"))
// Output: 2

console.log(prefixCount(["leetcode", "win", "loops", "success"], "code"))
// Output: 0

console.log(prefixCount(["apple", "app", "application", "bat"], "app"))
// Output: 3

console.log(prefixCount(["hello", "help", "he", "world"], "he"))
// Output: 3

console.log(prefixCount(["dog", "cat", "bird"], ""))
// Output: 3