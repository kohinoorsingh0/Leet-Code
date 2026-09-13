// LeetCode 557
// Reverse Words in a String III
// Difficulty: Easy
// Tags: String, Array, Two Pointers

/*

Pattern:
String Splitting + Two Pointers + In-Place Reversal

Approach:
1. Split the string into an array of words using `split(" ")`.
2. Traverse each word in the array.
3. Convert the current word into an array of characters.
4. Use two pointers:
   - j -> starts from the beginning of the word.
   - k -> starts from the end of the word.
5. Swap the characters at `j` and `k`.
6. Move `j` forward and `k` backward until they meet.
7. Join the reversed characters back into a string.
8. Replace the original word with the reversed word.
9. Join all the words using a space and return the result.

Example:
"Let's take LeetCode contest"
-> "s'teL ekat edoCteeL tsetnoc"

"Mr Ding"
-> "rM gniD"

Time Complexity: O(n)
Space Complexity: O(n)

My Approach:
I first split the string into an array of words.
Then I reversed each word individually using two pointers.

For every word, I swapped the characters from both ends
until the pointers crossed.

Finally, I joined all the reversed words using spaces to
form the final string.

The relative order of the words remains unchanged.
*/

// Solution

var reverseWords = function (s) {

    let arr = s.split(" ")

    for(let i = 0; i < arr.length; i++){

        let word = arr[i].split("")

        let j = 0
        let k = word.length - 1

        while(j <= k){

            [word[j], word[k]] = [word[k], word[j]]

            j++
            k--
        }

        arr[i] = word.join("")
    }

    let result = arr.join(" ")

    return result
};


// Test Cases

console.log(reverseWords("Mr Ding"))
// Output: "rM gniD"

console.log(reverseWords("Let's take LeetCode contest"))
// Output: "s'teL ekat edoCteeL tsetnoc"

console.log(reverseWords("Hello"))
// Output: "olleH"

console.log(reverseWords("a b c"))
// Output: "a b c"

console.log(reverseWords("The sky is blue"))
// Output: "ehT yks si eulb"