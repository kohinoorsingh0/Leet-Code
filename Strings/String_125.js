// LeetCode 125
// Valid Palindrome
// Difficulty: Easy
// Tags: String, Two Pointers, Character Validation

/*

Pattern:
String Cleaning + Reversal + Comparison

Approach:
1. Convert the string into an array of characters.
2. Traverse the array and keep only:
   - Uppercase letters.
   - Lowercase letters.
   - Digits.
3. Remove all other characters, including spaces and
   punctuation.
4. Create a copy of the cleaned array.
5. Reverse the copy.
6. Convert both arrays into lowercase strings.
7. Compare the original cleaned string with the reversed
   string.
8. If both strings are equal, return true.
9. Otherwise, return false.

Example:
"race a car" -> false
"A man, a plan, a canal: Panama" -> true
" " -> true

Time Complexity: O(n)
Space Complexity: O(n)

My Approach:
I first removed all characters that were not letters or
digits using `charCodeAt()`.

Then I created a copy of the cleaned array, reversed it,
and converted both strings to lowercase.

Finally, I compared the cleaned string with its reversed
version. If they are equal, the string is a palindrome.

For example:
"race a car" -> "raceacar"
Reverse       -> "racaecar"

Since both strings are different, the result is false.
*/

// Solution

var isPalindrome = function (s) {

    let Reverse = new Array()
    let temp = new Array()
    let arr = [...s]

    for(let i = 0; i < arr.length; i++){

        let code = arr[i].charCodeAt(0)

        if(
            (code > 64 && code < 91) ||
            (code > 96 && code < 123) ||
            (code > 47 && code < 58)
        ){
            temp[i] = arr[i]
        }
    }

    temp = temp.filter(Boolean)

    for(let i = 0; i < temp.length; i++){
        Reverse[i] = temp[i]
    }

    Reverse = Reverse.join("")
    Reverse = Reverse.toLowerCase()

    temp.reverse()
    temp = temp.join("")
    temp = temp.toLowerCase()

    if(temp === Reverse){
        return true
    }
    else{
        return false
    }
};


// Test Cases

console.log(isPalindrome("A man, a plan, a canal: Panama"))
// Output: true

console.log(isPalindrome("race a car"))
// Output: false

console.log(isPalindrome(" "))
// Output: true

console.log(isPalindrome("0P"))
// Output: false

console.log(isPalindrome("Madam"))
// Output: true