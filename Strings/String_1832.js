// LeetCode 1832
// Check if the Sentence Is Pangram
// Difficulty: Easy
// Tags: String, Sorting, Character Encoding

/*

Pattern:
Sorting + Character Code Comparison

Approach:
1. Split the sentence into an array of characters.
2. Sort the characters and join them back into a string.
3. Initialize `j` to 97, the character code of lowercase 'a'.
4. Initialize `count` to 0.
5. Traverse the sorted string.
6. If the current character code matches `j`:
   - Increment `count`.
   - Increment `j` to check the next alphabet.
7. If `count` reaches 26, return true.
8. Otherwise, return false.

Example:
sentence = "thequickbrownfoxjumpsoverthelazydog"

After sorting, the string contains every lowercase letter
from 'a' to 'z'.

count = 26

Output:
true

Time Complexity: O(n log n)
Space Complexity: O(n)

My Approach:
I sorted the characters of the sentence so that duplicate
letters appeared together and the alphabetic order was
maintained.

Then, I started checking character codes from 97 ('a').
Whenever a character matched the expected character code,
I increased `count` and moved to the next alphabet.

If all 26 letters were found, I returned true; otherwise,
I returned false.

*/

// Solution

var checkIfPangram = function(sentence) {

    let arr = sentence.split("").sort().join("")
    let j = 97
    let count = 0

    for(let i = 0; i < arr.length; i++){

        if(arr.charCodeAt(i) === j){
            count++
            j++
        }

    }

    if(count === 26){
        return true
    }
    else{
        return false
    }

};

// Test Cases

console.log(checkIfPangram("thequickbrownfoxjumpsoverthelazydog"))
// Output: true

console.log(checkIfPangram("leetcode"))
// Output: false

console.log(checkIfPangram("abcdefghijklmnopqrstuvwxyz"))
// Output: true

console.log(checkIfPangram("abcdefghijklmnopqrstuvwxy"))
// Output: false

console.log(checkIfPangram("aabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyyzz"))
// Output: true