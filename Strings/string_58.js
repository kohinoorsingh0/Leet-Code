// ==================================================
// Question No. 58
// Topic: Strings
// Difficulty: Easy
// ==================================================

// Problem:
// Given a string s consisting of words and spaces, return the length of the last word  in the string.

// Example:

// Example 1:

//Input: s = "Hello World"
//Output: 5
//Explanation: The last word is "World" with length 5.

// --------------------------------------------------
// Solution:
// --------------------------------------------------





var lengthOfLastWord = (s) => {

    let count = 0;

    for (let i = (s.length - 1); i >= 0; i--) {
        if (s[i] === " " && count === 0) {

            continue;

        }
        if (s[i] === " ") {
            break
        }

        count++
    }

    console.log(count)
};

lengthOfLastWord("Hello World")  

//or method 2

// var lengthOfLastWord = (s) => {

//     let lastWord = s.trim().split(" ").pop()

//     console.log(lastWord.length)
// };

// lengthOfLastWord("  Hello    World    ") 
