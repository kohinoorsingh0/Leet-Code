// LeetCode 1859
// Sorting the Sentence
// Difficulty: Easy
// Tags: String, Sorting

/*

Pattern:
Nested Loop + Position-Based Sorting

Approach:
1. Split the sentence into an array of words using `split(" ")`.
2. Create an empty array `ans` to store the words in the correct order.
3. Use an outer loop from 1 to the number of words.
4. Use an inner loop to traverse every word in the array.
5. Extract the last character of each word and convert it
   into a number.
6. If the number matches the current position `j`, remove
   the last character using `slice(0, -1)` and add the word
   to `ans`.
7. Join the words using spaces and return the sentence.

Example:
s = "is2 sentence4 This1 a3"

Words:
["is2", "sentence4", "This1", "a3"]

Correct order:
This1 -> This
is2 -> is
a3 -> a
sentence4 -> sentence

Output:
"This is a sentence"

Time Complexity: O(n²)
Space Complexity: O(n)

My Approach:
I split the sentence into an array of words and used two
nested loops to arrange them according to their position
numbers.

The outer loop represents the required position, while the
inner loop searches for the word with that position number.

When a matching word is found, I remove its last character
using `slice(0, -1)` and push the remaining word into `ans`.

Finally, I joined the array with spaces and returned the
reconstructed sentence.
*/

// Solution

var sortSentence = function(s) {

    let arr = s.split(" ")
    let ans = []

    for(let j = 1; j < arr.length + 1; j++){

        for(let i = 0; i < arr.length; i++){

            let subArray = arr[i]

            if(Number(subArray[subArray.length - 1]) === j){
                ans.push(subArray.slice(0, -1))
            }

        }

    }

    return ans.join(" ")
};

// Test Cases

console.log(sortSentence("is2 sentence4 This1 a3"))
// Output: "This is a sentence"

console.log(sortSentence("Myself2 Me1 I4 and3"))
// Output: "Me Myself and I"

console.log(sortSentence("Hello1"))
// Output: "Hello"

console.log(sortSentence("world2 Hello1"))
// Output: "Hello world"

console.log(sortSentence("a3 c1 b2"))
// Output: "c b a"