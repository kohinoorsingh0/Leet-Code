// LeetCode 2942
// Find Words Containing Character
// Difficulty: Easy
// Tags: Array, String, Linear Search

/*

Pattern:
Nested Loop + Character Search

Approach:
1. Initialize an empty array `arr` to store the indexes of
   words containing the given character.
2. Traverse every word in the `words` array.
3. Traverse every character of the current word.
4. If the current character matches `x`, add the word's index
   to `arr`.
5. Use `break` to avoid adding the same index more than once.
6. Return the result array.

Example:
words = ["abc", "bcd", "aaaa", "cbc"]
x = "a"

Words containing "a":
- "abc"  -> index 0
- "aaaa" -> index 2

Output:
[0, 2]

Time Complexity: O(n * m)
Space Complexity: O(k)

My Approach:
I created an empty array `arr` and used a counter `k` to store
the indexes of matching words.

For every word, I traversed its characters and checked whether
any character was equal to `x`.

When a match was found, I stored the word's index in `arr` and
used `break` so that the same index was not added again.

Finally, I returned `arr`.
*/

// Solution

var findWordsContaining = function(words, x) {

    let arr = new Array()
    let k = 0

    for(let i = 0; i < words.length; i++){

        let word = words[i]

        for(let j = 0; j < word.length; j++){

            if(word[j] === x){
                arr[k++] = i
                break
            }

        }

    }

    return arr
};


// Test Cases

console.log(findWordsContaining(["abc", "bcd", "aaaa", "cbc"], "a"))
// Output: [0, 2]

console.log(findWordsContaining(["leet", "code"], "e"))
// Output: [0, 1]

console.log(findWordsContaining(["abc", "def", "ghi"], "z"))
// Output: []

console.log(findWordsContaining(["a", "aa", "aaa"], "a"))
// Output: [0, 1, 2]

console.log(findWordsContaining([], "a"))
// Output: []