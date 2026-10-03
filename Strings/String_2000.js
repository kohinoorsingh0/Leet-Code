// LeetCode 2000
// Reverse Prefix of Word
// Difficulty: Easy
// Tags: String, Two Pointers, Array

/*

Pattern:
String Slicing + Two Pointers

Approach:
1. Find the first occurrence of `ch` using `indexOf()`.
2. If `ch` does not exist in `word`, return `word` unchanged.
3. Create `reverse` containing the prefix from the beginning
   of `word` through the first occurrence of `ch`.
4. Create `rest` containing the remaining part of the word.
5. Convert the prefix into an array using `split("")`.
6. Use two pointers to reverse the prefix in-place.
7. Convert the reversed array back into a string using `join("")`.
8. Concatenate the reversed prefix with `rest`.
9. Return the final string.

Example:
word = "abcdefd"
ch = "d"

Prefix:
"abcd"

Remaining part:
"efd"

Reverse prefix:
"dcba"

Output:
"dcbaefd"

Time Complexity: O(n)
Space Complexity: O(n)

My Approach:
I first used `indexOf()` to find the first occurrence of `ch`.

If `ch` was not present, I returned the original word.

Otherwise, I divided the word into two parts: the prefix up
to `ch` and the remaining characters.

I converted the prefix into an array and used two pointers to
reverse it. Finally, I joined the reversed prefix and
concatenated it with the remaining part.
*/

// Solution

var reversePrefix = function(word, ch) {

    let index = word.indexOf(ch)

    if(index === -1){
        return word
    }
    else{

        let reverse = word.slice(0, index + 1)
        let rest = word.slice(index + 1, word.length)

        let i = 0
        let j = reverse.length - 1

        let reversed = reverse.split("")

        while(i < j){

            [reversed[i], reversed[j]] = [reversed[j], reversed[i]]

            i++
            j--
        }

        return reversed.join("").concat(rest)
    }
};

// Test Cases

console.log(reversePrefix("abcdefd", "d"))
// Output: "dcbaefd"

console.log(reversePrefix("xyxzxe", "z"))
// Output: "zyxxe"

console.log(reversePrefix("abcd", "z"))
// Output: "abcd"

console.log(reversePrefix("a", "a"))
// Output: "a"

console.log(reversePrefix("hello", "l"))
// Output: "lleho"